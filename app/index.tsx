import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";



export default function Index() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    Alert.alert("Login Success", `Welcome ${name || "User"}!`);
    router.push("/Home");
  };

  const handleTryAgain = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#bfbfbf",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}

      //logo
    >
      <Image
        source={{
          uri: "https://th.bing.com/th/id/R.dc8ab556a5d38ee1b137683abeaeeda2?rik=0BRx0tjrTa%2fdLQ&riu=http%3a%2f%2fwww.freepngclipart.com%2fdownload%2fchef%2f59146-chef-cartoon-free-download-png-hd.png&ehk=oBZebtmHfdVgZGElvsb9yE8Nt7uouaeY0YfFoYNza2E%3d&risl=&pid=ImgRaw&r=0",
        }}
        style={{
          width: 120,
          height: 120,
          marginBottom: 20,
        }}
      />

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        CHRISTOFFEL’S MENU APP
      </Text>

      <Text
        style={{
          fontSize: 16,
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        WELCOME!
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 20,
          fontStyle: "italic",
          textDecorationLine: "underline",
        }}
      >
        LOG IN
      </Text>

      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: "#000",
          marginBottom: 15,
          paddingHorizontal: 10,
        }}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: "#000",
          marginBottom: 15,
          paddingHorizontal: 10,
        }}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: "#000",
          marginBottom: 15,
          paddingHorizontal: 10,
        }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            marginHorizontal: 10,
            paddingVertical: 12,
            borderRadius: 20,
            alignItems: "center",
            backgroundColor: "red",
          }}
          onPress={handleTryAgain}

          // first button
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Try Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            marginHorizontal: 10,
            paddingVertical: 12,
            borderRadius: 20,
            alignItems: "center",
            backgroundColor: "green",
          }}
          onPress={handleLogin}

          //second button
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>GO!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
