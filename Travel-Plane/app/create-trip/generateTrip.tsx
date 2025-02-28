import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "expo-router";
import { CreateTripContext } from "@/context/CreateTripContext";
import { Colors } from "@/constants/Colors";
import { chatSession } from "@/configs/AiModel";
import {AI_PROMPT} from "@/constants/Options";  // import the chatSession function

export default function GenerateTrip() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [tripDetails, setTripDetails] = useState<any>(null);  // Store trip details response
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        if (tripData) {
            GenerateAiTrip();
        }
    }, [tripData]);

    const GenerateAiTrip = async () => {
        setLoading(true);
        const nightDate = tripData?.totalNoOfDays - 1;

        const FINAL_PROMPT = AI_PROMPT
            .replace("{location}", tripData?.locationInfo?.name)
            .replace("{totalDays}", tripData?.totalNoOfDays)
            .replace("{totalNight}", String(nightDate))
            .replace("{traveler}", tripData?.traverler?.title)
            .replace("{budget}", tripData?.Budget?.title)
            .replace("{totalDays}", tripData?.totalNoOfDays)
            .replace("{totalNight}", String(nightDate));

        try {
            // Send the prompt to the AI and await the response
            const result = await chatSession.sendMessage(FINAL_PROMPT);

            // If response.text is a function, check its actual value
            if (typeof result?.response?.text === 'function') {
                console.log("AI Response Function:", result?.response?.text());
            } else {
                console.log("AI Response Text:", result?.response?.text);  // Log the response text directly
            }

            setTripDetails(result?.response?.text);  // Update the state with the response text
        } catch (error) {
            console.error("Error generating trip:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        });
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <>
                    <Text style={styles.text}>Please Wait....</Text>
                    <Text style={styles.subtext}>We are working to generate your dream trip</Text>
                    <Image style={styles.image} source={require("../../assets/images/Travel Airplane Sticker by Aerial.gif")} />
                    <Text style={{ fontFamily: "outfit", color: Colors.GRAY, fontSize: 20, textAlign: "center", paddingTop: 20 }}>Do not go Back</Text>
                </>
            ) : (
                <View>
                    <Text style={styles.text}>Generated Trip Details</Text>
                    <Text style={styles.subtext}>{tripDetails}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
    },
    text: {
        fontSize: 35,
        fontFamily: "outfit-bold",
        textAlign: "center",
    },
    subtext: {
        fontSize: 20,
        fontFamily: "outfit-bold",
        textAlign: "center",
        marginTop: 40,
    },
    image: {
        height: 150,
        objectFit: "contain",
        width: "120%",
    }
});
