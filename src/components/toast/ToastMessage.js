import { View, Text, StyleSheet } from "react-native";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

// https://github.com/calintamas/react-native-toast-message/blob/0026645eeda2242ea740250471f1b4f2be894c6e/docs/custom-layouts.md
const ToastMessage = () => {
    return (
        <Toast config={toastConfig} />
    )
}

/*
  1. Create the config
*/
const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#6cc57d' }}
            text1Style={{
                fontSize: 15
            }}
            text2Style={{
                fontSize: 13
            }}
            text1NumberOfLines={2}
            text2NumberOfLines={4}

        // contentContainerStyle={{ paddingHorizontal: 15 }}
        // text1Style={{
        //     fontSize: 15,
        //     fontWeight: '400'
        // }}
        />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 15
            }}
            text2Style={{
                fontSize: 13
            }}
            text1NumberOfLines={2}
            text2NumberOfLines={4}
        />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    )
};

export default ToastMessage;