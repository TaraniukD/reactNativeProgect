import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
// import * as MediaLibrary from "expo-media-library";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
// import CameraScreen from "../../../Components/Camera";
import { styles } from './CreatePosts.styled';

const initialPosts =
{
  photo: '',
  name: "name",
  lacotion: "location",
  id: "1",
  comments: 0,
  likes: 0,
};


export function CreatePosts({ navigation }) {
    const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [newPoster, setNewPoster] = useState(initialPosts)
    
    const takePhoto = async () => {
      const photo = await camera.takePictureAsync();
        setPhoto(photo.uri);
  }
  
  const sentPhoto = async () => {
    navigation.navigate("Home", { newPoster });
    const location = await Location.getCurrentPositionAsync();
    console.log(location);
  }

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={{ marginBottom: 32 }}><View style={{ borderRadius: 8, borderWidth: 1, backgroundColor: "#000000", height: 240, justifyContent: "center"}}>
            <Camera style={styles.camera} ref={setCamera}>
                {photo && (
                <View style={styles.takePhotoContainer}>
                    <Image source={{ uri: photo }} style={{ height: 150,
                      width: 270, borderRadius: 8,}} />
                </View>
                )}
                <TouchableOpacity onPress={takePhoto} style={styles.snap}>
                    <MaterialIcons name="camera" size={35} color="#BDBDBD" />
                </TouchableOpacity>
          </Camera>
          </View>
        <TouchableOpacity  activeOpacity={0.8} style={styles.loadImg}>
            <Text style={styles.text}>Завантажте фото</Text>
          </TouchableOpacity>
            <TextInput placeholder="Назва..." style={styles.input} />
          </View>
          <View style={{ marginBottom: 32, }}>
            <TextInput
              placeholder="Локація..."
              style={{ ...styles.input, paddingLeft: 28 }}
              value={newPoster.name}
              onChangeText={(value) => setNewPoster((prevState) => ({...prevState, name: value})) }
            />
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={{ position: "absolute", }}
            />
          </View>
          <TouchableOpacity
            // onPress={onSubmitForm}
            style={styles.btn}
            activeOpacity={0.8}
            onPress={sentPhoto}
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