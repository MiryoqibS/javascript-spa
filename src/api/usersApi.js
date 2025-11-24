import api from "./baseApi";

export const getUsers = (page) => {
    return api.get(`/users?_page=${page}&limit=10`);
};

export const getUserById = (userId) => {
    return api.get(`/users/${userId}`);
};

export const getUsersBySearch = (search, page) => {
    return api.get(`/users?q=${search}&_page=${page}&limit=10`)
};

export default {
    getUsers,
    getUserById,
    getUsersBySearch,
};