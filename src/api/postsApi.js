import api from "./baseApi";

export const getPosts = (page) => {
    return api.get(`/posts?_page=${page}&limit=10&_expand=user`);
};

export const getPostsByUser = (userId, page) => {
    return api.get(`/posts?userId=${userId}&_page=${page}&limit=10&_expand=user`);
};

export const getPostsById = (postId) => {
    return api.get(`/posts/${postId}?_expand=user`);
};

export const getPostsBySearch = (search, page) => {
    return api.get(`/posts?q=${search}&_page=${page}&limit=10&_expand=user`);
};

export default {
    getPosts,
    getPostsByUser,
    getPostsById,
    getPostsBySearch,
};
