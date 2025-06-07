<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Database connection details
$conn = new mysqli("localhost", "root", "", "contact_form_db");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
    $stmt = $conn->prepare("insert into messages (name, email, message) values (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);
    $stmt->execute();
    echo "✅ Message sent and saved successfully!";
    $stmt->close();
    $conn->close();
}
?>