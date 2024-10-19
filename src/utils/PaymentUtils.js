
export const getPaymentMethodText = (paymentMethod) => {
    switch (paymentMethod) {
        case 'COD':
            return 'Thanh toán khi nhận hàng';
        case 'VNPAY':
            return 'Thanh toán qua VNPAY';
        default:
            return 'Unknown';
    }
}