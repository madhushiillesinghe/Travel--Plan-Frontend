import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from "@/configs/FirebaseConfig";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

export default function SignUp(): JSX.Element {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const router = useRouter();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);

    const OnCreateAccount = async (): Promise<void> => {
        if (!email || !password || !name) {
            ToastAndroid.show("Please enter all details", ToastAndroid.LONG);
            return;
        }

        try {
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User Created:", user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error creating user:", error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.text}>Create New Account</Text>
            <View style={{ marginTop: 50 }}>
                <Text style={{ fontFamily: "outfit" }}>Name</Text>
                <TextInput
                    placeholder="Enter Name"
                    style={styles.input}
                    autoCapitalize="words"
                    onChangeText={setName}
                />
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: "outfit" }}>Email</Text>
                <TextInput
                    placeholder="Enter Email"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: "outfit" }}>Password</Text>
                <TextInput
                    secureTextEntry
                    placeholder="Enter Password"
                    style={styles.input}
                    onChangeText={setPassword}
                />
            </View>

            <View style={{ marginTop: 20 }}>
                <TouchableOpacity style={styles.button} onPress={OnCreateAccount}>
                    <Text style={styles.buttontext}>Create Account</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => router.replace("/auth/sign-in")}
                >
                    <Text style={styles.signInText}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 50,
        height: "100%",
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 30,
        fontFamily: "outfit-bold",
        marginTop: 30
    },
    input: {
        padding: 15,
        borderRadius: 15,
        borderColor: Colors.GRAY,
        borderWidth: 1,
        fontFamily: "outfit",
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 20,
        borderRadius: 15,
        marginTop: 50,
    },
    buttontext: {
        color: Colors.WHITE,
        textAlign: "center",
    },
    signInButton: {
        padding: 20,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 1,
    },
    signInText: {
        color: Colors.PRIMARY,
        textAlign: "center",
    },
});
