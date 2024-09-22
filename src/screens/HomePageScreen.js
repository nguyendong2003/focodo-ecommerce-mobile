import { FlatList, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import result from "../data/products.json"
import ProductSlider from "../components/product/ProductSlider";
import CategorySlider from "../components/category/CategorySlider";
import ProductList from "../components/product/ProductList";

const HomePageScreen = ({ navigation }) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <StatusBar barStyle="light-content" />
            <View>
                <Image source={require('../static/images/banner/1.png')}
                    className="w-full h-32"
                />
            </View>

            <View>
                <TouchableOpacity activeOpacity={0.5}>
                    <Text className="text-black text-xl font-bold p-4 bg-white">DANH MỤC SẢN PHẨM</Text>
                </TouchableOpacity>


                <FlatList
                    data={result.category}
                    renderItem={({ item }) => <CategorySlider category={item} navigation={navigation} />}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    className="mx-1"
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View>
                <TouchableOpacity activeOpacity={0.5}>
                    <Text className="text-black text-xl font-bold p-4 bg-white">SẢN PHẨM BÁN CHẠY</Text>
                </TouchableOpacity>


                <FlatList
                    data={result.products}
                    renderItem={({ item }) => <ProductSlider product={item} navigation={navigation} />}
                    keyExtractor={item => 'best_selling_products' + item.id}
                    horizontal={true}
                    className="mx-1"
                    showsHorizontalScrollIndicator={false}
                    key={'best_selling_products'}
                />
            </View>
            <View>
                <TouchableOpacity activeOpacity={0.5}>
                    <Text className="text-black text-xl font-bold p-4 bg-white">SẢN PHẨM KHUYẾN MÃI</Text>
                </TouchableOpacity>


                <FlatList
                    data={result.products}
                    renderItem={({ item }) => <ProductSlider product={item} navigation={navigation} />}
                    keyExtractor={item => 'sale_products' + item.id}
                    horizontal={true}
                    className="mx-1"
                    showsHorizontalScrollIndicator={false}
                    key={'sale_products'}
                />
            </View>

            <Text className="text-black text-xl font-bold p-4 bg-white">GỢI Ý CHO BẠN</Text>

            <ScrollView

                horizontal={true}
                scrollEnabled={false}
            >

                {/* <ProductList products={result.products} navigation={navigation} /> */}
                <ProductList products={result.products} navigation={navigation} />
            </ScrollView>
        </ScrollView>


    )
}

export default HomePageScreen;