import { View, Text, Image } from "react-native";
import { WebView } from "react-native-webview";
import { Marker, Callout } from "react-native-maps";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Svg, Image as ImageSvg } from "react-native-svg";

export const ItemMarker = ({ item }) => {
  const { user } = useContext(UserContext);

  return (
    <View>
      <Marker
        title={item.name}
        coordinate={{
          latitude: item.location.coordinates[1],
          longitude: item.location.coordinates[0],
        }}>
          <Callout>
          
              <View>
                <Svg width={100} height={100}>
                  <ImageSvg
                    width={"100%"}
                    height={"100%"}
                    preserveAspectRatio="xMidYMid slice"
                    href={{ uri: item.item_url }}
                  />
                </Svg>
                {/* <Text>
                <WebView
                  source={{ uri: item.item_url }} resizeMode='cover' 
                  style={{ width: 100, height: 100, }}
                />
              </Text> */}
              </View>
              <View>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>
                <Text>contact: {user.user.contact}</Text>
              </View>
          
          </Callout>
      </Marker>
    </View>
  );
};
