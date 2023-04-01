import { View, Text, Image} from "react-native";
import { WebView } from 'react-native-webview';
import { Marker, Callout } from "react-native-maps";
import { useState } from "react";

export const ItemMarker = ({ item }) => {
  const [contactNum, setContactNum] = useState("");

  return (
    <View>
      <Marker title={item.name} coordinate={item.location}>
        <Callout>
          <View>
            <View>
              <Text>
                <WebView
                  source={{ uri: item.item_url }} resizeMode='cover' 
                  style={{ width: 100, height: 100, }}
                />
              </Text>
            </View>
            <View>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>contact: {contactNum}</Text>
            </View>
          </View>
        </Callout>
      </Marker>
    </View>
  );
};
