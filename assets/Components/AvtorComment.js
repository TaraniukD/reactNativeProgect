import { Image, Text, View, StyleSheet } from "react-native";

export const AvtorComment = ({ avatar }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrap}>
              <Text style={styles.commentText}>A fast 50mm like f1.8 would help with the bokeh.
                  I’ve been using primes as they tend to get a bit sharper images.</Text>
        <Text style={styles.commentTime}>09 июня, 2020 | 09:14</Text>
          </View>
          <Image source={avatar} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  image: {
    width: 28,
    height: 28,
  },
    textWrap: {
    height: 80,
    flex: 1,
    backgroundColor: "#00000008",
    padding: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    fontFamily: "RobotoReg",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentTime: {
    fontFamily: "RobotoReg",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
    color: "#BDBDBD",
  },
});