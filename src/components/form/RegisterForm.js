import React from 'react';
import { Button } from '@rneui/themed';
import { View, Alert, Text } from 'react-native';
import { Field, Formik } from 'formik';
import CustomTextInput from '../custom/CustomTextInput';
import { registerValidationSchema } from '../../utils/ValidationForm';

const RegisterForm = ({ navigation }) => {

    const handleRegister = (values, actions) => {
        const { username, password } = values;
        console.log(values);

        navigation.navigate('Login');
        Alert.alert('Đăng ký thành công', 'Vui lòng đăng nhập để tiếp tục');
    };
    return (
        <View >
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={registerValidationSchema}
                onSubmit={handleRegister}
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
