import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ScrollView, View } from "react-native";

// https://reactnavigation.org/docs/handling-safe-area
const BaseLayout = ({ children }) => {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView
            style={{
                // Paddings to handle safe area
                // paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <Header />
            {children}
            <Footer />
        </ScrollView>
    );
}

export default BaseLayout;