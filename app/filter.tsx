import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { setFilter } from "./dishesStore";

export default function Filter() {
  const router = useRouter();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const courses = ["Starter", "Main", "Dessert"];

  const toggleCourse = (course: string) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const applyFilter = () => {
    if (selectedCourses.length === 0) {
      Alert.alert("Error", "Please select at least one course to filter!");
      return;
    }
    setFilter(selectedCourses);
    router.push("/Home"); // return to Home
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Filter by Course</Text>

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

        <TouchableOpacity style={styles.applyBtn} onPress={applyFilter}>
          <Text style={styles.applyText}>Apply Filter</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" },
  courseBtn: { backgroundColor: "#fff", padding: 15, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: "#ddd" },
  courseSelected: { backgroundColor: "#2e8b57" },
  courseText: { fontSize: 16, textAlign: "center", color: "#333" },
  courseTextSelected: { color: "#fff", fontWeight: "bold" },
  applyBtn: { backgroundColor: "#2e8b57", padding: 15, borderRadius: 25, marginTop: 10, alignItems: "center" },
  applyText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
