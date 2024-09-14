import { Header as HeaderRNE, Icon, Image } from '@rneui/themed';
import { StatusBar, StyleSheet, View } from 'react-native';

const Header = ({ navigation }) => {
    return (
        <>
            <StatusBar
                backgroundColor="lightgreen"
                barStyle="light-content"
            />
            <HeaderRNE
                containerStyle={styles.headerContainer}
                backgroundColor='#fff'
                statusBarProps={{ barStyle: 'light-content', backgroundColor: '#000' }}
                leftComponent={
                    <Image source={require('../assets/banner/brand-image.png')} style={{ width: 50, height: 50, }} resizeMethod='scale' />
                }
                // rightComponent={{
                //     icon: 'menu',
                //     color: '#080341',
                //     onPress: () => navigation.toggleDrawer(),
                // }}
                rightComponent={
                    <View style={styles.rightIcons}>
                        <Icon type="antdesign" name="search1" color="#080341" size={24} style={{ paddingHorizontal: 8 }}
                            onPress={() => navigation.navigate('CartStack')}
                        />
                        <Icon type="antdesign" name="shoppingcart" color="#080341" size={24} style={{ paddingHorizontal: 8 }}
                            onPress={() => navigation.navigate('CartStack')}
                        />
                        <Icon type="antdesign" name="hearto" color="#080341" size={24} style={{ paddingHorizontal: 8 }}
                            onPress={() => navigation.navigate('Favourite')}
                        />
                        <Icon type="ionicon" name="person-outline" color="#080341" size={24} style={{ paddingHorizontal: 8 }}
                            onPress={() => navigation.navigate('Profile')}
                        />
                        <Icon
                            type="entypo"
                            name="menu"
                            color="#080341"
                            size={24}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    </View>
                }
                elevated={true}
            />
        </>


    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 16,
        // paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, // Add shadow for Android
    },
    rightIcons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Header;

