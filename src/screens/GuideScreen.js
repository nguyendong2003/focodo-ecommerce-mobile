import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const GuideScreen = () => {
    return (
        <ScrollView className="w-full px-5 space-y-10 mt-3 bg-white">
            <Text className="text-2xl font-medium uppercase">Hướng dẫn thanh toán</Text>
            <Text className="italic">
                Bài viết được{' '}
                <Text className="text-orange-500">FOCODO - Hệ thống cửa hàng ẩm thực</Text> cố đó hàng đầu Việt Nam với 3 chi
                nhánh trên toàn quốc chia sẻ.
            </Text>
            <View className="space-y-5">
                <Text className="text-xl font-medium">
                    1. Đối với quý khách hàng mua hàng trực tiếp tại các chi nhánh
                </Text>
                <Text>
                    - Tất cả các chi nhánh của{' '}
                    <Text className="text-orange-500">hệ thống cửa hàng ẩm thực FOCODO</Text> đều chấp thuận thanh toán bằng tiền
                    mặt, chuyển khoản qua ngân hàng hoặc thanh toán qua thẻ tín dụng. Đối với thanh toán qua thẻ tín dụng (FOCODO
                    chịu phí thẻ) ở bất cứ chi nhánh nào của hệ thống cửa hàng ẩm thực FOCODO.
                </Text>
                <Text>- Quý khách có thể đến trực tiếp chi nhánh hoặc liên hệ qua hotline chi nhánh để biết thêm chi tiết.</Text>
                <Text>- Quý khách vui lòng kiểm tra sản phẩm kỹ trước khi thanh toán.</Text>
            </View>
            <View className="space-y-5">
                <Text className="text-xl font-medium">2. Đối với quý khách hàng mua hàng online đặt hàng qua Website</Text>
                <Text>
                    - Sau khi nhận được thông tin đặt hàng chúng tôi sẽ gọi điện để xác nhận đơn hàng trong vòng 1h và phản hồi lại
                    thông tin cho khách hàng về việc thanh toán và thời gian giao nhận.
                </Text>
                <Text>
                    - Quý khách có thể thanh toán COD - thanh toán khi nhận hàng, hoặc chuyển khoản thanh toán trước qua tài khoản
                    ngân hàng.
                </Text>
                <Text>
                    - Quý khách có thể kiểm tra hàng trước khi nhận hàng, trong trường hợp có yêu cầu đổi/trả hàng hoặc vấn đề về
                    sản phẩm, quý khách vui lòng liên hệ lại qua hotline{' '}
                    <Text className="text-orange-500">0911.85.8888 | 0977.33.7979</Text> để được hỗ trợ.
                </Text>
            </View>
            <View className="space-y-5">
                <Text className="text-xl font-medium">3. Thông tin thanh toán của các cửa hàng ẩm thực FOCODO</Text>
                <View className="space-y-3">
                    <Text className="font-medium">* Chi nhánh Đà Nẵng - FOCODO Đà Nẵng</Text>
                    <Text>54 Nguyễn Lương Bằng, phường Hòa Khánh Bắc, quận Liên Chiểu, TP Đà Nẵng</Text>
                    <Text>
                        Thông tin thanh toán:{' '}
                        <Text className="text-orange-500">VietComBank - STK:2203222222 - Chủ TK: FOCODO-DANANG</Text>
                    </Text>
                </View>
                <View className="space-y-3">
                    <Text className="font-medium">* Chi nhánh Huế - FOCODO Huế</Text>
                    <Text>63 Phùng Hưng, Thuận Thành, Huế, Thừa Thiên Huế</Text>
                    <Text>
                        Thông tin thanh toán:{' '}
                        <Text className="text-orange-500">VietComBank - STK:2203222222 - Chủ TK: FOCODO-HUE</Text>
                    </Text>
                </View>
                <View className="space-y-3 py-3">
                    <Text className="font-medium">* Chi nhánh TP Hồ Chí Minh - FOCODO TP Hồ Chí Minh</Text>
                    <Text>78 Quang Trung, Phước Long B, Quận 9, TP Hồ Chí Minh</Text>
                    <Text>
                        Thông tin thanh toán:{' '}
                        <Text className="text-orange-500">VietComBank - STK:2203222222 - Chủ TK: FOCODO-HCM</Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default GuideScreen;
