import { CustomRectButton } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Text, View } from "react-native";

export const CheckboxRectButton = ({
  value,
  label,
  onPress,
}: {
  value: boolean;
  label: string;
  onPress: () => void;
}) => {
  const onClick = () => {
    onPress();
  };

  return (
    <CustomRectButton onPress={onClick}>
      <View className="flex-row items-center justify-between space-x-2">
        <Text className="text-font dark:text-font-dark">{label}</Text>
        <Checkbox value={value} onValueChange={onClick} />
      </View>
    </CustomRectButton>
  );
};
