import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from "@/configs/FirebaseConfig";

export default function Profile(): JSX.Element {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email || "");
            setName(user.displayName || "");
        }
    }, []);

    const handleSave = () => {
        setIsEditing(false);
        // Here you can add logic to save the updated profile information
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.profileHeader}>
                <View style={styles.profileImageContainer}>
                    <Image
                        source={{ uri: auth.currentUser?.photoURL || 'https://www.example.com/default-avatar.png' }} // Fallback to default if no user photo
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.editIcon}>
                        <Ionicons name="pencil" size={20} color={Colors.PRIMARY} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.welcomeText}>Welcome, {name}!</Text>
            </View>

            <View style={styles.card}>
                {isEditing ? (
                    <>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.label}>Full Name</Text>
                        <Text style={styles.infoText}>{name}</Text>

                        <Text style={styles.label}>Email Address</Text>
                        <Text style={styles.infoText}>{email}</Text>

                        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                            <Text style={styles.editButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </>
                )}
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
    backButton: {
        position: "absolute",
        top: 50,
        left: 25,
        zIndex: 1,
    },
    profileHeader: {
        alignItems: "center",
        marginTop: 60,
    },
    profileImageContainer: {
        position: "relative",
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: Colors.PRIMARY,
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    welcomeText: {
        fontSize: 24,
        fontFamily: "outfit-bold",
        marginTop: 15,
        color: Colors.PRIMARY,
    },
    card: {
        marginTop: 30,
        padding: 20,
        borderRadius: 15,
        backgroundColor: Colors.WHITE,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    label: {
        fontFamily: "outfit",
        color: Colors.GRAY,
        marginTop: 10,
    },
    infoText: {
        fontFamily: "outfit",
        fontSize: 16,
        marginTop: 5,
        color: Colors.PRIMARY,
    },
    input: {
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.GRAY,
        borderWidth: 1,
        fontFamily: "outfit",
        marginTop: 5,
        color: Colors.PRIMARY,
    },
    editButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    editButtonText: {
        color: Colors.WHITE,
        textAlign: "center",
        fontFamily: "outfit",
    },
    saveButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    saveButtonText: {
        color: Colors.WHITE,
        textAlign: "center",
        fontFamily: "outfit",
    },
});
