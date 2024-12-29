import React from 'react';
import { Button } from '@rneui/themed';
import { View, Alert, Text } from 'react-native';
import { Field, Formik } from 'formik';
import CustomTextInput from '../custom/CustomTextInput';
import { registerValidationSchema } from '../../utils/ValidationForm';
import { callRegister } from '../../services/api';
import Toast from 'react-native-toast-message';

const RegisterForm = ({ navigation }) => {

    const handleRegister = async (values, actions) => {
        console.log(values);
        const { username, password, email, phone, fullName } = values;
        const data = {
            username,
            password,
            email,
            phone,
            full_name: fullName,
        }

        const res = await callRegister(data);
        if (res && res.result) {
            navigation.navigate('Login');
            Toast.show({
                type: 'success',
                text1: 'Đăng ký thành công',
                text2: 'Vui lòng đăng nhập để tiếp tục',
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Đăng ký thất bại',
                text2: 'Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác',
            });
        }

    };
    return (
        <View >
            <Formik
                initialValues={{ username: '', password: '', confirmPassword: '', email: '', phone: '', fullName: '' }}
                validationSchema={registerValidationSchema}
                onSubmit={handleRegister}
            // validateOnMount={true}   
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
                            placeholder="Nhập tên đăng nhập"
                            component={CustomTextInput}
                        />

                        <Text className="text-base text-black font-bold">Mật khẩu</Text>
                        <Field
                            name="password"
                            placeholder="Nhập mật khẩu"
                            secureTextEntry
                            component={CustomTextInput}
                        />

                        <Text className="text-base text-black font-bold">Xác nhận mật khẩu</Text>
                        <Field
                            name="confirmPassword"
                            placeholder="Nhập xác nhận mật khẩu"
                            secureTextEntry
                            component={CustomTextInput}
                        />

                        <Text className="text-base text-black font-bold">Email</Text>
                        <Field
                            name="email"
                            placeholder="Nhập email"
                            component={CustomTextInput}
                        />

                        <Text className="text-base text-black font-bold">Số điện thoại</Text>
                        <Field
                            name="phone"
                            placeholder="Nhập số điện thoại"
                            component={CustomTextInput}
                        />

                        <Text className="text-base text-black font-bold">Họ tên</Text>
                        <Field
                            name="fullName"
                            placeholder="Nhập họ tên"
                            component={CustomTextInput}
                        />


                        <Button
                            title="Đăng ký"
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

export default RegisterForm;
