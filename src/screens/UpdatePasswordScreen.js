import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, View } from "react-native";
import { Alert } from "react-native";
import { Button } from "@rneui/themed";
import { callResetPassword, callUpdatePassword } from "../services/api";
import Toast from "react-native-toast-message";

const UpdatePasswordScreen = ({ navigation, route }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleSubmit = async () => {
        if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Vui lòng nhập đầy đủ thông tin',
            });
            return;
        }
        if (newPassword !== confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Mật khẩu mới và xác nhận mật khẩu mới không khớp',
            });
            return;
        }
        setLoading(true);
        const res = await callUpdatePassword(oldPassword, newPassword);
        setLoading(false);
        if (res.status === 200) {
            navigation.goBack();  // Chuyển về màn hình đăng nhập
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Mật khẩu đã được thay đổi',
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Mật khẩu cũ không đúng hoặc đã có lỗi xảy ra, vui lòng thử lại',
            });
        }
    };

    const validatePassword = (newPassword) => {
        // Kiểm tra độ dài mật khẩu (ví dụ ít nhất 6 ký tự)
        return newPassword.length >= 6;
    };

    useEffect(() => {
        if (oldPassword === '' || newPassword === '' || confirmPassword === '' || !validatePassword(newPassword)) {
            setIsValid(false);
        } else {
            setIsValid(newPassword === confirmPassword);
        }
    }, [oldPassword, newPassword, confirmPassword]);

    return (
        <ScrollView className='flex-1 bg-white'>
            <View className='px-6 mt-3'>
                {/* Ghi chú về điều kiện mật khẩu */}
                <Text className='text-sm text-gray-500'>* Mật khẩu phải có ít nhất 6 ký tự</Text>

                <View className={`border border-gray-500 rounded-lg px-3 py-1 mb-3 mt-1`}>
                    <TextInput
                        placeholder="Mật khẩu cũ"
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        secureTextEntry={true}
                    />
                </View>

                <View className={`border border-gray-500 rounded-lg px-3 py-1 mb-3 mt-1`}>
                    <TextInput
                        placeholder="Mật khẩu mới"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={true}
                    />
                </View>

                <View className={`border border-gray-500 rounded-lg px-3 py-1 mt-3`}>
                    <TextInput
                        placeholder="Xác nhận mật khẩu mới"
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

export default UpdatePasswordScreen;
