// app/index.tsx
import { View } from "react-native";
import Login from "../components/Login"; // Adjust path to point to the correct location

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Login />
        </View>
    );
}
