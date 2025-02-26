import {View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigation, useRouter} from "expo-router";
import { Colors } from "@/constants/Colors";
import { SelectTravelesList } from "@/constants/Options";
import OptionTripCard from "@/components/CreateTrip/OptionTripCard";
import {CreateTripContext} from "@/context/CreateTripContext";

export default function SelectTravaler() {
    const navigation = useNavigation();
    const [selectedTraveles, setSelectedTraveler] = useState<string | string>();
    const { tripData, setTripData } = useContext<any>(CreateTripContext);
    const router = useRouter();
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        });
    }, []);
    useEffect(() => {
        setTripData({...tripData,
        traverler:selectedTraveles
        });
    }, [selectedTraveles]);
    useEffect(() => {
        console.log(tripData)
    }, [tripData]);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Who's Traveling</Text>
            <View style={styles.subcontainer}>
                <Text style={styles.subtext}>Choose your travelers </Text>
                <FlatList
                    data={SelectTravelesList}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{
                            marginVertical:10
                        }}
                           onPress={()=>setSelectedTraveler(item)} >
                            <OptionTripCard option={item}  selectedTraveler={selectedTraveles} />
                        </TouchableOpacity>
                    )}
                />
            </View>
            <TouchableOpacity style={styles.button}>
                <Link href={"/create-trip/selectDates"} style={{width:"100%"}}>
                <Text style={styles.buttontext}>Continue</Text>
                </Link>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: "100%",
        paddingTop: 75,
    },
    text: {
        fontSize: 30,
        fontFamily: "outfit-bold",
    },
    subtext: {
        fontSize: 20,
        fontFamily: "outfit-bold",
    },
    subcontainer: {
        marginTop: 15,
    },
    itemContainer: {
        padding: 10,
        backgroundColor: Colors.GRAY,
        marginVertical: 5,
        borderRadius: 5,
    },
    itemText: {
        fontSize: 18,
        fontFamily: "outfit-regular",
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        borderRadius:15,
        marginTop:20,
        padding:15

    },
    buttontext: {
        textAlign: "center",
        color: Colors.WHITE,
        fontFamily: "outfit-medium",
        fontSize: 18,
    }
});
