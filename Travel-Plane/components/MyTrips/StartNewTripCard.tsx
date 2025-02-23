import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const StartNewTripCard: React.FC = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Ionicons name="location-sharp" size={30} color="black" />
            <Text style={styles.text}>No Trips planned yet</Text>
            <Text style={styles.subtext}>
                Looks like it's time to plan a new travel experience! Get started below
            </Text>
            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttontext}>Start a new Trip</Text>
            </TouchableOpacity>
        </View>
    );
};

export default StartNewTripCard;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 50,
        display: "flex",
        alignItems: "center",
        gap: 25,
    },
    text: {
        fontSize: 25,
        fontFamily: "outfit-medium",
    },
    subtext: {
        paddingTop: 25,
        fontSize: 20,
        fontFamily: "outfit",
        textAlign: "center",
        color: Colors.GRAY,
    },
    buttonContainer: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        paddingHorizontal: 30,
    },
    buttontext: {
        color: Colors.WHITE,
        fontFamily: "outfit-medium",
        fontSize: 17,
    },
});
