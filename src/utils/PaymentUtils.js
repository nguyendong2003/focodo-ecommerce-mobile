
export const getPaymentText = (paymentMethod) => {
    switch (paymentMethod) {
        case 'COD':
            return 'Thanh toán khi nhận hàng';
        case 'VNPAY':
            return 'Thanh toán VNPAY';
        default:
            return 'Unknown';
    }
}