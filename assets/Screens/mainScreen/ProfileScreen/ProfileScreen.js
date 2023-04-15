import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from "react-native";

import { AntDesign, Feather } from "@expo/vector-icons";
import Posters from "../../../Components/Posters";

import { styles } from "./ProfileScreen.styled"
import { authSignOutUser } from "../../../../redux/auth/authOperations";

export default function ProfileScreen({ navigation }) {
  const { posts } = useSelector((state) => state.posts);
  const { userName } = useSelector((state) => state.auth);
  const { avatar } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  
  const signOut = () => {
dispatch(authSignOutUser())
  }

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
            <TouchableOpacity onPress={signOut}>
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
            </TouchableOpacity>
            <View style={styles.photoDef}>
              <Image
                source={{uri: avatar}}
                style={{ width: "100%", height: "100%", borderRadius: 16 }}
              />
              <AntDesign name="closecircleo" size={24} color="#BDBDBD" style={styles.addPhotoIcon}/>
            </View>
            <Text style={styles.title}>{userName}</Text>
            {posts.length === 0 && <View><Text>Create your first poster!</Text></View>}
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

