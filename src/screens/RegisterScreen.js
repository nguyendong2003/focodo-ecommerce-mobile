import { Image, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Icon } from '@rneui/themed';
import RegisterForm from '../components/form/RegisterForm';

const RegisterScreen = ({ navigation }) => {

    return (
        <View className="flex-1 bg-white p-4">
            <View className="items-center">
                <Image source={require('../static/images/banner/brand-image.png')} style={{ width: 80, height: 80 }} />
            </View>

            <RegisterForm navigation={navigation} />

            <View className="mt-5">
                <Text className="text-base text-gray-500 text-center">Hoặc tiếp tục bằng</Text>

                <TouchableOpacity activeOpacity={0.7}
                    className="flex-row items-center border-2 border-gray-300 rounded px-4 py-2 mt-2"
                >
                    <Image source={require('../static/images/logo/google-logo.png')} style={{ width: 24, height: 24 }} />
                    <Text className="text-base text-gray-700 grow text-center">Đăng nhập với Google</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7}
                    className="flex-row items-center border-2 border-gray-300 rounded px-4 py-2 mt-2"
                >
                    <Icon type='ionicon' name="logo-facebook" color={'#0866ff'} size={24} />
                    <Text className="text-base text-gray-700 grow text-center">Đăng nhập với Facebook</Text>
                </TouchableOpacity>
            </View>

            <View className="mt-4 flex-row items-center gap-x-1 justify-center">
                <Text className="text-gray-700 text-base">Bạn đã có tài khoản?</Text>
                <TouchableOpacity activeOpacity={0.5}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text className="text-blue-700 text-base">Đăng nhập</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
};

export default RegisterScreen;