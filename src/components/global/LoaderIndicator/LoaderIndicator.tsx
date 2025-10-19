import { ActivityIndicator, View } from 'react-native';

export const LoaderIndicator = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

LoaderIndicator.displayName = 'LoaderIndicator';
