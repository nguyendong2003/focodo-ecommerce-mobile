import { Alert, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { formatCurrency } from "../../utils/FormatNumber";
import { useEffect, useState } from "react";
import { Button, Icon } from "@rneui/themed";
import { callCheckVoucher } from "../../services/api";


const CartDetail = ({
    selectedItems, totalPrice, discountPrice, finalPrice, voucherId, vouchers,
    setDiscountPrice, setFinalPrice, setTotalPrice, setVoucherId, setVouchers }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [discountCode, setDiscountCode] = useState('');

    const handleChange = async () => {
        let total = 0;
        Object.values(selectedItems).forEach(item => {
            total += item.price * item.quantity;
        });
        let discount = 0
        let final = total - discount;
        const voucher = vouchers.find(voucher => voucher.id_voucher === voucherId);
        if (voucher) {
            const res = await callCheckVoucher(voucher.id_voucher, total);
            if (res.result === true) {
                discount = total >= voucher.min_total ? voucher.discount_price : 0;
                final = total - discount;
            } else {
                setVoucherId(null);
            }
        }
        setTotalPrice(total);
        setDiscountPrice(discount);
        setFinalPrice(final);
    }

    useEffect(() => {
        handleChange()
    }, [selectedItems, voucherId]);

    const handlePress = async () => {
        if (discountCode === '') {
            Alert.alert('Thông báo', 'Chưa nhập mã giảm giá');
            return;
        }

        const voucher = vouchers.find(voucher => voucher.id_voucher === discountCode);
        if (voucher) {
            const res = await callCheckVoucher(voucher.id_voucher, totalPrice);

            if (res.result === true) {
                setVoucherId(voucher.id_voucher);
                setDiscountCode('');
                return;
            } else {
                Alert.alert('Thông báo', 'Mã giảm giá không còn hiệu lực hoặc không đủ điều kiện');
                return;
            }
        } else {
            Alert.alert('Thông báo', 'Mã giảm giá không tồn tại');
            return;
        }

    }

    const handleSelectVoucher = async (id) => {
        const res = await callCheckVoucher(id, totalPrice);
        if (res.result === true) {
            setVoucherId(id);
        } else {
            Alert.alert('Thông báo', 'Mã giảm giá không còn hiệu lực hoặc không đủ điều kiện');
        }
        setModalVisible(false);
    };

    return (
        <>
            <View className='flex-row items-center gap-x-4 px-4'>
                <Text className="text-xl font-bold">Đơn hàng</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setModalVisible(true)}
                >
                    <Icon type="material" name="discount" size={28} color={'#3b82f6'} />

                </TouchableOpacity>
            </View>
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

            {voucherId && (
                <View className="px-2 flex-row">
                    <Text className="text-base text-green-500 px-3">Mã {voucherId} giảm {discountPrice}đ</Text>
                    <TouchableOpacity activeOpacity={0.7}
                        onPress={() => setVoucherId(null)}
                    >
                        <Icon type="font-awesome" name="times" size={24} color={'#ef4444'} />
                    </TouchableOpacity>
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-gray-100 bg-opacity-50">
                    <View className="bg-white w-full h-full rounded-lg">
                        <FlatList
                            data={vouchers}
                            keyExtractor={(item, index) => `${item.id_voucher}-${index}`}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className='border-2 border-gray-200 rounded-lg p-2 mx-3 my-1'
                                    activeOpacity={0.7}
                                    onPress={() => handleSelectVoucher(item.id_voucher)}
                                >
                                    <View className='flex-row items-center'>
                                        <Icon type="material" name="discount" size={36} color={'#3b82f6'} />
                                        <View className='ml-1'>
                                            <Text className="text-base font-bold">{item.id_voucher}</Text>
                                            <Text className='text-gray-500'>HSD: {item.end_date}</Text>
                                        </View>
                                    </View>

                                    <View className='mt-1'>
                                        <Text className="text-base text-black">- Giảm {item.discount_price} giá trị đơn hàng</Text>
                                        {
                                            item.min_total && (
                                                <Text className="text-base text-black">- Mua tối thiểu {item.min_total}</Text>
                                            )
                                        }
                                    </View>
                                </TouchableOpacity>
                            )}
                            ListHeaderComponent={() => (
                                <TouchableOpacity
                                    className=" bg-gray-200 rounded-lg py-4"
                                    activeOpacity={0.7}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text className="text-lg text-gray-500 font-bold text-center">Hủy chọn mã giảm giá</Text>
                                </TouchableOpacity>
                            )}
                            stickyHeaderIndices={[0]}

                        />

                    </View>
                </View>
            </Modal>
        </>
    )
}

export default CartDetail;