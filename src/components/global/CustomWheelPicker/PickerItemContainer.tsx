import {
  PickerItem,
  RenderItemContainerProps,
  usePickerItemHeight,
  useScrollContentOffset,
} from "@quidone/react-native-wheel-picker";
import React, { memo, useMemo } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";

const PickerItemContainer = ({
  index,
  item,
  faces,
  renderItem,
  itemTextStyle,
  enableScrollByTapOnItem,
  readOnly,
  listRef,
}: RenderItemContainerProps<PickerItem<any>>) => {
  const offset = useScrollContentOffset(); // <-- this should be a SharedValue
  const height = usePickerItemHeight();

  const { opacity } = useMemo(() => {
    const inputRange = faces.map((f) => height * (index + f.index));
    return {
      opacity: offset.interpolate({
        inputRange,
        outputRange: faces.map((x) => x.opacity),
        extrapolate: "clamp",
      }),
    };
  }, [faces, height, index, offset]);

  const renderAnimatedView = () => (
    <Animated.View style={[{ height, opacity: opacity }]}>
      {renderItem({
        item,
        index,
        itemTextStyle,
      })}
    </Animated.View>
  );

  if (!enableScrollByTapOnItem || readOnly) {
    return renderAnimatedView();
  }

  const scrollToItem = () =>
    listRef.current?.scrollToIndex({
      index,
      animated: true,
    });

  return (
    <TouchableWithoutFeedback onPress={scrollToItem}>
      {renderAnimatedView()}
    </TouchableWithoutFeedback>
  );
};

export default memo(PickerItemContainer);
