import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { AuthContext } from "../components/context/AuthProvider";
import publicStackRoutes from "./stack/PublicStackRoutes";
import privateStackRoutes from "./stack/PrivateStackRoutes";
import authStackRoutes from "./stack/AuthStackRoutes";
import { navigationRef } from "./navigation/RootNavigation";

const Stack = createStackNavigator();

const AppStackNavigator = () => {
    const { userLogin, setUserLogin, login, logout } = useContext(AuthContext)

    return (
        <NavigationContainer ref={navigationRef}>
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStackNavigator