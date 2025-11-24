import api from "./baseApi";

export const getCommentsByPosts = (postId, page) => {
    return api.get(`/posts/${postId}/comments?_page=${page}&limit=10&_expand=user&_sort=createdAt`);
};

export const getCommentsByUser = (userId, page) => {
    return api.get(`/comments?userId=${userId}&_page=${page}&_expand=user&_expand=post`);
};

export default {
    getCommentsByPosts,
    getCommentsByUser,
};