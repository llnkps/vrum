import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import StyledText from '@/src/components/ui/StyledText';

type StyledButtonProps = TouchableOpacityProps & {
  label?: string;
};

const StyledButton: React.FC<StyledButtonProps> = ({ label, ...props }) => {
  return (
    <TouchableOpacity style={styles.base} {...props}>
      {label && <StyledText>Button</StyledText>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
  },
});

export default StyledButton;
