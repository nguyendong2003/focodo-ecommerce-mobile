import axios from "./axios-customize"

// Authentication
export const callLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', { username, password })
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/users/getUser')
}

// Category
export const callFetchCategories = () => {
    return axios.get('/api/v1/categories/getAllCategories')
}

export const callFetchSubCategoriesById = (id) => {
    return axios.get(`/api/v1/categories/getCategoryById/${id}`)
}

// Product
export const callFetchProductsPagination = (page, size) => {
    return axios.get(`/api/v1/products?$page=${page}&size=${size}`)
}

export const callFetchProductsByCategoryPagination = (id, page, size) => {
    return axios.get(`/api/v1/products/getProductsOfCategory/${id}?page=${page}&size=${size}`)
}

export const callFetchProductById = (id) => {
    return axios.get(`/api/v1/products/getProductById/${id}`)
}

export const callFetchProductsBestSeller = () => {
    return axios.get('/api/v1/products/getProductsBestSeller')
}

export const callFetchProductsDiscount = () => {
    return axios.get('/api/v1/products/getProductsDiscount')
}

// Review
export const callFetchReviewsByProductId = (id, page, size) => {
    return axios.get(`/api/v1/reviews/getReviewsOfProduct/${id}?page=${page}&size=${size}`)
}

// Cart
export const callFetchCart = () => {
    return axios.get('/api/v1/carts/getCartOfUser')
}

export const callAddToCart = (productId, quantity) => {
    return axios.post('/api/v1/carts/addCart', {
        id_product: productId,
        quantity
    })
}

export const callUpdateCart = (id) => {
    return axios.put(`/api/v1/carts/updateCart/${id}`)
}

// Voucher
export const callCheckVoucher = (voucher) => {
    return axios.get(`/api/v1/vouchers/checkVoucher/${voucher}`)
}

export const callFetchVouchers = () => {
    return axios.get('/api/v1/vouchers/getAllVouchers')
}

export const callFetchVoucherById = (id) => {
    return axios.get(`/api/v1/vouchers/getVoucherById/${id}`)
}

// Order
export const callFetchOrders = () => {
    return axios.get('/api/v1/orders/getOrdersOfUser')
}

export const callCreateOrder = (data) => {
    const order = {
        customer: data.customer,
        order: data.order,
    };

    console.log(order);


    return axios.post('/api/v1/orders/create', order, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const callCreateOrderWithPayment = (data) => {
    return axios.post('/api/v1/orders/createWithPayment', data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

// Payment
export const callGetPayment = (url) => {
    return axios.get(url);
};