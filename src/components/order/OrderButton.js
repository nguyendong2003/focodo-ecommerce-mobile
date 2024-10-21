import { useContext, useEffect } from "react"
import { Alert, Text, TouchableOpacity } from "react-native"
import { callUpdateOrderStatus } from "../../services/api"
import { OrderContext } from "../context/OrderProvider";


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
            Alert.alert('Thông báo', 'Hủy đơn hàng thành công')
        } else {
            Alert.alert('Thông báo', 'Hủy đơn hàng thất bại. Vui lòng thử lại sau')
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

    // const handleBuyAgain = async() => {
    //     const res = await callCreateReview(reviewsArray);
    //     console.log('Response:', res);

    //     // Check if all responses have status 200 and a valid result
    //     const allSuccess = res.every(res => res.code === 0 && res.result);

    //     if (allSuccess) {
    //         Alert.alert('Thông báo', 'Thêm đánh giá thành công');
    //         setOrderContextValue((prev) => {
    //             return { ...prev, id: orderId, status: 'Đã đánh giá' }
    //         })
    //         navigation.goBack()
    //     }
    //     else {
    //         Alert.alert('Thông báo', 'Có lỗi khi thêm đánh giá');
    //     }
    //     navigation.navigate('Cart');
    // }

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
                navigation.navigate('Cart');
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