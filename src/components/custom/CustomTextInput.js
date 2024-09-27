import React from 'react';
import { View, TextInput, Text } from 'react-native';


const CustomTextInput = ({ field, form, ...props }) => {
    const { touched, errors } = form;
    const isError = touched[field.name] && errors[field.name];

    return (
        <View className="mb-1">
            <View className={`border border-gray-500 rounded px-2 py-2 ${isError && 'border-red-500'}`}>
                <TextInput
                    onChangeText={form.handleChange(field.name)}
                    onBlur={form.handleBlur(field.name)}
                    value={field.value}
                    {...props}
                />
            </View>
            <View className="h-5 mt-1">
                {isError && <Text className="text-red-500">{errors[field.name]}</Text>}
            </View>
        </View>
    );
};

export default CustomTextInput;

