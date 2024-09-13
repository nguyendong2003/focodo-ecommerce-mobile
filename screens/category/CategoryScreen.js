import BaseLayout from "../../layout/BaseLayout";
import Category from "../../components/Category";

const CategoryScreen = ({ navigation }) => {

    return (
        <BaseLayout navigation={navigation}>
            <Category navigation={navigation} />
        </BaseLayout>
    );
}

export default CategoryScreen;