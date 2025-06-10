<?php
$host = "localhost";     // or your DB host
$dbname = "baru_sahib_navigation";
$username = "root";      // or your DB username
$password = "";          // or your DB password

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

if (!empty($name) && !empty($email) && !empty($message)) {
    $stmt = $conn->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);

    if ($stmt->execute()) {
        echo "Message sent successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "All fields are required.";
}

$conn->close();
?>
