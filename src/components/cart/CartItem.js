import { CheckBox, Divider, Icon } from "@rneui/themed";
import { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View, TextInput } from "react-native";
import { formatCurrency } from "../../utils/FormatNumber";
import Dialog from "react-native-dialog";

const CartItem = ({
    item,
    setSelectedItems,
    handleRemoveCartItem
}) => {
    const [visible, setVisible] = useState(false);
    const { id, price } = item;
    const [quantity, setQuantity] = useState(item.quantity);
    const [isChecked, setIsChecked] = useState(item.isChecked);

    useEffect(() => {
        if (isChecked) {
            setSelectedItems(prev => ({
                ...prev,
                [id]: { price, quantity }
            }));
        } else {
            setSelectedItems(prev => {
                const newSelectedItems = { ...prev };
                delete newSelectedItems[id];
                return newSelectedItems;
            })
        }
    }, [isChecked]);

    useEffect(() => {
        if (isChecked) {
            setSelectedItems(prev => ({
                ...prev,
                [id]: { price, quantity }
            }));
        }
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
            <TouchableOpacity activeOpacity={0.5} className="flex-row p-4 pl-0 items-center border-b-2 border-gray-100">
                <CheckBox
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="#000"
                    size={28}
                    containerStyle={{ padding: 0, marginHorizontal: 0 }}
                    checked={isChecked}
                    onPress={() => setIsChecked(!isChecked)}

                />
                <Image
                    source={require('../../static/images/products/1.png')}
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
                        <Text className="text-gray-500 text-sm line-through">
                            {formatCurrency(item?.originPrice)}
                        </Text>
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
                <Dialog.Button label="Xóa" onPress={() => handleRemoveCartItem(id)} />
            </Dialog.Container>
        </View>
    )

}

export default CartItem;