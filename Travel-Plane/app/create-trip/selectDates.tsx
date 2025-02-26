import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import CalendarPicker from "react-native-calendar-picker";
import moment, { Moment } from "moment";
import {CreateTripContext} from "@/context/CreateTripContext";

type DateType = Moment | null;

export default function SelectDates() {
    const navigation = useNavigation();
    const [startDate, setStartDate] = useState<DateType>(null);
    const [endDate, setEndDate] = useState<DateType>(null);
    const { tripData, setTripData } = useContext<any>(CreateTripContext);

    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        });
    }, [navigation]);

    // Define the type for the 'date' parameter as Moment
    const onDateChange = (date: Date, type: string) => {
        console.log(date, type);
        if (type === "START_DATE") {
            setStartDate(moment(date));
        } else {
            setEndDate(moment(date));
        }
    };

    const OnDataSelectionContinue = () => {
        if (startDate && endDate) {
            const totalNoOfDays = endDate.diff(startDate, "days");
            console.log("Total number of days: ", totalNoOfDays+1);
            setTripData({
                ...tripData,
                startDate: startDate,
                endDate: endDate,
                totalNoOfDays: totalNoOfDays+1,

            })
        } else {
            ToastAndroid.show("Please select both start and end dates.", ToastAndroid.SHORT);            return;
        }
        router.push("/create-trip/selectBudget")
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Travel Dates</Text>
            <View style={styles.calender_container}>
                <CalendarPicker
                    onDateChange={onDateChange}
                    allowRangeSelection={true}
                    minDate={new Date()}
                    maxRangeDuration={5}
                    selectedRangeStyle={{
                        backgroundColor: Colors.PRIMARY,
                    }}
                    selectedDayTextStyle={{ color: Colors.WHITE }}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={OnDataSelectionContinue}>
                <Text style={styles.buttonText}>Continue</Text>
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
    calender_container: {
        marginTop: 20,
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 15,
        marginTop: 35,
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontFamily: "outfit-medium",
        textAlign: "center",
    },
});
