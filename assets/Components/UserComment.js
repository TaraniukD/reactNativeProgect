import { Image, Text, View, StyleSheet } from "react-native";

export const UserComment = ({ avatar }) => {
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.commentText}>Really love your most recent photo.
          I’ve been trying to capture the same thing for a few months and would love some tips!</Text>
        <Text style={styles.commentTime}>09 июня, 2020 | 08:40</Text>
      </View>
      
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
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
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