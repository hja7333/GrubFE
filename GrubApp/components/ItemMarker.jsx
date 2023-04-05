import { View, Text, StyleSheet } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Svg, Image as ImageSvg } from "react-native-svg";

export const ItemMarker = ({ item, navigation, setIsModalVisible, setSelectedItem, selectedItem }) => {
  const { user } = useContext(UserContext);

  return (
    <View>
      <Marker
        title={item.name}
        coordinate={{
          latitude: item.location.coordinates[1],
          longitude: item.location.coordinates[0],
        }}
        onPress={() => {
          setSelectedItem(item)
          setIsModalVisible(true)
        }}
        pinColor="#9C0444"
      >
      </Marker>
    </View>
  );
};

