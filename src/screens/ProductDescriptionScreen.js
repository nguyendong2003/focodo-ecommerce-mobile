import WebView from 'react-native-webview';

const ProductDescription = ({ route }) => {
  const { productDescription } = route.params
  return (
    <>
      <WebView
        style={{
          flex: 1,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        originWhitelist={['*']}
        source={{ html: productDescription || '' }}
      />
    </>
  )
}

export default ProductDescription;