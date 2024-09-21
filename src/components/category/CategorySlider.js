import { Image, Text, TouchableOpacity, View } from "react-native"

const CategorySlider = ({ category, navigation }) => {
    return (
        <TouchableOpacity activeOpacity={0.5}
            className="w-20 px-2 items-center bg-white"
            onPress={() => navigation.navigate('ProductList', { category })}
        >
            <Image source={require('../../static/images/products/1.png')}
                className="w-12 h-12 rounded-full"
            />
            <Text className="text-slate-600" numberOfLines={2}>{category.name}</Text>
        </TouchableOpacity>
    )
}

export default CategorySlider;