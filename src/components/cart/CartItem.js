import { CheckBox, Divider, Icon } from "@rneui/themed";
import { useState, useEffect, useRef } from "react";
import { Image, Text, TouchableOpacity, View, TextInput } from "react-native";
import { formatCurrency } from "../../utils/FormatNumber";
import Dialog from "react-native-dialog";
import { callUpdateCheckCart, callUpdateQuantityCart } from "../../services/api";

const CartItem = ({
    navigation,
    item,
    setSelectedItems,
    handleRemoveCartItem
}) => {
    const [visible, setVisible] = useState(false);
    const { id_cart, id_product, price, image, name } = item;
    const [quantity, setQuantity] = useState(item.quantity);
    const [isChecked, setIsChecked] = useState(item.isChecked);
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            // isMounted.current = true;
            return;
        }

        const handleCheckCartItem = async () => {
            await callUpdateCheckCart(id_cart);

            if (isChecked) {
                // Call API to update
                setSelectedItems(prev => ({
                    ...prev,
                    [id_cart]: { id_product, price, quantity, image, name }
                }));
            } else {
                setSelectedItems(prev => {
                    const newSelectedItems = { ...prev };
                    delete newSelectedItems[id_cart];
                    return newSelectedItems;
                });
            }
        };

        const timerId = setTimeout(handleCheckCartItem, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [isChecked]);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const updateQuantity = async () => {
            if (isChecked) {
                setSelectedItems(prev => ({
                    ...prev,
                    [id_cart]: { id_product, price, quantity, image, name }
                }));
            }
            // Call API to update quantity
            await callUpdateQuantityCart(id_cart, quantity);
        };

        const timerId = setTimeout(updateQuantity, 500);

        return () => {
            clearTimeout(timerId);
        };

    }, [quantity]);

    const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
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
        <View>
            <TouchableOpacity activeOpacity={0.7} className="flex-row p-2 pl-0 items-center border-b-2 border-gray-100"
                onPress={() => navigation.navigate('ProductDetail', { productId: id_product })}
            >
                <CheckBox
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="#000"
                    size={24}
                    containerStyle={{ padding: 0, marginHorizontal: 0 }}
                    checked={isChecked}
                    onPress={() => setIsChecked(!isChecked)}

                />
                <Image
                    source={{ uri: item?.image }}
                    className="w-20 h-20 rounded-lg"
                />
                <View className="shrink ml-2 justify-between">
                    <View className="h-10">
                        <Text className="text-black text-sm font-bold leading-5" numberOfLines={2}>{item?.name}</Text>
                    </View>

                    <View className="flex-row items-center gap-x-3">
                        <Text className="text-red-500 text-base font-bold">
                            {formatCurrency(item?.price)}
                        </Text>
                        {
                            item?.originPrice !== item?.price && (
                                <Text className="text-gray-500 text-sm line-through">
                                    {formatCurrency(item?.originPrice)}
                                </Text>
                            )
                        }
                    </View>


                    <View className="flex-row items-center justify-between w-full">
                        <View className="flex-row items-center">
                            <TouchableOpacity activeOpacity={0.5} className="border-gray-300 rounded w-6 h-6 items-center" style={{ borderWidth: 1 }}>
                                <Icon type="antdesign" name="minus" color="#000" onPress={handleDecrease} size={20} />
                            </TouchableOpacity>
                            <TextInput
                                className="w-8 h-6 text-center border border-gray-300 rounded"
                                keyboardType="numeric"
                                value={String(quantity)}
                                onChangeText={handleInputChange}
                            />
                            <TouchableOpacity activeOpacity={0.5} className="border-gray-300 rounded w-6 h-6 items-center" style={{ borderWidth: 1 }}>
                                <Icon type="antdesign" name="plus" color="#000" onPress={handleIncrease} size={20} />
                            </TouchableOpacity>
                        </View>
                        <Icon type="antdesign" name="close" color="#000" size={20}
                            onPress={() => {
                                setVisible(!visible)
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>

            <Dialog.Container visible={visible}>
                <Dialog.Title>Xác nhận xóa</Dialog.Title>
                <Dialog.Description>
                    Bạn có muốn xóa sản phẩm đang chọn
                </Dialog.Description>
                <Dialog.Button label="Không" onPress={() => setVisible(!visible)} />
                <Dialog.Button label="Xóa" onPress={() => handleRemoveCartItem(id_cart)} />
            </Dialog.Container>
        </View>
    )

}

export default CartItem;