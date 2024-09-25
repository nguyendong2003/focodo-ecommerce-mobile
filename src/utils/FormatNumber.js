
export const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN').format(number)
}

export const formatCurrency = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}