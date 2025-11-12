import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

  const totalPrice = dishes.reduce((sum, dish) => sum + parseFloat(dish.price), 0);
  const avgPrice = dishes.length ? (totalPrice / dishes.length).toFixed(2) : "0.00";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📊 Average Dish Price</Text>
        <Text style={styles.avgText}>Number of Dishes: {dishes.length}</Text>
        <Text style={styles.avgText}>Average Price: R{avgPrice}</Text>
      </View>

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
  content: { flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 80 }, // paddingBottom prevents overlap with nav
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  avgText: { fontSize: 18, marginBottom: 10 },
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
