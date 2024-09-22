import { Button, Icon } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Image, PixelRatio, Text, TextInput, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import result from "../../data/products.json"
import WebView from 'react-native-webview';

// // Convert px to dp
// const pxToDp = (px) => {
//     return px / PixelRatio.get();
// };

// Function to convert px to dp
const pxToDp = (px) => {
    return PixelRatio.roundToNearestPixel(px / PixelRatio.get());
};

const ProductInfo = ({ navigation, productId }) => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null)
    const [webViewHeight, setWebViewHeight] = useState(0);

    console.log(webViewHeight);


    useEffect(() => {
        // call api
        const products = result.products;

        const productFind = products.find((product) => product.id === productId);

        setProduct(productFind);

    }, [productId]);

    // Quantity product
    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleInputChange = (text) => {
        const newQuantity = parseInt(text);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setQuantity(newQuantity);
        } else {
            setQuantity(1);
        }
    };
    return (
        <>
            <View className="items-center p-4">
                <Image source={require('../../static/images/products/1.png')} className="h-64 w-64 rounded-lg" />
            </View>
            <View className="mt-2 px-4">
                <Text className="text-black text-xl font-bold">{product?.name}</Text>

                <View className="flex-row items-center gap-x-2" >
                    <Text className="text-black text-sm font-bold">4.5</Text>
                    <Rating
                        type="star"
                        startingValue={4.5}
                        readonly={true}
                        imageSize={14}
                        className="items-start"
                    />
                    <Text className="text-gray-500 text-sm">({new Intl.NumberFormat('vi-VN').format(2123)})</Text>
                    <Text className="text-gray-500 text-sm">Đã bán: {new Intl.NumberFormat('vi-VN').format(16759)}</Text>
                </View>
                <View className="flex-row items-center gap-x-4">
                    <Text className=" text-red-500 text-2xl font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price)}</Text>
                    <Text className=" text-gray-500 text-sm bg-gray-200 rounded-lg px-1">-10%</Text>
                    <Text className=" text-gray-500 text-sm line-through">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.originPrice)}</Text>
                </View>

                <Text className="text-black text-base italic">Bánh bột lọc Huế không chỉ được coi là món ăn vặt, bạn hoàn toàn có thể thưởng thức thay cơm hay bữa chính trong ngày. Loại bánh này phổ biến ở nhiều địa phương, tuy nhiên, chỉ khi ăn tại Huế, bạn mới cảm nhận được vị ngon đặc trưng, đúng điệu của miền Trung</Text>


                <View className="flex-row items-center mt-1">
                    <Text className="text-black text-base font-semibold mr-4">Số lượng:</Text>
                    <Icon type="antdesign" name="minus" onPress={handleDecrease} size={24} />
                    <TextInput
                        className="w-14 px-3 mx-2 text-center border border-gray-300 rounded"
                        keyboardType="numeric"
                        value={String(quantity)}
                        onChangeText={handleInputChange}
                    />
                    <Icon type="antdesign" name="plus" onPress={handleIncrease} size={24} />
                </View>

                <View className="mt-3 flex-row">
                    <Button
                        title="Thêm vào giỏ hàng"
                        type="outline"
                        containerStyle={{ flexGrow: 1 }}
                        buttonStyle={{ borderColor: '#000', borderWidth: 2, borderRadius: 8 }}
                        titleStyle={{ color: '#000' }}
                    />
                    <Button
                        title="Thanh toán"
                        containerStyle={{ flexGrow: 1 }}
                        buttonStyle={{ borderColor: '#000', backgroundColor: '#000', borderWidth: 2, borderRadius: 8, marginLeft: 20 }}
                        titleStyle={{ color: '#fff' }}
                    />
                </View>

                <View className="mt-2 flex-row items-center">
                    <Icon type="feather" name="truck" color="#000" size={28} />
                    <View className="p-2">
                        <Text className="text-base text-gray-600 ">Thời gian vận chuyển dự kiến</Text>
                        <Text className="text-base text-gray-600 ">1 giờ - 3 ngày</Text>
                    </View>
                </View>

                <View className="mt-2">
                    <Text className="text-black text-xl font-bold">Mô tả sản phẩm</Text>
                    {/* <View>
                        <WebView
                            style={{ height: 800, width: '100%' }}
                            source={{ uri: 'https://expo.dev' }}
                        />
                    </View> */}
                    <WebView
                        style={{ height: webViewHeight }} // Điều chỉnh chiều cao cho phù hợp
                        originWhitelist={['*']}
                        source={{
                            html: `
      <!DOCTYPE html>
      <html lang="vi">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 10px;
              line-height: 1.6;
              background-color: #f9f9f9;
            }
            h2, h3 {
              color: #333;
            }
            ul {
              list-style-type: none;
              padding-left: 0;
            }
            li {
              margin-bottom: 5px;
            }
          </style>
          <title>Thông tin sản phẩm</title>
        </head>
        <body>
          <h2><center>Thông tin sản phẩm</center></h2>
          <p><b>Tên sản phẩm:</b></p>
          <ul>
            <li>1. Thập Cẩm Gà Quay Vi Cá Jambon Đặc Biệt (1 trứng)</li>
            <li>2. Thập Cẩm Xá Xíu Lạp Xưởng (1 trứng)</li>
            <li>3. Thập Cẩm Jambon Xá Xíu Hảo Hạng (1 trứng)</li>
            <li>4. Sữa Dừa Hoàng Kim (1 trứng)</li>
            <li>5. Sầu Riêng Dừa Tươi Đặc Biệt (1 trứng)</li>
            <li>6. Khoai Môn Sữa Hoàng Gia (1 trứng)</li>
            <li>7. Đậu Đỏ Hạnh Nhân Nhật Bản (1 trứng)</li>
            <li>8. Imperial Blueberry & Hạt (không trứng)</li>
            <li>9. Lục Bảo Trà Xanh O-cookie (không trứng)</li>
            <li>10. Chocolate Cam Navel Đông Trùng Hạ Thảo (không trứng)</li>
            <li>11. Đào Saffron Hạt Macca (không trứng)</li>
            <li>12. Cappuccino Custard Yến Tươi (không trứng)</li>
          </ul>
          <p><b>Thương hiệu:</b> Nonglamfood</p>
          <p><b>Khối lượng tịnh / Thể tích thực:</b> 150g</p>
          <p><b>Hạn sử dụng:</b> 35 ngày kể từ ngày sản xuất.</p>
          <h3>Lý do chọn bánh trung thu Nonglamfood:</h3>
          <p>Nhân bánh cao cấp thượng hạng với Vi cá mập, Yến tươi, Đông trùng hạ thảo, saffron, hồng sâm, Trà xanh matcha. Được phối trộn từ nghệ nhân bánh Trung thu với hơn 30 năm kinh nghiệm cho vị đậm đà truyền thống.</p>
          <p>Hơn 30 vị bánh tươi mới, ít ngọt, có sử dụng đường ăn kiêng isomalt vì sức khỏe người tiêu dùng.</p>
          <p>Quy trình khép kín và chuẩn chỉnh theo ISO 22000:2018, HACCP từ khâu chọn nguyên liệu đến đóng gói.</p>
          <p>Hơn 20 mẫu hộp thiết kế độc đáo, sang trọng. Dịch vụ cá nhân hóa thể hiện tính độc bản của thương hiệu doanh nghiệp.</p>
          <p>Giá sản phẩm trên Tiki đã bao gồm thuế. Tùy vào loại sản phẩm và địa chỉ giao hàng, có thể phát sinh thêm phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu.</p>
          <script>
                                                //  // Tính chiều cao của toàn bộ nội dung
                                                // var body = document.body;
                                                // var html = document.documentElement;
                                                // var pageHeight = Math.max(
                                                //     body.scrollHeight, body.offsetHeight,
                                                //     html.clientHeight, html.scrollHeight, html.offsetHeight
                                                // );
                                                // window.ReactNativeWebView.postMessage(pageHeight); // Gửi chiều cao về ứng dụng
            window.onload = function() {
                const height = document.body.scrollHeight;
                window.ReactNativeWebView.postMessage(height); // Gửi chiều cao về ứng dụng
            };
        </script>
          </body>
      </html>
    `
                        }}
                        javaScriptEnabled={true} // Bật JavaScript
                        // onMessage={(event) => {
                        //     const height = parseInt(event.nativeEvent.data); // Nhận dữ liệu chiều cao
                        //     setWebViewHeight(height); // Cập nhật chiều cao WebView
                        // }}
                        onMessage={(event) => {
                            const heightInPx = parseInt(event.nativeEvent.data);
                            const heightInDp = pxToDp(heightInPx); // Chuyển từ px sang dp
                            setWebViewHeight(heightInDp); // Cập nhật chiều cao cho WebView
                        }}
                        scrollEnabled={false} // Tắt cuộn trong WebView (cuộn bên ngoài)
                    />

                </View>
            </View>
        </>
    )
}

export default ProductInfo;