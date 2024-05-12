fetch("http://localhost:5000/get_all_users_stats")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Get the table body
    const tbody = document.querySelector("tbody");

    // Loop through the data
    data.forEach((item) => {
      // Create a new row
      const row = document.createElement("tr");

      // Create the cells
      const firstNameCell = document.createElement("td");
      const secondNameCell = document.createElement("td");
      const avgEntryTimeCell = document.createElement("td");
      const avgExitTimeCell = document.createElement("td");
      const avgPauseDurationCell = document.createElement("td");

      // Set the cell text
      firstNameCell.textContent = item.first_name;
      secondNameCell.textContent = item.last_name;
      avgEntryTimeCell.textContent = item.avg_entry_time;
      avgExitTimeCell.textContent = item.avg_exit_time;
      avgPauseDurationCell.textContent =
        (item.avg_pause_duration / 60).toFixed(2) + " min";
      // Add the cells to the row
      row.appendChild(firstNameCell);
      row.appendChild(secondNameCell);
      row.appendChild(avgEntryTimeCell);
      row.appendChild(avgExitTimeCell);
      row.appendChild(avgPauseDurationCell);

      // Add the row to the table body
      tbody.appendChild(row);
    });
  })
  .catch((error) => {
    // Handle the error here
    console.log("There has been a problem with your fetch operation:", error);
  });
