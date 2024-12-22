import { FlatList, Image, RefreshControl, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import result from "../data/products.json"
import ProductSlider from "../components/product/ProductSlider";
import CategorySlider from "../components/category/CategorySlider";
import { callFetchCategories, callFetchProductsBestSeller, callFetchProductsDiscount, callFetchProductsPagination } from "../services/api";
import { useContext, useEffect, useState } from "react";
import ProductListHomePage from "../components/product/ProductListHomePage";
import { AuthContext } from "../components/context/AuthProvider";

const HomePageScreen = ({ navigation, route }) => {
    const { isDeleteUserLogin } = route.params || {};
    const { logout } = useContext(AuthContext)
    const [categories, setCategories] = useState([]);
    const [productsBestSeller, setProductsBestSeller] = useState([]);
    const [productsDiscount, setProductsDiscount] = useState([]);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [totalPage, setTotalPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (isDeleteUserLogin) {
            logout();
        }
    }, [isDeleteUserLogin])

    const fetchCategories = async () => {
        const res = await callFetchCategories();
        if (res && res.result) {
            setCategories(res.result);
        }
    }

    const fetchProductsBestSeller = async () => {
        const res = await callFetchProductsBestSeller();
        if (res && res.result) {
            setProductsBestSeller(res.result);
        }
    }

    const fetchProductsDiscount = async () => {
        const res = await callFetchProductsDiscount();
        if (res && res.result) {
            setProductsDiscount(res.result);
        }
    }

    const fetchProducts = async () => {
        const res = await callFetchProductsPagination(page, size);
        if (res && res.result) {
            setProducts(res.result.data);
            setPage(res.result.pagination.current_page);
            setTotalPage(res.result.pagination.total_pages);
        }
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchCategories();
        await fetchProductsBestSeller();
        await fetchProductsDiscount();
        await fetchProducts();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchCategories();
        fetchProductsBestSeller();
        fetchProductsDiscount();
        fetchProducts();
    }, [])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
        >
            <StatusBar barStyle="light-content" />
            <View>
                <Image source={require('../static/images/banner/1.png')}
                    className="w-full h-32"
                />
            </View>

            <View>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text className="text-black text-base font-bold p-4 bg-white">DANH MỤC SẢN PHẨM</Text>
                </TouchableOpacity>


                <FlatList
                    data={categories}
                    renderItem={({ item }) => <CategorySlider category={item} navigation={navigation} />}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    className="mx-1"
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text className="text-black text-base font-bold p-4 bg-white">SẢN PHẨM BÁN CHẠY</Text>
                </TouchableOpacity>


                <FlatList
                    data={productsBestSeller}
                    renderItem={({ item }) => <ProductSlider product={item} navigation={navigation} />}
                    keyExtractor={item => 'best_selling_products' + item.id}
                    horizontal={true}
                    className="mx-1"
                    showsHorizontalScrollIndicator={false}
                    key={'best_selling_products'}
                />
            </View>
            <View>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text className="text-black text-base font-bold p-4 bg-white">SẢN PHẨM KHUYẾN MÃI</Text>
                </TouchableOpacity>


                <FlatList
                    data={productsDiscount}
                    renderItem={({ item }) => <ProductSlider product={item} navigation={navigation} />}
                    keyExtractor={item => 'sale_products' + item.id}
                    horizontal={true}
                    className="mx-1"
                    showsHorizontalScrollIndicator={false}
                    key={'sale_products'}
                />
            </View>

            <Text className="text-black text-base font-bold p-4 bg-white">GỢI Ý CHO BẠN</Text>

            <ScrollView

                horizontal={true}
                scrollEnabled={false}
            >

                <ProductListHomePage
                    navigation={navigation}
                    products={products}
                />

            </ScrollView>
        </ScrollView>


    )
}

export default HomePageScreen;