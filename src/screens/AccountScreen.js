import { Icon } from '@rneui/themed';
import { useContext } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
import { AuthContext } from '../components/context/AuthProvider';

const AccountScreen = ({ navigation }) => {
    const { userLogin, setUserLogin, login, logout } = useContext(AuthContext)
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-row items-center gap-x-3 p-4 border-b-4 border-b-gray-200">
                {userLogin && userLogin?.image ? (
                    <Image source={{ uri: userLogin?.image }} className="w-14 h-14 rounded-full" />
                    // <TouchableOpacity className="border-2 bg-white border-gray-200 rounded-full p-1"
                    //     activeOpacity={0.7}
                    //     onPress={() => alert('Change avatar')}
                    // >
                    //     <Image source={{ uri: userLogin?.image }} className="w-14 h-14 rounded-full" />
                    //     <View className="absolute -bottom-2 -right-2 bg-gray-200 rounded-full p-1 border-white border-2">
                    //         <Icon type="simple-line-icon" name="pencil" size={18} />
                    //     </View>
                    // </TouchableOpacity>
                ) : (
                    <Icon type="octicon" name="smiley" size={54} color={'#2563eb'} />

                )}
                <View className="justify-between items-start gap-y-1">
                    {userLogin ? (
                        <Text className="text-base text-gray-600 font-bold leading-4">{userLogin.fullName}</Text>
                    ) : (
                        <Text className="text-base text-gray-600 font-bold leading-4">Chào mừng bạn đến với Focodo!</Text>
                    )}

                    {userLogin ? (
                        <TouchableOpacity
                            activeOpacity={0.6}
                            className="px-2 py-1 border-2 border-blue-600 rounded-lg justify-center"
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <Text className="text-sm text-blue-600 text-center">Thông tin tài khoản</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            activeOpacity={0.6}
                            className="px-2 py-1 border-2 border-blue-600 rounded-lg justify-center"
                            onPress={() => navigation.navigate('Guide')}
                        >
                            <Text className="text-sm text-blue-600 text-center">Đăng nhập/Tạo tài khoản</Text>
                        </TouchableOpacity>
                    )}

                </View>
            </View>
            <View className="px-4 py-2 border-b-4 border-b-gray-200">
                <Text className="text-gray-600 text-lg font-bold">Đơn hàng của tôi</Text>
                <View className="flex-row justify-around mt-2 gap-x-3">
                    <TouchableOpacity
                        activeOpacity={0.6}
                        className="w-1/3"
                    >
                        <Icon type='material-community' name='timer-sand' size={28} color={'#2563eb'} />
                        <Text className="text-sm text-gray-600 text-center" numberOfLines={2}>Đang xử lý</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        className="w-1/3"
                    >
                        <Icon type='feather' name='truck' size={28} color={'#2563eb'} />
                        <Text className="text-sm text-gray-600 text-center" numberOfLines={2}>Đang vận chuyển</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        className="w-1/3"
                    >
                        <Icon type='octicon' name='checklist' size={28} color={'#2563eb'} />
                        <Text className="text-sm text-gray-600 text-center" numberOfLines={2}>Đã giao</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                activeOpacity={0.6}
                className="flex-row justify-between items-center p-2 pl-4 border-b-4 border-b-gray-200"
                onPress={() => { }}
            >
                <Text className="text-gray-600 text-lg font-bold">Đánh giá sản phẩm</Text>
                <Icon type='feather' name='chevron-right' size={24} />
            </TouchableOpacity>

            <View className="pt-2 border-b-4 border-b-gray-200">
                <Text className="text-gray-600 text-lg font-bold mb-1 px-4">Thông tin khác</Text>

                <TouchableOpacity
                    activeOpacity={0.6}
                    className="flex-row justify-between items-center p-2 pl-4"
                    style={{ borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}
                    onPress={() => navigation.navigate('Guide')}
                >
                    <Text className="text-gray-700 text-base">Hướng dẫn sử dụng</Text>
                    <Icon type='feather' name='chevron-right' size={24} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.6}
                    className="flex-row justify-between items-center p-2 pl-4"
                    style={{ borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}
                    onPress={() => navigation.navigate('About')}
                >
                    <Text className="text-gray-700 text-base">Giới thiệu</Text>
                    <Icon type='feather' name='chevron-right' size={24} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.6}
                    className="flex-row justify-between items-center p-2 pl-4"
                    onPress={() => navigation.navigate('Contact')}
                >
                    <Text className="text-gray-700 text-base">Thông tin liên lạc</Text>
                    <Icon type='feather' name='chevron-right' size={24} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                activeOpacity={0.6}
                className="p-2 border-red-500 rounded m-4"
                style={{ borderWidth: 1 }}
                onPress={() => {
                    logout();
                    navigation.navigate('HomePage');
                }}
            >
                <Text className="text-center text-red-500 text-lg">Đăng xuất</Text>
            </TouchableOpacity>
        </ScrollView >
    );
};

export default AccountScreen;