import { Stack } from "expo-router";
import {App} from "expo-router/build/rsc/entry";
import {useFonts} from "expo-font";

export default function RootLayout() {
  useFonts({
    "outfit": require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),


  })
  return(
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
  )
}
