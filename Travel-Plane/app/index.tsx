import { View } from "react-native";
import Login from "../components/Login";
import { auth } from "@/configs/FirebaseConfig";
import { Redirect } from "expo-router"; // Adjust path to point to the correct location

export default function Index() {
    const user = auth.currentUser;
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {user?
                <Redirect href={"/mytrip"} />:
                <Login/>
            }
        </View>
    );
}
