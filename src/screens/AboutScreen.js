import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

import tonghopmon from "../static/images/banner/tonghopmon2.jpg";
import delivery from "../static/images/banner/delivery.jpg";
import payment from "../static/images/banner/payment.jpg";

const AboutScreen = () => {
    return (
        <ScrollView className="flex-1 bg-white">
            {/* Header */}
            <View className="items-center my-4 px-4">
                <Text className="text-center text-[32px] font-bold">VỀ CỬA HÀNG</Text>
                <Text className="mt-2 mb-5 text-[16px] text-center">
                    FoCoDo là hệ thống chuyên cung cấp các sản phẩm đặc sản đến từ Cố Đô Huế. Với phương châm "Gói trọn ẩm thực Huế", chúng tôi luôn mang đến cho khách hàng những món ăn theo tiêu chuẩn truyền thống cung đình Huế với giá thành hợp lí nhất. Hệ thống chúng tôi cung cấp:
                </Text>
            </View>

            {/* Đa Dạng Sản Phẩm */}
            <View className="flex flex-col items-center space-y-4 px-4 mt-4">
                <View className="w-full bg-gray-400 rounded-xl shadow-lg p-4">
                    <Text className="text-[20px] text-gray-800 font-bold text-center">
                        Đa Dạng Sản Phẩm
                    </Text>
                    <View className="w-[60%] mx-auto h-0.5 bg-gray-800 mt-2 mb-4"></View>
                    <Text className="text-gray-800 text-[16px] text-center">
                        FoCoDo cung cấp nhiều loại đặc sản đến từ Huế, giúp lựa chọn của bạn đa dạng hơn
                    </Text>
                </View>
                <Image
                    source={tonghopmon}
                    alt="Đa dạng sản phẩm"
                    className="w-full h-40 rounded-xl shadow-lg"
                />
            </View>

            {/* Vận Chuyển Toàn Quốc */}
            <View className="flex flex-col items-center space-y-4 px-4 mt-8">
                <View className="w-full bg-gray-600 rounded-xl shadow-lg p-4">
                    <Text className="text-[20px] text-white font-bold text-center">
                        Vận Chuyển Toàn Quốc
                    </Text>
                    <View className="w-[60%] mx-auto h-0.5 bg-white mt-2 mb-4"></View>
                    <Text className="text-white text-[16px] text-center">
                        Hệ thống vận chuyển trải dài khắp cả nước cùng với các hình thức giao hàng khác nhau
                    </Text>
                </View>
                <Image
                    source={delivery}
                    alt="Vận chuyển toàn quốc"
                    className="w-full h-40 rounded-xl shadow-lg"
                />
            </View>

            {/* Thanh Toán Đa Dạng */}
            <View className="flex flex-col items-center space-y-4 px-4 mt-8 mb-8">
                <View className="w-full bg-gray-800 rounded-xl shadow-lg p-4">
                    <Text className="text-[20px] text-white font-bold text-center">
                        Thanh Toán Đa Dạng
                    </Text>
                    <View className="w-[60%] mx-auto h-0.5 bg-white mt-2 mb-4"></View>
                    <Text className="text-white text-[16px] text-center">
                        Khách hàng có thể thanh toán bằng nhiều hình thức khác nhau
                    </Text>
                </View>
                <Image
                    source={payment}
                    alt="Thanh toán đa dạng"
                    className="w-full h-40 rounded-xl shadow-lg"
                />
            </View>
        </ScrollView>
    );
};

export default AboutScreen;
