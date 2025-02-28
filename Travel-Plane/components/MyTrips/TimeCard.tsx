import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "@/constants/Colors";

interface TimeCardProps {
    day: string;
    plan: string[]; // Plan type remains as a string array
}

const TimeCard: React.FC<TimeCardProps> = ({ day, plan }) => {
    return (
        <View style={styles.infoCard}>
            <Text style={styles.subTitle}>{day}</Text>
            {plan.map((activity, activityIndex) => {
                // Check if the activity is a valid image URL
                const isImageURL = activity.includes("https") && (activity.includes(".jpg") || activity.includes(".jpeg") || activity.includes(".png") || activity.includes(".gif"));

                return (
                    <View key={activityIndex} style={styles.activityContainer}>
                        {isImageURL ? (
                            <Image source={{ uri: activity }} style={styles.activityImage} />
                        ) : (
                            <Text>{activity}</Text> // Displaying text for non-image activities
                        )}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    infoCard: {
        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    subTitle: {
        fontSize: 18,
        fontFamily: "outfit-bold",
        marginBottom: 5,
    },
    activityContainer: {
        marginTop: 5,
    },
    activityImage: {
        width: "100%",
        height: 200, // You can adjust this size based on your needs
        borderRadius: 5,
    },
});

export default TimeCard;
