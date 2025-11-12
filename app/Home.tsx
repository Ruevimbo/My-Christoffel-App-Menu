import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { deleteDish, Dish, getFilteredDishes } from "./dishesStore";

export default function Home() {
  const router = useRouter();
  const [dishes, setDishes] = useState<Dish[]>([]);

  const refreshDishes = () => setDishes(getFilteredDishes());

  // Refresh dishes whenever this screen is focused
  useFocusEffect(
    useCallback(() => {
      refreshDishes();
    }, [])
  );

  const handleDeleteDish = (id: string) => {
    Alert.alert("Delete Dish", "Are you sure you want to delete this dish?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteDish(id);
          refreshDishes();
        },
      },
    ]);
  };

  // Calculate average price
  const getAveragePrice = () => {
    if (dishes.length === 0) return 0;
    const total = dishes.reduce((sum, dish) => sum + Number(dish.price), 0);
    return (total / dishes.length).toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://th.bing.com/th/id/R.dc8ab556a5d38ee1b137683abeaeeda2?rik=0BRx0tjrTa%2fdLQ&riu=http%3a%2f%2fwww.freepngclipart.com%2fdownload%2fchef%2f59146-chef-cartoon-free-download-png-hd.png&ehk=oBZebtmHfdVgZGElvsb9yE8Nt7uouaeY0YfFoYNza2E%3d&risl=&pid=ImgRaw&r=0",
          }}
          style={styles.logo}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>🍽️ Menu Dishes</Text>
          <Text style={styles.countText}>Total Dishes: {dishes.length}</Text>
        </View>
      </View>

      {/* Average Price Card */}
      {dishes.length > 0 && (
        <View style={styles.averageCard}>
          <Text style={styles.averageText}>Average Price</Text>
          <Text style={styles.averageAmount}>R{getAveragePrice()}</Text>
        </View>
      )}

      {dishes.length === 0 ? (
        <Text style={styles.noDishes}>No dishes yet. Add one!</Text>
      ) : (
        <FlatList
          data={dishes}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.dishTitle}>
                  {index + 1}. {item.name}
                </Text>
                <Text style={styles.price}>R{item.price}</Text>
              </View>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.dishImage} />
              )}
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.courseTag}>{item.course}</Text>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDeleteDish(item.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/addDish")}
      >
        <Ionicons name="add-circle" size={22} color="#fff" />
        <Text style={styles.addText}>Add New Dish</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => router.push("/Home")}
          style={styles.navItem}
        >
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/addDish")}
          style={styles.navItem}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/filter")}
          style={styles.navItem}
        >
          <Ionicons name="filter" size={24} color="#fff" />
          <Text style={styles.navText}>Filter</Text>
        </TouchableOpacity>

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

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f4f4f4", 
    paddingHorizontal: 15, 
    paddingTop: 15 },

  // Header with logo
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 15, 
    position: "relative" 
  },

  logo: { 
    width: 60, 
    height: 60, 
    borderRadius: 30 
  },

  // Text container centered
  textContainer: {
     position: "absolute", 
     left: 0, right: 0, 
     alignItems: "center" 
    },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  countText: { 
    color: "#555", 
    marginTop: 2 
  },

  noDishes: { 
    textAlign: "center", 
    color: "#777", 
    marginTop: 30 },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  dishTitle: { 
    fontWeight: "bold", 
    fontSize: 16, 
    color: "#333" 
  },
  price: { 
    fontWeight: "600", 
    color: "#2e8b57" 
  },
  dishImage: { 
    width: "100%", 
    height: 120, 
    borderRadius: 10, 
    marginTop: 10 
  },
  description: { 
    color: "#555", 
    marginTop: 8 
  },
  courseTag: { 
    marginTop: 6, 
    color: "#888", 
    fontStyle: "italic" 
  },
  deleteBtn: { 
    marginTop: 10, 
    backgroundColor: "#ff4d4d", 
    padding: 8, borderRadius: 10, 
    alignItems: "center" 
  },
  deleteText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
  addBtn: { 
    flexDirection: "row", 
    backgroundColor: "#2e8b57", 
    padding: 15, 
    borderRadius: 25, 
    alignItems: "center", 
    justifyContent: "center", 
    marginVertical: 10 
  },
  addText: { 
    color: "#fff", 
    fontWeight: "bold", 
    marginLeft: 8 
  },
  navBar: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    backgroundColor: "#2e8b57", 
    paddingVertical: 10, 
    borderRadius: 20, 
    marginBottom: 10 
  },
  navItem: { 
    alignItems: "center" 
  },
  navText: { 
    color: "#fff", 
    fontSize: 12, 
    marginTop: 3 
  },

  // Average Card Styles
  averageCard: {
    backgroundColor: "#e0f7e9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  averageText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  averageAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e8b57",
  },
});






