import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid} from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from "@/context/CreateTripContext";
import moment from "moment";

export default function ReviewTrip() {
    const navigation = useNavigation();
    const router = useRouter();
    const { tripData } = useContext<any>(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Review Your Trip</Text>
            <View style={styles.subcontainer}>
                <Text style={styles.subText}>
                    Before generating your trip, please review your selection.
                </Text>

                {/* Destination Info */}
                <View style={styles.locationContainer}>
                    <Text style={{ fontSize: 30 }}>📍</Text>
                    <View style={styles.locationTextContainer}>
                        <Text style={styles.textinfo}>Destination</Text>
                        <Text style={styles.destinationText}>
                            {tripData?.locationInfo?.name || "No location selected"}
                        </Text>
                    </View>
                </View>

                {/* Date Selection Info */}
                <View style={styles.locationContainer}>
                    <Text style={{ fontSize: 30 }}>📅</Text>
                    <View style={styles.locationTextContainer}>
                        <Text style={styles.textinfo}>Travel Date</Text>
                        <Text style={styles.destinationText}>
                            {tripData?.startDate && tripData?.endDate
                                ? `${moment(tripData.startDate).format("DD MMM ")} To  ${moment(tripData.endDate).format("DD MMM YYYY")+"   "}`
                                : "No date selected"}
                               ({tripData?.totalNoOfDays} days)
                        </Text>

                    </View>
                </View>
                {/*Travelers Selection Info*/}
                <View style={styles.locationContainer}>
                    <Text style={{ fontSize: 30 }}>🚎
                    </Text>
                    <View style={styles.locationTextContainer}>
                        <Text style={styles.textinfo}>Who is Traveling</Text>
                        <Text style={styles.destinationText}>
                            {tripData?.traverler?.title || "No Travelers selected"}
                        </Text>

                    </View>
                </View>

                {/*Budget Selection Info*/}
                <View style={styles.locationContainer}>
                    <Text style={{ fontSize: 30 }}>💰

                    </Text>
                    <View style={styles.locationTextContainer}>
                        <Text style={styles.textinfo}> Budget</Text>
                        <Text style={styles.destinationText}>
                            {tripData?.Budget?.title || "No Budget selected"}
                        </Text>

                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>router.replace("/create-trip/generateTrip")}
                >
                    <Text style={styles.buttontext}>Build My Trip</Text>
                </TouchableOpacity>
            </View>
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
        marginTop: 20,
    },
    subcontainer: {
        marginTop: 20,
    },
    subText: {
        fontSize: 18,
        fontFamily: "outfit-bold",
    },
    textinfo: {
        fontFamily: "outfit",
        fontSize: 18,
        color: Colors.GRAY,
    },
    locationContainer: {
        marginTop: 40,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    destinationText: {
        fontFamily: "outfit-medium",
        fontSize: 16,
    },
    locationTextContainer: {
        flexDirection: "column",
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        borderRadius:15,
        marginTop:80,
        padding:15

    },
    buttontext: {
        textAlign: "center",
        color: Colors.WHITE,
        fontFamily: "outfit-medium",
        fontSize: 18,
    }
});

