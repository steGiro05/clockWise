import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const ChangePwPage = ({ navigation }) => {
  const { onChangePassword } = useAuth();

  const [error, setError] = useState();

  const [credentials, setCredentials] = useState({
    oldPw: "",
    newPw: "",
  });

  const handleChangeText = (key, text) => {
    setCredentials((prev) => ({ ...prev, [key]: text }));
  };

  const handleSubmit = async () => {
    const res = await onChangePassword(credentials.oldPw, credentials.newPw);
    if (res.status != 200) {
      setError(res.message);
    } else setError(null);
  };

  const handleBack = () => {
    // Implementa la logica per tornare indietro qui
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change your password</Text>
      <View style={styles.inputView}>
        <TextInput
          onChangeText={(text) => handleChangeText("oldPw", text)}
          style={styles.inputText}
          placeholder="Old Password"
          placeholderTextColor="#003f5c"
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          onChangeText={(text) => handleChangeText("newPw", text)}
          style={styles.inputText}
          placeholder="New Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.button, styles.blueButton]}
      >
        <Text style={styles.buttonText}>Submit</Text>
        <AntDesign name="checkcircleo" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleBack}
        style={[styles.button, styles.whiteButton]}
      >
        <Text style={[styles.buttonText, styles.blueText]}>Back</Text>
        <AntDesign name="back" size={24} color="#3AB4BA" />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default ChangePwPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  inputView: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3AB4BA",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputText: {
    height: 50,
    color: "#003f5c",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3AB4BA",
  },
  button: {
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  blueButton: {
    backgroundColor: "#3AB4BA",
  },
  whiteButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#3AB4BA",
  },
  buttonText: {
    marginHorizontal: 10,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  blueText: {
    color: "#3AB4BA",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
