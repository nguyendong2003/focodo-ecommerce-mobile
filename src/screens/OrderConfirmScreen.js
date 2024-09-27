import { Button, Icon } from "@rneui/themed";
import { Alert, Image, ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { formatCurrency } from "../utils/FormatNumber";
import { useEffect, useState } from "react";
import orderDetail from '../data/orderDetail.json'

const OrderConfirmScreen = ({ navigation, route }) => {
    // const { orderId } = route.params
    const [order, setOrder] = useState({})

    useEffect(() => {
        // const orderDetail = result.orders.find(item => item.id === orderId)
        setOrder(orderDetail)
    }, [])

    const handleSubmit = () => {
        Alert.alert('Đặt hàng thành công!')
        navigation.navigate('HomePage')
    }

    return (
        <View className="bg-white flex-1">
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row gap-x-2 border-b-8 border-gray-200 p-3">
                    <Icon type="ionicon" name="document-text-outline" />
                    <View className="shrink">
                        <Text className="text-lg font-semibold leading-5">Địa chỉ người nhận</Text>
                        <Text className="text-base text-gray-700">{order?.receiveInfo?.fullName}</Text>
                        <Text className="text-base text-gray-500">{order?.receiveInfo?.phone}</Text>
                        <Text className="text-base text-gray-500 leading-5">{order?.receiveInfo?.address}</Text>
                    </View>
                </View>

                <View className="border-b-8 border-gray-200">
                    <Text className="mx-3 py-2 border-b-2 border-b-gray-200 text-gray-500 font-bold text-base"
                        style={{ borderBottomWidth: 1 }}>Danh sách sản phẩm</Text>
                    {
                        order?.products?.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.7}
                                className="p-2 px-3 border-b-2 border-b-gray-100"
                                onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                            >
                                <View className="flex-row items-center gap-x-2">
                                    <Image source={{ uri: item?.image }} className="w-16 h-16 rounded-lg" />
                                    <View className="shrink h-full w-full ">
                                        <Text className="text-base text-gray-600 font-semibold leading-5" numberOfLines={2}>{item?.name}</Text>
                                        <Text className="text-sm text-gray-500 leading-6" numberOfLines={1}>x{item?.quantity}  | {formatCurrency(item?.price)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>


                <View className="flex-row gap-x-2 border-b-8 border-gray-200 p-3">
                    <Icon type="feather" name="truck" />
                    <View>
                        <Text className="text-lg font-semibold leading-5">Hình thức giao hàng</Text>
                        <Text className="text-base text-gray-500 ">{order?.shippingMethod?.name}</Text>
                    </View>
                </View>

                <View className="flex-row gap-x-2 border-b-8 border-gray-200 p-3">
                    <Icon type="ionicon" name="wallet-outline" />
                    <View>
                        <Text className="text-lg font-semibold leading-5">Hình thức thanh toán</Text>
                        <Text className="text-base text-gray-500 ">{order?.paymentMethod?.name}</Text>
                    </View>
                </View>

                <View className="border-b-8 border-gray-200 p-3">
                    <View className="flex-row justify-between items-center mx-1 py-1 border-b-2 border-gray-200">
                        <Text className="text-base text-gray-500">Tạm tính</Text>
                        <Text className="text-base text-gray-700 font-semibold">{formatCurrency(order?.money?.total)}</Text>
                    </View>
                    <View className="flex-row justify-between items-center mx-1 py-1 border-b-2 border-gray-200">
                        <Text className="text-base text-gray-500">Phí vận chuyển</Text>
                        <Text className="text-base text-gray-700 font-semibold">+{formatCurrency(order?.money?.shippingPrice)}</Text>
                    </View>
                    <View className="flex-row justify-between items-center mx-1 py-1 border-b-2 border-gray-200">
                        <Text className="text-base text-gray-500">Khuyến mãi từ mã</Text>
                        <Text className="text-base text-green-600 font-semibold">-{formatCurrency(order?.money?.discount)}</Text>
                    </View>
                    <View className="flex-row justify-between items-center mx-1 py-1">
                        <Text className="text-lg text-gray-700 text-bold">Thành tiền</Text>
                        <Text className="text-lg text-red-500 font-bold">{formatCurrency(order?.money?.finalPrice)}</Text>
                    </View>
                </View>
            </ScrollView>

            <View
                className="my-5 mx-5"
            >
                <Button
                    title="Đặt hàng"
                    buttonStyle={{ backgroundColor: '#ef4444', borderRadius: 8 }}
                    onPress={handleSubmit}
                // disabled={!isValid}
                />
            </View>
        </View>


    )
}

export default OrderConfirmScreen;