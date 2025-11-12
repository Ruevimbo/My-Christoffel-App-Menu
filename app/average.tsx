import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import { useFocusEffect, useRouter } from "expo-router"; // useRouter for navigation, useFocusEffect to detect screen focus
import React, { useCallback, useState } from "react"; // React, useState for state, useCallback for memoized functions
import {
  FlatList, // To display a scrollable list of dishes
  Image, // To display dish images
  SafeAreaView, // Ensure content is within safe area
  StyleSheet, // For styling components
  Text, // For text display
  TouchableOpacity, // For touchable buttons
  View // Generic container component
} from "react-native";
import { Dish, getDishes } from "./dishesStore";
// Import Dish type and function to get all dishes from store

export default function Average() {
  const router = useRouter(); // Initialize router to navigate screens
  const [dishes, setDishes] = useState<Dish[]>([]); 
  // State to store all dishes, initially empty

  // Refresh dishes every time screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setDishes(getDishes()); 
      // Get dishes from store and update state when screen is focused
    }, [])
  );

  // Calculate total and average price of all dishes
  const totalPrice = dishes.reduce((sum, dish) => sum + parseFloat(dish.price), 0);
  const avgPrice = dishes.length ? (totalPrice / dishes.length).toFixed(2) : "0.00";
  // Above: Avoid division by zero. Round average to 2 decimals

  // Calculate average price per course (Starter, Main, Dessert)
  const courses = ["Starter", "Main", "Dessert"] as const;
  const avgByCourse = courses.map(course => {
    const filtered = dishes.filter(d => d.course === course); 
    // Get only dishes of the current course
    const total = filtered.reduce((sum, d) => sum + parseFloat(d.price), 0); 
    // Sum prices of filtered dishes
    return {
      course, 
      count: filtered.length, // Number of dishes in this course
      avg: filtered.length ? (total / filtered.length).toFixed(2) : "0.00", 
      // Calculate average for this course, avoid division by zero
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with averages */}
      <View style={styles.header}>
        <Text style={styles.title}>📊 Average Dish Price</Text>
        {/* Above: Title of screen */}
        <Text style={styles.avgText}>Total Dishes: {dishes.length}</Text>
        {/* Above: Show total number of dishes */}
        <Text style={styles.avgText}>Overall Average: R{avgPrice}</Text>
        {/* Above: Show overall average price */}

        {/* Averages by course */}
        {avgByCourse.map(item => (
          <Text key={item.course} style={styles.courseAvg}>
            {item.course}: {item.count} dish{item.count !== 1 ? "es" : ""} | Avg: R{item.avg}
            {/* Above: Display each course's count and average. Handles plural 'dishes' */}
          </Text>
        ))}
      </View>

      {/* List of Dishes */}
      {dishes.length === 0 ? (
        <Text style={styles.noDishes}>No dishes added yet.</Text>
        // Above: Show message if no dishes
      ) : (
        <FlatList
          data={dishes} // Data to render
          keyExtractor={(item) => item.id} // Unique key for each dish
          contentContainerStyle={{ padding: 15 }} // Padding around list
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              {/* Each dish card */}
              <View style={styles.cardHeader}>
                <Text style={styles.dishTitle}>{index + 1}. {item.name}</Text>
                {/* Above: Dish name with index */}
                <Text style={styles.price}>R{item.price}</Text>
                {/* Above: Dish price */}
              </View>
              {item.image && <Image source={{ uri: item.image }} style={styles.dishImage} />}
              {/* Above: Show image if exists */}
              <Text style={styles.description}>{item.description}</Text>
              {/* Above: Dish description */}
              <Text style={styles.courseTag}>{item.course}</Text>
              {/* Above: Dish course type */}
            </View>
          )}
        />
      )}

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push("/Home")} style={styles.navItem}>
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
          {/* Navigate to Home */}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/addDish")} style={styles.navItem}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.navText}>Add</Text>
          {/* Navigate to Add Dish */}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/filter")} style={styles.navItem}>
          <Ionicons name="filter" size={24} color="#fff" />
          <Text style={styles.navText}>Filter</Text>
          {/* Navigate to Filter screen */}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/average")} style={styles.navItem}>
          <Ionicons name="stats-chart" size={24} color="#fff" />
          <Text style={styles.navText}>Average</Text>
          {/* Navigate to Average screen */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
//Styles for the Average screen
const styles = StyleSheet.create({
  container: {
    /* Main container for the screen */
    flex: 1, // Fill the full vertical space
    backgroundColor: "#f4f4f4" // Light gray background
  },

  header: {
    /* Header section containing the screen title */
    alignItems: "center", // Center children horizontally
    paddingVertical: 20 // Vertical padding for spacing
  },

  title: {
    /* Main title text in the header */
    fontSize: 24, // Large font size
    fontWeight: "bold", // Bold text
    marginBottom: 10 // Space below the title
  },

  avgText: { 
    /* Label text for average values */
    fontSize: 18, // Medium font size
    marginBottom: 5 // Space below label
  },

  courseAvg: { 
    /* Average value for a specific course */
    fontSize: 16, // Slightly smaller font
    color: "#2e8b57", // Green text for emphasis
    marginBottom: 3 // Space below value
  },

  noDishes: { 
    /* Text displayed when no dishes are available */
    textAlign: "center", // Center horizontally
    color: "#777", // Light gray text
    marginTop: 20, // Space from top
    fontSize: 16 // Readable font size
  },

  card: { 
    /* Container for each dish card */
    backgroundColor: "#fff", // White background
    padding: 15, // Inner padding
    borderRadius: 12, // Rounded corners
    marginBottom: 10, // Space between cards
    shadowColor: "#000", // Shadow color
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 5, // Shadow blur radius
    elevation: 3 // Elevation for Android shadow
  },

  cardHeader: { 
    /* Header section of the card (dish name + price) */
    flexDirection: "row", // Arrange items in a row
    justifyContent: "space-between", // Space between dish name and price
    alignItems: "center" // Align items vertically
  },

  dishTitle: { 
    /* Dish name text */
    fontWeight: "bold", // Bold text
    fontSize: 16, // Font size
    color: "#333" // Dark gray text
  },

  price: { 
    /* Dish price text */
    fontWeight: "600", // Slightly bold
    color: "#2e8b57" // Green color for emphasis
  },

  dishImage: { 
    /* Dish image styling */
    width: "100%", // Full width of the card
    height: 120, // Fixed height
    borderRadius: 10, // Rounded corners
    marginTop: 10 // Space above image
  },

  description: { 
    /* Dish description text */
    color: "#555", // Medium gray
    marginTop: 8 // Space above description
  },

  courseTag: { 
    /* Tag showing dish course type */
    marginTop: 6, // Space above tag
    color: "#888", // Light gray
    fontStyle: "italic" // Italicized
  },

  navBar: {
    /* Bottom navigation bar container */
    flexDirection: "row", // Arrange items horizontally
    justifyContent: "space-around", // Even spacing between items
    backgroundColor: "#2e8b57", // Green background
    paddingVertical: 10, // Vertical padding
    borderRadius: 20, // Rounded edges
    marginHorizontal: 10, // Horizontal margin to inset nav bar
    position: "absolute", // Position at the bottom of screen
    bottom: 10, // Distance from bottom
    left: 0, // Stretch from left
    right: 0 // Stretch to right
  },

  navItem: { 
    /* Individual navigation button container */
    alignItems: "center" // Center icon and text horizontally
  },

  navText: { 
    /* Text under each navigation icon */
    color: "#fff", // White text
    fontSize: 12, // Small font size
    marginTop: 3 // Space above text
  },
});
