// import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
// import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { TouchableWithoutFeedback, KeyboardAvoidingView, ImageBackground, Text, View, TextInput, Image, TouchableOpacity, Keyboard } from 'react-native';
import { styles } from './RegistrationScreen.styled';
import { useDispatch } from 'react-redux';
import { authSignUpUser } from '../../../../redux/auth/authOperations';

import { AntDesign } from '@expo/vector-icons'; 

export const initialState = {
  userName: '',
  userEmail: '',
  password: '',
};

export default function RegistrationScreens({navigation}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const BgImage = {uri: 'https://pibig.info/uploads/posts/2022-11/1669841130_1-pibig-info-p-altai-oboi-na-telefon-krasivo-1.jpg'};


  const formSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(state))
    setState(initialState);
  }

    const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss(); 
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={BgImage}
        >
          
    <KeyboardAvoidingView style={{ ...styles.registarationContainer, paddingBottom: isShowKeyboard ? 10 : 45 }}>
    <View style={styles.imgContainer}>
      <Image
        style={styles.imgForm}
        source={require('../../../images/avatar.png')}>
              </Image>
                 <AntDesign
                name="pluscircleo"
                size={24}
                color="#BDBDBD"
                style={styles.addIcon}
              />
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Реєстрація</Text>
    </View>
  
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={'Логін'}
        value={state.userName}
        onFocus={() => setIsShowKeyboard(true)}
        onChangeText={(value) => setState((prevState) => ({ ...prevState, userName: value }))}
        />
      <TextInput
        style={styles.input}
        placeholder={'Електронна пошта'}
        value={state.userEmail}
        onFocus={() => setIsShowKeyboard(true)}
        onChangeText={(value) => setState((prevState) => ({...prevState, userEmail: value})) }/>
      <TextInput style={styles.input}
        placeholder={'Пароль'}
        secureTextEntry={true}
        value={state.password}
        onFocus={() => setIsShowKeyboard(true)}
        onChangeText={(value) => setState((prevState) => ({...prevState, password: value})) }/>
      </View>
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={formSubmit}>
        <Text style={styles.btnText}> Зареєструватись</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => navigation.navigate("Login", { sessionId: 45, userId: "22e24" })}>
      <Text>Вже є акаунт?<Text style={styles.loginText}> Увійти</Text></Text>
    </TouchableOpacity>

          </KeyboardAvoidingView>
           </ImageBackground>
      {/* <StatusBar style="auto" /> */}
    </View>
    </TouchableWithoutFeedback>
  );
}
