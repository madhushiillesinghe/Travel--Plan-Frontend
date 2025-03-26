import React from "react";
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import TimeCard from "./TimeCard";
import moment from "moment"; // Importing moment

interface TripCardProps {
    trip: any;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
    // Check if the trip is for Sri Lanka or United States
    const isSriLankaTrip = trip?.tripDetails?.locationInfo?.name === 'Sri Lanka';
    const isUSTrip = trip?.tripDetails?.locationInfo?.name === 'United States';
    console.log(isSriLankaTrip, isUSTrip, "correct");

    const tripData = isSriLankaTrip ? {
        hotelOptions: [
            {
                hotelName: "Cinnamon Grand",
                hotelAddress: "Colombo, Sri Lanka",
                estimatedPricePerNight: "$450",
                rate: "⭐⭐⭐",
                hotelImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/9d/51/dd/cinnamon-grand-main-entrance.jpg?w=1000&h=-1&s=1",
                hotelURL: "https://www.booking.com/searchresults.en-gb.html?aid=311984&label=cinnamon-grand-colombo-5%2AY0UEgd5vMYclijmsDUGAS236368236931%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-433240327346%3Alp1009920%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YXORK0YJiVoOxcWODxYDaAA&gclid=Cj0KCQiA2oW-BhC2ARIsADSIAWrFUNt-0pWaVF72Tt4ob3OHeIdWmHI0wDADN1q9wcNqb36zJ3OwEeQaAs5gEALw_wcB&highlighted_hotels=311081&redirected=1&city=-2214877&hlrd=no_dates&source=hotel&expand_sb=1&keep_landing=1&sid=620af627da1fbab9305110a8b7233f4e"
            },
            {
                hotelName: "Hikka Tranz by cinnamon",
                hotelAddress: "Galle, Sri Lanka",
                rate: "⭐⭐⭐⭐⭐",
                estimatedPricePerNight: "$350",
                hotelImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/0b/a3/be/hotel-exterior.jpg?w=1000&h=-1&s=1",
                hotelURL: "https://www.google.com/travel/search?q=luxury%20hotels&g2lb=4965990%2C4969803%2C72277293%2C72302247%2C72317059%2C72406588%2C72414906%2C72421566%2C72471280%2C72472051%2C72481459%2C72485658%2C72560029%2C72573224%2C72616120%2C72619927%2C72647020%2C72648289%2C72686036%2C72710168%2C72760082%2C72803964%2C72808078%2C72825295%2C72827241%2C72832976%2C72852291%2C72882230%2C72885031%2C72894323%2C72903270&hl=en-LK&gl=lk&cs=1&ssta=1&ts=CAESCAoCCAMKAggDGhwSGhIUCgcI6Q8QAhgcEgcI6Q8QAxgBGAEyAhAAKgcKBToDTEtS&qs=CAEyE0Nnb0lwX0dfbFlmUHlOSWxFQUU4CkIJEajR4pZJ3IgXQgkRWZLleSlyK-9CCRGTHOc-b-oWsEIJEQ_G_WoZV1K_Wk8IATJLqgFIEAEqESINbHV4dXJ5IGhvdGVscygAMh4QASIaV9khzSuZYqIXixaEe7lblroJtqPI8JEUcEwyERACIg1sdXh1cnkgaG90ZWxz&ap=aAG6AQhvdmVydmlldw&ictx=111&ved=0CAAQ5JsGahcKEwiosObg8-aLAxUAAAAAHQAAAAAQEw"
            },
            {
                hotelName: "JetWing",
                hotelAddress: "NuwarEliya, Sri Lanka",
                estimatedPricePerNight: "$250",
                rate: "⭐⭐⭐⭐",
                hotelImage: "https://media-cdn.tripadvisor.com/media/photo-s/1a/fd/e2/44/jetwing-kandy-gallery.jpg",
                hotelURL: "https://www.jetwinghotels.com/sri-lanka-hotels/nuwara-eliya/#gref"
            },
        ],
        day1: { title: "Day 1: Colombo Sightseeing", plan: ["Visit Galle Face Green", "Explore Colombo Museum", "https://for91days.com/photos/SriLanka/Galle%20Face/Colombo-Blog.jpg"] },
        day2: { title: "Day 2: Galle Tour", plan: ["Visit Galle Fort", "Explore the beaches",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Unawatuna_Beach_Sri_Lanka.jpg/800px-Unawatuna_Beach_Sri_Lanka.jpg"] },
        flightDetails: {
            airline: "SriLankan Airlines",
            flightClass: "Business Class",
            departureCity: "London",
            arrivalCity: "Colombo",
            departureDate: "2025-03-10",
            returnDate: "2025-03-20",
            price: "$3000"
        }
    } : isUSTrip ? {
        hotelOptions: [
            {
                hotelName: "The Plaza Hotel",
                hotelAddress: "New York, United States",
                estimatedPricePerNight: "$600",
                rate: "⭐⭐⭐⭐⭐",
                hotelImage: "https://media.timeout.com/images/105882603/750/422/image.jpg",
                hotelURL: "https://www.theplazany.com/"
            },
            {
                hotelName: "The Ritz-Carlton",
                hotelAddress: "San Francisco, United States",
                rate: "⭐⭐⭐⭐⭐",
                estimatedPricePerNight: "$550",
                hotelImage: "https://www.ritzcarlton.com/mg/-/media/ritz-carlton/hotels/usa/san-francisco/san-francisco_hero.jpg",
                hotelURL: "https://www.ritzcarlton.com/en/hotels/california/san-francisco"
            },
            {
                hotelName: "The Beverly Hills Hotel",
                hotelAddress: "Los Angeles, United States",
                estimatedPricePerNight: "$700",
                rate: "⭐⭐⭐⭐⭐",
                hotelImage: "https://upload.wikimedia.org/wikipedia/commons/3/3f/The_Beverly_Hills_Hotel_%28Beverly_Hills%2C_CA%29.jpg",
                hotelURL: "https://www.thebeverlyhillshotel.com/"
            },
        ],
        day1: { title: "Day 1: New York Tour", plan: ["Visit Times Square", "Explore Central Park", "https://upload.wikimedia.org/wikipedia/commons/0/0e/Times_Square_New_York_2010.jpg"] },
        day2: { title: "Day 2: San Francisco Tour", plan: ["Visit Golden Gate Bridge", "Explore Fisherman's Wharf",
                "https://upload.wikimedia.org/wikipedia/commons/d/d7/GoldenGateBridge-001.jpg"] },
        flightDetails: {
            airline: "American Airlines",
            flightClass: "Economy",
            departureCity: "London",
            arrivalCity: "New York",
            departureDate: "2025-03-01",
            returnDate: "2025-03-15",
            price: "$2500"
        }
    } : trip?.tripData;  // Default to provided tripData if not Sri Lanka or United States

    return (
        <View style={styles.tripCard}>
            <Text style={styles.tripTitle}>
                Trip to {trip?.tripDetails?.locationInfo.name || 'N/A'}
            </Text>
            <Text style={styles.tripDetails}>
                Duration: {trip?.tripDetails?.startDate && trip?.tripDetails?.endDate
                ? `${moment(trip.tripDetails.startDate.toDate()).format("YYYY-MM-DD")} - ${moment(trip.tripDetails.endDate.toDate()).format("YYYY-MM-DD")}`
                : 'N/A'}
            </Text>

            {/* Displaying Flight Details */}
            {tripData?.flightDetails && (
                <View style={styles.infoCard}>
                    <Text style={styles.subTitle}>Flight Details</Text>
                    <Text>Airline: {tripData.flightDetails.airline || 'N/A'}</Text>
                    <Text>Class: {tripData.flightDetails.flightClass || 'N/A'}</Text>
                    <Text>Departure: {tripData.flightDetails.departureCity || 'N/A'} - {moment(tripData.flightDetails.departureDate).format('YYYY-MM-DD')}</Text>
                    <Text>Arrival: {tripData.flightDetails.arrivalCity || 'N/A'} - {moment(tripData.flightDetails.returnDate).format('YYYY-MM-DD')}</Text>
                    <Text>Price: {tripData.flightDetails.price || 'N/A'}</Text>
                </View>
            )}

            {/* Displaying hotel options */}
            {tripData?.hotelOptions?.length ? (
                <View style={styles.infoCard}>
                    <Text style={styles.subTitle}>Hotel Details</Text>
                    {tripData.hotelOptions.map((hotel: any, hotelIndex: number) => (
                        <View key={hotelIndex} style={styles.hotelCard}>
                            <Text style={styles.subTitlehotel}>Hotel: {hotel?.hotelName || 'N/A'}</Text>
                            <Text>Address: {hotel?.hotelAddress || 'N/A'}</Text>
                            <Text> {hotel?.rate || 'N/A'}</Text>
                            <Text>Price per night: {hotel?.estimatedPricePerNight || 'N/A'}</Text>

                            {/* Display hotel image */}
                            {hotel?.hotelImage ? (
                                <Image source={{ uri: hotel.hotelImage }} style={styles.hotelImage} />
                            ) : (
                                <Text>No image available</Text>
                            )}

                            {/* Hotel URL - Opening the URL when clicked */}
                            {hotel?.hotelURL ? (
                                <TouchableOpacity onPress={() => Linking.openURL(hotel.hotelURL)}>
                                    <Text style={styles.linkText}>Visit Website</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text>No website available</Text>
                            )}
                        </View>
                    ))}
                </View>
            ) : (
                <Text>No hotel options available.</Text>
            )}

            {/* Displaying Day Plans for Day 1 and Day 2 */}
            {tripData?.day1 && (
                <TimeCard day={tripData.day1.title || 'N/A'} plan={tripData.day1.plan || []} />
            )}

            {tripData?.day2 && (
                <TimeCard day={tripData.day2.title || 'N/A'} plan={tripData.day2.plan || []} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    tripCard: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 10,
    },
    tripTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    tripDetails: {
        fontSize: 14,
        color: Colors.GRAY,
    },
    infoCard: {
        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        shadowColor: Colors.PRIMARY,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    subTitlehotel: {
        fontSize: 14,
        fontWeight: "bold",
    },
    hotelCard: {
        marginTop: 10,
    },
    hotelImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
    },
    linkText: {
        color: "#0000FF",
        textDecorationLine: 'underline',
    },
});

export default TripCard;
