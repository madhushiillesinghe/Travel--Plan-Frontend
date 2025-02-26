import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Linking } from "react-native";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import { Colors } from "@/constants/Colors";
import {CreateTripContext} from "@/context/CreateTripContext";
import {useNavigation} from "expo-router";

export default function SearchPlace() {
    const [searchQuery, setSearchQuery] = useState("");
    const [places, setPlaces] = useState<any[]>([]);
    const tripContext = useContext<any>(CreateTripContext);
    const { tripData, setTripData } = tripContext;
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
            headerTransparent: true,
            headerTitle:"Search Place",
            });
    }, []);
    useEffect(() => {
        console.log(tripData);
    }, [tripData]);

    const searchPlaces = async (query: string) => {
        if (query.length > 2) { // Trigger search only after 2 characters entered
            try {
                const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
                    params: {
                        q: query,
                        key: "295942c2b46c42f4bdbafc9178705e05",  // Your OpenCage API key
                        format: "json",
                        addressdetails: 1,
                        limit: 5,  // Limit to 5 results
                    },
                    headers: {
                        "User-Agent": "Travel-Plane (chandu@gmail.com)",  // Add your app name and email
                    },
                });
                console.log(response.data); // Log the entire response
                setPlaces(response.data.results);  // Set the places data from response
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        }
    };

    const handleLocationSelect = (place: any) => {
        const { formatted, geometry } = place;

        // Constructing the detail URL
        const detailUrl = `https://www.openstreetmap.org/?lat=${geometry.lat}&lon=${geometry.lng}`;

        // Log the required data to the console
        console.log("Location Name:", formatted);
        console.log("Detail URL:", detailUrl);
        console.log(`Geometry Location: Latitude: ${geometry.lat}, Longitude: ${geometry.lng}`);
        setTripData({
            locationInfo:{
                name:formatted,
                coordinates_latitude:(geometry.lat),
                coordinates_longitude:(geometry.lng),
                url:detailUrl,
            }
        })
        setSearchQuery(formatted); // Set the search query to the selected location
        setPlaces([]); // Optionally clear the results once a location is selected
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search Places</Text>

            {/* TextInput for Search */}
            <TextInput
                style={styles.input}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={(text) => {
                    setSearchQuery(text);
                    searchPlaces(text);  // Trigger search when the text changes
                }}
            />

            {/* Displaying Search Results */}
            {places.length > 0 && (
                <View style={styles.resultsContainer}>
                    {places.map((place, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.placeItem}
                            onPress={() => handleLocationSelect(place)}
                        >
                            <Text style={styles.locationName}>{place.formatted}</Text>
                            <Text>
                                Detail URL:{" "}
                                <Text
                                    style={styles.link}
                                    onPress={() => {
                                        Linking.openURL(`https://www.openstreetmap.org/?lat=${place.geometry.lat}&lon=${place.geometry.lng}`);
                                    }}
                                >
                                    View on OpenStreetMap
                                </Text>
                            </Text>
                            <Text>Latitude: {place.geometry.lat}</Text>
                            <Text>Longitude: {place.geometry.lng}</Text>

                            {place.components?.country && (
                                <Text>Country: {place.components.country}</Text>
                            )}

                            {/* Displaying Image if available */}
                            {place.image?.thumbnail && (
                                <Image
                                    source={{ uri: place.image.thumbnail }}
                                    style={styles.image}
                                />
                            )}
                        </TouchableOpacity>
                    ))}
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
    title: {
        fontFamily: "outfit-bold",
        fontSize: 35,
    },
    input: {
        height: 40,
        borderColor: Colors.GRAY,
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
    resultsContainer: {
        marginTop: 20,
    },
    placeItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.GRAY,
    },
    locationName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    link: {
        color: "blue",
        textDecorationLine: "underline",
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
        resizeMode: "cover",
    },
});

