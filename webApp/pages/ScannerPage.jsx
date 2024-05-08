import React, { useEffect, useState } from "react";
import QrScanner from "../components/QrScanner";
import { useSession } from "../context/SessionContext";
import ActionPicker from "../components/ActionPicker";
import { useNavigation } from "@react-navigation/native";

export default function ScannerPage() {
  const {
    onCreateSession,
    onDeleteSession,
    onCreatePause,
    onDeletePause,
    session,
  } = useSession();
  const [action, setAction] = useState();
  const navigation = useNavigation();

  const handleActionPick = (selectedAction) => {
    setAction(selectedAction);
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
      navigation.navigate("Home");
    }
    setAction(null);
    return;
  };

  useEffect(() => {
    if (session == 0) setAction("enter");
    else if (session == 2) setAction("end_break");
  }, [session, action]);

  return action ? (
    <QrScanner onScan={onScan} />
  ) : (
    <ActionPicker onActionPick={handleActionPick} />
  );
}
