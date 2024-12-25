import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native"
import { formatCurrency, formatDateTime } from "../../utils/FormatNumber"
import { getStatusText } from "../../utils/OrderUtils"
import { memo, useContext, useEffect, useRef, useState } from "react";
import OrderButton from "./OrderButton"
import { OrderContext } from "../context/OrderProvider";
import { Icon } from "@rneui/themed";

const screenWidth = Dimensions.get('window').width;

const OrderCard = ({ navigation, order }) => {
    const { orderContextValue, setOrderContextValue } = useContext(OrderContext);
    const [orderStatus, setOrderStatus] = useState(order?.isReviewed ? 'Đã đánh giá' : order?.status);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // Set to false after the first render
            return; // Exit the effect early on the first render
        }

        if (orderContextValue?.id === order?.id) {
            setOrderStatus(orderContextValue?.status)
        }
    }, [orderContextValue])

    useEffect(() => {
        setOrderStatus(order?.isReviewed ? 'Đã đánh giá' : order?.status);
    }, [order]);

    return (
        <>
            <Text className="mx-2 py-2 border-b-2 border-b-gray-200 text-gray-500 font-bold text-base"
                style={{ borderBottomWidth: 1 }}>{getStatusText(orderStatus)}</Text>

            <TouchableOpacity activeOpacity={0.7}
                className="p-2"
                onPress={() => navigation.navigate('OrderDetail', { orderId: order?.id })}
            >
                <View className="flex-row items-center gap-x-2">
                    <Image source={{ uri: order?.image }} className="w-24 h-24 rounded-lg" />
                    <View className="shrink h-full w-full ">
                        <Text className="text-base text-gray-600 font-semibold leading-5" numberOfLines={2}>{order?.title}</Text>
                        <Text className="text-sm text-gray-500 leading-6" numberOfLines={1}>{formatDateTime(order?.orderTime)}</Text>
                        <Text className="text-sm text-gray-500 leading-6 font-bold" numberOfLines={1}>{formatCurrency(order?.finalPrice)}</Text>
                        {
                            orderStatus === 'Đã đánh giá' && (
                                <View className="flex-row items-center gap-x-1">
                                    <Icon type="antdesign" name="checkcircle" color={'#22c55e'} size={18} />
                                    <Text className="text-base text-green-500 leading-6 font-bold" numberOfLines={1}>Đã đánh giá</Text>
                                </View>
                            )
                        }
                    </View>
                </View>


                <View className="flex-row justify-between items-center mt-4 mb-1 gap-x-2">
                    <TouchableOpacity activeOpacity={0.7}
                        className="rounded-md  border-black py-2 border-2 flex-1"
                        // style={{ width: screenWidth / 2 - 12 }}
                        onPress={() => navigation.navigate('OrderDetail', { orderId: order?.id })}
                    >
                        <Text className="text-center text-black font-bold">Xem chi tiết</Text>
                    </TouchableOpacity>

                    <View
                        // style={{ width: screenWidth / 2 - 12 }}
                        className={`flex-1 
                            ${orderStatus === 'Đã xác nhận' ? 'hidden' : 'block'}
                            `}
                    >
                        <OrderButton
                            navigation={navigation}
                            order={order}
                            orderStatus={orderStatus}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </>

    )
}

export default memo(OrderCard)