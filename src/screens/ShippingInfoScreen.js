import { Button, Icon } from "@rneui/themed";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Field, Formik } from "formik";
import { shippingInfoValidationSchema } from "../utils/ValidationForm";
import CustomTextInput from "../components/custom/CustomTextInput";


// https://formik.org/docs/guides/validation
// uncontrolled component with Formik: https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup
const ShippingInfoScreen = ({ navigation }) => {

    const handleConfirm = (values) => {
        // console.log(values)
        navigation.navigate('OrderConfirm')
    }

    return (
        <View className="p-4 bg-white">
            <Formik
                validationSchema={shippingInfoValidationSchema}
                initialValues={{ name: '', phone: '', address: '', paymentMethod: 'cash' }}
                onSubmit={handleConfirm}
                validateOnMount={true}
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
                        <Text className="text-base text-black font-bold">Tên người nhận</Text>
                        <Field
                            name="name"
                            placeholder="Nhập Họ tên"
                            component={CustomTextInput}
                        />

                        <Text className="text-base text-black font-bold">Số điện thoại</Text>
                        <Field
                            name="phone"
                            placeholder="Nhập Số điện thoại"
                            component={CustomTextInput}
                        />

                        <Text className="text-base text-black font-bold">Địa chỉ nhận hàng</Text>
                        <Field
                            name="address"
                            placeholder="Nhập Tòa nhà, số nhà, tên đường"
                            component={CustomTextInput}
                        />

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

                        <Button
                            title="Xác nhận"
                            buttonStyle={{ backgroundColor: '#000', borderRadius: 8, marginTop: 20 }}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        />

                    </>
                )}
            </Formik>
        </View >
    )
}

export default ShippingInfoScreen;