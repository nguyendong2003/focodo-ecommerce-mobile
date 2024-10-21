import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PublicTabRoutes from './tab/PublicTabRoutes';
import { AuthContext } from "../components/context/AuthProvider";
import { useContext } from "react";

const Tab = createBottomTabNavigator();

const MainTabNavigator = ({ navigation }) => {
    const { handleNavigate } = useContext(AuthContext);

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
                tabBarHideOnKeyboard: true,
            }}
        >
            {
                PublicTabRoutes(handleNavigate).map((route) => {
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