// components/Login.tsx
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors"; // Adjust path for constants if needed
import { useRouter } from "expo-router";

export default function Login() {
    const router = useRouter();

    return (
        <View style={styles.mainContainer}>
            <Image
                source={require("../assets/images/Login.jpg")}
                style={styles.image}
            />
            <View style={styles.container}>
                <Text style={styles.title}>✈️ Your Smart Travel Plan Awaits! 🌍</Text>
                <Text style={styles.subtitle}>
                    Explore the world effortlessly with AI-powered recommendations tailored just for you.
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/auth/sign-in")} // Ensure relative path is correct
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
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
        alignItems: "center",
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
        paddingVertical: 15,
        paddingHorizontal: 30,
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
