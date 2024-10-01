
export const getStatusText = (status) => {
    switch (status) {
        case 'processing':
            return 'Đang xử lý'
        case 'shipping':
            return 'Đang vận chuyển'
        case 'finished':
            return 'Đã giao'
        case 'cancelled':
            return 'Đã hủy'
        default:
            return 'Mặc định'
    }
}