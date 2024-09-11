import { Button, Icon, Image, Text } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";

const CategoryCard = ({ type, name, title }) => {
    const screenWidth = Dimensions.get('window').width;
    return (
        <TouchableOpacity activeOpacity={0.5}
            style={[styles.categoryCard, { width: screenWidth / 2 - 26 }]}>

            <Icon type={type} name={name} size={48} />
            <Text style={styles.categoryCardText}>{title}</Text>
        </TouchableOpacity>
    )
}


const Category = () => {

    const categoriesList = [
        { type: 'material-community', name: 'muffin', title: 'Bánh Huế' },
        { type: 'font-awesome-5', name: 'candy-cane', title: 'Kẹo Huế' },
        { type: 'material-community', name: 'muffin', title: 'Gia vị Huế' },
        { type: 'material-community', name: 'muffin', title: 'Mắm Huế' },
        { type: 'material-community', name: 'muffin', title: 'Nem chả Huế' },
        { type: 'material-community', name: 'muffin', title: 'Tinh dầu Huế' },
        { type: 'material-community', name: 'muffin', title: 'Rượu Huế' },
        { type: 'material-community', name: 'muffin', title: 'Trà Huế' },
    ];

    const categoriesList2 = [
        { type: 'material-community', name: 'muffin', title: 'Bánh Huế 2' },
        { type: 'font-awesome-5', name: 'candy-cane', title: 'Kẹo Huế 2' },
        { type: 'material-community', name: 'muffin', title: 'Gia vị Huế 2' },
        { type: 'material-community', name: 'muffin', title: 'Mắm Huế 2' },
        { type: 'material-community', name: 'muffin', title: 'Nem chả Huế 2' },
        { type: 'material-community', name: 'muffin', title: 'Tinh dầu Huế 2' },
        { type: 'material-community', name: 'muffin', title: 'Rượu Huế 2' },
        { type: 'material-community', name: 'muffin', title: 'Trà Huế 2' },
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
                        key={index}
                        type={category.type}
                        name={category.name}
                        title={category.title}
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
        borderRadius: 20
    },
    categoryCardText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold'
    }

})

export default Category;