import { Text, TouchableOpacity } from "react-native"


const OrderButton = ({ navigation, order }) => {
    const getButtonText = (status) => {
        switch (status) {
            case 'processing':
                return 'Hủy đơn'
            case 'shipping':
                return 'Theo dõi đơn'
            case 'finished':
                return 'Đánh giá'
            case 'cancelled':
                return 'Mua lại'
            default:
                return 'Mặc định'
        }
    }

    const optionButtonPress = (status) => {
        switch (status) {
            case 'processing':
                navigation.navigate('OrderCancelledReason', { orderId: order?.id });
                break;
            case 'shipping':
                navigation.navigate('OrderTracking', { orderId: order?.id });
                break;
            case 'finished':
                navigation.navigate('ReviewAdd', { orderId: order?.id });
                break;
            case 'cancelled':
                // call api buy again
                navigation.navigate('ProductDetail', { productId: order?.id });
                break;
            default:
                // call api buy again
                break;
        }
    }

    return (
        <TouchableOpacity activeOpacity={0.7}
            className="rounded-md  border-black py-2 grow border-2 bg-black"
            onPress={() => optionButtonPress(order?.status)}
        >
            <Text className="text-center text-white font-bold">{getButtonText(order?.status)}</Text>
        </TouchableOpacity>
    )
}

export default OrderButton