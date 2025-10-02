import { CustomTheme } from "@/theme";
import WheelPicker, {
  OnValueChanged,
  OnValueChanging,
  PickerItem,
  RenderItemContainer,
  RenderOverlay,
} from "@quidone/react-native-wheel-picker";
import { KeyExtractor } from "@quidone/react-native-wheel-picker/dest/typescript/base/types";
import { useTheme } from "@react-navigation/native";
import React, { memo } from "react";
import { Vibration } from "react-native";
import OverlayComponent from "./OverlayComponent";
import PickerItemContainer from "./PickerItemContainer";

type props<ItemT extends PickerItem<any>> = {
  data: ReadonlyArray<ItemT>;
  value: ItemT["value"];
  onValueChanging?: OnValueChanging<ItemT>;
  onValueChanged?: OnValueChanged<ItemT>;
  keyExtractor?: KeyExtractor<ItemT>;
};

// render our item container to not have the default animation
const renderItemContainer: RenderItemContainer<any> = ({ key, ...props }) => (
  <PickerItemContainer key={key} {...props} />
);

const CustomizedPicker = (props: props<T>) => {
  const { data, value, onValueChanged, onValueChanging, keyExtractor } = props;
  const theme = useTheme() as CustomTheme;

  const renderOverlay: RenderOverlay = (props) => (
    <OverlayComponent {...props} />
  );

  return (
    <WheelPicker
      value={value}
      renderItemContainer={renderItemContainer}
      renderOverlay={renderOverlay}
      data={data}
      onValueChanged={onValueChanged}
      onValueChanging={(e) => {
        Vibration.vibrate(1);
        if (onValueChanging) onValueChanging(e);
      }}
      visibleItemCount={7}
      itemTextStyle={{
        color: theme.colors.text, // TODO: by some reasons theme colors doesn't work here
      }}
      overlayItemStyle={{
        borderColor: theme.colors.border,
        borderTopWidth: 1,
        borderBottomWidth: 1,
      }}
    />
  );
};

export default memo(CustomizedPicker);
