const socket = io();

socket.on("connect", () => {
  console.log("connected");
  fetchUsersStatus();
});

socket.on("session_created", () => {
  //possiamo riutilizzare sessioncreated perchè il momento in cui si aggiorna il qr coincide col momento in cui si aggiorna lo user
  console.log("status changed");
  fetchUsersStatus();
});

const fetchUsersStatus = () => {
  fetch("http://localhost:5000/get_user_states")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Get the table body
      const tbody = document.querySelector("tbody");

      // Clear the table body
      tbody.innerHTML = "";

      // Loop through the data
      data.forEach((item) => {
        // Create a new row
        const row = document.createElement("tr");

        // Create the cells
        const firstNameCell = document.createElement("td");
        const secondNameCell = document.createElement("td");
        const status = document.createElement("td");

        // Set the cell text
        firstNameCell.textContent = item.first_name;
        secondNameCell.textContent = item.last_name;
        if (item.pause_id !== null) {
          status.textContent = "Pause";
          status.style.backgroundColor = "#ffcc00"; // More vibrant yellow
        } else if (item.session_id !== null) {
          status.textContent = "Working";
          status.style.backgroundColor = "#66ff66"; // More vibrant green
        } else {
          status.textContent = "Not clocked in";
          status.style.backgroundColor = "#ff6666"; // More vibrant red
        }
        // Add the cells to the row
        row.appendChild(firstNameCell);
        row.appendChild(secondNameCell);
        row.appendChild(status);

        // Add the row to the table body
        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      // Handle the error here
      console.log("There has been a problem with your fetch operation:", error);
    });
};
