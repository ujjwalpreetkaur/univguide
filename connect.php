<?php
// Step 1: Database connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "univguide";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Step 2: Collect form data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Step 3: Insert data into table
$sql = "INSERT INTO contact_form (name, email, message) VALUES ('$name', '$email', '$message')";

if ($conn->query($sql) === TRUE) {
  echo "Message submitted successfully!";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
