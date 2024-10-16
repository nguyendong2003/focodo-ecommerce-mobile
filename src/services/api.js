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

// Review
export const callFetchReviewsByProductId = (id, page, size) => {
    return axios.get(`/api/v1/reviews/getReviewsOfProduct/${id}?page=${page}&size=${size}`)
}

// Cart
export const callFetchCart = () => {
    return axios.get('/api/v1/carts/getCartOfUser')
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