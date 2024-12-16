import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import LoginScreen from "@/app/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnBoarding from "./page-viewer";
import { Loading } from "@/components/Loading";
import { router } from "expo-router";

export default function Presentation() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  //const [viewedToken, setViewedToken] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");
      if (value !== null) {
        //router.replace('/login');
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log("Error checkOnborading : ", error);
    } finally {
      setLoading(false);
    }
  };

  const checkToken = async () => {
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value !== null) {
        //console.log('token', value)
        router.replace('/(tabs)');
        //setViewedToken(true);
      }
    } catch (error) {
      console.log("Error Token : ", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
        checkOnboarding();
     }, 2000)
  }, []);

  useEffect(() => {
    setTimeout(() => {
      checkToken();
     }, 2000)
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#0ea5e9" />
        {loading ? (
          <Loading size={"large"} />
        ) : /* viewedOnboarding ? (
            <LoginScreen from='index' /> 
        ) : */ (
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
