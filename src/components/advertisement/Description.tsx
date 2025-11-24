import { memo, useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TouchableHighlightRow } from '../global/TouchableHighlightRow';
import { CustomTheme } from '@/theme';

interface DescriptionProps {
  description: string;
}

const DESCRIPTION_LENGTH_THRESHOLD = 200;

const Description = memo(({ description }: DescriptionProps) => {
  const theme = useTheme() as CustomTheme;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const displayDescription = description || 'Продавец не добавил описание к объявлению.';

  const isLongDescription = description.length > DESCRIPTION_LENGTH_THRESHOLD;

  return (
    <View className="mt-2 rounded-2xl p-4" style={{ backgroundColor: theme.colors.backgroundNeutral }}>
      <Text className="mb-3 text-xl font-bold " style={{ color: theme.colors.text }} accessibilityLabel="Комментарий продавца">
        Комментарий продавца
      </Text>
      <Text
        style={{ color: theme.colors.text }}
        numberOfLines={isDescriptionExpanded ? undefined : 5}
        accessibilityLabel={`Текст описания объявления: ${displayDescription}`}
      >
        {displayDescription}
      </Text>
      {isLongDescription && (
        <TouchableHighlightRow
          label={isDescriptionExpanded ? 'Свернуть' : 'Читать далее'}
          onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          variant="button"
          showRightArrow={false}
          noBorder={true}
          centerText={true}
          containerStyle={{ marginTop: 8 }}
        />
      )}
    </View>
  );
});

Description.displayName = 'Description';

export default Description;
