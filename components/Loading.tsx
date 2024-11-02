import { ThemedView } from "@/components/ThemedView";
import { ActivityIndicator } from "react-native";

export const Loading = ({ size }: { size?: number | "small" | "large" }) => {
    return (
      <ThemedView>
        <ActivityIndicator size={size} color={"0ea5e9"} />
      </ThemedView>
    );
};