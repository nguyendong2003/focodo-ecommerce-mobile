import { Icon } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import ForgotEnterEmailScreen from "../../screens/ForgotEnterEmailScreen";
import ForgotEnterOTPScreen from "../../screens/ForgotEnterOTPScreen";
import ForgotEnterPasswordScreen from "../../screens/ForgotEnterPasswordScreen";

const AuthStackRoutes = [
    {
        name: 'Login',
        component: LoginScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Đăng nhập',
            headerTitleAlign: 'center',
            headerStyle: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        className="px-4"
                        onPress={() => navigation.goBack()}>
                        <Icon type="feather" name="chevron-left" />
                    </TouchableOpacity>
                )
            }
        })
    },
    {
        name: 'Register',
        component: RegisterScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Đăng ký',
            headerTitleAlign: 'center',
            headerStyle: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        className="px-4"
                        onPress={() => navigation.goBack()}>
                        <Icon type="feather" name="chevron-left" />
                    </TouchableOpacity>
                )
            }
        })
    },
    {
        name: 'ForgotEnterEmail',
        component: ForgotEnterEmailScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Quên mật khẩu',
            headerTitleAlign: 'center',
            headerStyle: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        className="px-4"
                        onPress={() => navigation.goBack()}>
                        <Icon type="feather" name="chevron-left" />
                    </TouchableOpacity>
                )
            }
        })
    },
    {
        name: 'ForgotEnterOTP',
        component: ForgotEnterOTPScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Quên mật khẩu',
            headerTitleAlign: 'center',
            headerStyle: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        className="px-4"
                        onPress={() => navigation.goBack()}>
                        <Icon type="feather" name="chevron-left" />
                    </TouchableOpacity>
                )
            }
        })
    },
    {
        name: 'ForgotEnterPassword',
        component: ForgotEnterPasswordScreen,
        options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Quên mật khẩu',
            headerTitleAlign: 'center',
            headerStyle: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        className="px-4"
                        onPress={() => navigation.goBack()}>
                        <Icon type="feather" name="chevron-left" />
                    </TouchableOpacity>
                )
            }
        })
    },
];

export default AuthStackRoutes;