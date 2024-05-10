import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons"; // Importa le icone da Expo
import ProfilePage from "./ProfilePage";
import DashboardPage from "./DashboardPage";
import ScannerPage from "./ScannerPage";
import HeaderComponent from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useSession } from "../context/SessionContext";

const Tab = createBottomTabNavigator();

const PagesHandler = () => {
  const { user } = useAuth();
  const { session } = useSession();

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          header: () => <HeaderComponent user={user} status={session} />,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home"; // Imposta l'icona per la scheda Home
            } else if (route.name === "Scanner") {
              iconName = focused ? "scan1" : "scan1"; // Imposta l'icona per la scheda Scanner
            } else if (route.name === "Profile") {
              iconName = focused ? "user" : "user"; // Imposta l'icona per la scheda Profile
            }

            // Restituisci l'icona con il nome e il colore appropriati
            return <AntDesign name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue", // Imposta il colore blu per le etichette delle schede attive
          tabBarInactiveTintColor: "gray", // Imposta il colore grigio per le etichette delle schede inattive
          tabBarStyle: {
            display: "flex",
            height: 60, // Altezza del footer
          },
          headerStyle: {
            height: 120, // Altezza dell'header
          },
        })}
      >
        <Tab.Screen name="Home" component={DashboardPage} />
        <Tab.Screen name="Scanner" component={ScannerPage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default PagesHandler;
