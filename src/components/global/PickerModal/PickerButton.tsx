import { Text, TouchableOpacity, useColorScheme } from 'react-native';

export const PickerButton = ({
  label,
  value,
  onPress,
  placeholder = 'Выберите...',
}: {
  label: string;
  value: string;
  onPress: () => void;
  placeholder?: string;
}) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        ${colorScheme ? 'border-border-input-dark bg-background-input-dark' : 'border-border-input bg-background-input'} 
        flex-row items-center justify-between rounded-xl border px-4 py-3
        active:opacity-70
      `}
    >
      <Text
        className={`text-base ${
          value ? (colorScheme ? 'text-font-dark' : 'text-font') : colorScheme ? 'text-font-subtlest-dark' : 'text-font-subtlest'
        }`}
      >
        {value || placeholder}
      </Text>
      <Text className={`text-lg ${colorScheme ? 'text-font-subtle-dark' : 'text-font-subtle'}`}>▼</Text>
    </TouchableOpacity>
  );
};
