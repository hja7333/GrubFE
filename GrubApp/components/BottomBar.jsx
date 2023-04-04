import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

export const BottomBar = ({ page, setPage, totalItems }) => {
  const numPages = Math.floor(totalItems / 10);
  const changePage = (delta) => {
    setPage((currPage) => {
      return currPage + delta;
    });
  };
  return (
    <View style={styles.container}>
      {/* <Button
        title="<---"
        
        disabled={page === 0}
        onPress={() => changePage(-1)}
      /> */}
      <TouchableOpacity
        style={styles.button}
        disabled={page === 0}
        onPress={() => changePage(-1)}
      >
        <Image
          style={styles.image}
          source={require("../assets/leftArrow.png")}
        ></Image>
      </TouchableOpacity>
      <Text>
        Page {page + 1} / {numPages + 1}
      </Text>
      {/* <Button
        title="--->"
        
        disabled={page === numPages}
        onPress={() => changePage(1)}
      /> */}
      <TouchableOpacity
        style={styles.button}
        disabled={page === numPages}
        onPress={() => changePage(1)}
      >
        <Image
          style={styles.image}
          source={require("../assets/rightArrow.png")}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ECC763",
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {},
  image: {
    maxHeight: 20,
    maxWidth: 20,
  },
});
