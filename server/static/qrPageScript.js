const socket = io();

socket.on("connect", () => {
  console.log("connected");
  fetch_qr();
});

socket.on("session_created", () => {
  console.log("session created");
  fetch_qr();
});
// Codice JavaScript per caricare l'immagine dalla tua API Flask
const fetch_qr = () => {
  fetch("/get_qrcode")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      document.getElementById("qrImage").src = imageUrl;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};
