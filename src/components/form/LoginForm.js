import React, { useContext } from 'react';
import { Button } from '@rneui/themed';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import { Field, Formik } from 'formik';
import CustomTextInput from '../custom/CustomTextInput';
import { loginValidationSchema } from '../../utils/ValidationForm';
import { AuthContext } from '../context/AuthProvider';
import { callFetchAccount, callLogin } from '../../services/api';
import * as SecureStore from 'expo-secure-store';

const LoginForm = ({ navigation, routeName, options }) => {
    const { userLogin, setUserLogin, login, logout } = useContext(AuthContext)

    const handleLogin = async (values, actions) => {
        const { username, password } = values;
        const res = await callLogin(username, password);

        if (res && res.result) {
            // set access_token and refresh_token to SecureStore
            const { access_token, refresh_token } = res.result;

            if (access_token && refresh_token) {
                await SecureStore.setItemAsync('token', JSON.stringify({
                    access_token,
                    refresh_token,
                }));
            }

            // fetch user info
            const response = await callFetchAccount()
            if (response && response.result) {
                const user = {
                    id: '',
                    email: '',
                    fullName: '',
                    image: '',
                    phone: '',
                    address: '',
                    province: '',
                    district: '',
                    ward: '',
                    role: '',
                    ...response.result,
                    fullName: response.result.full_name ? response.result.full_name : '',
                };
                setUserLogin(user);
            }

            //
            if (routeName) {
                navigation.navigate(routeName, options || undefined);
            } else {
                navigation.navigate('HomePage');
            }
        } else {
            Alert.alert('Đăng nhập thất bại', 'Tên đăng nhập hoặc mật khẩu không chính xác');
        }
    };

    return (
        <View >
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={handleLogin}
                validateOnMount={true}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                    setFieldValue,
                }) => (
                    <>
                        <Text className="text-base text-black font-bold">Tên đăng nhập</Text>
                        <Field
                            name="username"
                            placeholder="Tên đăng nhập"
                            component={CustomTextInput}
                        />

                        <Text className="text-base text-black font-bold">Mật khẩu</Text>
                        <Field
                            name="password"
                            placeholder="Mật khẩu"
                            secureTextEntry
                            component={CustomTextInput}
                        />

                        <TouchableOpacity activeOpacity={0.7}>
                            <Text className="text-sm text-blue-700 text-right">Quên mật khẩu?</Text>
                        </TouchableOpacity>

                        <Button
                            title="Đăng nhập"
                            buttonStyle={{ backgroundColor: '#000', borderRadius: 8, marginTop: 12 }}
                            disabled={!isValid}
                            onPress={handleSubmit}
                        />
                    </>
                )}
            </Formik>
        </View>
    );
};

export default LoginForm;
