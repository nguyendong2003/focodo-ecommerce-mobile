import { Icon } from "@rneui/themed";
import { View, TouchableOpacity, Text } from "react-native";

const HeaderProductDetail = ({ navigation }) => {

    return (
        <View
            className="flex-row items-center px-4 h-12 bg-white justify-between"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
        >
            <TouchableOpacity
                onPress={() => navigation.goBack()}>
                <Icon type="feather" name="chevron-left" />
            </TouchableOpacity>

            <Text className="text-gray-600 text-lg font-bold">Chi tiết sản phẩm</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}>
                <Icon type="antdesign" name="shoppingcart" />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderProductDetail;