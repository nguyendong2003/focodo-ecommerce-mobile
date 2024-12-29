import { Icon } from '@rneui/themed';
import { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, Image, TextInput, Modal, Pressable, RefreshControl, Alert } from 'react-native';
import { AuthContext } from '../components/context/AuthProvider';
import Dialog from "react-native-dialog";
import * as ImagePicker from 'expo-image-picker';
import { callUpdateAvatar, callUpdateDetailProfile } from '../services/api';
import Toast from 'react-native-toast-message';

const ProfileScreen = ({ navigation }) => {
    const { userLogin, setUserLogin, login, logout, fetchAccount } = useContext(AuthContext)

    const [refreshing, setRefreshing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(userLogin?.avatar || null);

    const [visibleModalImage, setVisibleModalImage] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchAccount();
        setRefreshing(false);
    }

    // Upload avatar
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const avatar = {
                uri: result.assets[0].uri,
                name: result.assets[0].uri.split('/').pop(),
            };
            const res = await callUpdateAvatar(avatar);
            if (res.status === 200) {
                setSelectedImage(result.assets[0].uri);
                Toast.show({
                    type: 'success',
                    text1: 'Thành công',
                    text2: 'Cập nhật ảnh đại diện thành công',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Thất bại',
                    text2: 'Cập nhật ảnh đại diện thất bại',
                });
            }
        }
    };

    const handleChangeImage = () => {
        pickImageAsync();
        setVisibleModalImage(false);
    }

    const handleDeleteImage = () => {
        setSelectedImage(undefined);
        setVisibleModalImage(false);
    }

    useEffect(() => {
        if (userLogin) {
            setSelectedImage(userLogin.avatar || null);
        }
    }, [userLogin])


    useEffect(() => {
        if (selectedImage) {
            setUserLogin({ ...userLogin, avatar: selectedImage });
        } else if (selectedImage === undefined) {
            setUserLogin({ ...userLogin, avatar: null });
        }
    }, [selectedImage])


    return (
        <ScrollView
            className="flex-1 bg-white"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
        >
            <View className="items-center py-3  border-b-2 border-gray-200 bg-blue-300">
                <TouchableOpacity
                    activeOpacity={0.8}
                    className="border-2 bg-white border-gray-200 rounded-full p-1"
                    onPress={() => setVisibleModalImage(true)}
                >
                    {selectedImage ? (
                        <Image source={{ uri: selectedImage }} className="w-40 h-40 rounded-full" />
                    ) : (
                        <Icon type="octicon" name="smiley" size={160} color={'#2563eb'} />
                    )}
                    <View className="absolute bottom-1 right-1 bg-gray-200 rounded-full p-1 border-white border-2">
                        <Icon type="simple-line-icon" name="pencil" size={24} />
                    </View>
                </TouchableOpacity>
            </View>

            <View className="px-4 py-2 border-b-4 border-b-gray-200">
                <View className="flex-row gap-x-3 items-center">
                    <Icon type="ionicon" name="person-outline" size={24} />
                    <View>
                        <Text className="text-lg">Họ và tên</Text>
                        <Text className="text-base text-gray-500">{userLogin?.fullName || 'Thêm họ và tên'}</Text>
                    </View>

                </View>
            </View>

            <View className="px-4 py-2 border-b-4 border-b-gray-200">
                <View className="flex-row gap-x-3 items-center">
                    <Icon type="fontisto" name="email" size={24} />
                    <View>
                        <Text className="text-lg">Địa chỉ email</Text>
                        <Text className="text-base text-gray-500">{userLogin?.email || 'Thêm địa chỉ email'}</Text>
                    </View>

                </View>
            </View>

            <View className="px-4 py-2 border-b-4 border-b-gray-200">
                <View className="flex-row gap-x-3 items-center">
                    <Icon type="simple-line-icon" name="phone" size={24} />
                    <View>
                        <Text className="text-lg">Số điện thoại</Text>
                        <Text className="text-base text-gray-500">{userLogin?.phone || 'Thêm số điện thoại'}</Text>
                    </View>

                </View>
            </View>

            <View className="px-4 py-2 border-b-4 border-b-gray-200">
                <View className="flex-row gap-x-3 items-center">
                    <Icon type="ionicon" name="location-outline" size={24} />
                    <View className="shrink">
                        <Text className="text-lg">Địa chỉ</Text>
                        <Text className="text-base text-gray-500">{userLogin?.address || "Thêm địa chỉ"}</Text>
                    </View>
                </View>
            </View>

            <View className="px-4 py-2 border-b-4 border-b-gray-200">
                <View className="flex-row gap-x-3 items-center">
                    <Icon type="ionicon" name="location-outline" size={24} />
                    <View className="shrink">
                        <Text className="text-lg">Tỉnh/Thành phố</Text>
                        <Text className="text-base text-gray-500">{userLogin?.province || "Thêm Tỉnh/Thành phố"}</Text>
                    </View>
                </View>
            </View>
            <View className="px-4 py-2 border-b-4 border-b-gray-200">
                <View className="flex-row gap-x-3 items-center">
                    <Icon type="ionicon" name="location-outline" size={24} />
                    <View className="shrink">
                        <Text className="text-lg">Quận/Huyện</Text>
                        <Text className="text-base text-gray-500">{userLogin?.district || "Thêm Quận/Huyện"}</Text>
                    </View>
                </View>
            </View>
            <View className="px-4 py-2 border-b-4 border-b-gray-200">
                <View className="flex-row gap-x-3 items-center">
                    <Icon type="ionicon" name="location-outline" size={24} />
                    <View className="shrink">
                        <Text className="text-lg">Phường/Thị xã</Text>
                        <Text className="text-base text-gray-500">{userLogin?.ward || "Thêm Phường/Thị xã"}</Text>
                    </View>
                </View>
            </View>

            <View className="px-4 py-2 border-b-4 border-b-gray-200">
                <TouchableOpacity activeOpacity={0.7}
                    className="rounded-md  border-black py-2 border-2 bg-black"
                    onPress={() => navigation.navigate('ProfileUpdate')}
                >
                    <Text className="text-center text-white font-bold">Cập nhật thông tin</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visibleModalImage}
                onRequestClose={() => {
                    setVisibleModalImage(!visibleModalImage);
                }}
            >
                <View className="flex-1 justify-end items-center " style={{ backgroundColor: "rgba(0,0,0,0.5)", }}>
                    <Pressable
                        className="h-4/5 w-full"
                        onPress={() => setVisibleModalImage(false)}
                    />
                    <View className="h-1/5 w-full bg-white rounded-t-2xl p-5">
                        <TouchableOpacity
                            className="flex-row items-center p-3"
                            onPress={handleChangeImage}
                        >
                            <Icon type='material' name="add-photo-alternate" size={24} color="#050505" />
                            <Text className="text-lg font-bold text-black ml-3">
                                Thay đổi ảnh
                            </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            className="flex-row items-center p-3"
                            onPress={handleDeleteImage}
                        >
                            <Icon type='feather' name="trash-2" size={24} color="#050505" />
                            <Text className="text-lg font-bold text-black ml-3">
                                Xóa ảnh
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </Modal>
        </ScrollView >
    );
};

export default ProfileScreen;