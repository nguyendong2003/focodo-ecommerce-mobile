import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View } from "react-native";
import { Alert } from "react-native";
import { Button } from "@rneui/themed";
import { callResetPassword } from "../services/api";
import Toast from "react-native-toast-message";

const ForgotEnterPasswordScreen = ({ navigation, route }) => {
    const { email } = route.params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleSubmit = async () => {
        if (password === '' || confirmPassword === '') {
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Vui lòng nhập đầy đủ thông tin',
            });
            return;
        }
        if (password !== confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Mật khẩu và xác nhận mật khẩu không khớp',
            });
            return;
        }
        setLoading(true);
        const res = await callResetPassword(email, password);
        setLoading(false);
        if (res && res.result) {
            navigation.navigate('Login');  // Chuyển về màn hình đăng nhập
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Mật khẩu đã được thay đổi',
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Có lỗi xảy ra, vui lòng thử lại',
            });
        }
    };

    const validatePassword = (password) => {
        // Kiểm tra độ dài mật khẩu (ví dụ ít nhất 6 ký tự)
        return password.length >= 6;
    };

    useEffect(() => {
        if (password === '' || confirmPassword === '' || !validatePassword(password)) {
            setIsValid(false);
        } else {
            setIsValid(password === confirmPassword);
        }
    }, [password, confirmPassword]);

    return (
        <ScrollView className='flex-1 bg-white'>
            <Text className='mt-4 mx-3 font-bold text-gray-500 text-base text-center'>Nhập mật khẩu mới của bạn</Text>
            <View className='px-6 mt-3'>
                {/* Ghi chú về điều kiện mật khẩu */}
                <Text className='text-sm text-gray-500'>* Mật khẩu phải có ít nhất 6 ký tự</Text>

                <View className={`border border-gray-500 rounded-lg px-3 py-1 mb-3 mt-1`}>
                    <TextInput
                        placeholder="Mật khẩu mới"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>

                <View className={`border border-gray-500 rounded-lg px-3 py-1 mt-3`}>
                    <TextInput
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={true}
                    />
                </View>
                <Button
                    title="Đổi mật khẩu"
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

export default ForgotEnterPasswordScreen;
