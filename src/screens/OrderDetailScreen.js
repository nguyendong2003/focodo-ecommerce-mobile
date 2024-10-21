import { Icon } from "@rneui/themed";
import { Dimensions, Image, ScrollView, TouchableOpacity, Text, View } from "react-native";
import { formatCurrency, formatDateTime } from "../utils/FormatNumber";
import { useEffect, useState, useContext } from "react";
import orderDetail from '../data/orderDetail.json'
import OrderButton from "../components/order/OrderButton";
import { convertOrder, convertOrders, getStatusText } from "../utils/OrderUtils";
import { OrderContext } from "../components/context/OrderProvider";
import { callFetchOrderById } from "../services/api";
import { getPaymentMethodText } from "../utils/PaymentUtils";

const screenWidth = Dimensions.get('window').width;

const OrderDetailScreen = ({ navigation, route }) => {
    const { orderContextValue, setOrderContextValue } = useContext(OrderContext);
    const { orderId } = route.params
    const [order, setOrder] = useState({})
    const [orderStatus, setOrderStatus] = useState(null);

    const fetchOrderById = async (orderId) => {
        const res = await callFetchOrderById(orderId);
        if (res && res.result) {
            const data = convertOrder(res.result);
            setOrder(data)
            setOrderStatus(data.review_check ? 'Đã đánh giá' : data.order_status)
        }
    }

    useEffect(() => {
        fetchOrderById(orderId)
    }, [orderId])

    useEffect(() => {
        setOrderStatus(order?.review_check ? 'Đã đánh giá' : order?.order_status);
    }, [order]);

    useEffect(() => {
        if (orderContextValue?.id === orderId) {
            setOrderStatus(orderContextValue?.status)
        }
    }, [orderContextValue])


    return (
        <View className="flex-1 bg-white">
            <ScrollView className="flex-1 bg-white"
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row gap-x-2 border-b-8 border-gray-200 p-3">
                    <Icon type="ionicon" name="document-text-outline" />
                    <View>
                        <Text className="text-lg font-semibold leading-5">Mã Đơn Hàng: {order?.id}</Text>
                        <Text className="text-base text-gray-500 ">Ngày Đặt: {formatDateTime(order?.order_date)}</Text>
                        <Text className="text-base text-gray-500 font-semibold">Trạng Thái: {getStatusText(orderStatus)}</Text>
                    </View>
                </View>
                <View className="flex-row gap-x-2 border-b-8 border-gray-200 p-3">
                    <Icon type="ionicon" name="location-outline" />
                    <View className="shrink">
                        <Text className="text-lg font-semibold leading-5">Địa chỉ người nhận</Text>
                        <Text className="text-base text-gray-700">{order.customer?.full_name}</Text>
                        <Text className="text-base text-gray-500">{order.customer?.phone}</Text>
                        <Text className="text-base text-gray-500 leading-5">{order.customer?.address}</Text>
                    </View>
                </View>

                <View className="border-b-8 border-gray-200">
                    <Text className="mx-3 py-2 border-b-2 border-b-gray-200 text-gray-500 font-bold text-base"
                        style={{ borderBottomWidth: 1 }}>Danh sách sản phẩm</Text>
                    {
                        order?.order_details?.map((item, index) => (
                            <TouchableOpacity
                                key={item.id_order_detail}
                                activeOpacity={0.7}
                                className="p-2 px-3 border-b-2 border-b-gray-100"
                                onPress={() => navigation.navigate('ProductDetail', { productId: item.product?.id })}
                            >
                                <View className="flex-row items-center gap-x-2">
                                    <Image source={{ uri: item.product?.image }} className="w-16 h-16 rounded-lg" />
                                    <View className="shrink h-full w-full ">
                                        <Text className="text-base text-gray-600 font-semibold leading-5" numberOfLines={2}>{item.product?.name}</Text>
                                        <Text className="text-sm text-gray-500 leading-6" numberOfLines={1}>x{item?.quantity}  | {formatCurrency(item?.unit_price)}</Text>
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
                        <Text className="text-base text-gray-500 ">Giao hàng tiết kiệm</Text>
                        {/* <Text className="text-base text-gray-500 ">{order?.shippingMethod?.name}</Text> */}
                    </View>
                </View>

                <View className="flex-row gap-x-2 border-b-8 border-gray-200 p-3">
                    <Icon type="ionicon" name="wallet-outline" />
                    <View>
                        <Text className="text-lg font-semibold leading-5">Hình thức thanh toán</Text>
                        <Text className="text-base text-gray-500 ">{getPaymentMethodText(order?.payment_method)}</Text>
                    </View>
                </View>

                <View className="border-b-8 border-gray-200 p-3">
                    <View className="flex-row justify-between items-center mx-1 py-1 border-b-2 border-gray-200">
                        <Text className="text-base text-gray-500">Tạm tính</Text>
                        <Text className="text-base text-gray-700 font-semibold">{formatCurrency(order?.total_price)}</Text>
                    </View>
                    <View className="flex-row justify-between items-center mx-1 py-1 border-b-2 border-gray-200">
                        <Text className="text-base text-gray-500">Phí vận chuyển</Text>
                        <Text className="text-base text-gray-700 font-semibold">+{formatCurrency(order?.shipping_price)}</Text>
                    </View>
                    <View className="flex-row justify-between items-center mx-1 py-1 border-b-2 border-gray-200">
                        <Text className="text-base text-gray-500">Khuyến mãi từ mã</Text>
                        <Text className="text-base text-gray-700 font-semibold">-{formatCurrency(order?.discount_price)}</Text>
                    </View>
                    <View className="flex-row justify-between items-center mx-1 py-1">
                        <Text className="text-lg text-gray-700 text-bold">Thành tiền</Text>
                        <Text className="text-lg text-gray-700 font-bold">{formatCurrency(order?.final_price)}</Text>
                    </View>
                </View>
            </ScrollView>

            <View>
                {
                    orderStatus !== 'Đã xác nhận' ? (
                        <View className="flex-row justify-between items-center py-4 mx-3">
                            <TouchableOpacity activeOpacity={0.7}
                                className="rounded-md  border-black py-2 border-2"
                                style={{ width: screenWidth / 2 - 16 }}
                                onPress={() => navigation.navigate('OrderTracking', { orderId: order?.id_order })}
                            >
                                <Text className="text-center text-black font-bold">Theo dõi đơn hàng</Text>
                            </TouchableOpacity>
                            <View style={{ width: screenWidth / 2 - 16 }}>
                                <OrderButton
                                    navigation={navigation}
                                    order={order}
                                    orderStatus={orderStatus}
                                />
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity activeOpacity={0.7}
                            className="rounded-md  border-black py-2 border-2 my-4 mx-3 bg-black"
                            onPress={() => navigation.navigate('OrderTracking', { orderId: order?.id_order })}
                        >
                            <Text className="text-center text-white font-bold">Theo dõi đơn hàng</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>

    )
}

export default OrderDetailScreen;