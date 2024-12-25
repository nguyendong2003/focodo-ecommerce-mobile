import { Button, Icon } from "@rneui/themed";
import { Text, TextInput, View, TouchableOpacity, ScrollView, RefreshControl, Modal, FlatList } from "react-native";
import { Field, Formik } from "formik";
import { shippingInfoValidationSchema } from "../utils/ValidationForm";
import CustomTextInput from "../components/custom/CustomTextInput";
import { callFetchDistrictsByProvinceId, callFetchProvinces, callFetchWardsByDistrictId, callSearchDistrictsByName, callSearchProvinceByName, callSearchWardByName, callUpdateProfileUser } from "../services/api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthProvider";


// https://formik.org/docs/guides/validation
// uncontrolled component with Formik: https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup
const ProfileUpdateScreen = ({ navigation, route }) => {
    const { userLogin, setUserLogin, login, logout, fetchAccount } = useContext(AuthContext)

    const [refreshing, setRefreshing] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(''); // 'province', 'district', 'ward'
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    const handleRefresh = async (setFieldValue) => {
        setRefreshing(true);
        await fetchAccount();
        await fetchProvinces();
        if (userLogin.province) {
            setFieldValue('province', userLogin.province);
            searchProvinceByName(userLogin.province);
        }
        if (userLogin.district) {
            setFieldValue('district', userLogin.district);
            searchDistrictByName(userLogin.district);
        }
        if (userLogin.ward) {
            setFieldValue('ward', userLogin.ward);
            searchWardByName(userLogin.ward);
        }
        setRefreshing(false);
    }

    const handleConfirm = async (values) => {
        const updatedProfile = {
            full_name: values.fullName,
            email: values.email,
            phone: values.phone,
            address: values.address,
            province: values.province,
            district: values.district,
            ward: values.ward
        }

        const response = await callUpdateProfileUser(updatedProfile)
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
        navigation.goBack();
    }

    const fetchProvinces = async () => {
        const res = await callFetchProvinces();
        if (res && res.data) {
            setProvinces(res.data);
        }
    }

    const fetchDistrictsByProvinceId = async (provinceId) => {
        const res = await callFetchDistrictsByProvinceId(provinceId);
        if (res && res.data) {
            setDistricts(res.data.districts);
        }
    }

    const fetchWardsByDistrictId = async (districtId) => {
        const res = await callFetchWardsByDistrictId(districtId);
        if (res && res.data) {
            setWards(res.data.wards);
        }
    }

    const searchProvinceByName = async (name) => {
        const res = await callSearchProvinceByName(name);
        if (res && res.data) {
            setSelectedProvince(res.data[0]);
            fetchDistrictsByProvinceId(res.data[0].code);
        }
    }

    const searchDistrictByName = async (name) => {
        const res = await callSearchDistrictsByName(name);
        if (res && res.data) {
            setSelectedDistrict(res.data[0]);
            fetchWardsByDistrictId(res.data[0].code);
        }
    }

    const searchWardByName = async (name) => {
        const res = await callSearchWardByName(name);
        if (res && res.data) {
            setSelectedWard(res.data[0]);
        }
    }

    const handleSelectProvince = (province, setFieldValue) => {
        if (selectedProvince !== province) {
            setFieldValue('province', province.name);
            setFieldValue('district', '');
            setFieldValue('ward', '');

            setSelectedProvince(province);
            fetchDistrictsByProvinceId(province.code);

            setWards([]);
            setSelectedDistrict(null);
            setSelectedWard(null);
        }
        setModalVisible(false);
    };

    const handleSelectDistrict = (district, setFieldValue) => {
        if (selectedDistrict !== district) {
            setFieldValue('district', district.name);
            setFieldValue('ward', '');

            setSelectedDistrict(district);
            fetchWardsByDistrictId(district.code);

            setSelectedWard(null);
        }
        setModalVisible(false);
    };

    const handleSelectWard = (ward, setFieldValue) => {
        if (selectedWard !== ward) {
            setFieldValue('ward', ward.name);

            setSelectedWard(ward);
        }
        setModalVisible(false);

    };

    useEffect(() => {
        fetchProvinces();
        if (userLogin.province) {
            searchProvinceByName(userLogin.province);
        }
        if (userLogin.district) {
            searchDistrictByName(userLogin.district);
        }
        if (userLogin.ward) {
            searchWardByName(userLogin.ward);
        }
    }, [userLogin])

    return (
        <Formik
            initialValues={{
                fullName: userLogin.fullName ? userLogin.fullName : '',
                email: userLogin.email ? userLogin.email : '',
                phone: userLogin.phone ? userLogin.phone : '',
                address: userLogin.address ? userLogin.address : '',
                province: userLogin.province ? userLogin.province : '',
                district: userLogin.district ? userLogin.district : '',
                ward: userLogin.ward ? userLogin.ward : '',
            }}
            onSubmit={handleConfirm}
            validateOnMount={true}
            enableReinitialize={true}
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
                <ScrollView
                    className="p-4 bg-white"
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => handleRefresh(setFieldValue)}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                >
                    <>
                        <Text className="text-base text-black font-bold">Tên người nhận</Text>
                        <Field
                            name="fullName"
                            placeholder="Nhập Họ tên"
                            component={CustomTextInput}
                        />

                        <Text className="text-base text-black font-bold">Địa chỉ email</Text>
                        <Field
                            name="email"
                            placeholder="Nhập địa chỉ email"
                            component={CustomTextInput}
                        />

                        <Text className="text-base text-black font-bold">Số điện thoại</Text>
                        <Field
                            name="phone"
                            placeholder="Nhập Số điện thoại"
                            component={CustomTextInput}
                        />

                        <Text className="text-base text-black font-bold">Địa chỉ</Text>
                        <Field
                            name="address"
                            placeholder="Nhập Tòa nhà, số nhà, tên đường"
                            component={CustomTextInput}
                        />

                        <Text className="text-base text-black font-bold">Tỉnh/Thành phố</Text>
                        <TouchableOpacity className="mb-1" activeOpacity={0.7} onPress={() => { setModalType('province'); setModalVisible(true); }}>
                            <View className={`border border-gray-500 rounded-lg px-3 py-2 flex-row justify-between items-center`}>
                                <Text>{values.province ? values.province : 'Chọn tỉnh/thành phố'}</Text>
                                <Icon type="material" name="keyboard-arrow-down" />
                            </View>
                        </TouchableOpacity>

                        <Text className="text-base text-black font-bold">Quận/Huyện</Text>
                        <TouchableOpacity className="mb-1" activeOpacity={0.7} onPress={() => { setModalType('district'); setModalVisible(true); }}>
                            <View className={`border border-gray-500 rounded-lg px-3 py-2 flex-row justify-between items-center`}>
                                <Text>{values.district ? values.district : 'Chọn quận/huyện'}</Text>
                                <Icon type="material" name="keyboard-arrow-down" />
                            </View>
                        </TouchableOpacity>

                        <Text className="text-base text-black font-bold">Phường/Thị xã</Text>
                        <TouchableOpacity className="mb-1" activeOpacity={0.7} onPress={() => { setModalType('ward'); setModalVisible(true); }}>
                            <View className={`border border-gray-500 rounded-lg px-3 py-2 flex-row justify-between items-center`}>
                                <Text>{values.ward ? values.ward : 'Chọn phường/thị xã'}</Text>
                                <Icon type="material" name="keyboard-arrow-down" />
                            </View>
                        </TouchableOpacity>

                        <Button
                            title="Xác nhận"
                            buttonStyle={{ backgroundColor: '#000', borderRadius: 8, marginTop: 20, marginBottom: 40 }}
                            onPress={handleSubmit}
                        // disabled={!isValid}
                        />

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View className="flex-1 justify-center items-center bg-gray-100 bg-opacity-50">
                                <View className="bg-white w-full h-full rounded-lg">
                                    <FlatList
                                        data={modalType === 'province' ? provinces : modalType === 'district' ? districts : wards}
                                        keyExtractor={(item, index) => `${item.code}-${index}`}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                className='border-2 border-gray-200 rounded-lg p-2 mx-3 my-1'
                                                activeOpacity={0.7}
                                                onPress={() => {
                                                    if (modalType === 'province') {
                                                        handleSelectProvince(item, setFieldValue);
                                                    } else if (modalType === 'district') {
                                                        handleSelectDistrict(item, setFieldValue);
                                                    } else if (modalType === 'ward') {
                                                        handleSelectWard(item, setFieldValue);
                                                    }
                                                }}
                                            >
                                                <Text className="text-base font-bold">{item.name}</Text>
                                            </TouchableOpacity>
                                        )}
                                        ListHeaderComponent={() => (
                                            <TouchableOpacity
                                                className=" bg-gray-200 rounded-lg py-4"
                                                activeOpacity={0.7}
                                                onPress={() => setModalVisible(false)}
                                            >
                                                <Text className="text-lg text-gray-500 font-bold text-center">Hủy chọn</Text>
                                            </TouchableOpacity>
                                        )}
                                        stickyHeaderIndices={[0]}
                                    />
                                </View>
                            </View>
                        </Modal>
                    </>
                </ScrollView>
            )}
        </Formik>
    )
}

export default ProfileUpdateScreen;