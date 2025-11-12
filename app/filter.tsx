import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dish, getFilteredDishes } from "./dishesStore"; // get all dishes

export default function Filter() {
  const router = useRouter();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);

  const courses = ["Starter", "Main", "Dessert"];

  // Load all dishes when the screen opens
  useEffect(() => {
    const allDishes = getFilteredDishes(); // get everything
    setDishes(allDishes);
    setFilteredDishes(allDishes); // show all by default
  }, []);

  const toggleCourse = (course: string) => {
    let updated = [];
    if (selectedCourses.includes(course)) {
      updated = selectedCourses.filter((c) => c !== course);
    } else {
      updated = [...selectedCourses, course];
    }
    setSelectedCourses(updated);

    // Update filtered dishes live
    if (updated.length === 0) {
      setFilteredDishes(dishes); // show all if nothing selected
    } else {
      setFilteredDishes(dishes.filter((d) => updated.includes(d.course)));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>🍽️ Filter by Course</Text>

        {/* Filter Buttons */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}>
          {courses.map((course) => (
            <TouchableOpacity
              key={course}
              style={[styles.courseBtn, selectedCourses.includes(course) && styles.courseSelected]}
              onPress={() => toggleCourse(course)}
            >
              <Text style={[styles.courseText, selectedCourses.includes(course) && styles.courseTextSelected]}>
                {course}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filtered Dishes */}
        {filteredDishes.length === 0 ? (
          <Text style={styles.noDishes}>No dishes to show</Text>
        ) : (
          <FlatList
            data={filteredDishes}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.dishTitle}>{index + 1}. {item.name}</Text>
                  <Text style={styles.price}>R{item.price}</Text>
                </View>
                {item.image && <Image source={{ uri: item.image }} style={styles.dishImage} />}
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.courseTag}>{item.course}</Text>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" },
  courseBtn: { backgroundColor: "#fff", padding: 10, borderRadius: 15, margin: 5, borderWidth: 1, borderColor: "#ddd" },
  courseSelected: { backgroundColor: "#2e8b57" },
  courseText: { fontSize: 16, textAlign: "center", color: "#333" },
  courseTextSelected: { color: "#fff", fontWeight: "bold" },
  noDishes: { textAlign: "center", color: "#777", marginTop: 20, fontSize: 16 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 12, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  dishTitle: { fontWeight: "bold", fontSize: 16, color: "#333" },
  price: { fontWeight: "600", color: "#2e8b57" },
  dishImage: { width: "100%", height: 120, borderRadius: 10, marginTop: 10 },
  description: { color: "#555", marginTop: 8 },
  courseTag: { marginTop: 6, color: "#888", fontStyle: "italic" },
});
