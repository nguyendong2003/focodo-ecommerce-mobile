import { useContext, useEffect } from "react"
import { Alert, Text, TouchableOpacity } from "react-native"
import { callAddToCart, callBuyAgain, callUpdateOrderStatus } from "../../services/api"
import { OrderContext } from "../context/OrderProvider";
import Toast from "react-native-toast-message";


const OrderButton = ({ navigation, order, orderStatus }) => {
    const { orderContextValue, setOrderContextValue } = useContext(OrderContext);

    const getButtonText = (status) => {
        switch (status) {
            case 'Chưa xác nhận':
                return 'Hủy đơn'
            case 'Đã hủy':
                return 'Mua lại'
            case 'Đã xác nhận':
                return 'Theo dõi đơn hàng'
            case 'Đã giao':
                return 'Đánh giá'
            case 'Đã đánh giá':
                return 'Xem đánh giá'
            default:
                return 'Mặc định'
        }
    }

    const handleCancelOrder = async () => {
        const res = await callUpdateOrderStatus(order.id, 'Đã hủy')

        if (res && res.result) {
            setOrderContextValue((prev) => {
                return { ...prev, id: order.id, status: 'Đã hủy' }
            })
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Hủy đơn hàng thành công',
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Hủy đơn hàng thất bại. Vui lòng thử lại sau',
            });
        }

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

    const handleBuyAgain = async () => {
        const products = order.products
        let isSuccess = false;
        try {
            for (const item of products) {
                const res = await callAddToCart(item.id, item.quantity);

                if (res.status === 200) {
                    isSuccess = true;
                }
            }

            if (isSuccess) {
                navigation.navigate('Cart');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Thất bại',
                    text2: 'Có lỗi xảy ra. Vui lòng thử lại sau',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Có lỗi xảy ra. Vui lòng thử lại sau',
            });
        }
    }

    const optionButtonPress = (status) => {
        switch (status) {
            case 'Chưa xác nhận':
                confirmCancel()
                // navigation.navigate({
                //     name: 'OrderCancelledReason',
                //     params: {
                //         order: order
                //     },
                // });
                break;
            case 'Đã hủy':
                // call api buy again
                handleBuyAgain()
                break;
            case 'Đã xác nhận':
                navigation.navigate('OrderTracking', { orderId: order?.id });
                break;
            case 'Đã giao':
                navigation.navigate('ReviewAdd', { orderId: order?.id });
                break;
            case 'Đã đánh giá':
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