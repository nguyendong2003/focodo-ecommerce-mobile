import { Icon } from "@rneui/themed";
import { View, TouchableOpacity, Text } from "react-native";

const HeaderProductDescription = ({ navigation }) => {

    return (
        <View
            className="flex-row items-center px-4 h-12 bg-white"
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

            <Text className="text-gray-600 text-lg font-bold mx-20">Mô tả sản phẩm</Text>

            {/* <TouchableOpacity
                // className="px-2"
                onPress={() => navigation.navigate('Cart')}>
                <Icon type="antdesign" name="shoppingcart" />
            </TouchableOpacity> */}
        </View>
    )
}

export default HeaderProductDescription;