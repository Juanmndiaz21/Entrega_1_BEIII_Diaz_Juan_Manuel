import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// armo las mascotas de prueba
export const generateMockPets = (amount = 50) => {
    const pets = [];
    const speciesList = ['dog', 'cat', 'bird', 'hamster', 'fish', 'rabbit', 'reptile'];

    for (let i = 0; i < amount; i++) {
        pets.push({
            _id: new mongoose.Types.ObjectId(),
            name: faker.person.firstName(),
            specie: faker.helpers.arrayElement(speciesList),
            birthDate: faker.date.past({ years: 10 }),
            adopted: false,
            owner: null,
            image: faker.image.url({ width: 640, height: 480 })
        });
    }

    return pets;
};

// armo los usuarios falsos segun la cantidad que me pidan
export const generateMockUsers = (amount = 50) => {
    const users = [];
    // hasheo la clave una sola vez para no quemar el server si me piden miles de users
    const hashedPassword = bcrypt.hashSync('coder123', 10);

    for (let i = 0; i < amount; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        // le meto un sufijo random para que mongo no me tire error por emails repetidos
        const randomSuffix = faker.string.alphanumeric(6).toLowerCase();
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${randomSuffix}@example.com`;

        users.push({
            _id: new mongoose.Types.ObjectId(),
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword,
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []
        });
    }

    return users;
};

export default {
    generateMockPets,
    generateMockUsers
};
