import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey: string = "AIzaSyCejoKLtXxAT91Ad5uVoIZscNvykDl4IIY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
};

// Start the chat session with history
export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "Generate Travel Plan for Location :Wilāyat-e Ghaznī, Afghanistan, for 2 Days and 1 Night for Family with a Moderate budget with Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Hotel nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for 2 days and 1 night with each day plan with best time to visit in JSON format",
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: `{
  "tripDetails": {
    "location": "Wilāyat-e Ghaznī, Afghanistan",
    "duration": "2 Days, 1 Night",
    "budget": "Moderate",
    "travelers": "Family"
  },
  "flightDetails": {
    "note": "Unfortunately, due to the current security situation and limited commercial air travel options in and around Ghazni, direct flights are not readily available. Travelers would typically need to fly to Kabul (KBL) and then arrange ground transportation to Ghazni. This is **not recommended** at this time for safety reasons. This plan is created assuming a pre-existing safe arrival in Ghazni.",
    "exampleFlight": {
      "airline": "Example: Kam Air",
      "origin": "Your Origin City (e.g., Dubai)",
      "destination": "Kabul International Airport (KBL)",
      "price": "Estimated: $300 - $700 per person (round trip, subject to change)",
      "bookingUrl": "Check major flight aggregators like Expedia, Kayak, Google Flights. **Booking not recommended due to security**"
    }
  },
  "hotelOptions": [
    {
      "hotelName": "Ghazni Star Hotel (Hypothetical)",
      "hotelAddress": "City Center, Ghazni (Address is hypothetical, actual hotels are very limited)",
      "hotelNearby": "Ghazni Citadel (if the hotel was centrally located)",
      "placeDetails": "A basic hotel offering essential amenities. Due to the scarcity of tourism infrastructure in Ghazni, amenities may be limited.",
      "placeImageUrl": "https://via.placeholder.com/300x200/87CEEB/000000?text=Ghazni+Star+Hotel+(Image+Unavailable)",
      "geoCoordinates": {
        "latitude": 33.55,
        "longitude": 68.41
      },
      "estimatedPricePerNight": "$50 - $100 (Subject to Availability and Security)",
      "notes": "Hotel quality and availability are *extremely* limited. Security should be your top priority. This is an example; confirm actual details and availability with local contacts."
    }
  ],
  "day1": {
    "title": "Exploring Historical Ghazni",
    "bestTimeToVisit": "Morning (to avoid potential afternoon heat)",
    "plan": [
      {
        "activity": "Visit Ghazni Citadel (if security permits)",
        "time": "9:00 AM - 12:00 PM",
        "placeDetails": "A historical fortress with remnants of past empires. *Access is heavily dependent on security clearance*.  If accessible, allocate at least 2-3 hours to explore the grounds.",
        "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Ghazni_Citadel.jpg/800px-Ghazni_Citadel.jpg",
        "geoCoordinates": {
          "latitude": 33.548,
          "longitude": 68.416
        },
        "ticketPricing": "Possibly a small entrance fee (if accessible)",
        "travelTime": "Walking distance from City Center (hypothetical location of the hotel)",
        "securityConsiderations": "Very high. Check with local authorities BEFORE visiting."
      }
    ]
  },
  "importantNotes": [
    "**Security is the PRIMARY concern in Ghazni.** This itinerary is highly dependent on the current security situation, which can change rapidly. Always consult with local authorities, trusted contacts, or security professionals before making any travel plans.",
    "**Travel to Ghazni is generally not recommended for tourists at this time.**",
    "**This itinerary assumes a pre-existing safe arrival in Ghazni and readily available safe transportation in the city.**",
    "Due to limited tourism infrastructure, hotels and services may be basic.",
    "Dress conservatively and respect local customs.",
    "Learn a few basic phrases in Dari or Pashto.",
    "Stay connected with your embassy or consulate.",
    "Have ample cash as credit card facilities may be limited.",
    "Be prepared for power outages and limited internet access.",
    "Consult a travel advisory from your country before planning any trip to Afghanistan."
  ]
}`
                },
            ],
        },
    ],
});
