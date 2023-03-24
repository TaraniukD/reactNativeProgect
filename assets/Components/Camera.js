import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { FontAwesome, Feather } from "@expo/vector-icons";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
          >
              {/* {cameraRef && (
                    <View style={styles.takePhotoContainer}>
                    <Image source={{ uri: cameraRef }} style={{ height: 200,
                      width: 200,}} />
                </View>
                )} */}
        <View style={styles.photoView}>
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
              }
            }}
          >
           <FontAwesome name="camera" size={30} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },

  flipContainer: {
    flex: 0.2,
    alignSelf: "flex-end",
  },

    button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60 / 2,    },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});






// import React, { useState } from "react";
// import {
//   View,
//     StyleSheet,
//     Text, Image,
// } from "react-native";
// import { Camera } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";
// import { MaterialIcons } from '@expo/vector-icons';
// import { TouchableOpacity } from "react-native-gesture-handler";

// export default function CameraScreen() {
//     const [camera, setCamera] = useState(null);
//     const [photo, setPhoto] = useState(null);
    
//     const takePhoto = async () => {
//         const photo = await camera.takePictureAsync();
//         setPhoto(photo.uri);
//     }
//     return (
//         <View style={styles.container}>
//             <Camera style={styles.camera} ref={setCamera}>
//                 {photo && (
//                     <View style={styles.takePhotoContainer}>
//                     <Image source={{ uri: photo }} style={{ height: 200,
//                       width: 200,}} />
//                 </View>
//                 )}
//                 <TouchableOpacity onPress={takePhoto} style={styles.snap}>
//                     <MaterialIcons name="camera" size={35} color="#BDBDBD" />
//                 </TouchableOpacity>
//         </Camera>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // justifyContent: "center",
//     },
//     camera: {
//         alignItems: "center",
//         height: 360,
//         marginTop: 50,
//         justifyContent: "flex-end",
//     },
//     snap: {
//         width: 50,
//         height: 50,
//         borderWidth: 2,
//         borderColor: "#BDBDBD",
//         borderRadius: 50,
//         justifyContent: "center",
//         alignItems: "center",
//         marginBottom: 10,
//         // marginTop: 300,
//     }, 
//     takePhotoContainer: {
//         position: "absolute",
//         top: 50,
//         left: 10,
//         borderColor: "#fff",
//         borderWidth: 1,
       
//     }
// })