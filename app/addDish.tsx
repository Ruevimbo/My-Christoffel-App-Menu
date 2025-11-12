import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert, // To show pop-up alerts
  Image, // To display images
  SafeAreaView, // To make sure UI is within safe screen boundaries
  ScrollView, // To allow scrolling when content overflows screen
  StyleSheet, // For styling components
  Text, // To display text
  TextInput, // Input fields for text
  TouchableOpacity, // Touchable button-like component
  View // Generic container for layout
} from "react-native";
import { addDish } from "./dishesStore";

export default function AddDish() {
  const router = useRouter(); 
  // Initialize router for navigation

  // State variables to hold dish information
  const [name, setName] = useState(""); 
  // Stores the name of the dish
  const [description, setDescription] = useState(""); 
  // Stores the dish description
  const [course, setCourse] = useState("Starter"); 
  // Stores the selected course from the dropdown (Starter, Main, Dessert)
  const [price, setPrice] = useState(""); 
  // Stores the price of the dish
  const [image, setImage] = useState<string | null>(null); 
  // Stores the URI of the selected image, initially null (no image)

  // Function to pick an image from the device library
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      // Only allow image files
      allowsEditing: true, 
      // Allow cropping and editing before selecting
      aspect: [4, 3], 
      // Image aspect ratio 4:3
      quality: 1, 
      // Highest image quality
    });

    if (!result.canceled) setImage(result.assets[0].uri); 
    // If user selects an image, save the URI to state
  };

  // Function to handle adding a new dish
  const handleAddDish = () => {
    // Validation: Ensure all required fields are filled
    if (!name || !description || !price) {
      Alert.alert("Error", "Please fill all fields!");
      // Alert the user if any field is empty
      return; 
    }

    // Create a new dish object
    const newDish = {
      id: Date.now().toString(), 
      // Unique ID based on timestamp
      name, 
      // Name from state
      description, 
      // Description from state
      course, 
      // Selected course from state
      price, 
      // Price from state
      image, 
      // Optional image URI
    };

    addDish(newDish); 
    // Add new dish to the dishes store

    router.push("./Home"); 
    // Navigate back to Home screen after adding
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ScrollView allows scrolling if content exceeds screen */}
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>🍽️ Add a Dish</Text>
        {/* Screen title */}

        {/* Image Picker */}
        <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
          {/* Tapping this opens the image picker */}
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
            // Show selected image if exists
          ) : (
            <View style={styles.imagePlaceholder}>
              {/* Placeholder when no image is selected */}
              <Ionicons name="image" size={40} color="#888" />
              <Text style={{ color: "#888", marginTop: 5 }}>Tap to pick an image</Text>
              {/* Instruction for user */}
            </View>
          )}
        </TouchableOpacity>

        {/* Dish Name Input */}
        <TextInput 
          style={styles.input} 
          placeholder="Dish Name" 
          value={name} 
          onChangeText={setName} 
        />

        {/* Dish Description Input */}
        <TextInput
          style={[styles.input, { height: 80 }]} 
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline 
          // Allow multiple lines for longer descriptions
        />

        {/* Dropdown Picker for Course */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={course} 
            // Currently selected value
            onValueChange={(itemValue) => setCourse(itemValue)} 
            // Update state when selection changes
            style={styles.picker}
          >
            <Picker.Item label="Starter" value="Starter" />
            <Picker.Item label="Main" value="Main" />
            <Picker.Item label="Dessert" value="Dessert" />
          </Picker>
        </View>

        {/* Price Input */}
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric" 
          // Keyboard shows numbers only
          value={price}
          onChangeText={setPrice}
        />

        {/* Add Dish Button */}
        <TouchableOpacity style={styles.addBtn} onPress={handleAddDish}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.addText}>Add to Menu</Text>
          {/* Calls handleAddDish when it is pressed */}
        </TouchableOpacity>
      </ScrollView>
    
      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        {/* Home Button */}
        <TouchableOpacity
          onPress={() => router.push("/Home")}
          style={styles.navItem}
        >
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        {/* Add Dish Button */}
        <TouchableOpacity
          onPress={() => router.push("/addDish")}
          style={styles.navItem}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>

        {/* Filter Button */}
        <TouchableOpacity
          onPress={() => router.push("/filter")}
          style={styles.navItem}
        >
          <Ionicons name="filter" size={24} color="#fff" />
          <Text style={styles.navText}>Filter</Text>
        </TouchableOpacity>

        {/* Average Button */}
        <TouchableOpacity
          onPress={() => router.push("/average")}
          style={styles.navItem}
        >
          <Ionicons name="stats-chart" size={24} color="#fff" />
          <Text style={styles.navText}>Average</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Styles for the AddDish screen
