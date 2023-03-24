import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
} from "react-native";

import { Entypo } from '@expo/vector-icons'; 
import avatarImg from "../../../images/User.jpg";
import posterImg1 from "../../../images/PublikBG1.png";
import posterImg2 from "../../../images/PublikBG2.png";

import Posters from "../../../Components/Posters";

const posts = [
  {
    photo: posterImg1,
    name: "Ліс",
    lacotion: "Ivano-Frankivs'k Region, Ukraine",
    id: "111",
    comments: 0,
    likes: 0,
  },
  {
    photo: posterImg2,
    name: "Захід сонця на морі",
    lacotion: "Ukraine",
    id: "112",
    comments: 0,
    likes: 0,
  },
];

export default function PostScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 32, position: "relative" }}>
      <View style={{position: "absolute", top: 0, right: 30, zIndex: 1000,}}>
        <Entypo name="log-out" size={24} color="#BDBDBD" />
        </View>
      <View style={styles.container}>
        <Image source={avatarImg} style={styles.photo} />
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      <SafeAreaView>
          <FlatList
          data={posts}
          renderItem={({ item }) => <Posters item={item} />}
          keyExtractor={(item) => item.id}
          style={{ paddingTop: 32, gap: 34 }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    marginHorizontal: 16,
  },
  photo: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  userName: {
    fontFamily: "RobotoBold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "RobotoReg",
    fontSize: 11,
    lineHeight: 13,
  },
});