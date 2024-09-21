import { Icon } from "@rneui/themed";
import { View, TouchableOpacity, Text } from "react-native";

const HeaderProductList = ({ navigation, route }) => {
    const { category, subCategory } = route.params;

    return (
        <View
            className="flex-row items-center px-2 h-16 bg-white"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
        >
            <TouchableOpacity
                className="px-1"
                onPress={() => navigation.goBack()}>
                <Icon type="antdesign" name="left" />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                className="flex-1 flex-row items-center border-gray-400 rounded-xl grow border-2 px-3 mx-1 py-2"
                onPress={() => navigation.navigate('SearchProduct')}
            >
                <Icon type="antdesign" name="search1" size={20} color="gray" />
                <Text
                    className="flex-1 mx-2 text-gray-500"
                    numberOfLines={1}
                >
                    {subCategory?.name || category?.name || 'Tìm kiếm sản phẩm'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default HeaderProductList;