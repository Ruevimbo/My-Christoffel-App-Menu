import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { addDish } from "./dishesStore"; // import store

export default function AddDish() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("Starter");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleAddDish = () => {
    if (!name || !description || !price) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    const newDish = {
      id: Date.now().toString(),
      name,
      description,
      course,
      price,
      image,
    };

    addDish(newDish); // add to shared store
    router.push("./Home"); // go back to Home
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>🍽️ Add a Dish</Text>

        {/* Image Picker */}
        <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
          {image ? <Image source={{ uri: image }} style={styles.imagePreview} /> :
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image" size={40} color="#888" />
              <Text style={{ color: "#888", marginTop: 5 }}>Tap to pick an image</Text>
            </View>
          }
        </TouchableOpacity>

        <TextInput style={styles.input} placeholder="Dish Name" value={name} onChangeText={setName} />
        <TextInput style={[styles.input, { height: 80 }]} placeholder="Description" value={description} onChangeText={setDescription} multiline />
        <TextInput style={styles.input} placeholder="Course (Starter/Main/Dessert)" value={course} onChangeText={setCourse} />
        <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" value={price} onChangeText={setPrice} />

        <TouchableOpacity style={styles.addBtn} onPress={handleAddDish}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.addText}>Add to Menu</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Keep your previous styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", paddingHorizontal: 15, paddingTop: 15 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#333", marginBottom: 20 },
  imageBox: { width: "100%", height: 180, backgroundColor: "#fff", borderRadius: 15, marginBottom: 20, overflow: "hidden", justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#ddd" },
  imagePlaceholder: { justifyContent: "center", alignItems: "center" },
  imagePreview: { width: "100%", height: "100%", borderRadius: 15 },
  input: { backgroundColor: "#fff", padding: 12, marginBottom: 15, borderRadius: 10, fontSize: 16, borderWidth: 1, borderColor: "#ddd" },
  addBtn: { flexDirection: "row", backgroundColor: "#2e8b57", padding: 15, borderRadius: 25, alignItems: "center", justifyContent: "center", marginTop: 10 },
  addText: { color: "#fff", fontWeight: "bold", marginLeft: 8, fontSize: 16 },
});

