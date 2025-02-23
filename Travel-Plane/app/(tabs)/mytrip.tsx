import {View, Text, StyleSheet} from "react-native";
import React, {useState} from "react";
import {Colors} from "@/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from "@/components/MyTrips/StartNewTripCard";

export default function MyTrip() {
    const [userTrip,setUserTrip] =useState([]);
    return (
        <View style={styles.container}>
            <View style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between"
            }}>
                <Text style={styles.title}>My Trips</Text>
                <Ionicons name="add-circle" size={50} color="black" />
            </View>
            {userTrip?.length ==0?
                <StartNewTripCard/>
                :null
            }
        </View>
    )
}
    const styles = StyleSheet.create({
        container: {
            padding: 25,
            paddingTop:55,
            backgroundColor: Colors.WHITE,
            height:"100%",
        },
        title:{
            fontFamily:"outfit-bold",
            fontSize:35,
        }
});