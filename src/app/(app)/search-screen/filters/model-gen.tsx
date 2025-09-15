import TextInputIcon from "@/components/ui/InputField";
import { useState } from "react";
import { View, Text, Image, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ModelItemScreenFilter = () => {
  const [text, setText] = useState('');

  return (
    <>
      <View className="flex-1">
        <View>
          <Text className="text-lg font-bold text-font dark:text-font-dark">
            Марки
          </Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={newText => setText(newText)}
            value={text}
            placeholder="Марка или модель"
          />
          <TextInputIcon />
        </View>
        <View className="px-4 py-3 gap-y-1 bg-background dark:bg-background-dark">
          <Pressable
            onPress={() => console.log('Model Pressed')}
            className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark rounded-t-md border border-border dark:border-border-dark"}
          >
            <Text className="text-font dark:text-font-dark font-bold">Марка, модель, поколение</Text>
          </Pressable>
          <View className={"flex flex-row gap-1"}>
            <Pressable
              onPress={() => console.log('Год Pressed')}
              className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"}
            >
              <Text className="text-font dark:text-font-dark font-bold">Год</Text>
            </Pressable>

            <Pressable
              onPress={() => console.log('Цена Pressed')}
              className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"}
            >
              <Text className="text-font dark:text-font-dark font-bold">Цена</Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() => console.log('Еще Pressed')}
            className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark rounded-b-md border border-border dark:border-border-dark"}
          >
            <Text className="text-font dark:text-font-dark font-bold">Еще</Text>
          </Pressable>
        </View>
        <View className="px-4 py-3">
          <Pressable
            onPress={() => console.log('Показать результаты Pressed')}
            className={"px-4 py-3 flex flex-row bg-button-primary dark:bg-button-primary-dark rounded-md justify-center"}
          >
            <Text className="text-white font-bold">Показать результаты</Text>
          </Pressable>
        </View>
      </View>
    </>
  )
}


export default ModelItemScreenFilter;