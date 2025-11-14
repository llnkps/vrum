import React, { memo } from 'react';
import { type StyleProp, type ViewStyle, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';

type OverlayProps = {
  itemHeight: number;
  pickerWidth: number | 'auto' | `${number}%`;
  overlayItemStyle: StyleProp<ViewStyle> | undefined;
  label?: string;
};

const Overlay = ({ itemHeight, overlayItemStyle, label }: OverlayProps) => {
  const theme = useTheme() as CustomTheme;

  const displayLabel = label ? `${label}` : '';

  const themedStyles = StyleSheet.create({
    labelText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
  });

  return (
    <View style={[styles.overlayContainer]} pointerEvents={'none'}>
      <View
        style={[
          styles.selection,
          {
            height: itemHeight,
          },
          overlayItemStyle,
        ]}
      />
      {displayLabel && (
        <View style={styles.labelContainer}>
          <Text style={themedStyles.labelText}>{displayLabel}</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selection: {
    backgroundColor: '#00000022',
    borderRadius: 8,
    alignSelf: 'stretch',
  },
  labelContainer: {
    position: 'absolute',
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
export default memo(Overlay);
