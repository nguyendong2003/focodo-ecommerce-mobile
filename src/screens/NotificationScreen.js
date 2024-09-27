import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import NotificationCard from '../components/notification/NotificationCard';
import result from '../data/notifications.json'

const NotificationScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        setNotifications(result.notifications);
    }, []);

    return (
        <View className="flex-1 bg-white">
            <FlatList
                data={notifications}
                renderItem={({ item }) => <NotificationCard notification={item} navigation={navigation} />}
                keyExtractor={item => 'all_notifications' + item.id}
                key={'all_notifications'}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="bg-gray-200 h-0.5" />}
            // ListHeaderComponent={ListHeaderComponent}

            />
        </View>
    );
};

export default NotificationScreen;