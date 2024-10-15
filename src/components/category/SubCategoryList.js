import { FlatList, View, TouchableOpacity, Image, Text, Dimensions, TouchableHighlight } from "react-native";

const dimensionWidth = Dimensions.get('window').width;

const SubCategoryList = ({ subCategories, selectedCategory, navigation }) => {
    return (

        <FlatList
            data={subCategories}
            renderItem={({ item }) => (
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#ccc"
                    style={{ width: dimensionWidth / 4 - 12 }}
                    className="items-center rounded mx-1 py-2"
                    onPress={() => navigation.navigate('ProductList', {
                        category: item
                    })}


                >
                    <View>
                        <Image
                            source={{ uri: item.image }}
                            // source={require('../../static/images/products/1.png')}
                            className="w-20 h-20 rounded"
                        />
                        <Text className="text-slate-600 text-center" numberOfLines={3}>{item.name}</Text>
                    </View>

                </TouchableHighlight>
            )}
            ListHeaderComponent={() => (
                <View className="flex-row items-center p-2 bg-white mt-2 border-b-2 border-gray-200 gap-x-4">
                    <Text className="text-lg  text-black font-bold">Loại</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate('ProductList', {
                            category: selectedCategory
                        })}>

                        {subCategories.length > 0 && <Text className="text-base  text-blue-500 font-bold">Xem tất cả ({subCategories.length})</Text>}

                    </TouchableOpacity>
                </View>
            )}
            ListEmptyComponent={() => (
                <Text className="text-lg p-2 text-gray-500 bg-white mt-2">Trống</Text>
            )}
            keyExtractor={item => 'all_subCategories' + item.id}
            numColumns={3}
            key={'all_subCategories'}
            showsVerticalScrollIndicator={false}
            className="bg-white"

        />
    )
}

export default SubCategoryList;