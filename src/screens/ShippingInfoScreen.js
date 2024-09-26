import { Button, Icon } from "@rneui/themed";
import { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as yup from 'yup'

const validationSchema = yup.object().shape({
    name: yup
        .string()
        // .matches(/(\w.+\s).+/, 'Enter at least 2 names')
        .min(2, 'Tên người nhận phải có ít nhất 2 ký tự')
        .max(50, 'Tên người nhận không được quá 50 ký tự')
        .required('Tên người nhận không được để trống'),
    email: yup
        .string()
        .email("Địa chỉ email không hợp lệ")
        .required('Địa chỉ email không được để trống'),
    phone: yup
        .string()
        .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
        .required('Số điện thoại không được để trống'),
    address: yup
        .string()
        // .matches(/(\w.+\s).+/, 'Enter at least 2 names')
        .min(2, 'Địa chỉ phải có ít nhất 2 ký tự')
        .max(100, 'Địa chỉ không được quá 50 ký tự')
        .required('Địa chỉ không được để trống'),
    paymentMethod: yup
        .string()
        .oneOf(['cash', 'e-wallet'], 'Hãy chọn 1 phương thức thanh toán')
        .required('Phương thức thanh toán không được để trống'),
    password: yup
        .string()
        .matches(/\w*[a-z]\w*/, "Password must have a small letter")
        .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
        .matches(/\d/, "Password must have a number")
        .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),
})

// https://formik.org/docs/guides/validation
// uncontrolled component with Formik: https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup
const ShippingInfoScreen = ({ navigation }) => {

    return (
        <View className="bg-white">
            <Formik
                validationSchema={validationSchema}
                initialValues={{ name: '', phone: '', address: '', paymentMethod: 'cash' }}
                onSubmit={values => console.log(values)}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                    setFieldValue,
                }) => (
                    <>
                        <View className="px-4 mt-2">
                            <Text className="text-base text-black font-bold">Tên người nhận</Text>
                            <TextInput
                                name="name"
                                placeholder="Nhập Họ tên"
                                className="text-base grow shrink rounded border border-gray-500 px-3 py-1 my-1 text-black"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            {(errors.name && touched.name) &&
                                <Text className="text-red-500 text-sm">{errors.name}</Text>
                            }
                        </View>

                        <View className="px-4 mt-2">
                            <Text className="text-base text-black font-bold">Số điện thoại</Text>
                            <TextInput
                                name="phone"
                                placeholder="Nhập Số điện thoại"
                                className="text-base grow shrink rounded border border-gray-500 px-3 py-1 my-1 text-black"
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                                keyboardType="numeric"
                            />
                            {(errors.phone && touched.phone) &&
                                <Text className="text-red-500 text-sm">{errors.phone}</Text>
                            }
                        </View>

                        <View className="px-4 mt-2">
                            <Text className="text-base text-black font-bold">Địa chỉ nhận hàng</Text>
                            <TextInput
                                name="address"
                                placeholder="Nhập Tòa nhà, số nhà, tên đường"
                                className="text-base grow shrink rounded border border-gray-500 px-3 py-1 my-1 text-black"
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values.address}
                            />
                            {(errors.address && touched.address) &&
                                <Text className="text-red-500 text-sm">{errors.address}</Text>
                            }
                        </View>

                        <View className="px-4 mt-2">
                            <Text className="text-base text-black font-bold">Phương thức thanh toán</Text>

                            <View className="flex-row items-center mt-2">
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => setFieldValue('paymentMethod', 'cash')}
                                    className="flex-row items-center"
                                >
                                    <View
                                        className={`h-6 w-6 rounded-full border-2 ${values.paymentMethod === 'cash' ? 'border-black' : 'border-gray-400'} flex justify-center items-center`}
                                    >
                                        {values.paymentMethod === 'cash' && (
                                            <View
                                                className="h-3 w-3 rounded-full bg-black"
                                            />
                                        )}
                                    </View>
                                    <Text className="ml-2">Tiền mặt khi nhận hàng</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row items-center mt-2">
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => setFieldValue('paymentMethod', 'e-wallet')}
                                    className="flex-row items-center"
                                >
                                    <View
                                        className={`h-6 w-6 rounded-full border-2 ${values.paymentMethod === 'e-wallet' ? 'border-black' : 'border-gray-400'} flex justify-center items-center`}

                                    >
                                        {values.paymentMethod === 'e-wallet' && (
                                            <View
                                                className="h-3 w-3 rounded-full bg-black"

                                            />
                                        )}
                                    </View>
                                    <Text className="ml-2">Thanh toán qua ví điện tử</Text>
                                </TouchableOpacity>
                            </View>

                            {(errors.paymentMethod && touched.paymentMethod) &&
                                <Text className="text-red-500 text-sm">{errors.paymentMethod}</Text>
                            }
                        </View>

                        <View className="px-4 mt-6">
                            <Button
                                title="Hoàn tất đơn hàng"
                                buttonStyle={{ backgroundColor: '#000', borderRadius: 8 }}
                                onPress={handleSubmit}
                            />
                        </View>

                    </>
                )}
            </Formik>
        </View >
    )
}

export default ShippingInfoScreen;