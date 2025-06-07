function validateForm(){
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

       if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return false;
    }

    if (!email.includes("@")) {
        alert("Please enter a valid email.");
        return false;
    }

    const formData = {
        name,
        email,
        message
    };

    console.log("Form submitted successfully:", formData);

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
   
    alert("Thank you for contacting us, " + name + "! We will get back to you soon.");

    //it will prevent default form submission
    return false;


    // // clear the form fields
    // document.getElementById("name").value = "";
    // document.getElementById("email").value = "";
    // document.getElementById("message").value = "";

}