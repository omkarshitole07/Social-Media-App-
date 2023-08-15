import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { signOut, onAuthStateChanged  } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


function ProfileScreen({ navigation }) {

    const [userData, setUserData] = useState();
    const [uid, setUID] = useState();

    async function getData() {
        getUID();

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUserData(docSnap.data());
            console.log("Document data:", docSnap.data());
        } else {
        // docSnap.data() will be undefined in this case
            console.log("No such document!");
    }
    };

    async function getUID() {
        setUID(auth.currentUser.uid);
        console.log(uid);
    };


    useEffect(() => {
        getUID();
        getData();
    });

    signOutHandler = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Error: ' + errorMessage)
        }).finally(() => {
            navigation.navigate('Login')
        });
        

    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Image
                    source={{ uri: 'https://pixy.org/src2/573/thumbs350/5734382.jpg' }}
                    style={styles.logo}
                />
            </View>

            <View>
                <Text style={styles.textUserName}>{userData && userData.firstName} {userData && userData.lastName}</Text>
            </View >

            <Text style={styles.aboutUser}>
                {userData && userData.status}
            </Text>
        

            <View style={styles.userInfoWrapper}>
                <View style={styles.userInfoItem}>
                    <Text style={styles.userInfoTitle}>{userData && userData.posts}</Text>
                    <Text style={styles.userInfoSubTitle}>Posts</Text>
                </View>
                <View style={styles.userInfoItem}>
                    <Text style={styles.userInfoTitle}>{userData && userData.followers}</Text>
                    <Text style={styles.userInfoSubTitle}>Followers</Text>
                </View>
                <View style={styles.userInfoItem}>
                    <Text style={styles.userInfoTitle}>{userData && userData.following}</Text>
                    <Text style={styles.userInfoSubTitle}>Following</Text>
                </View>
            </View>

            <View>
                <View style={styles.userInfoItem}>
                    <Text style={styles.userInfoTitle}>Biography</Text>
                    <Text style={styles.text}>{userData && userData.bio}</Text>
                </View>
                <View style={styles.userInfoItem}>
                    <Text style={styles.userInfoTitle}>Details</Text>
                    <Text style={styles.text}>City:                 {userData && userData.currentCity}</Text>
                    <Text style={styles.text}>Education:       {userData && userData.education}</Text>
                </View>
                <View style={styles.userInfoItem}>
                    <TouchableOpacity style={styles.userBtnEdit} onPress={() => { navigation.navigate('EditProfile') }}>
                        <Text style={styles.userBtnTxt}>Edit Profile</Text>
                    </TouchableOpacity>
                 </View>
                <View style={styles.userInfoItem}>
                    <TouchableOpacity style={styles.userBtnLogout} onPress={() => { signOutHandler() }}>
                        <Text style={styles.userBtnTxtLogout}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    );

}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        backgroundColor: 'white'
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'cover',
    },
    buttonContainer: {
        marginTop: 25,
    },
    text: {
        textAlign: 'justify'
    },

    textUserName: {
        textAlign: 'justify',
        fontSize: 22
    },

    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center', marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    userBtnEdit: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#9933FF',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        margin: 15,
    },
    userBtnLogout: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnTxt: {
        color: '#9933FF',
    },
    userBtnTxtLogout: {
        color: 'red',
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
})
