import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Dish, getDishes } from "./dishesStore";

export default function Average() {
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
      <Text style={styles.title}>📊 Average Dish Price</Text>
      <Text style={styles.avgText}>Number of Dishes: {dishes.length}</Text>
      <Text style={styles.avgText}>Average Price: R{avgPrice}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f4f4f4" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  avgText: { fontSize: 18, marginBottom: 10 },
});


