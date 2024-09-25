import { Icon } from "@rneui/themed";
import { useState } from "react";
import { View, TouchableOpacity, Text, TextInput } from "react-native";

const ShippingInfoScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    return (
        <View className="bg-white">
            <View className="px-4 mt-2">
                <Text className="text-base text-black font-bold">Tên người nhận</Text>
                <TextInput placeholder="Nhập Họ tên" className="text-base grow shrink rounded border border-gray-500 px-3 py-1 my-1 text-black"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View className="px-4 mt-2">
                <Text className="text-base text-black font-bold">Số điện thoại</Text>
                <TextInput placeholder="Nhập Số điện thoại" className="text-base grow shrink rounded border border-gray-500 px-3 py-1 my-1 text-black"
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>
            <View className="px-4 mt-2">
                <Text className="text-base text-black font-bold">Địa chỉ nhận hàng</Text>
                <TextInput placeholder="Nhập Tòa nhà, số nhà, tên đường" className="text-base grow shrink rounded border border-gray-500 px-3 py-1 my-1 text-black"
                    value={address}
                    onChangeText={setAddress}
                />
            </View>

        </View>
    )
}

export default ShippingInfoScreen;