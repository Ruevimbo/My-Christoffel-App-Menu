import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dish, getDishes } from "./dishesStore";

export default function Average() {
  const router = useRouter();
  const [dishes, setDishes] = useState<Dish[]>([]);

  // Refresh dishes every time screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setDishes(getDishes());
    }, [])
  );

  // Calculate averages
  const totalPrice = dishes.reduce((sum, dish) => sum + parseFloat(dish.price), 0);
  const avgPrice = dishes.length ? (totalPrice / dishes.length).toFixed(2) : "0.00";

  const courses = ["Starter", "Main", "Dessert"] as const;
  const avgByCourse = courses.map(course => {
    const filtered = dishes.filter(d => d.course === course);
    const total = filtered.reduce((sum, d) => sum + parseFloat(d.price), 0);
    return {
      course,
      count: filtered.length,
      avg: filtered.length ? (total / filtered.length).toFixed(2) : "0.00",
    };
  });

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📊 Average Dish Price</Text>
        <Text style={styles.avgText}>Total Dishes: {dishes.length}</Text>
        <Text style={styles.avgText}>Overall Average: R{avgPrice}</Text>

        {/* Averages by course */}
        {avgByCourse.map(item => (
          <Text key={item.course} style={styles.courseAvg}>
            {item.course}: {item.count} dish{item.count !== 1 ? "es" : ""} | Avg: R{item.avg}
          </Text>
        ))}
      </View>

      {/* List of Dishes */}
      {dishes.length === 0 ? (
        <Text style={styles.noDishes}>No dishes added yet.</Text>
      ) : (
        <FlatList
          data={dishes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 15 }}
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
  header: { alignItems: "center", paddingVertical: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  avgText: { fontSize: 18, marginBottom: 5 },
  courseAvg: { fontSize: 16, color: "#2e8b57", marginBottom: 3 },
  noDishes: { textAlign: "center", color: "#777", marginTop: 20, fontSize: 16 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 12, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  dishTitle: { fontWeight: "bold", fontSize: 16, color: "#333" },
  price: { fontWeight: "600", color: "#2e8b57" },
  dishImage: { width: "100%", height: 120, borderRadius: 10, marginTop: 10 },
  description: { color: "#555", marginTop: 8 },
  courseTag: { marginTop: 6, color: "#888", fontStyle: "italic" },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2e8b57",
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: "center" },
  navText: { color: "#fff", fontSize: 12, marginTop: 3 },
});

