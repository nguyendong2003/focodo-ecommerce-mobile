import { FlatList, Text, View } from "react-native";
import CategoryList from "../components/category/CategoryList";
import { useEffect, useState } from "react";
import categories from '../data/categories.json'
import subCategories from '../data/subCategories.json'
import SubCategoryList from "../components/category/SubCategoryList";

const CategoryScreen = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState(subCategories[0]);
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = subCategories.filter(sub => sub.categoryId === selectedCategory.id);
            setFilteredSubCategories(filtered);
        }
    }, [selectedCategory]);


    return (

        <View className="flex flex-row gap-x-2 bg-[#f5f5fa]">
            <View className="w-1/4 mt-2">
                <CategoryList
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}

                />
            </View>

            <View className="grow mt-2">
                <SubCategoryList
                    subCategories={filteredSubCategories}
                    selectedCategory={selectedCategory}
                    navigation={navigation}
                />
            </View>

        </View>

    )
}

export default CategoryScreen;