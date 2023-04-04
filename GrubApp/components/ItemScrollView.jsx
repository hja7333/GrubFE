import { ScrollView, Animated, StyleSheet, View, Image, Text } from "react-native";

export const ItemScrollView = ({ items }) => {
  return (
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            {items.map((item, index) => {
                return (
                    <View style={styles.itemCard} key={index}>
                        <Image style={styles.itemImage} source={item.item_url}
                        resizeMode="cover"/>
                        <View style={styles.cardTextContainer}>
                        <Text numberOfLines={1}>{item.name}</Text>
                        <Text numberOfLines={2}>{item.description}</Text>
                        </View>
                    </View>
                )
            })}
            </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
    scrollView: {

    },
    itemCard: {

    },
    itemImage: {},
    cardTextContainer: {}
})