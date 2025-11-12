import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

export default function Index() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fade in everything once when the page loads
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Logo */}
      <Image
        source={{
          uri: "https://th.bing.com/th/id/R.dc8ab556a5d38ee1b137683abeaeeda2?rik=0BRx0tjrTa%2fdLQ&riu=http%3a%2f%2fwww.freepngclipart.com%2fdownload%2fchef%2f59146-chef-cartoon-free-download-png-hd.png&ehk=oBZebtmHfdVgZGElvsb9yE8Nt7uouaeY0YfFoYNza2E%3d&risl=&pid=ImgRaw&r=0",
        }}
        style={styles.logo}
      />

      {/* Business Name */}
      <Text style={styles.appName}>Christoffel's APP</Text>

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>Welcome! We’re glad to have you here</Text>

      {/* Go Button */}
      <TouchableOpacity
        style={styles.goButton}
        onPress={() => router.push("/Home")}
      >
        <Text style={styles.goText}>GO!</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 30,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
  },
  goButton: {
    backgroundColor: "#2e8b57",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  goText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

