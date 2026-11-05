import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import { usersService, petsService } from '../services/index.js';

// devuelvo mascotas truchas para probar
const getMockingPets = async (req, res) => {
    try {
        const count = parseInt(req.query.count) || 50;
        const pets = generateMockPets(count);
        return res.status(200).send({
            status: 'success',
            payload: pets
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error: 'Error interno al generar mascotas simuladas',
            details: error.message
        });
    }
};

// devuelvo 50 usuarios ficticios con clave coder123 hasheada
const getMockingUsers = async (req, res) => {
    try {
        const count = parseInt(req.query.count) || 50;
        const users = generateMockUsers(count);
        return res.status(200).send({
            status: 'success',
            payload: users
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error: 'Error interno al generar usuarios simulados',
            details: error.message
        });
    }
};

// genero e inserto en la base de datos la cantidad que me pasen por body
const generateData = async (req, res) => {
    try {
        const { users, pets } = req.body;

        // me aseguro de que me manden los dos campos
        if (users === undefined || pets === undefined) {
            return res.status(400).send({
                status: 'error',
                error: "Parámetros incompletos. Debe enviar los campos 'users' y 'pets' en el cuerpo de la petición."
            });
        }

        const numUsers = Number(users);
        const numPets = Number(pets);

        // chequeo que sean numeros enteros de 0 para arriba
        if (
            isNaN(numUsers) ||
            isNaN(numPets) ||
            !Number.isInteger(numUsers) ||
            !Number.isInteger(numPets) ||
            numUsers < 0 ||
            numPets < 0
        ) {
            return res.status(400).send({
                status: 'error',
                error: "Los valores de 'users' y 'pets' deben ser números enteros mayores o iguales a 0."
            });
        }

        const mockUsers = generateMockUsers(numUsers);
        const mockPets = generateMockPets(numPets);

        // guardo todo en paralelo en mongo para que sea rapido
        const insertedUsers = await Promise.all(
            mockUsers.map(user => usersService.create(user))
        );

        const insertedPets = await Promise.all(
            mockPets.map(pet => petsService.create(pet))
        );

        return res.status(201).send({
            status: 'success',
            message: 'Datos generados e insertados exitosamente en la base de datos.',
            payload: {
                usersInserted: insertedUsers.length,
                petsInserted: insertedPets.length
            }
        });
    } catch (error) {
        console.error('Error en generateData:', error);
        return res.status(500).send({
            status: 'error',
            error: 'Error interno del servidor al generar e insertar los datos.',
            details: error.message
        });
    }
};

export default {
    getMockingPets,
    getMockingUsers,
    generateData
};
