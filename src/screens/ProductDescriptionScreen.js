import WebView from 'react-native-webview';

const ProductDescription = ({ navigation }) => {
  return (
    <>
      <WebView
        style={{
          flex: 1,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        originWhitelist={['*']}
        source={{
          html: `
      <!DOCTYPE html>
      <html lang="vi">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 10px;
              line-height: 1.6;
              background-color: #fff;
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
          <img src="https://d13jio720g7qcs.cloudfront.net/images/guides/origin/5f213722550c1.jpg" alt="Mô tả hình ảnh" style="width:100%; height:auto; margin: 10px 0;" />
          <p><b>Thương hiệu:</b> Nonglamfood</p>
          <p><b>Khối lượng tịnh / Thể tích thực:</b> 150g</p>
          <p><b>Hạn sử dụng:</b> 35 ngày kể từ ngày sản xuất.</p>
          <h3>Lý do chọn bánh trung thu Nonglamfood:</h3>
          <p>Nhân bánh cao cấp thượng hạng với Vi cá mập, Yến tươi, Đông trùng hạ thảo, saffron, hồng sâm, Trà xanh matcha. Được phối trộn từ nghệ nhân bánh Trung thu với hơn 30 năm kinh nghiệm cho vị đậm đà truyền thống.</p>
          <p>Hơn 30 vị bánh tươi mới, ít ngọt, có sử dụng đường ăn kiêng isomalt vì sức khỏe người tiêu dùng.</p>
          <p>Quy trình khép kín và chuẩn chỉnh theo ISO 22000:2018, HACCP từ khâu chọn nguyên liệu đến đóng gói.</p>
          <p>Hơn 20 mẫu hộp thiết kế độc đáo, sang trọng. Dịch vụ cá nhân hóa thể hiện tính độc bản của thương hiệu doanh nghiệp.</p>
          <p>Giá sản phẩm trên Tiki đã bao gồm thuế. Tùy vào loại sản phẩm và địa chỉ giao hàng, có thể phát sinh thêm phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu.</p>
          </body>
      </html>
    `
        }}
      />
    </>
  )
}

export default ProductDescription;