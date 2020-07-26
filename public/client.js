console.log("Client-side code running");

fetch("http://localhost:3000/api/getMe", {
  credentials: "include",
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const profile = document.getElementById("myProfile");
    var text = document.createTextNode(
      data.firstName.localized.en_US + " " + data.lastName.localized.en_US
    );
    profile.appendChild(text);
  })
  .catch((err) => console.log(err));
