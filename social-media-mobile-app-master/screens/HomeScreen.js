// Import required modules from react-native and styled-components
import * as React from 'react';
import { View, Text, FlatList} from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from "../firebase"

import styled from 'styled-components';

// Import PostCard component
import PostCard from '../components/PostCard';

function HomeScreen({ navigation }) {
  signOutHandler = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.navigate('SignIn')
    }).catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Error: '+ errorMessage)
    });
  }

  // Create an array of posts
  const Posts = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../assets/users/user-3.jpg'),
      postTime: '4 mins ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-3.jpg'),
      liked: true,
      likes: '14',
      comments: '5',
    },
    {
      id: '2',
      userName: 'John Doe',
      userImg: require('../assets/users/user-1.jpg'),
      postTime: '2 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '8',
      comments: '0',
    },
    {
      id: '3',
      userName: 'Ken William',
      userImg: require('../assets/users/user-4.jpg'),
      postTime: '1 hours ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-2.jpg'),
      liked: true,
      likes: '1',
      comments: '0',
    },
    {
      id: '4',
      userName: 'Selina Paul',
      userImg: require('../assets/users/user-6.jpg'),
      postTime: '1 day ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: require('../assets/posts/post-img-4.jpg'),
      liked: true,
      likes: '22',
      comments: '4',
    },
    {
      id: '5',
      userName: 'Christy Alex',
      userImg: require('../assets/users/user-7.jpg'),
      postTime: '2 days ago',
      post:
        'Hey there, this is my test for a post of my social app in React Native.',
      postImg: 'none',
      liked: false,
      likes: '0',
      comments: '0',
    },
  ];

  return (
    <Container>
      <FlatList
            data={Posts}
            renderItem={({item}) => (
              <PostCard
                item={item}
                // onDelete={handleDelete}
                // onPress={() =>
                //   navigation.navigate('HomeProfile', {userId: item.userId})
                // }
              />
            )}
            keyExtractor={(item) => item.id}
            // ListHeaderComponent={ListHeader}
            // ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
      />
    </Container>
  );

}
export default HomeScreen;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #fff;
  padding: 20px;
`;

