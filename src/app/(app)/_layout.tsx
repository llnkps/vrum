import { Redirect, Slot, useSegments } from 'expo-router';
import { Text } from 'react-native';

const Layout = () => {
  const { isSignedIn } = { isSignedIn: true }; // TODO: Replace with your auth logic
  const segments = useSegments();
  const inAuthGroup = segments[1] === '(authenticated)';

  // Protect the inside area
  if (!isSignedIn && inAuthGroup) {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <Slot />
    </>
  );
};

export default Layout;
