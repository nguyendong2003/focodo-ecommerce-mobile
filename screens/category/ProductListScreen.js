import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import BaseLayout from "../../layout/BaseLayout";
import { Button, CheckBox, Icon, Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import result from "../fakedata/product.json"
import { ProductList } from "../../components/Product";
import Modal from "react-native-modal";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import DropdownComponent from "../../components/Dropdown";
import CategoryFilter from "../../components/CategoryFilter";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProductListScreen = ({ navigation, route }) => {
    const [categoryId, setCategoryId] = useState(route.params.categoryId);
    const [currentPage, setCurrentPage] = useState(route.params.currentPage ? route.params.currentPage : 1);
    const [pageSize, setPageSize] = useState(route.params.pageSize ? route.params.pageSize : 8);
    const [totalPage, setTotalPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([10000, 500000]);

    const [filter, setFilter] = useState({})

    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    // Function to handle type filter
    const toggleType = (type) => {
        setSelectedTypes((prevTypes) =>
            prevTypes.includes(type)
                ? prevTypes.filter((t) => t !== type)
                : [...prevTypes, type]
        );
    };

    // call api to get product list with categoryId, currentPage, pageSize
    useEffect(() => {
        // call api here
        setProducts(result.products);
        setCategoryId(result.category.id)
        setCurrentPage(result.meta.currentPage)
        setPageSize(result.meta.pageSize);
        setTotalPage(result.meta.totalPage);

        setFilter(result.filter)
    }, [])

    //
    const [isModalFilterVisible, setModalVisible] = useState(false);

    const toggleModalFilter = () => {
        setModalVisible(!isModalFilterVisible);
    };

    //

    return (
        <BaseLayout navigation={navigation}>
            <View style={styles.container}>

                <View style={{ flexGrow: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 22 }}>
                    <Button
                        title="Lọc"
                        icon={{
                            name: 'filter-sharp',
                            type: 'ionicon',
                            size: 20,
                            color: '#000',
                        }}
                        iconRight
                        iconContainerStyle={{ marginLeft: 10 }}
                        titleStyle={{ fontWeight: '700', color: '#000' }}
                        buttonStyle={{
                            backgroundColor: '#fff',
                            borderColor: 'transparent',
                            borderColor: '#D4D4D4',
                            borderWidth: 1,
                            borderRadius: 8,
                        }}
                        containerStyle={{
                            flexGrow: 1,
                        }}

                        onPress={toggleModalFilter}
                    />
                    <View style={{ flexGrow: 1 }}>
                        <DropdownComponent />
                    </View>

                </View>
                <Modal isVisible={isModalFilterVisible}
                    onBackdropPress={() => setModalVisible(false)}
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    style={{
                        margin: 0,
                        alignItems: 'flex-end'
                    }}
                >

                    <ScrollView
                        contentContainerStyle={{
                            backgroundColor: '#fff',
                            width: screenWidth * 0.7,
                            height: screenHeight,
                            padding: 20,

                        }}

                    >

                        <View style={{ marginTop: 24 }}>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Mức giá</Text>
                            <MultiSlider
                                values={priceRange}
                                sliderLength={screenWidth * 0.6}
                                onValuesChange={(values) => setPriceRange(values)}
                                min={10000}
                                max={500000}
                                step={10000}
                                selectedStyle={{
                                    backgroundColor: '#000'

                                }}
                                unselectedStyle={{ backgroundColor: '#d3d3d3' }} // Màu của thanh ngang chưa chọn
                                markerStyle={{
                                    backgroundColor: '#000', // Màu của chấm
                                    width: 18,
                                    height: 18,
                                    borderRadius: 15,
                                    padding: 4
                                }}
                            />
                            <Text style={{ color: '#000', fontSize: 16 }}>Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[0])} - {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[1])}</Text>
                        </View>

                        <View style={{ marginTop: 24 }}>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>Loại</Text>
                            {
                                filter.types?.map((type) => (
                                    <CheckBox
                                        key={type.id}
                                        // Use ThemeProvider to make change for all checkbox
                                        iconType="material-community"
                                        checkedIcon="checkbox-marked"
                                        uncheckedIcon="checkbox-blank-outline"
                                        checkedColor="#000"
                                        containerStyle={{ padding: 0, paddingVertical: 0 }}
                                        textStyle={{ fontSize: 16, fontWeight: 'normal' }}
                                        title={type.name}
                                        //
                                        checked={selectedTypes.includes(type.id)}
                                        onPress={() => toggleType(type.id)}
                                    />
                                ))}
                        </View>

                        <View style={{ marginTop: 24 }}>
                            <CategoryFilter />
                        </View>
                    </ScrollView>
                </Modal >
                < ProductList navigation={navigation} products={products} />
            </View >
        </BaseLayout >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
    }
})

export default ProductListScreen;