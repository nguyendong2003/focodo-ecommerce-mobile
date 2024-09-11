import { Image, Text } from "@rneui/themed"
import BaseLayout from "../layout/BaseLayout";

const AboutScreen = ({ navigation }) => {
    return (
        <BaseLayout navigation={navigation}>
            <Image source={require('../assets/products/1.png')} style={{ width: 300, height: 300 }} />
        </BaseLayout>
    );
}

export default AboutScreen