import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated, // For animated views
  Image, // To display images
  StyleSheet, // To style components
  Text, // To display text
  TouchableOpacity // To create touchable buttons
} from "react-native";

export default function Index() {
  const router = useRouter(); // Initialize router to navigate to other screens
  const fadeAnim = useRef(new Animated.Value(0)).current; // Create an animated value starting at 0 (completely transparent)
  // useRef is used to persist the value across renders

  // Fade in everything once when the page loads
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Animate to fully visible (opacity 1)
      duration: 1200, // Animation duration in milliseconds (1.2 seconds)
      useNativeDriver: true, // Use native driver for better performance
    }).start(); // Start the animation
    // This effect runs only once when the component mounts
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
      {/* Above: Display a logo image. The 'uri' specifies the online image URL. */}

      {/* Business Name */}
      <Text style={styles.appName}>Christoffel's APP</Text>
      {/* Above: Display the app's name with large, bold text */}

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>Welcome! We’re glad to have you here</Text>
      {/* Above: Display a friendly welcome message with smaller, italic text */}

      {/* Go Button */}
      <TouchableOpacity
        style={styles.goButton} // Apply button styles
        onPress={() => router.push("/Home")} // Navigate to the "Home" page when pressed
      >
        <Text style={styles.goText}>GO!</Text>
        {/* Above: Text inside the button */}
      </TouchableOpacity>
    </Animated.View>
  );
}
//Styles for the Welcome screen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the whole screen
    backgroundColor: "#fff", // White background
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    padding: 20, // Space around content inside container
  },
  logo: {
    width: 140, // Logo width
    height: 140, // Logo height
    marginBottom: 30, // Space below the logo
  },
  appName: {
    fontSize: 28, // Big text
    fontWeight: "bold", // Bold font
    textAlign: "center", // Center text horizontally
    color: "#333", // Dark gray text
    marginBottom: 20, // Space below the text
  },
  welcomeText: {
    fontSize: 18, // Medium text
    fontStyle: "italic", // Italic font
    color: "#555", // Medium gray text
    textAlign: "center", // Center text horizontally
    marginBottom: 40, // Space below the text
  },
  goButton: {
    backgroundColor: "#2e8b57", // Green background
    paddingVertical: 15, // Vertical padding inside button
    paddingHorizontal: 60, // Horizontal padding inside button
    borderRadius: 30, // Rounded corners
  },
  goText: {
    color: "#fff", // White text
    fontSize: 18, // Medium text size
    fontWeight: "bold", // Bold font
  },
});


