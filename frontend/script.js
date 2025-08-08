// Base API URL for backend, now using a relative path for Nginx proxy
const apiBase = "/api/candidates";

// Load all candidates
async function loadCandidates() {
    try {
        const res = await fetch(`${apiBase}/list`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        const tableBody = document.querySelector("#candidatesTable tbody");
        tableBody.innerHTML = "";

        data.forEach(c => {
            const row = `
                <tr>
                    <td>${c.id}</td>
                    <td>${c.name}</td>
                    <td>${c.email}</td>
                    <td>${c.phone}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (err) {
        console.error("Error loading candidates:", err);
    }
}

// Add new candidate
async function addCandidate(e) {
    e.preventDefault();
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();

    try {
        const res = await fetch(`${apiBase}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone })
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        document.querySelector("#candidateForm").reset();
        loadCandidates();
    } catch (err) {
        console.error("Error adding candidate:", err);
    }
}

// Load candidates on page load
document.addEventListener("DOMContentLoaded", loadCandidates);
document.querySelector("#candidateForm").addEventListener("submit", addCandidate);
