import { Picker } from '@react-native-picker/picker';
import { Modal, Pressable, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export const PickerModal = ({
  visible,
  onClose,
  title,
  options,
  selectedValue,
  onValueChange,
}: {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}) => {
  const colorScheme = useColorScheme();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/50">
        <Pressable className="flex-1" onPress={onClose} />
        <View className={`rounded-t-3xl p-0 ${colorScheme === 'dark' ? 'bg-surface-dark' : 'bg-surface'}`}>
          <View className="border-border-DEFAULT/10 border-b p-4">
            <View className="flex-row items-center justify-between">
              <Text className={`text-lg font-semibold ${colorScheme === 'dark' ? 'text-font-dark' : 'text-font'}`}>{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <Text className="text-base font-medium text-background-brand-bold">Готово</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Picker
            selectedValue={selectedValue}
            onValueChange={value => {
              onValueChange(value);
              onClose();
            }}
            style={{
              color: colorScheme === 'dark' ? '#BFC1C4' : '#292A2E',
            }}
          >
            {options.map(option => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );
};
