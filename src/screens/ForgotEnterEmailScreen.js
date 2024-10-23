import { useEffect, useState } from "react";
import { callVerifyEmail } from "../services/api";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View } from "react-native";
import { Alert } from "react-native";
import { Button } from "@rneui/themed";


const ForgotEnterEmailScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleSubmit = async () => {
        if (email === '') {
            Alert.alert('Lỗi', 'Vui lòng nhập email');
            return;
        }
        setLoading(true);
        const res = await callVerifyEmail(email);
        setLoading(false);
        if (res && res.result) {
            navigation.navigate('ForgotEnterOTP', { email });
        } else {
            Alert.alert('Lỗi', 'Email không tồn tại');
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    useEffect(() => {
        if (email === '' || !validateEmail(email)) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [email]);

    return (
        <ScrollView className='flex-1 bg-white'>
            <Text className='mt-4 mx-3 font-bold text-gray-500 text-base text-center'>Nhập email của bạn để lấy lại mật khẩu</Text>
            <View className='px-6 mt-3'>
                <View className={`border border-gray-500 rounded-lg px-3 py-1`}>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <Button
                    title="Gửi email"
                    buttonStyle={{ backgroundColor: '#000', borderRadius: 8, marginTop: 12 }}
                    onPress={handleSubmit}
                    disabled={!isValid}
                />
            </View>

            <Modal
                transparent={true}
                visible={loading}
                animationType="none"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </Modal>
        </ScrollView>
    );
}

export default ForgotEnterEmailScreen;