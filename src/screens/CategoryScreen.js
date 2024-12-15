import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import CategoryList from "../components/category/CategoryList";
import { useEffect, useState } from "react";
import SubCategoryList from "../components/category/SubCategoryList";
import { callFetchCategories, callFetchSubCategoriesById } from "../services/api";

const CategoryScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);

    const fetchCategories = async () => {
        const res = await callFetchCategories();
        if (res && res.result) {
            setCategories(res.result);
            if (res.result.length > 0) {
                setSelectedCategory(res.result[0]);
            }
        }
    }

    const fetchSubCategoriesById = async (id) => {
        const res = await callFetchSubCategoriesById(id);
        if (res && res.result) {
            setSubCategories(res.result.subcategories);
        }
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchCategories();
        if (selectedCategory) {
            await fetchSubCategoriesById(selectedCategory.id);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchSubCategoriesById(selectedCategory.id);
        }
    }, [selectedCategory]);


    return (
        <View className="flex-1 flex-row gap-x-2 bg-gray-200">
            <View className="w-1/4 mt-2">
                <CategoryList
                    categories={categories}
                    setCategories={setCategories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}

                />
            </View>

            <View className="grow mt-2">
                <SubCategoryList
                    subCategories={subCategories}
                    selectedCategory={selectedCategory}
                    navigation={navigation}
                />
            </View>

        </View>
    )
}

export default CategoryScreen;