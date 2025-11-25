import { LoaderIndicator } from '@/components/global/LoaderIndicator';
import { IconButton } from '@/components/ui/button';
import { useChatMessages } from '@/modules/messages/hooks/useChatMessages';
import { useChats } from '@/modules/messages/hooks/useChats';
import { MessageDTO } from '@/openapi/client';
import { useAuthContext } from '@/context/AuthContext';
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChatModal() {
  const router = useRouter();
  const theme = useTheme() as CustomTheme;
  const { user } = useAuthContext();

  const insets = useSafeAreaInsets();

  const { chatId } = useLocalSearchParams<{ chatId: string }>();

  const { chats } = useChats();
  const chat = chats.find(c => c.id?.toString() === chatId) || null;

  const { messages, sendMessage } = useChatMessages(chat);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSendMessage = useCallback(
    async (text: string) => {
      try {
        await sendMessage(text);
        setSelectedImage(null);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    },
    [sendMessage, selectedImage]
  );

  // Map API messages to Gifted Chat format
  const mappedMessages = messages.map((item: MessageDTO) => ({
    _id: item.id,
    text: item.text,
    createdAt: new Date(item.createdAt),
    image: item.image,
    user: {
      _id: item.user.email,
      name: item.user.email || `User ${item.user.id}`,
    },
  }));

  const onSend = (messagesArr: any) => {
    const text = messagesArr[0].text;
    handleSendMessage(text);
  };

  const renderSend = useCallback((props: any) => {
    return (
      <Send {...props} containerStyle={{ justifyContent: 'center', paddingHorizontal: 10 }}>
        {/* <IconButton
          iconName={'send'}
          iconSize={18}
          // appearance={messageText.trim() && !messagesLoading && !isSendingMessage ? 'primary' : 'secondary'}
          size="medium"
          // loading={isSendingMessage}
          // disabled={!messageText.trim() || messagesLoading}
          // onPress={onSend}
        /> */}
        <Ionicons name={'send'} size={18} color={theme.colors.primary} />
      </Send>
    );
  }, []);

  if (!chat) {
    return <LoaderIndicator />;
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        {/* Chat Header */}
        <View className="flex-row items-center border-b border-border p-4 dark:border-border-dark">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color={theme.colors.icon} />
          </TouchableOpacity>
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-gray-300">
            <Ionicons name="person" size={20} color={theme.colors.icon} />
          </View>
          <Text className="font-medium text-font dark:text-font-dark">User {chat.user1 === 0 ? chat.user2 : chat.user1}</Text>
        </View>
      </SafeAreaView>

      {/* {selectedImage && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
          <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.removeImageButton}>
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )} */}

      <GiftedChat
        messages={mappedMessages}
        inverted={false}
        user={{ _id: user!.email, name: 'Me' }}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={onSend}
        // imageStyle={{ height: 212, width: 212 }}
        renderBubble={(props: any) => RenderBubble(props, theme)}
        renderUsernameOnMessage
        renderAvatarOnTop
        renderInputToolbar={(props: any) => RenderInputToolbar(props)}
        renderMessageImage={(props: any) => RenderMessageImage(props)}
        renderSend={renderSend}
        // renderActions={() => RenderActions(pickImage)}
        alwaysShowSend={true}
        // minInputToolbarHeight={56}
        // onPressActionButton={handleEmojiPanel}
        scrollToBottomStyle={styles.scrollToBottomStyle}
        renderLoading={RenderLoading}
        bottomOffset={insets.bottom}
      />
    </View>
  );
}

const RenderLoading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" />
  </View>
);

const RenderBubble = (props: any, theme: CustomTheme) => {
  console.log(props);
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {},
        left: { backgroundColor: theme.colors.surface },
      }}
      textStyle={{ color: 'white' }}
    />
  );
};

const RenderMessageImage = (props: any) => (
  <View style={{ padding: 5 }}>
    <Image
      {...props}
      style={{
        width: 200,
        height: 200,
        borderRadius: 8,
        resizeMode: 'cover',
      }}
    />
  </View>
);

const RenderActions = (pickImage: () => void) => (
  <TouchableOpacity onPress={pickImage} style={styles.addImageIcon}>
    <Ionicons name="image" size={24} color="gray" />
  </TouchableOpacity>
);

const RenderInputToolbar = (props: any) => (
  // <View
  //   style={{
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     // marginBottom: 20,
  //     // backgroundColor: 'white',
  //   }}
  // >
  <InputToolbar
    {...props}
    // renderActions={() => RenderActions(handleEmojiPanel)}
    containerStyle={styles.inputToolbar}
    textInputStyle={styles.textInput}
    // optionTintColor="white"
  />
  // </View>
);

const styles = StyleSheet.create({
  addImageIcon: {
    borderRadius: 16,
    bottom: 8,
    height: 32,
    width: 32,
  },
  emojiBackgroundModal: {},
  emojiContainerModal: {
    height: 348,
    width: 396,
  },
  emojiIcon: {
    borderRadius: 16,
    bottom: 8,
    height: 32,
    marginLeft: 4,
    width: 32,
  },
  emojiModal: {},
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  inputToolbar: {
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    // paddingHorizontal: 8,
    // paddingVertical: 6,
    paddingHorizontal: 10,
    paddingTop: 8,
    backgroundColor: 'transparent',
    color: 'white',
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loadingContainerUpload: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollToBottomStyle: {
    // borderColor: colors.grey,
    borderRadius: 28,
    borderWidth: 1,
    bottom: 12,
    height: 56,
    position: 'absolute',
    right: 12,
    width: 56,
  },
  sendIconContainer: {
    alignItems: 'center',
    backgroundColor: 'red',
    // borderColor: colors.grey,
    borderRadius: 22,
    borderWidth: 0.5,
    height: 44,
    justifyContent: 'center',
    marginRight: 8,
    width: 44,
  },
  textInput: {
    color: 'white', // Change this to your desired text color
    fontSize: 16,
  },
});
