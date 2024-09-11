import { Header as HeaderRNE, Icon } from '@rneui/themed';
import { StatusBar } from 'react-native';

const Header = () => {
    return (
        <>
            <StatusBar
                backgroundColor="lightgreen"
                barStyle="light-content"
            />
            <HeaderRNE
                containerStyle={{ paddingHorizontal: 24, paddingVertical: 20 }}
                backgroundColor='#fff'
                statusBarProps={{ barStyle: 'light-content', backgroundColor: '#000' }}
                leftComponent={
                    <Icon type="antdesign" name="rocket1" color="#080341" />
                }
                rightComponent={{
                    icon: 'menu',
                    color: '#080341',
                }}
            />
        </>


    );
}

export default Header;

