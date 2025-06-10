<?php
$conn = new mysqli("localhost", "root", "", "baru_sahib_navigation");

$result = $conn->query("SELECT * FROM contact_form");

echo "<h2>Contact Messages</h2><table border='1'><tr><th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr>";

while($row = $result->fetch_assoc()) {
    echo "<tr><td>{$row['id']}</td><td>{$row['name']}</td><td>{$row['email']}</td><td>{$row['message']}</td><td>{$row['submitted_at']}</td></tr>";
}

echo "</table>";
$conn->close();
?>
