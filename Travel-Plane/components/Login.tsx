import { View, Image, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function Login() {
    return (
        <View>
            <Image
                source={require("../assets/images/Login.jpg")}
                style={styles.image}
            />
            <View style={styles.container}>
                <Text style={styles.title}>✈️ Your Smart Travel Plan Awaits! 🌍</Text>
                <Text style={styles.subtitle}>
                    Explore the world effortlessly with AI-powered recommendations tailored just for you.
                </Text>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>SIGN IN with Google</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 520,
    },
    container: {
        backgroundColor: Colors.WHITE,
        marginTop: -20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 25,
        height: "100%",
    },
    title: {
        fontSize: 30,
        fontFamily: "outfit-bold",
        textAlign: "center",
        marginTop: 10,
    },
    subtitle: {
        fontSize: 17,
        textAlign: "center",
        fontFamily: "outfit",
        color: Colors.GRAY,
        marginTop: 15,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        marginTop: "20%",
    },
    buttonText: {
        color: Colors.WHITE,
        textAlign: "center",
        fontFamily: "outfit",
        fontSize: 18,
    },
});
