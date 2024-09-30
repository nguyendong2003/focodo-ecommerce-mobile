import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PublicTabRoutes from './tab/PublicTabRoutes';

const Tab = createBottomTabNavigator();

const MainTabNavigator = ({ navigation }) => {
    return (
        <Tab.Navigator
            initialRouteName="HomePage"
            // screenOptions={{
            //     headerShown: false,
            // }}
            screenOptions={{
                tabBarItemStyle: {
                    marginBottom: 4,
                    marginTop: 4,
                },
            }}
        >
            {
                PublicTabRoutes(navigation).map((route) => {
                    const { name, component, options, listeners } = route;
                    return (
                        <Tab.Screen
                            key={name}
                            name={name}
                            component={component}
                            options={options}
                            listeners={listeners}
                        />
                    );
                })
            }
        </Tab.Navigator >
    )
}

export default MainTabNavigator;