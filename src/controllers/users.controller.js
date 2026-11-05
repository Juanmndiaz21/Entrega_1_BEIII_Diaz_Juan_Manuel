import { usersService } from "../services/index.js";

// traigo todos los usuarios de la base
const getAllUsers = async (req, res) => {
    const users = await usersService.getAll();
    res.send({ status: "success", payload: users });
};

// busco uno solo por su id
const getUser = async (req, res) => {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) return res.status(404).send({ status: "error", error: "User not found" });
    res.send({ status: "success", payload: user });
};

// actualizo los datos que me mandan en el body
const updateUser = async (req, res) => {
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) return res.status(404).send({ status: "error", error: "User not found" });
    const result = await usersService.update(userId, updateBody);
    res.send({ status: "success", message: "User updated" });
};

// borro el usuario por id
const deleteUser = async (req, res) => {
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({ status: "success", message: "User deleted" });
};

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
};
