const container = document.getElementById("contest-list");

fetch("https://codeforces.com/api/contest.list")
  .then(response => response.json())
  .then(data => {
    container.innerHTML = ""; 

    if (data.status !== "OK") {
      container.innerHTML = `<p>Error: ${data.comment || "Unable to fetch contests."}</p>`;
      return;
    }

    // Filter contests that haven't started yet
    const upcoming = data.result.filter(contest => contest.phase === "BEFORE");

    if (upcoming.length === 0) {
      container.innerHTML = "<p>No upcoming contests found.</p>";
      return;
    }

    upcoming.forEach(contest => {
      const div = document.createElement("div");
      div.className = "contest";

      const startTime = new Date(contest.startTimeSeconds * 1000).toLocaleString();

      div.innerHTML = `
        <h2>${contest.name}</h2>
        <p><strong>Platform:</strong> Codeforces</p>
        <p><strong>Start:</strong> ${startTime}</p>
        <p><a href="https://codeforces.com/contests/${contest.id}" target="_blank">Go to contest</a></p>
      `;

      container.appendChild(div);
    });
  })
  .catch(error => {
    container.innerHTML = "<p>Error loading contests. Please try again later.</p>";
    console.error("Error fetching contest data:", error);
  });
