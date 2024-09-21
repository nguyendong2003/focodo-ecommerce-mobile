import { useEffect, useRef } from "react";
import { FlatList, View, TouchableOpacity, Image, Text, Dimensions } from "react-native";


const CategoryList = ({ categories, selectedCategory, setSelectedCategory }) => {
    const flatListRef = useRef(null);

    useEffect(() => {
        if (selectedCategory) {
            const index = categories.findIndex(item => item.id === selectedCategory.id);
            if (index !== -1 && flatListRef.current) {
                flatListRef.current.scrollToIndex({ animated: true, index, viewPosition: 0 });
            }
        }
    }, [selectedCategory]);

    return (
        <FlatList
            ref={flatListRef}
            data={categories}
            renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.5}
                    onPress={() => setSelectedCategory(item)}
                    className={`items-center p-3 rounded border-l-4
                        ${item.id === selectedCategory?.id ? 'bg-white border-black' : 'bg-transparent border-transparent'}`}
                >

                    <Image source={require('../../static/images/products/1.png')}
                        className="w-12 h-12 rounded"
                    />
                    <Text className="text-slate-600 text-base leading-5 text-center mt-1" numberOfLines={3}>{item.name}</Text>

                    {/* {item.id === selectedCategory?.id && (
                        <View className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-blue-500" />
                    )} */}
                    {item.id === selectedCategory?.id && (
                        <View className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-black" />
                    )}
                </TouchableOpacity>
            )}
            keyExtractor={item => 'all_categories' + item.id}
            key={'all_categories'}
            showsVerticalScrollIndicator={false}
            // className="bg-slate-200"
            // className="bg-[#0a68ff]"
            className="bg-sky-100"

        />
    );
}

export default CategoryList;