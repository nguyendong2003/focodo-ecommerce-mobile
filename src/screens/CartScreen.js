import { ScrollView, TextInput, TouchableOpacity, View, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import CartItem from "../components/cart/CartItem";
import CartDetail from "../components/cart/CartDetail";
import result from "../data/cart.json"
import { Button } from "@rneui/themed";

const CartScreen = ({ navigation }) => {
    const [cartList, setCartList] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});

    // console.log(selectedItems);

    useEffect(() => {
        // call api here
        const carts = result.cart;
        //
        const checkedItems = {}
        carts.forEach(item => {
            if (item.isChecked) {
                checkedItems[item.id] = {
                    price: item.price,
                    quantity: item.quantity
                };
            }
        });

        setCartList(carts);
        setSelectedItems(checkedItems);
    }, []);

    const handleRemoveCartItem = (id) => {
        const newCartList = cartList.filter(item => item.id !== id);
        const newSelectedItems = { ...selectedItems };
        delete newSelectedItems[id];

        setCartList(newCartList);
        setSelectedItems(newSelectedItems);
    }

    const handlePurchase = () => {
        // call api here
        console.log('ids:', Object.keys(selectedItems));
        navigation.navigate('ShippingInfo');
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View className="my-2">
                    {
                        cartList.map((item, index) => (
                            <CartItem
                                navigation={navigation}
                                key={item.id}
                                item={item}
                                selectedItems={selectedItems}
                                setSelectedItems={setSelectedItems}
                                handleRemoveCartItem={handleRemoveCartItem}

                            />
                        ))
                    }
                </View>

                <CartDetail selectedItems={selectedItems} />




            </ScrollView>

            <View className="px-4 pb-5">
                <Button
                    title="Mua hàng"
                    buttonStyle={{ backgroundColor: '#000', borderRadius: 8 }}
                    onPress={handlePurchase}
                />
            </View>
        </View>

    );
}

export default CartScreen;