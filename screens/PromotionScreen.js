import BaseLayout from '../layout/BaseLayout';
import { Image } from '@rneui/themed';

const PromotionScreen = ({ navigation }) => {
    return (
        <BaseLayout navigation={navigation}>
            <Image source={require('../assets/products/1.png')} style={{ width: 300, height: 300 }} />
        </BaseLayout>
    );
};

export default PromotionScreen;