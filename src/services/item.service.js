import http from '../http-common';

const getAll = () => {
    return http.get('/items');
};
const getSingleItem = id => {
    return http.get(`/items/${id}`);
};

const createItem = data => {
    return http.post('items', data);
};

const updateItem = (id, data) => {
    return http.put(`items/${id}`.data);
};

const removeItem = id => {
    return http.delete(`item/${id}`);
};

const removeAll = () => {
    return http.delete('/items');
}

const findByTitle = title => {
    return http.get(`items?title = ${title}`);
};

const ItemService = {
    getAll,
    getSingleItem,
    createItem,
    updateItem,
    removeItem,
    removeAll,
    findByTitle
};

export default ItemService;