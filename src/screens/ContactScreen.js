import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import emailjs from 'emailjs-com';
import Toast from 'react-native-toast-message';

function ContactScreen() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSendEmail = (e) => {
        e.preventDefault();

        if (!fullName || !email || !phone || !message) {
            Toast.show({
                type: 'error',
                text1: 'Thất bại!',
                text2: 'Vui lòng nhập đầy đủ thông tin',
            });
            return;
        }

        const templateParams = {
            fullName,
            email,
            phone,
            message,
        };

        emailjs.send('service_vo5o8an', 'template_qfyt3zv', templateParams, 'px-JuFgcGBVNELmF0').then(
            (response) => {
                console.log('SUCCESS!', response.status, response.text);
                Toast.show({
                    type: 'success',
                    text1: 'Thành công!',
                    text2: 'Thông tin của bạn đã được gửi thành công!',
                });
                setFullName('');
                setEmail('');
                setPhone('');
                setMessage('');
            },
            (error) => {
                console.log('FAILED...', error);
                Toast.show({
                    type: 'error',
                    text1: 'Thất bại!',
                    text2: 'Gửi thông tin thất bại, vui lòng thử lại.',
                });
            },
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.infoContainer}>
                <Image source={require('../static/images/banner/brand-image.png')} style={styles.logo} />
                <Text style={styles.title}>Các cơ sở của chúng tôi</Text>
                <View>
                    <Text style={styles.info}>1. FOCODO Đà Nẵng</Text>
                    <Text>54 Nguyễn Lương Bằng, phường Hòa Khánh Bắc, quận Liên Chiểu, TP Đà Nẵng</Text>
                </View>
                <View>
                    <Text style={styles.info}>2. FOCODO Huế</Text>
                    <Text>63 Phùng Hưng, Thuận Thành, Huế, Thừa Thiên Huế</Text>
                </View>
                <View>
                    <Text style={styles.info}>3. FOCODO TP Hồ Chí Minh</Text>
                    <Text>78 Quang Trung, Phước Long B, Quận 9, TP Hồ Chí Minh</Text>
                </View>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Nơi giải đáp toàn bộ thắc mắc của bạn</Text>
                <Text style={styles.info}>
                    Email: <Text style={styles.highlight}>dacsanhuefocodo@gmail.com</Text>
                </Text>
                <Text style={styles.info}>
                    Hotline: <Text style={styles.highlight}>0911.85.8888 | 0977.33.7979</Text>
                </Text>
                <Text style={styles.info}>Liên hệ với chúng tôi</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Họ và tên"
                        value={fullName}
                        onChangeText={setFullName}
                        required
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        required
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Điện thoại"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        required
                    />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Nhập nội dung tại đây"
                        value={message}
                        onChangeText={setMessage}
                        multiline
                        numberOfLines={4}
                        required
                    />
                    <Button title="Gửi thông tin" onPress={handleSendEmail} color="#000" />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    formContainer: {
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    info: {
        fontSize: 16,
        marginBottom: 8,
    },
    highlight: {
        color: 'orange',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    infoContainer: {
        marginBottom: 32,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 16,
        alignSelf: 'center',
    },
});

export default ContactScreen;