const styles = StyleSheet.create({
  container: { 
    /* Main container for the screen */
    flex: 1, // Fill the entire vertical space
    backgroundColor: "#f4f4f4", // Light gray background for the screen
    paddingHorizontal: 15, // Horizontal padding on left and right
    paddingTop: 15 // Padding at the top
  },
  title: { 
    /* Title text "Add a Dish" */
    fontSize: 24, // Large font size
    fontWeight: "bold", // Bold text
    textAlign: "center", // Center the title horizontally
    color: "#333", // Dark gray color
    marginBottom: 20 // Space below the title
  },
  imageBox: { 
    /* Container for image picker */
    width: "100%", // Full width of the container
    height: 180, // Fixed height
    backgroundColor: "#fff", // White background
    borderRadius: 15, // Rounded corners
    marginBottom: 20, // Space below the image box
    overflow: "hidden", // Hide any content that overflows
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    borderWidth: 1, // Thin border
    borderColor: "#ddd" // Light gray border
  },
  imagePlaceholder: { 
    /* Placeholder content inside imageBox */
    justifyContent: "center", // Center vertically
    alignItems: "center" // Center horizontally
  },
  imagePreview: { 
    /* Style for selected image preview */
    width: "100%", // Fill the container width
    height: "100%", // Fill the container height
    borderRadius: 15 // Rounded corners to match imageBox
  },
  input: { 
    /* Input fields (name, description, price) */
    backgroundColor: "#fff", // White background
    padding: 12, // Inner padding
    marginBottom: 15, // Space below input
    borderRadius: 10, // Rounded corners
    fontSize: 16, // Font size for text
    borderWidth: 1, // Thin border
    borderColor: "#ddd" // Light gray border
  },
  pickerContainer: {
    /* Container for the dropdown picker */
    backgroundColor: "#fff", // White background
    borderRadius: 10, // Rounded corners
    borderWidth: 1, // Thin border
    borderColor: "#ddd", // Light gray border
    marginBottom: 15 // Space below the picker
  },
  picker: { 
    /* Style for the picker element */
    height: 50, // Height of the picker
    width: "100%" // Full width of container
  },
  addBtn: { 
    /* Add to Menu button */
    flexDirection: "row", // Icon and text arranged horizontally
    backgroundColor: "#2e8b57", // Green background
    padding: 15, // Inner padding
    borderRadius: 25, // Rounded button
    alignItems: "center", // Center content vertically
    justifyContent: "center", // Center content horizontally
    marginTop: 10 // Space above the button
  },
  addText: { 
    /* Text inside Add button */
    color: "#fff", // White text
    fontWeight: "bold", // Bold for emphasis
    marginLeft: 8, // Space between icon and text
    fontSize: 16 // Font size
  },
  navBar: { 
    /* Bottom navigation bar */
    flexDirection: "row", // Arrange navigation items horizontally
    justifyContent: "space-around", // Even spacing between items
    backgroundColor: "#2e8b57", // Green background
    paddingVertical: 10, // Vertical padding
    borderRadius: 20, // Rounded edges
    marginBottom: 10 // Space below navBar (from bottom)
  },
  navItem: { 
    /* Individual navigation item container */
    alignItems: "center" // Center icon and text
  },
  navText: { 
    /* Text under each navigation icon */
    color: "#fff", // White text
    fontSize: 12, // Small font
    marginTop: 3 // Space between icon and text
  },
});
