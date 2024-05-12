import React, { useEffect, useState } from "react";
import QrScanner from "../components/QrScanner";
import { useSession } from "../context/SessionContext";
import ActionPicker from "../components/ActionPicker";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Alert } from "react-native";

export default function ScannerPage() {
  const {
    onCreateSession,
    onDeleteSession,
    onCreatePause,
    onDeletePause,
    session,
  } = useSession();
  const [action, setAction] = useState();
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const handleActionPick = (selectedAction) => {
    if (selectedAction === "exit") {
      Alert.alert("Attention", "If you proceed you will clock out for today", [
        {
          text: "Cancel",
          onPress: () => setAction(null),
          style: "cancel",
        },
        { text: "OK", onPress: () => setAction(selectedAction) },
      ]);
    }
  };

  const onScan = async (qrcode) => {
    let result = null;

    if (action === "enter") {
      console.log("enter");
      result = await onCreateSession(qrcode);
    } else if (action === "exit") {
      result = await onDeleteSession(qrcode);
    } else if (action === "start_break") {
      result = await onCreatePause(qrcode);
    } else if (action === "end_break") {
      result = await onDeletePause(qrcode);
    }

    if (result.status == 200) {
      setError(false);
      navigation.navigate("Home");
    } else {
      setError(true);
      setAction(null);
    }
    return;
  };

  useEffect(() => {
    setAction(null);
    if (session == 0) setAction("enter");
    else if (session == 2) setAction("end_break");
  }, [session]);

  return action ? (
    <QrScanner onScan={onScan} />
  ) : (
    <>
      {error && <Text style={styles.error}>QR not valid!</Text>}
      <ActionPicker onActionPick={handleActionPick} />
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "red",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
