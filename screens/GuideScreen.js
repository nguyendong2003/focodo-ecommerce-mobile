import { View } from "react-native";
import BaseLayout from "../layout/BaseLayout";
import { Text } from "@rneui/themed";

const GuideScreen = ({ navigation }) => {

    return (
        <BaseLayout navigation={navigation}>
            <View style={{ height: 500, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Guide Screen</Text>
            </View>
        </BaseLayout>
    );
}

export default GuideScreen;