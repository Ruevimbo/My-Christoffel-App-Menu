import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList, // Efficiently renders a scrollable list of items
  Image, // Displays images
  SafeAreaView, // Ensures content is displayed within safe screen boundaries
  StyleSheet, // For styling components
  Text, // Displays text
  TouchableOpacity, // Makes views pressable
  View // Container for layout
} from "react-native";
import { Dish, getFilteredDishes } from "./dishesStore";

export default function Filter() {
  const router = useRouter(); 
  // Initialize router for navigation

  // State to hold currently selected courses for filtering
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // State to hold all dishes from the store
  const [dishes, setDishes] = useState<Dish[]>([]);

  // State to hold filtered dishes based on selected courses
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);

  // Available course options
  const courses = ["Starter", "Main", "Dessert"];

  // Load all dishes when component mounts
  useEffect(() => {
    const allDishes = getFilteredDishes(); 
    // Fetch all dishes from the store
    setDishes(allDishes); 
    // Save them in state
    setFilteredDishes(allDishes); 
    // Initially, filtered list is same as all dishes
  }, []);

  // Toggle selection of a course
  const toggleCourse = (course: string) => {
    // If course is already selected, remove it; else, add it
    let updated = selectedCourses.includes(course)
      ? selectedCourses.filter((c) => c !== course)
      : [...selectedCourses, course];

    setSelectedCourses(updated); 
    // Update selected courses state

    // Filter dishes based on selected courses
    setFilteredDishes(
      updated.length === 0 ? dishes : dishes.filter((d) => updated.includes(d.course))
      // If no course is selected, show all dishes
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Filter Buttons Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.title}>🍽️ Filter by Course</Text>
        {/* Row of buttons for each course */}
        <View style={styles.buttonRow}>
          {courses.map((course) => (
            <TouchableOpacity
              key={course}
              style={[
                styles.courseBtn, 
                selectedCourses.includes(course) && styles.courseSelected
              ]}
              onPress={() => toggleCourse(course)} 
              // Toggle course selection on press
            >
              <Text 
                style={[
                  styles.courseText, 
                  selectedCourses.includes(course) && styles.courseTextSelected
                ]}
              >
                {course}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Dish List Section */}
      {filteredDishes.length === 0 ? (
        <Text style={styles.noDishes}>No dishes to show</Text>
        // Message shown when no dishes match filter
      ) : (
        <FlatList
          data={filteredDishes} 
          // Data for FlatList is the filtered dishes
          keyExtractor={(item) => item.id} 
          // Unique key for each dish
          contentContainerStyle={{ padding: 20, paddingBottom: 80 }} 
          // Padding for list
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              {/* Dish Header */}
              <View style={styles.cardHeader}>
                <Text style={styles.dishTitle}>
                  {index + 1}. {item.name}
                </Text>
                <Text style={styles.price}>R{item.price}</Text>
              </View>

              {/* Dish Image */}
              {item.image && <Image source={{ uri: item.image }} style={styles.dishImage} />}
              
              {/* Dish Description */}
              <Text style={styles.description}>{item.description}</Text>

              {/* Dish Course */}
              <Text style={styles.courseTag}>{item.course}</Text>
            </View>
          )}
        />
      )}

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        {/* Home Button */}
        <TouchableOpacity onPress={() => router.push("/Home")} style={styles.navItem}>
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        {/* Add Dish Button */}
        <TouchableOpacity onPress={() => router.push("/addDish")} style={styles.navItem}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>

        {/* Filter Button */}
        <TouchableOpacity onPress={() => router.push("/filter")} style={styles.navItem}>
          <Ionicons name="filter" size={24} color="#fff" />
          <Text style={styles.navText}>Filter</Text>
        </TouchableOpacity>

        {/* Average Button */}
        <TouchableOpacity onPress={() => router.push("/average")} style={styles.navItem}>
          <Ionicons name="stats-chart" size={24} color="#fff" />
          <Text style={styles.navText}>Average</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styles for Filter screen
const styles = StyleSheet.create({
  container: { 
    /* Container for the entire screen */
    flex: 1, // Fill the whole screen vertically
    backgroundColor: "#f4f4f4" // Light gray background for the screen
  },
  filterContainer: { 
    /* Container for the filter section at the top */
    padding: 20 // Add spacing inside the container
  },
  title: { 
    /* Title text "Filter by Course" */
    fontSize: 24, // Large font size for emphasis
    fontWeight: "bold", // Bold text
    marginBottom: 10, // Space below title
    textAlign: "center", // Center the text horizontally
    color: "#333" // Dark gray color
  },
  buttonRow: { 
    /* Row containing course filter buttons */
    flexDirection: "row", // Arrange buttons horizontally
    flexWrap: "wrap", // Wrap buttons to next line if needed
    justifyContent: "center", // Center the buttons horizontally
    marginBottom: 10 // Space below the row
  },
  courseBtn: { 
    /* Default button style for each course */
    backgroundColor: "#fff", // White background
    padding: 10, // Inner spacing
    borderRadius: 15, // Rounded corners
    margin: 5, // Space between buttons
    borderWidth: 1, // Thin border
    borderColor: "#ddd" // Light gray border
  },
  courseSelected: { 
    /* Style for a selected course button */
    backgroundColor: "#2e8b57" // Green background when selected
  },
  courseText: { 
    /* Default text style inside each course button */
    fontSize: 16, // Medium font size
    textAlign: "center", // Center the text
    color: "#333" // Dark gray text
  },
  courseTextSelected: { 
    /* Text style for a selected course button */
    color: "#fff", // White text when selected
    fontWeight: "bold" // Bold for emphasis
  },
  noDishes: { 
    /* Text displayed when there are no dishes */
    textAlign: "center", // Center horizontally
    color: "#777", // Light gray text
    marginTop: 20, // Space from top
    fontSize: 16 // Medium font size
  },
  card: { 
    /* Card container for each dish */
    backgroundColor: "#fff", // White card background
    padding: 15, // Inner padding
    borderRadius: 12, // Rounded corners
    marginBottom: 10, // Space below each card
    shadowColor: "#000", // Shadow color for iOS
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 5, // Shadow blur
    elevation: 3 // Shadow elevation for Android
  },
  cardHeader: { 
    /* Header section inside card containing name and price */
    flexDirection: "row", // Arrange text horizontally
    justifyContent: "space-between", // Place name and price at opposite ends
    alignItems: "center" // Center vertically
  },
  dishTitle: { 
    /* Style for dish name */
    fontWeight: "bold", // Bold text
    fontSize: 16, // Medium font size
    color: "#333" // Dark gray
  },
  price: { 
    /* Style for dish price */
    fontWeight: "600", // Semi-bold
    color: "#2e8b57" // Green to match theme
  },
  dishImage: { 
    /* Image of the dish */
    width: "100%", // Full card width
    height: 120, // Fixed height
    borderRadius: 10, // Rounded corners
    marginTop: 10 // Space above image
  },
  description: { 
    /* Description text for the dish */
    color: "#555", // Medium gray text
    marginTop: 8 // Space above description
  },
  courseTag: { 
    /* Tag showing course type (Starter/Main/Dessert) */
    marginTop: 6, // Space above
    color: "#888", // Light gray text
    fontStyle: "italic" // Italic style
  },
  navBar: { 
    /* Bottom navigation bar */
    flexDirection: "row", // Arrange buttons horizontally
    justifyContent: "space-around", // Even spacing between buttons
    backgroundColor: "#2e8b57", // Green background
    paddingVertical: 10, // Vertical padding
    borderRadius: 20, // Rounded edges
    position: "absolute", // Fixed position at bottom
    bottom: 10, // Distance from bottom
    left: 10, // Distance from left
    right: 10 // Distance from right
  },
  navItem: { 
    /* Individual navigation button container */
    alignItems: "center" // Center icon and text
  },
  navText: { 
    /* Text under each navigation icon */
    color: "#fff", // White text
    fontSize: 12, // Small font size
    marginTop: 3 // Space above text
  },
});
