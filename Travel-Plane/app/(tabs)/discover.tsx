import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet
} from "react-native";
import { Colors } from "@/constants/Colors";

// Free APIs
const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&offset=0";
const PEXELS_API_URL = "https://api.pexels.com/v1/search?query=city&per_page=10";

// Place Interface
interface Place {
    name: string;
    image: string;
}

export default function Discover() {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async (): Promise<void> => {
        try {
            // Fetch cities from GeoDB Cities API
            const geoResponse = await fetch(GEO_API_URL, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
                    "X-RapidAPI-Key": "16a304a35emsh024f9fa7a17f7c0p13a3d6jsn929968226a4f", // Replace with your key
                },
            });
            const geoData = await geoResponse.json();

            // Fetch city images from Pexels API (free alternative)
            const pexelsResponse = await fetch(PEXELS_API_URL, {
                headers: {
                    Authorization: "0HIR5CMNslWuJCxxYu2oPcaoJBSShr45pFTSfXUYV6bC0Qtk6ynYXG1Y", // Replace with your key
                },
            });
            const pexelsData = await pexelsResponse.json();

            // Extracting place names and images
            const placesData = geoData.data.map((city: any, index: number) => ({
                name: city.city,
                image: pexelsData.photos[index]?.src?.medium || "https://via.placeholder.com/300",
            }));

            setPlaces(placesData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching places or images", error);
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} />}

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Discover Places</Text>
            </View>

            {/* Display Places */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {places.map((place, index) => (
                    <View key={index} style={styles.card}>
                        <Image source={{ uri: place.image }} style={styles.image} />
                        <Text style={styles.cardText}>{place.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: Colors.WHITE,
        height: "100%",
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    title: {
        fontFamily: "outfit-bold",
        fontSize: 30,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    image: {
        width: "100%",
        height: 180,
        borderRadius: 8,
        marginBottom: 8,
    },
    cardText: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
    },
});

