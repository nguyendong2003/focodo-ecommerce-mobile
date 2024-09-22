import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { AuthContext } from "../components/context/AuthProvider";
import publicStackRoutes from "./stack/PublicStackRoutes";
import privateStackRoutes from "./stack/PrivateStackRoutes";
import authStackRoutes from "./stack/AuthStackRoutes";

const Stack = createStackNavigator();

const AppStackNavigator = () => {
    const { userLogin, setUserLogin, login, logout } = useContext(AuthContext)

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="MainTab"
                screenOptions={{
                    headerShown: false,
                }}
            >
                {
                    publicStackRoutes.map((route) => {
                        const { name, component, options } = route;
                        return (
                            <Stack.Screen
                                key={name}
                                name={name}
                                component={component}
                                options={options}
                            />
                        );
                    })
                }

                {
                    userLogin ? (
                        privateStackRoutes.map((route) => {
                            const { name, component, options } = route;
                            return (
                                <Stack.Screen
                                    key={name}
                                    name={name}
                                    component={component}
                                    options={options}
                                />
                            );
                        })
                    ) : (
                        authStackRoutes.map((route) => {
                            const { name, component, options } = route;
                            return (
                                <Stack.Screen
                                    key={name}
                                    name={name}
                                    component={component}
                                    options={options}
                                />
                            );
                        })
                    )
                }
                {/* <Stack.Screen name="MainTab" component={MainTabNavigator} /> */}

                {/* <Stack.Screen name="ProductDetail" component={ProductDetailScreen} /> */}


                {/* <Stack.Screen name="Review" component={ReviewScreen} />
                <Stack.Screen name="SearchProduct" component={SearchProductScreen} />
                <Stack.Screen name="SearchProductResult" component={SearchProductResultScreen} />
                <Stack.Screen name="Guide" component={GuideScreen} />
                <Stack.Screen name="About" component={AboutScreen} />
                <Stack.Screen name="Contact" component={ContactScreen} />



                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Order" component={OrderScreen} />
                <Stack.Screen name="Payment" component={PaymentScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStackNavigator