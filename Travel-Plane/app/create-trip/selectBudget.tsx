import {View, Text, StyleSheet, FlatList, TouchableOpacity, ToastAndroid} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigation, useRouter} from "expo-router";
import {CreateTripContext} from "@/context/CreateTripContext";
import {Colors} from "@/constants/Colors";
import {SelectBudgetOption} from "@/constants/BudgetOption";
import OptionBudgetCard from "@/components/CreateTrip/OptionBudgetCard";

export default function selectBudget(){
    const navigation = useNavigation();
    const { tripData, setTripData } = useContext<any>(CreateTripContext);
    const router = useRouter();
    const [selectedBudgets, setSelectedBudgets] = useState<string | string>();

    useEffect(() => {
        selectedBudgets&&setTripData({...tripData,
            Budget:selectedBudgets
        });
    }, [selectedBudgets]);
    useEffect(() => {
        console.log(tripData)
    }, [tripData]);
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        });
    }, [navigation]);
    const onClickContinue=()=>{
        if(!selectedBudgets){
            ToastAndroid.show("Select your budget",ToastAndroid.LONG);
            return;
        }
        router.push("/create-trip/reviewTrip");
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Budget</Text>
            <View style={styles.subcontainer}>
                <Text style={styles.subText}>Choose spending habits for your trip</Text>
                <FlatList
                data={SelectBudgetOption}
                renderItem={({item,index}) => (
                    <TouchableOpacity
                        style={{marginVertical: 10}}
                        onPress={()=>setSelectedBudgets(item)}
                    >
                        <OptionBudgetCard option={item}  selectedBudget={selectedBudgets} />
                    </TouchableOpacity>
                )}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() =>onClickContinue()}
                >
                    <Text style={styles.buttontext}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 25,
        paddingTop: 75,
        backgroundColor:Colors.WHITE,
        height: "100%",
    },
    text: {
        fontSize: 35,
        fontFamily: "outfit-bold",
        marginTop:20
    },
    subcontainer: {
        marginTop: 20,
    },
    subText: {
        fontSize: 18,
        fontFamily: "outfit-bold",
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
