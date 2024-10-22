import * as yup from 'yup'

const validation = {
    fullName: yup
        .string()
        // .matches(/(\w.+\s).+/, 'Enter at least 2 names')
        .min(2, 'Họ tên phải có ít nhất 2 ký tự')
        .max(50, 'Họ tên không được quá 50 ký tự')
        .required('Họ tên không được để trống'),
    username: yup
        .string()
        .min(2, 'Tên đăng nhập phải có ít nhất 2 ký tự')
        .max(50, 'Tên đăng nhập không được quá 50 ký tự')
        .required('Tên đăng nhập không được để trống'),
    email: yup
        .string()
        .email("Địa chỉ email không hợp lệ")
        .required('Địa chỉ email không được để trống'),
    phone: yup
        .string()
        .matches(/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/, 'Số điện thoại không hợp lệ')
        .required('Số điện thoại không được để trống'),
    address: yup
        .string()
        // .matches(/(\w.+\s).+/, 'Enter at least 2 names')
        .min(2, 'Địa chỉ phải có ít nhất 2 ký tự')
        .max(100, 'Địa chỉ không được quá 50 ký tự')
        .required('Địa chỉ không được để trống'),
    paymentMethod: yup
        .string()
        // .oneOf(['cash', 'e-wallet'], 'Hãy chọn 1 phương thức thanh toán')
        .required('Phương thức thanh toán không được để trống'),
    password: yup
        .string()
        // .matches(/\w*[a-z]\w*/, "Mật khẩu phải có ít nhất 1 chữ in thường")
        // .matches(/\w*[A-Z]\w*/, "Mật khẩu phải có ít nhất 1 chữ in hoa")
        // .matches(/\d/, "Mật khẩu phải có ít nhất 1 chữ số")
        // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt")
        // .min(8, ({ min }) => `Mật khẩu phải có ít nhất ${min} ký tự`)
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .required('Mật khẩu không được để trống'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Xác nhận mật khẩu không khớp với mật khẩu')
        .required('Xác nhận mật khẩu không được để trống'),
}

export const loginValidationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Tên người nhận không được để trống'),
    password: yup
        .string()
        .required('Mật khẩu không được để trống'),
})

export const registerValidationSchema = yup.object().shape({
    username: validation.username,
    password: validation.password,
    confirmPassword: validation.confirmPassword,
    email: validation.email,
    phone: validation.phone,
    fullName: validation.fullName,
})

export const shippingInfoValidationSchema = yup.object().shape({
    fullName: validation.fullName,
    phone: validation.phone,
    address: validation.address,
    paymentMethod: validation.paymentMethod
})