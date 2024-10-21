
export const getStatusText = (status) => {
    switch (status) {
        case 'Chưa xác nhận':
            return 'Chưa xác nhận'
        case 'Đã hủy':
            return 'Đã hủy'
        case 'Đã xác nhận':
            return 'Đã xác nhận'
        case 'Đã giao':
            return 'Đã giao'
        case 'Đã đánh giá':
            return 'Đã giao'
        default:
            return 'Mặc định'
    }
}

export const convertOrders = (orders) => {
    const ordersData = orders.map(item => {
        const products = item?.order_details?.map(detail => {
            return {
                id: detail.product?.id,
                quantity: detail.quantity
            };
        })

        return {
            id: item.id_order,
            title: item?.order_details[0]?.product?.name,
            finalPrice: item.final_price,
            image: item?.order_details[0]?.product?.image,
            status: item.order_status,
            orderTime: item.order_date,
            isReviewed: item.review_check,
            products: products,
        };
    });

    return ordersData;
}

export const convertOrder = (order) => {
    const { id_order, ...rest } = order;
    return {
        ...rest,
        id: id_order,
    };
};