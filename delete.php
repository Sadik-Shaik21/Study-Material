<?php
// --- CONFIGURATION ---
$secret_key = "Teamlead"; 
$links_file = "links.json";

// 1. Check if the password is correct
if (!isset($_POST['adminPass']) || $_POST['adminPass'] !== $secret_key) {
    die("<div style='color:red; font-family:sans-serif; text-align:center; margin-top: 50px;'><h2>Access Denied</h2><p>Incorrect Password.</p><a href='index.html'>Go Back</a></div>");
}

// 2. Check fields
if (isset($_POST['subject']) && isset($_POST['materialIndex']) && $_POST['materialIndex'] !== "") {
    $subject = htmlspecialchars(strip_tags($_POST['subject']));
    $materialIndex = (int)$_POST['materialIndex'];

    // 3. Read existing JSON
    if (!file_exists($links_file)) {
        die("<div style='text-align:center; padding:50px; font-family:sans-serif;'>Database not found.</div>");
    }

    $json_contents = file_get_contents($links_file);
    $data = json_decode($json_contents, true);

    if (!$data || !isset($data[$subject])) {
        die("<div style='text-align:center; padding:50px; font-family:sans-serif;'>No materials found for this subject.</div>");
    }

    // 4. Delete the specific item
    if (isset($data[$subject][$materialIndex])) {
        $deletedName = $data[$subject][$materialIndex]['name'];
        array_splice($data[$subject], $materialIndex, 1);

        // If array becomes empty, optionally you could unset the subject:
        if (count($data[$subject]) === 0) {
            unset($data[$subject]);
        }

        // 5. Save back to links.json safely
        if (file_put_contents($links_file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), LOCK_EX) !== false) {
            echo "<div style='text-align:center; padding:50px; font-family:sans-serif;'>";
            echo "<h2>✅ Deleted Successfully!</h2>";
            echo "<p>The material <b>$deletedName</b> has been removed.</p>";
            echo "<a href='index.html' style='color:#11cdee; text-decoration: none; font-weight: bold;'>Go Back to Portal</a>";
            echo "</div>";
        } else {
            echo "<div style='text-align:center; padding:50px; font-family:sans-serif;'>Sorry, there was a technical error updating the database.</div>";
        }
    } else {
        echo "<div style='text-align:center; padding:50px; font-family:sans-serif;'>Invalid material selected.</div>";
    }

} else {
    echo "<div style='text-align:center; padding:50px; font-family:sans-serif;'>Error: Missing subject or material selection.</div>";
}
?>
