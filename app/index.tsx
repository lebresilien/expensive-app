import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import LoginScreen from "@/app/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";
import OnBoarding from "./page-viewer";

const Loading = ({ size }: { size?: number | "small" | "large" }) => {
  return (
    <ThemedView>
      <ActivityIndicator size={size} color={"0ea5e9"} />
    </ThemedView>
  );
};
export default function Presentation() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log("Error checkOnborading : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
        checkOnboarding();
     }, 2000)
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#0ea5e9" />
      {loading ? (
        <Loading size={"large"} />
      ) : viewedOnboarding ? (
        <LoginScreen />
      ) : (
        <OnBoarding />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
