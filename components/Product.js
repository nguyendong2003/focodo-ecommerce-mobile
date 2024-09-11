import { Button, Icon, Image, Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import imageMap from "./ImageMap";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const ProductList = ({ products }) => {
    return (
        <View style={styles.bottomContainer}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                />
            ))}
        </View>
    );
};

const ProductCard = ({ image, name, price }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    return (
        <TouchableOpacity activeOpacity={0.9}
            style={[styles.productCard, { width: screenWidth / 2 - 26 }]}>
            <View style={{ width: '100%', alignItems: 'flex-end' }}>
                <Button
                    type="clear"
                    icon={
                        <Icon
                            type="antdesign"
                            name={isFavorite ? "heart" : 'hearto'}
                            color={isFavorite ? 'red' : '#000'}
                            size={24}
                        />}
                    radius={40}
                    onPress={() => setIsFavorite(!isFavorite)}
                />
            </View>
            <Image source={imageMap[image]} containerStyle={styles.productCardImage} />
            <View style={{ height: 44 }}>
                <Text style={styles.productCardText} numberOfLines={2} >{name}</Text>
            </View>
            <Text style={styles.productCardPrice}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</Text>

            <Button
                title="Mua ngay"
                buttonStyle={{
                    backgroundColor: '#000',
                    borderRadius: 8,
                    marginTop: 4
                }}
            />
        </TouchableOpacity>
    )
}


const Product = () => {

    const productCallAPI = [
        { id: 1, image: '1.png', name: 'Bánh bèo Huế 123hdsafjhsfdhjads123hdsafjhsfdhjads123hdsafjhsfdhjads', price: 10000 },
        { id: 2, image: '2.png', name: 'Bánh nậm Huế', price: 30000 },
        { id: 3, image: '3.png', name: 'Bánh lọc Huế', price: 100000 },
        { id: 4, image: '4.png', name: 'Bánh xèo Huế', price: 50000 },
        { id: 5, image: '5.png', name: 'Bánh nậm Huế', price: 22000 },
        { id: 6, image: '6.png', name: 'Mè xững Huế', price: 5000 },
        { id: 7, image: '7.png', name: 'Mắm nêm Huế', price: 21000 },
        { id: 8, image: '8.png', name: 'Bánh ép Huế', price: 25000 },
    ];

    const [products, setProducts] = useState(productCallAPI);
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Bán chạy' },
        { key: 'second', title: 'Khuyến mãi' },
    ]);
    const renderScene = SceneMap({
        first: () => <ProductList products={products} />,
        second: () => <ProductList products={products} />,
    });

    useEffect(() => {
        if (index === 0) {
            setProducts(productCallAPI);
        } else {
            setProducts(productCallAPI.filter(product => product.price < 20000));
        }
    }, [index])

    return (
        <View style={styles.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: '#000', height: 2 }}
                        style={{ backgroundColor: 'white' }}
                        labelStyle={{ color: 'black' }}
                        activeColor="#000"
                        inactiveColor="#8B8B8B"
                    />
                )}
            />

            <View style={styles.bottomContainer}>
                {products.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
    },
    bottomContainer: {
        marginTop: 24,
        gap: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24
    },
    productHeader: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'heavy'
    },
    productCard: {
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        padding: 20,
        marginBottom: 4,
        borderRadius: 8
    },
    productCardText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'semibold'
    },
    productCardPrice: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    productCardImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 4
    }
})

export default Product;