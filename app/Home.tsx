import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import { useFocusEffect, useRouter } from "expo-router"; // useRouter for navigation, useFocusEffect to detect screen focus
import React, { useCallback, useState } from "react"; // React, useState for state, useCallback for memoized functions
import {
  Alert, // To show confirmation dialogs
  FlatList, // For displaying a scrollable list
  Image, // For images
  SafeAreaView, // To render content within safe area on devices
  StyleSheet, // To style components
  Text, // To display text
  TouchableOpacity, // For touchable buttons
  View, // Container components
} from "react-native";
import { deleteDish, Dish, getFilteredDishes } from "./dishesStore";
// Importing dish type, delete function, and filter function from store

export default function Home() {
  const router = useRouter(); // Initialize router to navigate screens
  const [dishes, setDishes] = useState<Dish[]>([]); 
  // State to store dishes. Initially empty array

  const refreshDishes = () => setDishes(getFilteredDishes()); 
  // Function to refresh dishes list from store

  // Refresh dishes whenever this screen is focused
  useFocusEffect(
    useCallback(() => {
      refreshDishes(); 
      // When the screen comes into focus, reload dishes
    }, [])
  );

  const handleDeleteDish = (id: string) => {
    // Function to handle dish deletion
    Alert.alert("Delete Dish", "Are you sure you want to delete this dish?", [
      { text: "Cancel", style: "cancel" }, 
      // Cancel button does nothing
      {
        text: "Delete",
        style: "destructive", 
        // Red style to indicate destructive action
        onPress: () => {
          deleteDish(id); // Remove dish from store
          refreshDishes(); // Refresh list after deletion
        },
      },
    ]);
  };

  // Calculate average price of all dishes
  const getAveragePrice = () => {
    if (dishes.length === 0) return 0; // Avoid dividing by zero
    const total = dishes.reduce((sum, dish) => sum + Number(dish.price), 0); 
    // Sum up all dish prices
    return (total / dishes.length).toFixed(2); 
    // Calculate average and round to 2 decimal places
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://th.bing.com/th/id/R.dc8ab556a5d38ee1b137683abeaeeda2?rik=0BRx0tjrTa%2fdLQ&riu=http%3a%2f%2fwww.freepngclipart.com%2fdownload%2fchef%2f59146-chef-cartoon-free-download-png-hd.png&ehk=oBZebtmHfdVgZGElvsb9yE8Nt7uouaeY0YfFoYNza2E%3d&risl=&pid=ImgRaw&r=0",
          }}
          style={styles.logo}
        />
        {/* Above: Display logo image */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>🍽️ Menu Dishes</Text>
          {/* Above: Title text for header */}
          <Text style={styles.countText}>Total Dishes: {dishes.length}</Text>
          {/* Above: Show number of dishes dynamically */}
        </View>
      </View>

      {/* Average Price Card */}
      {dishes.length > 0 && (
        <View style={styles.averageCard}>
          <Text style={styles.averageText}>Average Price</Text>
          <Text style={styles.averageAmount}>R{getAveragePrice()}</Text>
          {/* Above: Display calculated average price */}
        </View>
      )}

      {/* Message if no dishes */}
      {dishes.length === 0 ? (
        <Text style={styles.noDishes}>No dishes yet. Add one!</Text>
        // Above: Show this message if dish list is empty
      ) : (
        <FlatList
          data={dishes} // Data to render
          keyExtractor={(item) => item.id} // Unique key for each item
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              {/* Each dish card */}
              <View style={styles.cardHeader}>
                <Text style={styles.dishTitle}>
                  {index + 1}. {item.name}
                </Text>
                <Text style={styles.price}>R{item.price}</Text>
                {/* Above: Dish name and price */}
              </View>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.dishImage} />
                // Above: Show dish image if it exists
              )}
              <Text style={styles.description}>{item.description}</Text>
              {/* Above: Show dish description */}
              <Text style={styles.courseTag}>{item.course}</Text>
              {/* Above: Show dish course type */}
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDeleteDish(item.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
                {/* Above: Delete button for dish */}
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Add new dish button */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/addDish")}
      >
        <Ionicons name="add-circle" size={22} color="#fff" />
        <Text style={styles.addText}>Add New Dish</Text>
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => router.push("/Home")}
          style={styles.navItem}
        >
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
          {/* Above: Navigate to Home */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/addDish")}
          style={styles.navItem}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.navText}>Add</Text>
          {/* Above: Navigate to Add Dish screen */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/filter")}
          style={styles.navItem}
        >
          <Ionicons name="filter" size={24} color="#fff" />
          <Text style={styles.navText}>Filter</Text>
          {/* Above: Navigate to Filter screen */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/average")}
          style={styles.navItem}
        >
          <Ionicons name="stats-chart" size={24} color="#fff" />
          <Text style={styles.navText}>Average</Text>
          {/* Above: Navigate to Average screen */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
//Styles for the Home screen
const styles = StyleSheet.create({
  container: { 
    // Main container for the screen
    flex: 1, // Fill the entire vertical space
    backgroundColor: "#f4f4f4", // Light gray background
    paddingHorizontal: 15, // Horizontal padding on both sides
    paddingTop: 15 // Padding at the top
  },

  // Header with logo
  header: { 
    flexDirection: "row", // Align logo and text in a row
    alignItems: "center", // Vertically center items
    marginBottom: 15, // Space below header
    position: "relative" // Allows absolute positioning for inner elements
  },

  logo: { 
    width: 60, // Width of the logo
    height: 60, // Height of the logo
    borderRadius: 30 // Make logo circular
  },

  // Text container centered over logo area
  textContainer: {
     position: "absolute", // Position text absolutely inside header
     left: 0, right: 0, // Stretch horizontally
     alignItems: "center" // Center text horizontally
  },

  title: {
    fontSize: 24, // Large font size for title
    fontWeight: "bold", // Bold title text
    color: "#333" // Dark gray color
  },

  countText: { 
    // Display total number of dishes
    color: "#555", // Medium gray
    marginTop: 2 // Small space above/below
  },

  noDishes: { 
    // Text shown when no dishes are available
    textAlign: "center", // Center horizontally
    color: "#777", // Light gray color
    marginTop: 30 // Space from top
  },

  card: {
    // Container for each dish
    backgroundColor: "#fff", // White background
    padding: 15, // Inner padding
    borderRadius: 12, // Rounded corners
    marginBottom: 10, // Space below each card
    shadowColor: "#000", // Shadow color
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 5, // Shadow blur radius
    elevation: 3, // Elevation for Android shadow
  },

  cardHeader: { 
    flexDirection: "row", // Arrange dish name and price in a row
    justifyContent: "space-between", // Space between name and price
    alignItems: "center" // Align vertically
  },

  dishTitle: { 
    fontWeight: "bold", // Bold dish name
    fontSize: 16, // Font size
    color: "#333" // Dark gray
  },

  price: { 
    fontWeight: "600", // Slightly bold price
    color: "#2e8b57" // Green color for price
  },

  dishImage: { 
    width: "100%", // Full width of card
    height: 120, // Fixed height
    borderRadius: 10, // Rounded corners
    marginTop: 10 // Space above image
  },

  description: { 
    color: "#555", // Medium gray for description
    marginTop: 8 // Space above description
  },

  courseTag: { 
    marginTop: 6, // Space above course tag
    color: "#888", // Light gray
    fontStyle: "italic" // Italic text
  },

  deleteBtn: { 
    // Button to delete a dish
    marginTop: 10, // Space above button
    backgroundColor: "#ff4d4d", // Red background
    padding: 8, // Inner padding
    borderRadius: 10, // Rounded corners
    alignItems: "center" // Center text horizontally
  },

  deleteText: { 
    color: "#fff", // White text
    fontWeight: "bold" // Bold text
  },

  addBtn: { 
    // Add dish button at bottom
    flexDirection: "row", // Icon and text in row
    backgroundColor: "#2e8b57", // Green background
    padding: 15, // Inner padding
    borderRadius: 25, // Rounded corners
    alignItems: "center", // Center vertically
    justifyContent: "center", // Center horizontally
    marginVertical: 10 // Space above and below
  },

  addText: { 
    color: "#fff", // White text
    fontWeight: "bold", // Bold text
    marginLeft: 8 // Space between icon and text
  },

  navBar: { 
    // Bottom navigation bar
    flexDirection: "row", // Arrange items horizontally
    justifyContent: "space-around", // Even spacing
    backgroundColor: "#2e8b57", // Green background
    paddingVertical: 10, // Vertical padding
    borderRadius: 20, // Rounded edges
    marginBottom: 10 // Space from bottom
  },

  navItem: { 
    alignItems: "center" // Center icon and text
  },

  navText: { 
    color: "#fff", // White text
    fontSize: 12, // Small text
    marginTop: 3 // Space above text
  },

  // Average Card Styles
  averageCard: {
    backgroundColor: "#e0f7e9", // Light green background for averages
    padding: 15, // Inner padding
    borderRadius: 12, // Rounded corners
    marginBottom: 15, // Space below card
    alignItems: "center", // Center content
    shadowColor: "#000", // Shadow color
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 5, // Shadow blur
    elevation: 3 // Elevation for Android
  },

  averageText: {
    fontSize: 14, // Smaller font for label
    color: "#555", // Gray text
    marginBottom: 5 // Space below label
  },

  averageAmount: {
    fontSize: 20, // Larger font for average value
    fontWeight: "bold", // Bold text
    color: "#2e8b57", // Green text
  },
});
