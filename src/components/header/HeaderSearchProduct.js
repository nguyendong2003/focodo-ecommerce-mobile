import { Icon } from "@rneui/themed";
import { useContext, useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { ProductContext } from "../context/ProductProvider";

const HeaderSearchProduct = ({ navigation }) => {
    const { query, setQuery } = useContext(ProductContext);

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
                onPress={() => {
                    setQuery('')
                    navigation.goBack()
                }}>
                <Icon type="antdesign" name="left" />
            </TouchableOpacity>
            <View className="flex-1 flex-row items-center border-black rounded-2xl grow border-2 px-3 mx-1 py-1">
                <TextInput
                    placeholder="Tìm kiếm sản phẩm"
                    placeholderTextColor="#999"
                    value={query}
                    onChangeText={setQuery}
                    autoFocus={true}
                    className="flex-1"
                />
                {query.length > 0 && (
                    <TouchableOpacity onPress={() => setQuery('')}>
                        <Icon type="antdesign" name="closecircle" size={20} color="gray" />
                    </TouchableOpacity>
                )}
            </View>
            <View className="px-2">
                <Icon type="antdesign" name="search1" />
            </View>
            {/* <TouchableOpacity className="px-2"
                onPress={() => {
                    if (query.length > 0) {
                        navigation.navigate('ProductList', { query })
                    }
                }
                }>
                <Icon type="antdesign" name="search1" />
            </TouchableOpacity> */}
        </View>
    );
};

export default HeaderSearchProduct;