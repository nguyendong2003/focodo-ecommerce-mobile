import axios from "./axios-customize"
import axiosPublic from "axios"

// Authentication
export const callLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', { username, password })
}

export const callRegister = (data) => {
    return axios.post('/api/v1/auth/register', data)
}

export const callVerifyEmail = (email) => {
    return axios.post(`/api/v1/auth/verifyEmail?email=${email}`)
}

export const callVerifyOtp = (email, otp) => {
    return axios.post(`/api/v1/auth/verifyOtp?email=${email}&otp=${otp}`)
}

export const callResetPassword = (email, password) => {
    return axios.post(`/api/v1/auth/resetPassword?email=${email}&password=${password}`)
}

export const callUpdatePassword = (oldPassword, newPassword) => {
    return axios.put(`/api/v1/users/updatePassword?old_password=${oldPassword}&new_password=${newPassword}`)
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/users/getUser')
}

// User
export const callUpdateAvatar = (avatar) => {
    let formData = new FormData();
    formData.append('avatar', {
        uri: avatar.uri,
        type: "image/jpeg",
        name: avatar.name,
    });

    return axios.put('/api/v1/users/updateAvatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export const callUpdateProfileUser = (profile) => {
    return axios.put(`/api/v1/users/updateProfileUser`, profile)
}

export const callUpdateDetailProfile = (field, value) => {
    return axios.put(`/api/v1/users/updateDetailProfileUser?${field}=${value}`)
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

export const callSearchProducts = (query, page, size) => {
    return axios.get(`/api/v1/products/search?query=${query}&page=${page}&size=${size}`)
}

// Review
export const callFetchReviews = (page, size) => {
    return axios.get(`/api/v1/reviews/getReviewsOfUser?page=${page}&size=${size}`)
}

export const callFetchReviewById = (id) => {
    return axios.get(`/api/v1/reviews/getReviewById/${id}`)
}

export const callFetchReviewsByProductId = (id, page, size) => {
    return axios.get(`/api/v1/reviews/getReviewsOfProduct/${id}?page=${page}&size=${size}`)
}

export const callFetchReviewsByOrderId = (id) => {
    return axios.get(`/api/v1/reviews/getReviewsOfOrder/${id}`)
}

export const callCreateReview = (data) => {
    const promises = data.map((item) => {
        let formData = new FormData();

        formData.append('id_order', item.id_order);
        formData.append('review', JSON.stringify(item.review));
        // formData.append('review', new Blob([JSON.stringify(item.review)], {
        //     type: 'application/json'
        // }));

        const images = item.images || [];
        images.forEach((image) => {
            formData.append('images', {
                uri: image.uri,
                // type: image.type || 'image/jpeg',
                type: "image/jpeg",
                name: image.name,
            });
        });

        return axios.post('/api/v1/reviews/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            // headers: {
            //     'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            // },
        });
    });

    return Promise.all(promises);
};

export const callUpdateReview = (data) => {
    console.log('Data:', data);

    const reviewId = data.id;
    let formData = new FormData();

    data.images.forEach((image, index) => {
        formData.append('images', image);
    });
    formData.append('review', JSON.stringify(data.review));

    const files = data.files || [];
    files.forEach((file) => {
        formData.append('files', {
            uri: file.uri,
            type: "image/jpeg",
            name: file.name,
        });
    });

    return axios.put(`/api/v1/reviews/update/${reviewId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export const callDeleteReview = (id) => {
    return axios.delete(`/api/v1/reviews/delete/${id}`)
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

// export const callBuyAgain = (products) => {
//     console.log('Products:', products);

//     const promises = products.map((item) => {
//         return axios.post('/api/v1/carts/addCart', {
//             id_product: item.id,
//             quantity: item.quantity
//         });
//     })

//     return Promise.all(promises);
// }

export const callUpdateCheckCart = (id) => {
    return axios.put(`/api/v1/carts/updateCart/${id}`)
}

export const callUpdateQuantityCart = (id, quantity) => {
    return axios.put(`/api/v1/carts/updateQuantityCart/${id}?quantity=${quantity}`)
}

export const callDeleteCart = (id) => {
    return axios.delete(`/api/v1/carts/deleteCart/${id}`)
}

// Voucher
export const callCheckVoucher = (id, total) => {
    return axios.get(`/api/v1/vouchers/checkVoucher?id=${id}&total=${total}`)
}

export const callFetchVouchers = () => {
    return axios.get('/api/v1/vouchers/getAllVouchers')
}

export const callFetchVoucherById = (id) => {
    return axios.get(`/api/v1/vouchers/getVoucherById/${id}`)
}

// Order
export const callFetchOrders = (page = 0, size = 10) => {
    return axios.get(`/api/v1/orders/getOrdersOfUser?page=${page}&size=${size}`)
}

export const callFetchOrdersByStatus = (status, page, size) => {
    return axios.get(`/api/v1/orders/getOrdersOfUserByOrderStatus?status=${status}&page=${page}&size=${size}`)
}

export const callFetchOrderById = (id) => {
    return axios.get(`/api/v1/orders/getOrderById/${id}`)
}

export const callCreateOrder = (data) => {
    const order = {
        customer: data.customer,
        order: data.order,
    };

    return axios.post('/api/v1/orders/create?platform=mobile', order, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const callFetchAllOrderStatus = () => {
    return axios.get('/api/v1/orders/getAllOrderStatus')
}

export const callUpdateOrderStatus = (id, status) => {
    return axios.put(`/api/v1/orders/updateOrderStatus/${id}?status=${status}`)
}


// Payment
export const callGetPayment = (url) => {
    return axios.get(url);
};

export const callFetchAllPaymentMethods = () => {
    return axios.get('/api/v1/orders/getAllPaymentMethod');
}

// Province
export const callFetchProvinces = () => {
    return axiosPublic.get('https://provinces.open-api.vn/api/p/')
}

export const callFetchDistrictsByProvinceId = (provinceId) => {
    return axiosPublic.get(`https://provinces.open-api.vn/api/p/${provinceId}?depth=2`)
}

export const callFetchWardsByDistrictId = (districtId) => {
    return axiosPublic.get(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`)
}

export const callSearchProvinceByName = (name) => {
    return axiosPublic.get(`https://provinces.open-api.vn/api/p/search/?q=${name}`)
}

export const callSearchDistrictsByName = (name) => {
    return axiosPublic.get(`https://provinces.open-api.vn/api/d/search/?q=${name}`)
}

export const callSearchWardByName = (name) => {
    return axiosPublic.get(`https://provinces.open-api.vn/api/w/search/?q=${name}`)
}

