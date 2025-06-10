function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all the fields.");
        return false;
    }

    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true; // Proceed to submit
}
