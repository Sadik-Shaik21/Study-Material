<?php
// --- CONFIGURATION ---
$secret_key = "Teamlead"; 
$links_file = "links.json";

// 1. Check if the password is correct
if (!isset($_POST['adminPass']) || $_POST['adminPass'] !== $secret_key) {
    die("<div style='color:red; font-family:sans-serif; text-align:center; margin-top: 50px;'><h2>Access Denied</h2><p>Incorrect Password.</p><a href='index.html'>Go Back</a></div>");
}

// 2. Check fields
if (isset($_POST['materialName']) && isset($_POST['driveLink']) && isset($_POST['subject']) && isset($_POST['unit'])) {
    $materialName = htmlspecialchars(strip_tags($_POST['materialName']));
    $driveLink = filter_var($_POST['driveLink'], FILTER_SANITIZE_URL);
    $subject = htmlspecialchars(strip_tags($_POST['subject']));
    $unit = htmlspecialchars(strip_tags($_POST['unit']));

    // 3. Read existing JSON or initialize blank array
    $data = [];
    if (file_exists($links_file)) {
        $json_contents = file_get_contents($links_file);
        $data = json_decode($json_contents, true) ?: [];
    }

    // 4. Append the new data under the subject's filename
    if (!isset($data[$subject])) {
        $data[$subject] = [];
    }
    
    $data[$subject][] = [
        "name" => $materialName,
        "link" => $driveLink,
        "unit" => $unit,
        "date" => date("Y-m-d H:i:s")
    ];

    // 5. Save back to links.json safely
    if (file_put_contents($links_file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX) !== false) {
        echo "<div style='text-align:center; padding:50px; font-family:sans-serif;'>";
        echo "<h2>✅ Success!</h2>";
        echo "<p>The link for <b>$materialName</b> has been successfully assigned to <b>$unit</b>.</p>";
        echo "<a href='index.html' style='color:#11cdee; text-decoration: none; font-weight: bold;'>Go Back to Portal</a>";
        echo "</div>";
    } else {
        echo "<div style='text-align:center; padding:50px; font-family:sans-serif;'>Sorry, there was a technical error saving your link.</div>";
    }
} else {
    echo "<div style='text-align:center; padding:50px; font-family:sans-serif;'>Error: Missing material name, link, unit, or subject selection.</div>";
}
?>