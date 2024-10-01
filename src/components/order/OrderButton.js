import { Text, TouchableOpacity } from "react-native"


const OrderButton = ({ navigation, order }) => {
    const getButtonText = (status) => {
        switch (status) {
            case 'process':
                return 'Hủy đơn'
            case 'shipping':
                return 'Đã nhận được hàng'
            case 'finish':
                return 'Đánh giá'
            case 'cancel':
                return 'Mua lại'
            default:
                return 'Mua lại'
        }
    }

    const optionButtonPress = (status) => {
        switch (status) {
            case 'process':
                navigation.navigate('OrderDetail', { orderId: order?.id });
                break;
            case 'shipping':
                // call api cancel order
                break;
            case 'finish':
                navigation.navigate('ReviewAdd', { orderId: order?.id });
                break;
            case 'cancel':
                // call api buy again
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