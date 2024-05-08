import React, { useState, useEffect } from "react";
import HomeScreen from "./components/HomeScreen";
// import AuthComponents from "./components/AuthComponents";
// import SplashScreen from "./components/SplashScreen";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Esegui il recupero dell'utente quando il componente viene montato
//     getUser();
//   }, []);

//   const login = async () => {
//     setIsLoading(true)
//     console.log('login');
//     await fetch('https://expert-waffle-gvw7wq7r94p3v4v5-5000.app.github.dev/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: "marcussmith",
//         password: "marcussmith",
//       }),
//       credentials: 'include',
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json);
//         setIsLoggedIn(true);
//         setUser(json); // Imposta il nome utente
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       })
//       .finally(() => {
//         setIsLoading(false); // Imposta isLoading a false una volta completato il login
//       });
//   }

//   const getUser = async () => {
//     setIsLoading(true)
//     console.log('get_user');
//     await fetch('https://expert-waffle-gvw7wq7r94p3v4v5-5000.app.github.dev/get_user', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json);
//         if (json.username) {
//           setIsLoggedIn(true);
//           setUser(json);
//         } else {
//           setIsLoggedIn(false);
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       })
//       .finally(() => {
//         setIsLoading(false); // Imposta isLoading a false una volta completato il recupero dell'utente
//       });
//   }

//   const logout = async () => {
//     setIsLoading(true);
//     console.log('logout');
//     await fetch('https://expert-waffle-gvw7wq7r94p3v4v5-5000.app.github.dev/logout', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     })
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json);
//         setIsLoggedIn(false);
//         setUsername(null);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       })
//       .finally(() => {
//         setIsLoading(false); // Imposta isLoading a false una volta completato il logout
//       });
//   }

//   return (
//     <>
//       {isLoading ? ( // Se isLoading è true, visualizza un indicatore di caricamento
//         <SplashScreen />
//       ) : (
//         isLoggedIn ? (  
//           <AppComponents user={user} /> 
//         ) : (
//           <AuthComponents login={login} />
//         )
//       )}
//     </>
//   );
// }

const App = () => {
  return (
    <HomeScreen />
  );
}

export default App;
