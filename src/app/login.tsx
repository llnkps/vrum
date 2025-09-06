import { Text, View, Pressable, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { randomUUID } from 'expo-crypto';

export default function Index() {
  const [loading, setLoading] = useState(false);
  // const { startSSOFlow } = useSSO();
  // const { createUser } = useStrapi();

  const handleSignInWithSSO = async (strategy: 'oauth_google' | 'oauth_apple') => {
    // try {
    //   const { createdSessionId, setActive, signUp } = await startSSOFlow({
    //     strategy,
    //   });

    //   // If sign in was successful, set the active session
    //   if (createdSessionId) {
    //     setActive!({ session: createdSessionId });

    //     const email = signUp?.emailAddress;
    //     const username = signUp?.emailAddress;
    //     const password = randomUUID();
    //     const id = signUp?.createdUserId;

    //     if (!email || !username || !password || !id) {
    //       throw new Error('Missing required fields');
    //     }

    //     const strapiUser = {
    //       email,
    //       username,
    //       password,
    //       clerkId: id,
    //     };

    //     await createUser(strapiUser);
    //   }
    // } catch (err) {
    //   // See https://clerk.com/docs/custom-flows/error-handling
    //   // for more info on error handling
    //   console.log(err);
    // }
  };

  return (
    <View className="">
      <Text>Hello world</Text>
      
    </View>
  );
}
