import { Alert, Text, TextInput, View } from "react-native";
import { formatCurrency } from "../../utils/FormatNumber";
import { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { callCheckVoucher } from "../../services/api";


const CartDetail = ({ selectedItems, totalPrice, setTotalPrice, discountPrice, setDiscountPrice, finalPrice, setFinalPrice, voucherId, setVoucherId }) => {
    const [discountCode, setDiscountCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);

    useEffect(() => {
        // const total = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        let total = 0;
        Object.values(selectedItems).forEach(item => {
            total += item.price * item.quantity;
        });
        const discount = total * (discountPercent / 100);
        const final = total - discount;

        setTotalPrice(total);
        setDiscountPrice(discount);
        setFinalPrice(final);
    }, [selectedItems, discountPercent]);

    const handlePress = async () => {
        if (discountCode === '') {
            setDiscountPercent(0);
            Alert.alert('Thông báo', 'Chưa nhập mã giảm giá');
            return;
        }

        // const res = await callCheckVoucher(discountCode);
        // if (res && res.result) {
        //     const result = res.result;
        // }
        // if (discountCode === '10') {
        //     setDiscountPercent(10);
        // } else {
        //     setDiscountPercent(0);
        // }
    }

    return (
        <>
            <Text className="text-xl font-bold px-4">Đơn hàng</Text>
            <View className="px-4 flex-row shrink  justify-between items-center">
                <TextInput placeholder="Nhập mã giảm giá" className="text-base grow shrink rounded-lg border border-black px-3 py-1 my-1 text-gray-600"
                    value={discountCode}
                    onChangeText={setDiscountCode}
                />
                <View className="">

                </View>

                <Button
                    title="Áp dụng"
                    titleStyle={{ fontSize: 14, color: '#fff' }}
                    buttonStyle={{ backgroundColor: '#000', borderRadius: 8, marginLeft: 12 }}
                    onPress={handlePress}
                />
            </View>

            {discountPercent > 0 && (
                <View className="px-4">
                    <Text className="text-base text-red-500 px-3">Mã áp dụng giảm {discountPercent}%</Text>
                </View>
            )}


            <View className="px-4 py-3">
                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-500 text-base">Tạm tính</Text>
                    <Text className="text-black text-base">
                        {formatCurrency(totalPrice)}
                    </Text>
                </View>
                <View className="flex-row justify-between items-center border-b-2 border-b-gray-200">
                    <Text className="text-gray-500 text-base">Giảm giá từ mã</Text>
                    <Text className="text-green-500 text-base">
                        {formatCurrency(-discountPrice)}
                    </Text>
                </View>
                <View className="flex-row justify-between items-center py-1">
                    <Text className="text-black text-base font-bold">Tổng tiền</Text>
                    <Text className="text-red-500 text-base font-bold">
                        {formatCurrency(finalPrice)}
                    </Text>
                </View>
            </View>
        </>
    )
}

export default CartDetail;