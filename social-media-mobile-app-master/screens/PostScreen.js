import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import * as ExpoImagePicker from "expo-image-picker";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, Timestamp, } from "firebase/firestore";
//import storage from '@react-native-firebase/storage';

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const PostScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [uid, setUID] = useState("12345667");
  const [post, setPost] = useState(null);

  const takePhotoFromCamera = async () => {
    let imageResult = await ExpoImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!imageResult.canceled) {
      console.log(imageResult);
      setImage(imageResult.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }

  };
  const submitPost = async () => {
    await uploadImageAsync(image);
    console.log("Image Url: ", image);
    console.log("Post: ", post);

    //getUID();
    const postRef = await addDoc(collection(db, "posts"), {
      userId: uid,
      post: post,
      postImg: "Image URL",
      postTime: Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
    });
    console.log("Document written with ID: ", postRef.id);
    setImage(null);
    setPost(null);
    navigation.navigate("Home");
  };
  
  async function getUID() {
    setUID(auth.currentUser.uid);
    console.log(uid);
  }

  async function uploadImageAsync(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    let filename = uri.substring(uri.lastIndexOf("/") + 1);
    console.log(filename);
    let URL = "images/" + filename;
    const imagesRef = ref(storage, URL);
     uploadBytes(imagesRef, blob).then((snapshot) => {
      console.log("uploaded the file");
      console.log(snapshot);
    }); 
    
    //  var ref = await storage.ref().child("my-image");
    // return ref.put(blob);

  
  }

  const choosePhotoFromLibrary = async () => {
    let imageResult = await ExpoImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    console.log(imageResult);
    if (!imageResult.canceled) {
      console.log(imageResult);
      setImage(imageResult.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.InputWrapper}>
      <TouchableOpacity style={styles.SubmitBtn} onPress={submitPost}>
        <Text style={styles.SubmitBtnText}>Post</Text>
      </TouchableOpacity>
        {image != null ? (
          <Image source={{ uri: image }} style={styles.AddImage} />
        ) : null}
        <TextInput
          style={styles.InputField}
          placeholder="What's on your mind"
          multiline
          numberOfLines={2}
          value={post}
          onChangeText={(content) => setPost(content)}
        ></TextInput>
        
      </View>
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take photo"
          onPress={takePhotoFromCamera}
        >
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose photo"
          onPress={choosePhotoFromLibrary}
        >
          <Icon name="images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  InputWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#2e64e515",
  },
  InputField: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    textAlign: "center",
    width: "90%",
    marginBottom:10,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  SubmitBtn: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#2e64e515",
    borderRadius: 5,
    padding: 10,
    marginBottom:10
  },
  SubmitBtnText: {
    fontSize: 18,
    fontFamily: "Arial",
    fontWeight: "bold",
    color: "#2e64e5",
  },
  AddImage: {
    width: "100%",
    height: 300,
    marginBottom: 30,
  },
});

export default PostScreen;
