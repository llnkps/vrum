import {View, StyleSheet} from "react-native";
import {COLORS} from "@/src/constants/ui";
import StyledText from "@/src/components/ui/StyledText";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerMainContent}>
        <StyledText>Vrum-Vrum</StyledText>
      </View>
      <StyledText></StyledText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.SECONDARY_BACKGROUND,
  },
  headerMainContent: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Header;