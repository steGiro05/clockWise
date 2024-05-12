import React, { createContext, useContext, useEffect, useState } from "react";
import url from "../utils/url";

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(0); //0=nosession 1=active 2=pause

  useEffect(() => {
    const get_session = async () => {
      try {
        const response = await fetch(`${url}/get_state`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Invalid response");
        }

        const json = await response.json();
        setSession(json.code);
      } catch (error) {
        console.log("Error:", error);
        return;
      }
    };

    get_session();
  }, [session]);

  const updateSession = async () => {
    setSession(null);
  };

  const createSession = async (qrcode) => {
    return await fetch(`${url}/create_session_token?qr_code=${qrcode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          // Esci dalla catena di promesse
          throw new Error("Invalid response");
        }
        return response.json();
      })
      .then((json) => {
        setSession(1);
        return { message: "Session uploaded", status: 200 };
      })
      .catch((error) => {
        // Se la risposta non è "ok", questa sezione verrà eseguita
        console.log("Error:", error);
        return { message: "Invalid Code", status: 401 };
      });
  };

  const deleteSession = async (qrcode) => {
    return await fetch(`${url}/delete_session?qr_code=${qrcode}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          // Esci dalla catena di promesse
          throw new Error("Invalid response");
        }
        return response.json();
      })
      .then((json) => {
        setSession(0);
        return { message: "Session uploaded", status: 200 };
      })
      .catch((error) => {
        // Se la risposta non è "ok", questa sezione verrà eseguita
        console.log("Error:", error);
        return { message: "Invalid Code", status: 401 };
      });
  };

  const createPause = async (qrcode) => {
    return await fetch(`${url}/create_pause?qr_code=${qrcode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          // Esci dalla catena di promesse
          throw new Error("Invalid response");
        }
        return response.json();
      })
      .then((json) => {
        setSession(2);
        return { message: "Session uploaded", status: 200 };
      })
      .catch((error) => {
        // Se la risposta non è "ok", questa sezione verrà eseguita
        console.log("Error:", error);
        return { message: "Invalid Code", status: 401 };
      });
  };

  const deletePause = async (qrcode) => {
    return await fetch(`${url}/delete_pause?qr_code=${qrcode}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          // Esci dalla catena di promesse
          throw new Error("Invalid response");
        }
        return response.json();
      })
      .then((json) => {
        setSession(1);
        return { message: "Session uploaded", status: 200 };
      })
      .catch((error) => {
        // Se la risposta non è "ok", questa sezione verrà eseguita
        console.log("Error:", error);
        return { message: "Invalid Code", status: 401 };
      });
  };

  const value = {
    session,
    onCreateSession: createSession,
    onDeleteSession: deleteSession,
    onCreatePause: createPause,
    onDeletePause: deletePause,
    onUpdateSession: updateSession,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
