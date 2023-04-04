import { View, Text, StyleSheet } from "react-native";
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
        }}
      >
        <Callout tooltip>
          <View style={styles.bubble}>
            <Svg width={160} height={100}>
              <ImageSvg
                width={"100%"}
                height={"100%"}
                preserveAspectRatio="xMidYMid slice"
                href={{ uri: item.item_url }}
              />
            </Svg>

            <View style={styles.textContainer}>
              <Text style={styles.itemName}>
                {" "}
                <Text style={styles.wordBold}>Item: </Text>
                {item.name}
              </Text>
              <Text style={styles.itemDescription}>
                {" "}
                <Text style={styles.wordBold}>Description: </Text>
                {item.description}
              </Text>
              <Text style={styles.itemContact}>
                {" "}
                <Text style={styles.wordBold}>Contact: </Text>
                {user.user.contact}
              </Text>
            </View>
          </View>
        </Callout>
      </Marker>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    width: 180,

    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#def9ef",
    borderRadius: 6,
    borderColor: "black",
    borderWidth: 0.7,
    padding: 10,
  },
  wordBold: {
    fontWeight: "bold",
    color: "black",
  },
  textContainer: {},
  itemName: {
    borderColor: "black",

    borderBottomWidth: 0.5,
    marginBottom: 3,
    marginTop: 2,
    paddingBottom: 1,
  },
  itemDescription: {
    borderColor: "black",
    borderBottomWidth: 0.5,
    marginBottom: 3,
    marginTop: 2,
    paddingBottom: 1,
  },
  itemContact: {
    marginBottom: 5,

    // paddingBottom: 1,
  },
});
