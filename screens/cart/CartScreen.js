import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import BaseLayout from "../../layout/BaseLayout";
import { Divider, Icon, Image, Text } from "@rneui/themed";
import { useState } from "react";
import { Button } from "@rneui/base";

const CartScreen = ({ navigation }) => {

    //
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleInputChange = (text) => {
        const newQuantity = parseInt(text);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setQuantity(newQuantity);
        } else {
            setQuantity(1);
        }
    };

    return (
        <BaseLayout navigation={navigation}>
            <View style={styles.container}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', paddingVertical: 12 }}>Giỏ hàng</Text>

                <View style={{ marginVertical: 12 }}>
                    <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', paddingVertical: 20 }}>
                        <Image
                            source={require('../../assets/products/1.png')}
                            style={{ width: 120, height: 120, borderRadius: 12 }}
                        />
                        <View style={{ flexShrink: 1, marginLeft: 10, justifyContent: 'space-between', flexGrow: 1 }}>
                            <View style={{ height: 42 }}>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }} numberOfLines={2}>Bánh lọc Huế, Bánh lọc Huế, Bánh lọc Huế,Bánh lọc Huế</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon type="antdesign" name="minus" color="#000" onPress={handleDecrease} size={20} />
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={String(quantity)}
                                        onChangeText={handleInputChange}
                                    />
                                    <Icon type="antdesign" name="plus" color="#000" onPress={handleIncrease} size={20} />
                                </View>
                                <Icon type="antdesign" name="close" color="#000" size={24} onPress={() => alert('hello')} />
                            </View>

                            <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(10000000)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Divider width={1} />
                    <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', paddingVertical: 20 }}>
                        <Image
                            source={require('../../assets/products/2.png')}
                            style={{ width: 120, height: 120, borderRadius: 12 }}
                        />
                        <View style={{ flexShrink: 1, marginLeft: 10, justifyContent: 'space-between', flexGrow: 1 }}>
                            <View style={{ height: 42 }}>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }} numberOfLines={2}>Bánh nậm Huế</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon type="antdesign" name="minus" color="#000" onPress={handleDecrease} size={20} />
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={String(quantity)}
                                        onChangeText={handleInputChange}
                                    />
                                    <Icon type="antdesign" name="plus" color="#000" onPress={handleIncrease} size={20} />
                                </View>
                                <Icon type="antdesign" name="close" color="#000" size={24} onPress={() => alert('hello')} />
                            </View>

                            <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(900000)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Divider width={1} />
                </View>


                <Text style={{ fontSize: 24, fontWeight: 'bold', paddingVertical: 12 }}>Đơn hàng</Text>
                <View>
                    <Text style={{ fontSize: 18, paddingVertical: 12, fontStyle: 'italic' }}>Mã giảm giá</Text>
                    <TextInput placeholder="Nhập mã giảm giá" style={{ fontSize: 20, borderRadius: 12, borderColor: '#000', borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8 }} />
                    <Text style={{ fontSize: 16, paddingVertical: 8, fontStyle: 'italic', color: 'red', paddingHorizontal: 12 }}>Giảm giá 10%</Text>
                </View>

                <View style={{ paddingVertical: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Tổng</Text>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000)}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
                        <Text style={{ color: '#000', fontSize: 16 }}>Giảm giá</Text>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(10000)}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Thành tiền</Text>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(90000)}
                        </Text>
                    </View>
                </View>

                <Button title="Đặt hàng" buttonStyle={{ backgroundColor: '#000', borderRadius: 8 }} />
            </View>
        </BaseLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        paddingBottom: 60
    },
    input: {
        width: 36,
        height: 36,
        marginHorizontal: 10,
        textAlign: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },

})
export default CartScreen;