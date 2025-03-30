async function searchUser() {
    let userID = document.getElementById("discordID").value;
    if (!userID) {
        alert("Please enter a valid Discord ID!");
        return;
    }

    let url = `https://discordlookup.mesavirep.xyz/v1/user/${userID}`;

    try {
        let response = await fetch(url, { mode: "cors" });
        if (!response.ok) throw new Error("User not found or API error.");

        let data = await response.json();
        document.getElementById("result").innerHTML = `
            <h2>${data.global_name} (@${data.username})</h2>
            <img src="https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png" alt="Avatar">
            <p>Account Created: ${new Date(data.createdTimestamp).toLocaleDateString()}</p>
            <p>User ID: ${data.id}</p>
        `;
    } catch (error) {
        document.getElementById("result").innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
