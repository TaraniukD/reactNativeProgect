import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";

import { useDispatch } from "react-redux";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './CreatePosts.styled';
import { uploadPhotoToServer } from "../../../../firebase/firebaseUtils";
import {uploadPostToServer, getPosts } from "../../../../redux/posts/postsOperations";

const initialPosts = {
  photo: "",
  title: "",
  location: {},
  locationDescr: "",
  comments: [],
  likes: 0,
};

export function CreatePosts({ navigation }) {
  const [posts, setPosts ] = useState(initialPosts);
  const [camera, setCamera] = useState(null)
   
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setPosts((prevS) => ({
        ...prevS,
        location: {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude
        },
      }))
    })();
  }, []);

    const downloadPhoto = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    dispatch(updateIsLoadingPhotoToServer(true));

    if (pickerResult.canceled === true) {
      return;
    }

    const source = pickerResult.assets[0].uri;
    const uploadedPhoto = await uploadPhotoToServer(source, "avatars");
    setFormData((prevS) => ({ ...prevS, photo: uploadedPhoto }));
    dispatch(updateIsLoadingPhotoToServer(false));
  };

  const takePhoto = async () => {    
    const photo = await camera.takePictureAsync();
    await MediaLibrary.createAssetAsync(photo.uri);
    const uploadPhoto = await uploadPhotoToServer(photo.uri, "postScreen");
    setPosts((prevS) => ({ ...prevS, photo: uploadPhoto }));
  }
  
  const sentPost = async () => {
    dispatch(uploadPostToServer(posts));
    dispatch(getPosts());
    clearForm();
    navigation.navigate("Home", { posts });
  };

    const clearForm = async () => {
    setPosts({
      title: "",
      locationDescr: "",
      photo: "",
      location: {},
    });
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={{ marginBottom: 32 }}><View style={{ borderRadius: 8, borderWidth: 1, backgroundColor: "#000000", height: 240, justifyContent: "center"}}>
            <Camera style={styles.camera} ref={setCamera}>
                {posts.photo && (
                <View style={styles.takePhotoContainer}>
                    <Image source={{ uri: posts.photo }} style={{ height: 150,
                      width: 270, borderRadius: 8,}} />
                </View>
                )}
                <TouchableOpacity onPress={takePhoto} style={styles.snap}>
                    <MaterialIcons name="camera" size={35} color="#BDBDBD" />
                </TouchableOpacity>
          </Camera>
          </View>
        <TouchableOpacity  activeOpacity={0.8} style={styles.loadImg} onPress={() => downloadPhoto()}>
            <Text style={styles.text}>Download photo</Text>
          </TouchableOpacity>
            <TextInput placeholder="Name..." style={styles.input}
              value={posts.title}
              onChangeText={(value) => setPosts((prevS) => ({ ...prevS, title: value }))} />
          </View>
          <View style={{ marginBottom: 32, }}>
            <TextInput
              placeholder="Location..."
              style={{ ...styles.input, paddingLeft: 28 }}
              value={posts.locationDescr}
              onChangeText={(value) => setPosts((prevS) => ({...prevS, locationDescr: value})) }
            />
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={{ position: "absolute", }}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={sentPost}
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