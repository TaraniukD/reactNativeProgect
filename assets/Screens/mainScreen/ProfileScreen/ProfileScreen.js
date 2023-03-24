import {
  Text,
  View,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";

import { AntDesign, Feather } from "@expo/vector-icons";
import avatarImg from "../../../images/User.jpg";
import posterImg1 from "../../../images/PublikBG1.png";
import Posters from "../../../Components/Posters";

import { styles } from "./ProfileScreen.styled"

const posts = [
  {
    photo: posterImg1,
    name: "Ліс",
    lacotion: "Ivano-Frankivs'k Region, Ukraine",
    id: "111",
    comments: 0,
    likes: 3,
  },
];

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBG}
        source={require("../../../images/photoBG.png")}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={50}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.form}>
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={{
                alignSelf: "flex-end",
                marginBottom: 46,
                paddingRight: 16,
              }}
            />
            <View style={styles.photoDef}>
              <Image
                source={avatarImg}
                style={{ width: "100%", height: "100%", borderRadius: 16 }}
              />
              <AntDesign name="closecircleo" size={24} color="#BDBDBD" style={styles.addPhotoIcon}/>
            </View>
            <Text style={styles.title}>Natali Romanova</Text>
            <SafeAreaView>
              <FlatList
                data={posts}
                renderItem={({ item }) => <Posters item={item} />}
                keyExtractor={(item) => item.id}
                style={{ gap: 34 }}
              />
            </SafeAreaView>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

