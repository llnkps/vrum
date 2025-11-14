import { ToastAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export const useToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Toast.show({
        type,
        text1: message,
      });
    }
  };

  return { showToast };
};
