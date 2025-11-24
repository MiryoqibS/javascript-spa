const apiServer = import.meta.env.DEV ? "http://localhost:8080" : "http://localhost:8080";

const baseFetch = (url, config = {}, params) => {
    return new Promise((resolve, reject) => {
        try {
            const finalConfig = { ...config };

            if (params) {
                finalConfig['body'] = JSON.stringify(params);
            };

            fetch(`${apiServer}${url}`, {
                ...finalConfig,
            })
                .then(response => response.json())
                .then(resolve, reject);
        } catch (error) {
            console.log(`Ошибка при получении данных: ${error}`);
            reject(error);
        };
    })
};

const fetchGet = (url, config) => {
    return baseFetch(url, {
        ...config,
        method: "GET",
    });
};

const fetchPost = (url, params = {}, config) => {
    return baseFetch(url, {
        ...config,
        method: "POST",
    }, params);
};

const fetchPut = (url, params = {}, config) => {
    return baseFetch(url, {
        ...config,
        method: "PUT",
    }, params);
};

const fetchPatch = (url, params = {}, config) => {
    return baseFetch(url, {
        ...config,
        method: "PATCH",
    }, params);
};

const fetchDelete = (url, params = {}, config) => {
    return baseFetch(url, {
        ...config,
        method: "DELETE",
    }, params);
};

export default {
    get: fetchGet,
    post: fetchPost,
    put: fetchPut,
    patch: fetchPatch,
    delete: fetchDelete,
};