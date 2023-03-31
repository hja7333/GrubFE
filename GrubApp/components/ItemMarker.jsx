import { View, Text, Image} from "react-native";
import { Marker, Callout } from "react-native-maps";

export const ItemMarker = ({ item, setSelectedItem }) => {
  const handlePress = () => {
    setSelectedItem(item);
  };
  console.log(item.item_url, "<<< item url")
  return (
    <View>
    <Marker title={item.name} coordinate={item.location} onPress={handlePress}>
      <Callout>
        <View>
            <View>
          <Image
            source={{ uri: item.item_url, width: 100, height: 100 }}
            // style={{ width: 100, height: 100 }}
          />
          </View>
          <View><Text>{item.name}</Text>
          <Text>{item.description}</Text>
          </View>
        </View>
      </Callout>
    </Marker>
    </View>
  );
};
