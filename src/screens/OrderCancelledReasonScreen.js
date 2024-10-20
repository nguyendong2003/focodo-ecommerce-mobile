import { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getStatusText } from "../utils/OrderUtils";
import { OrderContext } from "../components/context/OrderProvider";
import { formatDateTime } from "../utils/FormatNumber";

const OrderCancelledReasonScreen = ({ navigation, route }) => {
    const { orderContextValue, setOrderContextValue } = useContext(OrderContext);
    const { order } = route.params
    const [reason, setReason] = useState('')


    const handleCancelOrder = () => {
        setOrderContextValue((prev) => {
            return { ...prev, id: order.id, status: 'Đã hủy' }
        })
        navigation.goBack()
    }

    const confirmCancel = () =>
        Alert.alert('Xác nhận hủy đơn hàng', 'Bạn có chắc chắn muốn hủy đơn hàng này không?',
            [
                {
                    text: 'Không',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Xác nhận', onPress: handleCancelOrder },
            ],
            {
                cancelable: true,
            },
        );

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-row gap-x-2 border-b-8 border-gray-200 p-3">
                <View>
                    <Text className="text-lg font-semibold leading-5">Mã Đơn Hàng: {order?.id}</Text>
                    <Text className="text-base text-gray-500 ">Ngày Đặt: {formatDateTime(order?.orderTime)}</Text>
                    <Text className="text-base text-gray-500 font-semibold">Trạng Thái: {getStatusText(order?.status)}</Text>
                </View>
            </View>
            <View className="flex-row p-3">
                <View className="w-full">
                    <Text className="text-lg font-bold">Lý do hủy đơn hàng</Text>
                    <TextInput
                        value={reason}
                        onChangeText={setReason}
                        placeholder="Nhập lý do hủy đơn hàng"
                        className="text-base border-b-2 border-b-gray-300 focus:border-b-blue-500" />
                </View>
            </View>
            <View className="flex-row mx-3">
                <TouchableOpacity activeOpacity={0.7}
                    className={`rounded-md  border-red-500 py-2 border-2 my-4  bg-red-500 w-full ${reason === '' ? 'opacity-50' : ''}`}
                    disabled={reason === ''}
                    onPress={confirmCancel}
                >
                    <Text className="text-base text-center text-white font-bold">Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default OrderCancelledReasonScreen;