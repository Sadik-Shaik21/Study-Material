$dir = "c:\Users\postb\OneDrive\Desktop\a"
$files = Get-ChildItem -Path $dir -Filter *.html | Where-Object { $_.Name -ne 'index.html' -and $_.Name -ne 'cse_sem3_java_lab.html' -and $_.Name -ne 'cse_sem4_os.html' }

foreach ($file in $files) {
    try {
        $content = [IO.File]::ReadAllText($file.FullName)
        if ($content -notmatch 'loadLinks\.js') {
            # Find </body> exactly (case insensitive)
            if ($content -match '(?i)</body>') {
                $newContent = $content -replace '(?i)</body>', "<script src=`"loadLinks.js`"></script>`n</body>"
                [IO.File]::WriteAllText($file.FullName, $newContent)
                Write-Host "Injected into: $($file.Name)"
            } else {
                Write-Host "Skipped $($file.Name): No </body> tag found."
            }
        }
    } catch {
        Write-Host "Error processing $($file.Name): $_"
    }
}
Write-Host "All subject pages successfully updated!"
