import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import QrScanner from "../components/QrScanner";
import { useSession } from "../context/SessionContext";
import { useNavigation } from "@react-navigation/native";

export default function ScannerPage() {
  const { onCreateSession, onDeleteSession, session } = useSession();
  const navigation = useNavigation();

  const [action, setAction] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (session == 0) setAction("enter");
      else setAction("exit");
    });

    return unsubscribe;
  }, [navigation]);

  const onScan = async (qrcode) => {
    let result = null;

    if (action === "enter") {
      result = await onCreateSession(qrcode);
    } else if (action === "exit") {
      result = await onDeleteSession(qrcode);
    }

    if (result.status == 200) {
      navigation.navigate("Home");
    }
    return;
  };

  return <QrScanner onScan={onScan} />;
}
