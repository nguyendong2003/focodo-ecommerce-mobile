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
            {/* <Tab.Screen name="HomePage" component={HomePageScreen} />
            <Tab.Screen name="ProductCategory" component={ProductCategoryScreen} /> */}
            {/* <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Other" component={OtherScreen} /> */}
        </Tab.Navigator >
    )
}

export default MainTabNavigator;