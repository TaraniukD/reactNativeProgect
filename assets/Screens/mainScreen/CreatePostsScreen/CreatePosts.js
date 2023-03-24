import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// import { Camera } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";
import { FontAwesome, Feather } from "@expo/vector-icons";
import CameraScreen from "../../../Components/Camera";
import { styles } from './CreatePosts.styled';

export function CreatePosts() {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.imgWrap}>
           <CameraScreen />
            {/* <TouchableOpacity
              style={styles.iconWrap}
              activeOpacity={0.8}
            >
              <FontAwesome name="camera" size={30} color="#BDBDBD" />
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity style={{ marginBottom: 48 }} activeOpacity={0.8}>
            <Text style={styles.text}>Завантажте фото</Text>
          </TouchableOpacity>
          <View style={{ marginBottom: 32 }}>
            <TextInput placeholder="Назва..." style={styles.input} />
          </View>
          <View style={{ marginBottom: 32, position: "relative" }}>
            <TextInput
              placeholder="Локація..."
              style={{ ...styles.input, paddingLeft: 28 }}
            />
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={{ position: "absolute" }}
            />
          </View>
          <TouchableOpacity
            // onPress={onSubmitForm}
            style={styles.btn}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Опублікувати</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.deleteBtn}>
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}