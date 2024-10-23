import { Button, Icon } from "@rneui/themed";
import { Text, TextInput, View, TouchableOpacity, ScrollView, RefreshControl, Modal, FlatList } from "react-native";
import { Field, Formik } from "formik";
import { shippingInfoValidationSchema } from "../utils/ValidationForm";
import CustomTextInput from "../components/custom/CustomTextInput";
import { callFetchAllPaymentMethods, callFetchDistrictsByProvinceId, callFetchProvinces, callFetchWardsByDistrictId, callSearchDistrictsByName, callSearchProvinceByName, callSearchWardByName } from "../services/api";
import { useContext, useEffect, useState } from "react";
import { getPaymentMethodText } from "../utils/PaymentUtils";
import { AuthContext } from "../components/context/AuthProvider";


// https://formik.org/docs/guides/validation
// uncontrolled component with Formik: https://blog.logrocket.com/react-native-form-validations-with-formik-and-yup
const ShippingInfoScreen = ({ navigation, route }) => {
    const { order } = route.params;
    const { userLogin, setUserLogin, login, logout, fetchAccount } = useContext(AuthContext)
    const [paymentMethods, setPaymentMethods] = useState([]);
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
        await fetchAllPaymentMethods();
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

    const handleConfirm = (values) => {
        const customer = {
            full_name: values.fullName,
            phone: values.phone,
            address: values.address,
            description: values.description,
            province: values.province,
            district: values.district,
            ward: values.ward
        }
        const shipping_price = values.shippingMethod === 'Giao hàng tiết kiệm' ? 10000 : 20000
        const payment_method = values.paymentMethod

        order.description = values.description
        order.shipping_price = shipping_price
        order.payment_method = payment_method
        order.final_price = order.total_price + shipping_price - order.discount_price

        console.log('Order:', order);
        console.log('Customer:', customer);

        navigation.navigate('OrderConfirm', {
            customer,
            order
        })
    }

    const fetchAllPaymentMethods = async () => {
        const res = await callFetchAllPaymentMethods();
        if (res && res.result) {
            setPaymentMethods(res.result);
        }
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
        fetchAllPaymentMethods();
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
    }, [])

    return (
        <Formik
            validationSchema={shippingInfoValidationSchema}
            initialValues={{
                fullName: userLogin.fullName ? userLogin.fullName : '',
                phone: userLogin.phone ? userLogin.phone : '',
                address: userLogin.address ? userLogin.address : '',
                province: userLogin.province ? userLogin.province : '',
                district: userLogin.district ? userLogin.district : '',
                ward: userLogin.ward ? userLogin.ward : '',
                shippingMethod: 'Giao hàng tiết kiệm',
                paymentMethod: 1,
                description: ''
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

                        <Text className="text-base text-black font-bold">Số điện thoại</Text>
                        <Field
                            name="phone"
                            placeholder="Nhập Số điện thoại"
                            component={CustomTextInput}
                        />

                        <Text className="text-base text-black font-bold">Ghi chú đơn hàng</Text>
                        <View className="mb-1">
                            <View className={`border border-gray-500 rounded-lg px-2 py-2`}>
                                <TextInput
                                    multiline
                                    numberOfLines={2}
                                    onChangeText={handleChange('description')}
                                    maxLength={50}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    placeholder="Nhập ghi chú đơn hàng"
                                    style={{ textAlignVertical: 'top' }}
                                />
                            </View>

                            <Text className="text-right text-gray-500">{values.description.length}/50</Text>
                        </View>

                        <Text className="text-base text-black font-bold">Địa chỉ nhận hàng</Text>
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

                        {/* Phương thức vận chuyển */}
                        <Text className="text-base text-black font-bold">Phương thức vận chuyển</Text>
                        <View className="flex-row items-center mt-2">
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => setFieldValue('shippingMethod', 'Giao hàng tiết kiệm')}
                                className="flex-row items-center"
                            >
                                <View
                                    className={`h-6 w-6 rounded-full border-2 ${values.shippingMethod === 'Giao hàng tiết kiệm' ? 'border-black' : 'border-gray-400'} flex justify-center items-center`}
                                >
                                    {values.shippingMethod === 'Giao hàng tiết kiệm' && (
                                        <View
                                            className="h-3 w-3 rounded-full bg-black"
                                        />
                                    )}
                                </View>
                                <Text className="ml-2">Giao hàng tiết kiệm</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row items-center mt-2">
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setFieldValue('shippingMethod', 'Giao hàng nhanh')}
                                className="flex-row items-center"
                            >
                                <View
                                    className={`h-6 w-6 rounded-full border-2 ${values.shippingMethod === 'Giao hàng nhanh' ? 'border-black' : 'border-gray-400'} flex justify-center items-center`}

                                >
                                    {values.shippingMethod === 'Giao hàng nhanh' && (
                                        <View
                                            className="h-3 w-3 rounded-full bg-black"

                                        />
                                    )}
                                </View>
                                <Text className="ml-2">Giao hàng nhanh</Text>
                            </TouchableOpacity>
                        </View>

                        {/*  */}
                        <Text className="text-base text-black font-bold mt-2">Phương thức thanh toán</Text>

                        {
                            paymentMethods.map((method, index) => (
                                <View className="flex-row items-center mt-2" key={index}>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => setFieldValue('paymentMethod', method.id)}
                                        className="flex-row items-center"
                                    >
                                        <View
                                            className={`h-6 w-6 rounded-full border-2 ${values.paymentMethod === method.id ? 'border-black' : 'border-gray-400'} flex justify-center items-center`}
                                        >
                                            {values.paymentMethod === method.id && (
                                                <View
                                                    className="h-3 w-3 rounded-full bg-black"
                                                />
                                            )}
                                        </View>
                                        <Text className="ml-2">{getPaymentMethodText(method.method)}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }

                        {(errors.paymentMethod && touched.paymentMethod) &&
                            <Text className="text-red-500 text-sm">{errors.paymentMethod}</Text>
                        }

                        <Button
                            title="Xác nhận"
                            buttonStyle={{ backgroundColor: '#000', borderRadius: 8, marginTop: 20, marginBottom: 40 }}
                            onPress={handleSubmit}
                            disabled={!isValid}
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

export default ShippingInfoScreen;