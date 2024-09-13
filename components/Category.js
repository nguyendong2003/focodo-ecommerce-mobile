import { Button, Icon, Image, Text } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";

const CategoryCard = ({ navigation, category }) => {
    const screenWidth = Dimensions.get('window').width;
    return (
        <TouchableOpacity activeOpacity={0.5}
            style={[styles.categoryCard, { width: screenWidth / 2 - 26 }]}
            onPress={() => navigation.navigate('CategoryStack', {
                screen: 'ProductList',
                params: {
                    categoryId: category.categoryId
                }
            })}

        >

            <Icon type={category.type} name={category.name} size={48} />
            <Text style={styles.categoryCardText}>{category.categoryName}</Text>
        </TouchableOpacity>
    )
}


const Category = ({ navigation }) => {

    const categoriesList = [
        { categoryId: 1, categoryName: 'Bánh Huế', type: 'material-community', name: 'muffin' },
        { categoryId: 2, categoryName: 'Kẹo Huế', type: 'font-awesome-5', name: 'candy-cane' },
        { categoryId: 3, categoryName: 'Gia vị Huế', type: 'material-community', name: 'muffin' },
        { categoryId: 4, categoryName: 'Mắm Huế', type: 'material-community', name: 'muffin' },
        { categoryId: 5, categoryName: 'Nem chả Huế', type: 'material-community', name: 'muffin' },
        { categoryId: 6, categoryName: 'Tinh dầu Huế', type: 'material-community', name: 'muffin' },
        { categoryId: 7, categoryName: 'Rượu Huế', type: 'material-community', name: 'muffin' },
        { categoryId: 8, categoryName: 'Trà Huế', type: 'material-community', name: 'muffin' },
    ];

    const categoriesList2 = [
        { categoryId: 1, categoryName: 'Bánh Huế 2', type: 'material-community', name: 'muffin' },
        { categoryId: 2, categoryName: 'Kẹo Huế 2', type: 'font-awesome-5', name: 'candy-cane' },
        { categoryId: 3, categoryName: 'Gia vị Huế 2', type: 'material-community', name: 'muffin' },
        { categoryId: 4, categoryName: 'Mắm Huế 2', type: 'material-community', name: 'muffin' },
        { categoryId: 5, categoryName: 'Nem chả Huế 2', type: 'material-community', name: 'muffin' },
        { categoryId: 6, categoryName: 'Tinh dầu Huế 2', type: 'material-community', name: 'muffin' },
        { categoryId: 7, categoryName: 'Rượu Huế 2', type: 'material-community', name: 'muffin' },
        { categoryId: 8, categoryName: 'Trà Huế 2', type: 'material-community', name: 'muffin' },
    ];

    const [categories, setCategories] = useState(categoriesList);

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.categoryHeader}>Danh mục</Text>
                <View style={styles.rightContainer}>
                    <Button type="clear" radius={"40"} onPress={() => setCategories(categoriesList)}>
                        <Icon type="antdesign" name="left" />
                    </Button>
                    <Button type="clear" radius={"40"} onPress={() => setCategories(categoriesList2)}>
                        <Icon type="antdesign" name="right" />
                    </Button>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                {categories.map((category, index) => (
                    <CategoryCard
                        navigation={navigation}
                        key={category.categoryId}
                        category={category}
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
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32
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
    categoryHeader: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'semibold'
    },
    categoryCard: {
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        padding: 20,
        marginBottom: 4,
        borderRadius: 12
    },
    categoryCardText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold'
    }

})

export default Category;