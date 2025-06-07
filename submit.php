<?php
// Database connection details
$servername = "localhost";
$username = "root";  // default XAMPP username
$password = "";      // default is empty
$database = "contact_form_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check DB connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Only run if form is submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // Check if all fields are filled
    if (empty($name) || empty($email) || empty($message)) {
        echo "Please fill in all fields.";
    } else {
        // Insert data using prepared statements
        $sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            $stmt->bind_param("sss", $name, $email, $message);

            if ($stmt->execute()) {
                echo "✅ Message sent and saved successfully!";
            } else {
                echo "❌ Execution error: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "❌ Prepare failed: " . $conn->error;
        }
    }
} else {
    echo "Invalid request.";
}

// Close DB connection
$conn->close();
?>
