import { Icon } from '@rneui/themed';
import { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, Image, TextInput, Modal, Pressable } from 'react-native';
import { AuthContext } from '../components/context/AuthProvider';
import Dialog from "react-native-dialog";
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
    const { userLogin, setUserLogin, login, logout } = useContext(AuthContext)

    const [selectedImage, setSelectedImage] = useState(userLogin?.image || null);

    const [visibleModalImage, setVisibleModalImage] = useState(false);
    const [visible, setVisible] = useState(false);
    const [field, setField] = useState('');
    const [text, setText] = useState('');
    const textInputRef = useRef(null);

    const visibleDialog = (field) => {
        setField(field);
        setText(userLogin[field] || '');
        setVisible(true);
    };

    const handleOk = () => {
        setUserLogin({ ...userLogin, [field]: text });
        setVisible(false);
    };

    // Upload avatar
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
        // else {
        //     alert('You did not select any image.');
        // }
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
        if (selectedImage) {
            setUserLogin({ ...userLogin, image: selectedImage });
        } else if (selectedImage === undefined) {
            setUserLogin({ ...userLogin, image: null });
        }
    }, [selectedImage])


    return (
        <ScrollView className="flex-1 bg-white">
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

            <TouchableOpacity activeOpacity={0.6} className="px-4 py-2 border-b-4 border-b-gray-200"
                onPress={() => visibleDialog('fullName')}
            >
                <View className="flex-row gap-x-3 items-center">
                    <Icon type="ionicon" name="person-outline" size={24} />
                    <View>
                        <Text className="text-lg">Họ và tên</Text>
                        <Text className="text-base text-gray-500">{userLogin?.fullName || 'Thêm họ và tên'}</Text>
                    </View>

                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} className="px-4 py-2 border-b-4 border-b-gray-200"
                onPress={() => visibleDialog('phone')}
            >
                <View className="flex-row gap-x-3 items-center">
                    <Icon type="simple-line-icon" name="phone" size={24} />
                    <View>
                        <Text className="text-lg">Số điện thoại</Text>
                        <Text className="text-base text-gray-500">{userLogin?.phone || 'Thêm số điện thoại'}</Text>
                    </View>

                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} className="px-4 py-2 border-b-4 border-b-gray-200"
                onPress={() => visibleDialog('address')}
            >
                <View className="flex-row gap-x-3 items-center">
                    <Icon type="ionicon" name="location-outline" size={24} />
                    <View className="shrink">
                        <Text className="text-lg">Địa chỉ</Text>
                        <Text className="text-base text-gray-500">{userLogin?.address || "Thêm địa chỉ"}</Text>
                    </View>

                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} className="px-4 py-2 border-b-4 border-b-gray-200"
                onPress={() => visibleDialog('email')}
            >
                <View className="flex-row gap-x-3 items-center">
                    <Icon type="fontisto" name="email" size={24} />
                    <View>
                        <Text className="text-lg">Địa chỉ email</Text>
                        <Text className="text-base text-gray-500">{userLogin?.email || 'Thêm họ và tên'}</Text>
                    </View>

                </View>
            </TouchableOpacity>

            <Dialog.Container
                visible={visible}
                onBackdropPress={() => setVisible(false)}
            >
                <Dialog.Title>Nhập {field === 'fullName' ? 'Họ và tên' : field === 'phone' ? 'Số điện thoại' : field === 'address' ? 'Địa chỉ' : 'Địa chỉ email'}</Dialog.Title>
                <Dialog.Description>
                    <View className="flex-row items-center w-64 rounded border-2 px-2 py-1 ">
                        <TextInput
                            ref={textInputRef}
                            placeholder={`Nhập ${field === 'fullName' ? 'họ và tên' : field === 'phone' ? 'số điện thoại' : field === 'address' ? 'địa chỉ' : 'địa chỉ email'}`}
                            placeholderTextColor="#999"
                            value={text}
                            onChangeText={setText}
                            autoFocus={true}
                            onLayout={() => textInputRef.current.focus()}
                            keyboardType={field === 'phone' ? 'phone-pad' : field === 'email' ? 'email-address' : 'default'}
                            className="flex-1 mx-2"
                        />
                        {text.length > 0 && (
                            <TouchableOpacity onPress={() => setText('')}>
                                <Icon type="antdesign" name="closecircle" size={20} color="gray" />
                            </TouchableOpacity>
                        )}
                    </View>
                </Dialog.Description>
                <Dialog.Button label="Hủy" onPress={() => setVisible(false)} />
                <Dialog.Button label="Lưu" onPress={handleOk} />
            </Dialog.Container>

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
                        <TouchableOpacity
                            className="flex-row items-center p-3"
                            onPress={handleDeleteImage}
                        >
                            <Icon type='feather' name="trash-2" size={24} color="#050505" />
                            <Text className="text-lg font-bold text-black ml-3">
                                Xóa ảnh
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView >
    );
};

export default ProfileScreen;