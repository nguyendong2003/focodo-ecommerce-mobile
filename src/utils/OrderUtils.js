
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