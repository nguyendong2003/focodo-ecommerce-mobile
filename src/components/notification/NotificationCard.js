import { Icon } from "@rneui/themed";
import { Image, Text, TouchableOpacity, View } from "react-native"

const NotificationCard = ({ notification }) => {
    return (
        <TouchableOpacity activeOpacity={0.7}
            className="flex-row items-center p-2 gap-x-2"
        >
            <Image source={{ uri: notification?.image }} className="w-12 h-12 rounded-full" />
            <View className="justify-between shrink grow">
                <Text className="text-base font-bold leading-5" numberOfLines={1}>{notification?.title}</Text>
                <Text className="text-sm text-gray-600 leading-6" numberOfLines={1}>{notification?.description}</Text>
            </View>
            <Icon type="material-community" name="chevron-right" color="#4b5563" size={24} />
        </TouchableOpacity>
    )
}

export default NotificationCard;