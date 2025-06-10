<?php
// Database config
$servername = "localhost";
$username = "root"; // default for XAMPP
$password = "";     // default for XAMPP
$dbname = "baru_sahib_navigation";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Receive POST data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Insert query
$sql = "INSERT INTO contact_form (name, email, message) VALUES ('$name', '$email', '$message')";

if ($conn->query($sql) === TRUE) {
    echo "Message sent successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
