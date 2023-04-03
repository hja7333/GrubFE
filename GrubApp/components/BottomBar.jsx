import { View, StyleSheet, Button, Text } from "react-native";

export const BottomBar = ({ page, setPage, totalItems }) => {
  const numPages = Math.floor(totalItems / 10);
  const changePage = (delta) => {
    setPage((currPage) => {
      return currPage + delta;
    });
  };
  return (
    <View style={styles.container}>
      <Button
        title="<---"
        style={styles.button}
        disabled={page === 0}
        onPress={() => changePage(-1)}
      />
      <Text>
        Page {page + 1} / {numPages + 1}
      </Text>
      <Button
        title="--->"
        style={styles.button}
        disabled={page === numPages}
        onPress={() => changePage(1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#94d2a9",
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
});
