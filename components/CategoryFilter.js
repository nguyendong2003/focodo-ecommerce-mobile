import { Text } from "@rneui/themed"
import { StyleSheet, TouchableOpacity, View } from "react-native"


const CategoryFilter = ({ categories }) => {

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

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh mục sản phẩm</Text>
            {categoriesList.map((category, index) => (
                <TouchableOpacity activeOpacity={0.4} key={index} style={styles.categoryItem}>
                    <Text style={styles.categoryItemName}>
                        {category.categoryName}
                    </Text>

                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // padding: 16,
    },
    header: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    categoryItem: {
        // backgroundColor: 'red',
        padding: 8
    },
    categoryItemName: {
        fontSize: 16,
        fontWeight: 'normal',
        opacity: 0.7
    },
    categoryItemNameActive: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        opacity: 1
    }
})

export default CategoryFilter