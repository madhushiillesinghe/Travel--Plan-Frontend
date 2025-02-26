import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function OptionBudgetCard({ option,selectedBudget }: { option: any,selectedBudget: any }) {
    return (
        <View style={[styles.container, selectedBudget?.id === option?.id && { borderWidth: 2 }]}>
            <View style={styles.subcontainer}>
                <Text style={styles.text}>{option?.title}</Text>
                <Text style={styles.text_desc}>{option?.desc}</Text>
            </View>
            <Text style={styles.icon}>{option.icon}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor:Colors.LIGHT_GRAY,
        borderRadius:15
    },
    subcontainer: {
        padding: 15,
    },
    text: {
        fontSize: 20,
        fontFamily: "outfit-medium",
    },
    text_desc: {
        fontSize: 17,
        fontFamily: "outfit",
        color:Colors.GRAY
    },
    icon: {
        fontSize: 25,
        paddingTop:25
    }
});
