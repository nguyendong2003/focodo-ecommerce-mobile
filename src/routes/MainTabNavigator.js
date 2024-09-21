import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import publicTabRoutes from "./tab/PublicTabRoutes"

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
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
                publicTabRoutes.map((route) => {
                    const { name, component, options } = route;
                    return (
                        <Tab.Screen
                            key={name}
                            name={name}
                            component={component}
                            options={options}
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