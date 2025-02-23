import {View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid} from "react-native";
import React, {useEffect, useState} from "react";
import { useNavigation, useRouter } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import {auth} from "@/configs/FirebaseConfig";

export default function SignIn(): JSX.Element {
    const router = useRouter();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);

    const OnSignIn = async (): Promise<void> => {
        if (!email || !password) {
            ToastAndroid.show("Please enter all details", ToastAndroid.LONG);
            return;
        }

        try {
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            router.replace("/mytrip")
            console.log("Signed in user:", user);
        } catch (error: any) {
            if (error.code === "auth/invalid-credential") {
                ToastAndroid.show("Invalid Credentials", ToastAndroid.LONG);
            } else {
                console.log(error.code);
                ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.text}>Let's Sign You In</Text>
            <Text style={styles.subtext}>Welcome Back</Text>
            <Text style={styles.subtext_2}>Sign in now!</Text>

            <View style={{ marginTop: 50 }}>
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
                    secureTextEntry={true}
                    placeholder="Enter Password"
                    style={styles.input}
                    onChangeText={setPassword} // ✅ Fixed the password setter
                />
            </View>

            <View style={{ marginTop: 20 }}>
                <TouchableOpacity style={styles.button} onPress={OnSignIn}>
                    <Text style={styles.buttontext}>SIGN IN</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                    style={styles.createAccountButton}
                    onPress={() => router.replace("/auth/sign-up")}
                >
                    <Text style={styles.createAccountText}>Create Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: "100%",
        paddingTop: 40,
    },
    text: {
        fontSize: 30,
        fontFamily: "outfit-bold",
        marginTop: 30,
    },
    subtext: {
        fontSize: 30,
        fontFamily: "outfit",
        color: Colors.GRAY,
        marginTop: 20,
    },
    subtext_2: {
        fontSize: 30,
        fontFamily: "outfit",
        color: Colors.GRAY,
        marginTop: 10,
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
    createAccountButton: {
        padding: 20,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 1,
    },
    createAccountText: {
        color: Colors.PRIMARY,
        textAlign: "center",
    },
});
