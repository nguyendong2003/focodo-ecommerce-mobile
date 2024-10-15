import moment from "moment"

export const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN').format(number)
}

export const formatCurrency = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}

export const formatDateTime = (time) => {
    return moment(time, "YYYY-MM-DD HH:mm:ss").format(
        "DD/MM/yyyy HH:mm"
    )
}