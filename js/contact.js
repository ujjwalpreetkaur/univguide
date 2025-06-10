function validateForm() {
    // Get form input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return false;
    }

    // Email format check using regex
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Simulate sending to server
    const formData = {
        name,
        email,
        message
    };

    console.log("Form submitted successfully!", formData);

    // You can later replace this part with a real fetch to backend
    /*
    fetch('your-backend-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Message sent successfully!");
    })
    .catch(error => {
        alert("There was an error sending your message.");
        console.error(error);
    });
    */

    alert("Form submitted successfully!");

    // Prevent default form submission
    return false;
}










// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.querySelector("form"); // adjust selector if needed

//     form.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const name = document.getElementById("name").value.trim();
//         const email = document.getElementById("email").value.trim();
//         const message = document.getElementById("message").value.trim();

//         const response = await fetch("http://localhost/univguide-1/contact.php", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ name, email, message })
//         });

//         const result = await response.json();

//         if (result.success) {
//             alert("✅ Message sent successfully!");
//             form.reset();
//         } else {
//             alert("❌ Error: " + result.message);
//         }
//     });
// });

