import { useEffect } from "react"
import { Text, TouchableOpacity } from "react-native"


const OrderButton = ({ navigation, order, orderStatus }) => {
    const getButtonText = (status) => {
        switch (status) {
            case 'processing':
                return 'Hủy đơn'
            case 'cancelled':
                return 'Mua lại'
            case 'shipping':
                return 'Theo dõi đơn hàng'
            case 'finished':
                return 'Đánh giá'
            case 'reviewed':
                return 'Xem đánh giá'
            default:
                return 'Mặc định'
        }
    }

    const optionButtonPress = (status) => {
        switch (status) {
            case 'processing':
                navigation.navigate({
                    name: 'OrderCancelledReason',
                    params: {
                        orderId: order?.id,
                    },
                });
                break;
            case 'cancelled':
                // call api buy again
                navigation.navigate('Cart');
                break;
            case 'shipping':
                navigation.navigate('OrderTracking', { orderId: order?.id });
                break;
            case 'finished':
                navigation.navigate('ReviewAdd', { orderId: order?.id });
                break;
            case 'reviewed':
                navigation.navigate('ReviewOrder', { orderId: order?.id });
                break;
            default:
                // call api buy again
                break;
        }
    }

    return (
        <TouchableOpacity activeOpacity={0.7}
            className="rounded-md  border-black py-2 border-2 bg-black"
            onPress={() => optionButtonPress(orderStatus)}
        >
            <Text className="text-center text-white font-bold">{getButtonText(orderStatus)}</Text>
        </TouchableOpacity>
    )
}

export default OrderButton