import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from '@rneui/themed';

const data = [
    { label: 'Mặc định', sortBy: 'DEFAULT' },
    { label: 'Giá tăng dần', sortBy: 'ASC' },
    { label: 'Giá giảm dần', sortBy: 'DESC' },
];

const DropdownComponent = () => {
    const [sortBy, setSortBy] = useState('DEFAULT');

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.sortBy === sortBy && (
                    <Icon type='font-awesome-5' name="check-double" size={16} color="black" />
                )}
            </View>
        );
    };



    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}

            // inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            // search
            labelField="label"
            valueField="sortBy"
            // placeholder="Select item"
            // searchPlaceholder="Search..."
            value={sortBy}
            onChange={item => {
                setSortBy(item.sortBy);
            }}
            renderLeftIcon={() => (
                // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                <Icon type='material-community' name="sort" size={24} color="black" />
            )}
            renderItem={renderItem}
        />
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    dropdown: {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 8,
    },
    item: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 4
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});