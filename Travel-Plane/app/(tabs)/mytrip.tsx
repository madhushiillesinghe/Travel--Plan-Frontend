import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from "@/components/MyTrips/StartNewTripCard";
import { collection, getDocs, query, where, DocumentData } from "@firebase/firestore";
import { auth, db } from "@/configs/FirebaseConfig";
import TripCard from "@/components/MyTrips/TripCard";
import { router } from "expo-router"; // Import the router for navigation

export default function MyTrip() {
    const [userTrip, setUserTrip] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            GetMyTrips();
        }
    }, [user]);

    const GetMyTrips = async () => {
        setLoading(true);
        setUserTrip([]);
        const q = query(collection(db, "UserTrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserTrip((prev) => [...prev, doc.data()]);
        });
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            {/* Show loading spinner while fetching data */}
            {loading && <ActivityIndicator size={"large"} color={Colors.PRIMARY} />}

            <View style={styles.header}>
                <Text style={styles.title}>My Trips</Text>
                <TouchableOpacity onPress={() => router.push("/create-trip/searchPlace")}>
                    <Ionicons name="add-circle" size={50} color="black" />
                </TouchableOpacity>
            </View>

            {/* Display trips or prompt user to start a new trip */}
            {userTrip.length === 0 ? (
                <StartNewTripCard />
            ) : (
                <ScrollView>
                    {userTrip.map((trip, index) => {
                        if (trip?.tripData && trip?.tripDetails) {
                            return <TripCard key={index} trip={trip} />;
                        } else {
                            return null; // Skip invalid data
                        }
                    })}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        height: "100%",
    },
    title: {
        fontFamily: "outfit-bold",
        fontSize: 35,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
