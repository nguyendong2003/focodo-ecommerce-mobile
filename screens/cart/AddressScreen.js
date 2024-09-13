import { View } from "react-native";
import BaseLayout from "../../layout/BaseLayout";
import { Text } from "@rneui/themed";

const AddressScreen = ({ navigation }) => {

    return (
        <BaseLayout navigation={navigation}>
            <View style={{ height: 500, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Address Screen</Text>
            </View>
        </BaseLayout>
    );
}

export default AddressScreen;