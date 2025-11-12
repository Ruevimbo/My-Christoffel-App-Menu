import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dish, getFilteredDishes } from "./dishesStore";

export default function Filter() {
  const router = useRouter();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);

  const courses = ["Starter", "Main", "Dessert"];

  useEffect(() => {
    const allDishes = getFilteredDishes();
    setDishes(allDishes);
    setFilteredDishes(allDishes);
  }, []);

  const toggleCourse = (course: string) => {
    let updated = selectedCourses.includes(course)
      ? selectedCourses.filter((c) => c !== course)
      : [...selectedCourses, course];

    setSelectedCourses(updated);

    setFilteredDishes(
      updated.length === 0 ? dishes : dishes.filter((d) => updated.includes(d.course))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <Text style={styles.title}>🍽️ Filter by Course</Text>
        <View style={styles.buttonRow}>
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
      </View>

      {/* Dish List */}
      {filteredDishes.length === 0 ? (
        <Text style={styles.noDishes}>No dishes to show</Text>
      ) : (
        <FlatList
          data={filteredDishes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
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

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push("/Home")} style={styles.navItem}>
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/addDish")} style={styles.navItem}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/filter")} style={styles.navItem}>
          <Ionicons name="filter" size={24} color="#fff" />
          <Text style={styles.navText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/average")} style={styles.navItem}>
          <Ionicons name="stats-chart" size={24} color="#fff" />
          <Text style={styles.navText}>Average</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  filterContainer: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#333" },
  buttonRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 10 },
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
  navBar: { flexDirection: "row", justifyContent: "space-around", backgroundColor: "#2e8b57", paddingVertical: 10, borderRadius: 20, position: "absolute", bottom: 10, left: 10, right: 10 },
  navItem: { alignItems: "center" },
  navText: { color: "#fff", fontSize: 12, marginTop: 3 },
});
