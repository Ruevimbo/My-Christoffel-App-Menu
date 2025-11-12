// styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ================= Login Screen =================
  loginContainer: {
    flex: 1,
    backgroundColor: "#bfbfbf",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loginLogo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  loginSubtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  loginInput: {
    width: "80%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  tryAgainButton: {
    backgroundColor: "red",
  },
  goButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // ================= AddDish Screen =================
  addDishContainer: {
    flex: 1,
    backgroundColor: "#bfbfbf",
    padding: 20,
  },
  addDishNavIcon: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  addDishLogo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  addDishTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  imageBox: {
    width: 150,
    height: 120,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 15,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  descriptionInput: {
    height: 60,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  courseRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  courseBtn: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 20,
  },
  selectedCourse: {
    backgroundColor: "#2196F3",
  },
  addBtn: {
    backgroundColor: "green",
    padding: 15,
    marginTop: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // ================= Home Screen =================
  homeContainer: {
    flex: 1,
    backgroundColor: "#bfbfbf",
    padding: 20,
  },
  homeNavIcon: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  homeLogo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  homeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  dishImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  homeInput: {
    borderBottomWidth: 1,
    marginBottom: 5,
    padding: 5,
  },
  removeBtn: {
    backgroundColor: "red",
    padding: 5,
    marginTop: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  doneBtn: {
    backgroundColor: "green",
    padding: 15,
    marginTop: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  doneText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
