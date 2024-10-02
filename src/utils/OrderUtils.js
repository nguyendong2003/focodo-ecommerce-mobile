
export const getStatusText = (status) => {
    switch (status) {
        case 'processing':
            return 'Đang xử lý'
        case 'cancelled':
            return 'Đã hủy'
        case 'shipping':
            return 'Đang vận chuyển'
        case 'finished':
            return 'Đã giao'
        case 'reviewed':
            return 'Đã giao'
        default:
            return 'Mặc định'
    }
}