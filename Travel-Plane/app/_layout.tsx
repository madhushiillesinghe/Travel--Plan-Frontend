import { Stack } from "expo-router";
import {App} from "expo-router/build/rsc/entry";
import {useFonts} from "expo-font";
import {CreateTripContext} from "@/context/CreateTripContext";
import React, {useState} from "react";

export default function RootLayout() {
    useFonts({
        "outfit": require("./../assets/fonts/Outfit-Regular.ttf"),
        "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
        "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),


    })

    const [tripData,setTripData]=useState<any>([])
    return(
        <CreateTripContext.Provider value={{tripData,setTripData}}>
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="(tabs)" />
        </Stack>
        </CreateTripContext.Provider>
    );
}