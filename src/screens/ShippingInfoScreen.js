import { Button, Icon } from "@rneui/themed";
import { Text, TextInput, View, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { Field, Formik } from "formik";
import { shippingInfoValidationSchema } from "../utils/ValidationForm";
import CustomTextInput from "../components/custom/CustomTextInput";
import { callFetchAllPaymentMethods } from "../services/api";
import { useContext, useEffect, useState } from "react";
import { getPaymentMethodText } from "../utils/PaymentUtils";
import { AuthContext } from "../components/context/AuthProvider";


// https://formik.org/docs/guides/validation
// uncontrolled component with Formik: https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup
const ShippingInfoScreen = ({ navigation, route }) => {
    const { order } = route.params;
    const { userLogin, setUserLogin, login, logout, fetchAccount } = useContext(AuthContext)
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchAccount();
        await fetchAllPaymentMethods();
        setRefreshing(false);
    }

    const handleConfirm = (values) => {
        const customer = {
            full_name: values.fullName,
            phone: values.phone,
            address: values.address,
        }
        const shipping_price = values.shippingMethod === 'Giao hàng tiết kiệm' ? 10000 : 20000
        const payment_method = values.paymentMethod

        order.description = values.description
        order.shipping_price = shipping_price
        order.payment_method = payment_method
        order.final_price = order.total_price + shipping_price - order.discount_price

        console.log('Order:', order);
        console.log('Customer:', customer);

        navigation.navigate('OrderConfirm', {
            customer,
            order
        })
    }

    const fetchAllPaymentMethods = async () => {
        const res = await callFetchAllPaymentMethods();
        if (res && res.result) {
            setPaymentMethods(res.result);
        }
    }

    useEffect(() => {
        fetchAllPaymentMethods();
    }, [])

    return (
        <ScrollView
            className="p-4 bg-white"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
        >
            <Formik
                validationSchema={shippingInfoValidationSchema}
                initialValues={{
                    fullName: userLogin.fullName ? userLogin.fullName : '',
                    phone: userLogin.phone ? userLogin.phone : '',
                    address: userLogin.address ? userLogin.address : '',
                    shippingMethod: 'Giao hàng tiết kiệm',
                    paymentMethod: 1,
                    description: ''
                }}
                onSubmit={handleConfirm}
                validateOnMount={true}
                enableReinitialize={true}
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
                            name="fullName"
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

                        <Text className="text-base text-black font-bold">Ghi chú đơn hàng</Text>
                        <View className="mb-1">
                            <View className={`border border-gray-500 rounded-lg px-2 py-2`}>
                                <TextInput
                                    multiline
                                    numberOfLines={2}
                                    onChangeText={handleChange('description')}
                                    maxLength={50}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    placeholder="Nhập ghi chú đơn hàng"
                                    style={{ textAlignVertical: 'top' }}
                                />
                            </View>

                            <Text className="text-right text-gray-500">{values.description.length}/50</Text>

                        </View>
                        {/* Phương thức vận chuyển */}
                        <Text className="text-base text-black font-bold">Phương thức vận chuyển</Text>
                        <View className="flex-row items-center mt-2">
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => setFieldValue('shippingMethod', 'Giao hàng tiết kiệm')}
                                className="flex-row items-center"
                            >
                                <View
                                    className={`h-6 w-6 rounded-full border-2 ${values.shippingMethod === 'Giao hàng tiết kiệm' ? 'border-black' : 'border-gray-400'} flex justify-center items-center`}
                                >
                                    {values.shippingMethod === 'Giao hàng tiết kiệm' && (
                                        <View
                                            className="h-3 w-3 rounded-full bg-black"
                                        />
                                    )}
                                </View>
                                <Text className="ml-2">Giao hàng tiết kiệm</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row items-center mt-2">
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setFieldValue('shippingMethod', 'Giao hàng nhanh')}
                                className="flex-row items-center"
                            >
                                <View
                                    className={`h-6 w-6 rounded-full border-2 ${values.shippingMethod === 'Giao hàng nhanh' ? 'border-black' : 'border-gray-400'} flex justify-center items-center`}

                                >
                                    {values.shippingMethod === 'Giao hàng nhanh' && (
                                        <View
                                            className="h-3 w-3 rounded-full bg-black"

                                        />
                                    )}
                                </View>
                                <Text className="ml-2">Giao hàng nhanh</Text>
                            </TouchableOpacity>
                        </View>

                        {/*  */}
                        <Text className="text-base text-black font-bold mt-2">Phương thức thanh toán</Text>

                        {
                            paymentMethods.map((method, index) => (
                                <View className="flex-row items-center mt-2" key={index}>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => setFieldValue('paymentMethod', method.id)}
                                        className="flex-row items-center"
                                    >
                                        <View
                                            className={`h-6 w-6 rounded-full border-2 ${values.paymentMethod === method.id ? 'border-black' : 'border-gray-400'} flex justify-center items-center`}
                                        >
                                            {values.paymentMethod === method.id && (
                                                <View
                                                    className="h-3 w-3 rounded-full bg-black"
                                                />
                                            )}
                                        </View>
                                        <Text className="ml-2">{getPaymentMethodText(method.method)}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }

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
        </ScrollView >
    )
}

export default ShippingInfoScreen;