import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingTop: 32,
  },
  imgWrap: {
    position: "relative",
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  iconWrap: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60 / 2,
  },
  text: {
    // fontFamily: "RobotoReg",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    // placeholderTextColor: "#BDBDBD",
    // fontFamily: "RobotoReg",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingBottom: 15,
  },
  btn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 30,
  },
  btnText: {
    // fontFamily: "RobotoReg",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  deleteBtn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    alignSelf: "center",
    marginTop: "auto",
  },
});