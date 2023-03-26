import {
  View,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import defPage from "../../../images/PublikBG1.png";
import userImg from "../../../images/Avatar1.png";
import avtorImg from "../../../images/Avatar2.png";
import { UserComment } from "../../../Components/UserComment";
import { AvtorComment } from "../../../Components/AvtorComment";

import { styles } from './CommentsScreen.styled';

export default function CommentsScreen() {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.container}>
        <Image source={defPage} style={styles.photo} />
       
        <UserComment avatar={userImg} />
         
        <AvtorComment avatar={avtorImg} />
        
        <UserComment avatar={userImg} />
        
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder="Write comment..."
            placeholderColor=" #BDBDBD"
          />
          <View style={styles.inputBtn}>
            <Feather name="arrow-up" size={24} color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );
}