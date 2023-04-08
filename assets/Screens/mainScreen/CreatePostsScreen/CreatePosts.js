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

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useDispatch } from "react-redux";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './CreatePosts.styled';
import { storage } from "../../../../firebase/config";
import {uploadPostToServer, getPosts } from "../../../../redux/posts/postsOperations";

const initialPosts = {
  photo: "",
  tittle: "",
  location: {},
  comments: [],
  likes: 0,
};

export function CreatePosts({ navigation }) {
  const [posts, setPosts ] = useState(initialPosts);
  const [camera, setCamera] = useState(null);
  const [location, setLocation] = useState(null);
  const [snap, setSnap] = useState(null);
  const [tittle, setTittle] = useState('');
  const [newPoster, setNewPoster] = useState('');
  
  const dispatch = useDispatch();

  console.log(posts);

  const takePhoto = async () => {    
    const photo = await camera.takePictureAsync();
    await MediaLibrary.createAssetAsync(photo.uri);
    const uploadPhoto = await uploadPhotoToServer(photo.uri, "postScreen");
    setPosts((prevS) => ({ ...prevS, photo: uploadPhoto }));
    // setSnap(photo.uri);
    // const location = await Location.getCurrentPositionAsync();
  }
  
  const sentPhoto = async () => {
    const id = Date.now();
    setPosts((prevS) => ({ ...prevS, tittle: tittle }));
    dispatch(uploadPostToServer(posts));
    dispatch(getPosts());
    navigation.navigate("Home", { newPoster });
    // Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setPosts((prevS) => ({
        ...prevS,
        location: {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude}
      }))
      setLocation(coords);
    })();
  }, []);

   useEffect(() => {
     setPosts((prevS) => ({ ...prevS, photo: "", }));
     (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const uploadPhotoToServer = async ( photo, screenName) => {
    const { uri } = await ImageManipulator.manipulateAsync(
      photo,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    const response = await fetch(uri);
    const photoFile = await response.blob();
    const uniquePostId = Date.now().toString();

    const storageRef =
      screenName === "postScreen"
        ? ref(storage, `postsImages/post_${uniquePostId}`)
        : ref(storage, `avatarPhoto/avatar_${uniquePostId}`);

    try {
      await uploadBytesResumable(storageRef, photoFile);
    
      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
    } catch (error) {
      console.log(error);
    }
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
                    <Image source={{ uri: snap }} style={{ height: 150,
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
            <TextInput placeholder="Назва..." style={styles.input} onChangeText={setTittle} />
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