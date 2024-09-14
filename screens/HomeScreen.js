import { View } from "react-native";
import Banner from "../components/Banner";
import BaseLayout from "../layout/BaseLayout";
import Category from "../components/Category";
import Product from "../components/Product";
import BottomBanner from "../components/BottomBanner";
import SliderProduct from "../components/SliderProduct";

const HomeScreen = ({ navigation }) => {

    return (
        <BaseLayout navigation={navigation}>
            <Banner />

            {/* <Category navigation={navigation} /> */}

            <Product navigation={navigation} />

            <SliderProduct />

            <BottomBanner />

        </BaseLayout>
    );
}

export default HomeScreen;