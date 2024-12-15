import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

function ContactScreen() {
    return (
        <ScrollView className="flex-1 bg-white">
            <StyledView className="space-y-6 px-4 pt-6">
                <StyledView className="space-y-4">
                    <StyledView className="items-center">
                        <StyledImage
                            source={require('../static/images/banner/brand-image.png')}
                            className="w-40 h-40"
                            resizeMode="contain"
                        />
                    </StyledView>
                    <StyledText className="text-xl font-medium uppercase text-center">
                        Các cơ sở của chúng tôi
                    </StyledText>
                    <StyledView>
                        <StyledText className="font-bold">1. FOCODO Đà Nẵng</StyledText>
                        <StyledText className='text-gray-600 text-sm'>54 Nguyễn Lương Bằng, phường Hòa Khánh Bắc, quận Liên Chiểu, TP Đà Nẵng</StyledText>
                    </StyledView>
                    <StyledView>
                        <StyledText className="font-bold">2. FOCODO Huế</StyledText>
                        <StyledText className='text-gray-600 text-sm'>63 Phùng Hưng, Thuận Thành, Huế, Thừa Thiên Huế</StyledText>
                    </StyledView>
                    <StyledView>
                        <StyledText className="font-bold">3. FOCODO TP Hồ Chí Minh</StyledText>
                        <StyledText className='text-gray-600 text-sm'>78 Quang Trung, Phước Long B, Quận 9, TP Hồ Chí Minh</StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className="space-y-4">
                    <StyledText className="text-xl font-medium uppercase text-center">
                        Nơi giải đáp toàn bộ thắc mắc của bạn
                    </StyledText>
                    <StyledText className="font-medium">
                        Email: <StyledText className="text-orange-500">dacsanhuefocodo@gmail.com</StyledText>
                    </StyledText>
                    <StyledText className="font-medium">
                        Hotline: <StyledText className="text-orange-500">0911.85.8888 | 0977.33.7979</StyledText>
                    </StyledText>
                    <StyledText className="font-medium">Liên hệ với chúng tôi</StyledText>

                    <StyledView className="space-y-4">
                        <StyledView className="flex flex-row justify-between">
                            <StyledTextInput
                                placeholder="Họ và tên"
                                className="border border-gray-300 rounded h-10 px-3 flex-1 mr-2"
                            />
                            <StyledTextInput
                                placeholder="Email"
                                className="border border-gray-300 rounded h-10 px-3 flex-1 ml-2"
                            />
                        </StyledView>
                        <StyledTextInput
                            placeholder="Điện thoại"
                            className="border border-gray-300 rounded h-10 px-3 w-full"
                        />
                        <StyledTextInput
                            placeholder="Nhập nội dung tại đây"
                            multiline
                            numberOfLines={4}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                        />
                        <StyledTouchableOpacity className="bg-black text-white rounded w-full h-10 items-center justify-center mb-4">
                            <StyledText className="text-white">Gửi thông tin</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </StyledView>
        </ScrollView>
    );
}

export default ContactScreen;
