import { ScrollView, TextInput, TouchableOpacity, View, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import CartItem from "../components/cart/CartItem";
import CartDetail from "../components/cart/CartDetail";
import result from "../data/cart.json"
import { Button } from "@rneui/themed";

const CartScreen = ({ navigation }) => {
    const [cartList, setCartList] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    // console.log(selectedItems);

    useEffect(() => {
        // call api here
        const carts = result.cart;
        //
        const checkedCartItems = carts
            .filter(item => item.isChecked)
            .map(item => ({ id: item.id, price: item.price, quantity: item.quantity }));

        setCartList(carts);
        setSelectedItems(checkedCartItems);
    }, []);

    const handleRemoveCartItem = (id) => {
        const newCartList = cartList.filter(item => item.id !== id);
        const newSelectedItems = selectedItems.filter(item => item.id !== id);

        setCartList(newCartList);
        setSelectedItems(newSelectedItems);
    }

    const handlePurchase = () => {
        // call api here
        const ids = selectedItems.map(item => item.id);
        console.log('ids:', ids);
    };

    return (
        <ScrollView className="flex-1 bg-white"
            showsVerticalScrollIndicator={false}
        >
            <View className="my-2">
                {
                    cartList.map((item, index) => (
                        <CartItem
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

            <View className="px-4 pb-5">
                <Button
                    title="Mua hàng"
                    buttonStyle={{ backgroundColor: '#000', borderRadius: 8 }}
                    onPress={handlePurchase}
                />
            </View>


        </ScrollView>
    );
}

export default CartScreen;