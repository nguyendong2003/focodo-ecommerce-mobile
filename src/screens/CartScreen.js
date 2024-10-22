import { ScrollView, TextInput, TouchableOpacity, View, Image, Text, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import CartItem from "../components/cart/CartItem";
import CartDetail from "../components/cart/CartDetail";
import result from "../data/cart.json"
import { Button, Icon } from "@rneui/themed";
import { callDeleteCart, callFetchCart } from "../services/api";

const CartScreen = ({ navigation }) => {
    const [cartList, setCartList] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [voucherId, setVoucherId] = useState(null);
    const [vouchers, setVouchers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchCart();
        setRefreshing(false);
    }

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const res = await callFetchCart();
        if (res && res.result) {
            const result = res.result;
            const carts = result.map(item => ({
                id_cart: item.id_cart,
                id_product: item.id_product,
                name: item.product_name,
                quantity: item.quantity,
                price: item.unit_price,
                originPrice: item.original_price,
                image: item.image,
                isChecked: item.check
            }));

            const checkedItems = {}
            carts.forEach(item => {
                if (item.isChecked) {
                    checkedItems[item.id_cart] = {
                        id_product: item.id_product,
                        price: item.price,
                        quantity: item.quantity,


                        image: item.image,
                        name: item.name
                    };
                }
            });

            setCartList(carts);
            setSelectedItems(checkedItems);
        }
    }

    const handleRemoveCartItem = async (cartId) => {
        const res = await callDeleteCart(cartId);
        const newCartList = cartList.filter(item => item.id_cart !== cartId);
        const newSelectedItems = { ...selectedItems };
        delete newSelectedItems[cartId];

        setCartList(newCartList);
        setSelectedItems(newSelectedItems);
    }

    const handlePurchase = () => {
        const details = Object.keys(selectedItems).map(cartId => ({
            id_cart: parseInt(cartId),
            id_product: selectedItems[cartId].id_product,
            unit_price: selectedItems[cartId].price,
            quantity: selectedItems[cartId].quantity,

            image: selectedItems[cartId].image,
            name: selectedItems[cartId].name
        }));

        const order = {}
        if (voucherId !== null) {
            order.id_voucher = voucherId
        }

        order.total_price = totalPrice;
        order.discount_price = discountPrice;
        order.final_price = finalPrice;
        order.details = details;

        navigation.navigate('ShippingInfo', {
            order
        });
    };

    return (
        <>

            {
                cartList.length === 0 ? (
                    <View className="flex-1 items-center justify-center bg-white">
                        <Icon type="material-community" name="cart-off" size={48} color="#ccc" />
                        <Text className="text-gray-500 text-lg mt-2">Giỏ hàng trống</Text>
                    </View>
                ) : (
                    <View className="flex-1 bg-white">
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={handleRefresh}
                                />
                            }
                        >
                            <View className="my-2">
                                {
                                    cartList.map((item, index) => (
                                        <CartItem
                                            navigation={navigation}
                                            key={item.id_cart}
                                            item={item}
                                            selectedItems={selectedItems}
                                            setSelectedItems={setSelectedItems}
                                            handleRemoveCartItem={handleRemoveCartItem}

                                        />
                                    ))
                                }
                            </View>

                            <CartDetail
                                selectedItems={selectedItems}

                                totalPrice={totalPrice}
                                discountPrice={discountPrice}
                                finalPrice={finalPrice}
                                voucherId={voucherId}
                                vouchers={vouchers}

                                setTotalPrice={setTotalPrice}
                                setDiscountPrice={setDiscountPrice}
                                setFinalPrice={setFinalPrice}
                                setVoucherId={setVoucherId}
                                setVouchers={setVouchers}
                            />
                        </ScrollView>

                        <View className="px-4 mb-5 mt-5 ">
                            <Button
                                title="Mua hàng"
                                buttonStyle={{ backgroundColor: '#000', borderRadius: 8 }}
                                onPress={handlePurchase}
                                disabled={Object.keys(selectedItems).length === 0}
                            />
                        </View>
                    </View>
                )
            }

        </>
    );
}

export default CartScreen;