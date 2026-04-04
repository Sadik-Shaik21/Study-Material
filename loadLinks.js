// loadLinks.js
document.addEventListener("DOMContentLoaded", () => {
    let currentFileName = window.location.pathname.split("/").pop();
    if (!currentFileName) currentFileName = "index.html";

    fetch("links.json")
        .then(response => {
            if (!response.ok) throw new Error("No links file found.");
            return response.json();
        })
        .catch(err => {
            console.error("Error loading links:", err);
            return {}; // Fallback to empty data to continue the UI render chain
        })
        .then(data => {
            if (!data) data = {}; // safety fallback
            const overlay = document.querySelector(".overlay");
            if (!overlay) return; // Only apply on pages with .overlay (subject pages)
            
            // Find all anchor tags that are likely unit links (e.g. "Unit 1")
            const unitLinks = Array.from(overlay.querySelectorAll("a")).filter(a => {
                const text = a.textContent.trim().toLowerCase();
                return text.startsWith("unit");
            });

            // Keep track of the page's drive links
            const pageLinks = data[currentFileName] || [];

            unitLinks.forEach(unitLink => {
                const unitName = unitLink.textContent.trim(); // "Unit 1", "Unit 2", etc.
                
                // Create a container for the drive links of this unit
                const container = document.createElement("div");
                container.className = "unit-links-container";
                container.style.display = "none"; // Hide by default
                container.style.background = "rgba(17, 205, 238, 0.05)";
                container.style.border = "1px solid var(--primary-cyan)";
                container.style.borderRadius = "10px";
                container.style.padding = "15px";
                container.style.marginTop = "10px";
                container.style.marginBottom = "20px";
                container.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
                container.style.animation = "fadeInUp 0.3s ease forwards";
                
                // Find matching links from data for this specific unit
                const matchingLinks = pageLinks.filter(item => {
                    const itemUnit = item.unit ? item.unit.trim() : "";
                    return itemUnit.toLowerCase() === unitName.toLowerCase();
                });
                
                if (matchingLinks.length > 0) {
                    matchingLinks.forEach(item => {
                        const a = document.createElement("a");
                        a.href = item.link;
                        a.textContent = "📄 " + item.name;
                        a.target = "_blank";
                        a.style.display = "block";
                        a.style.marginBottom = "8px";
                        a.style.padding = "10px 15px";
                        a.style.background = "rgba(17, 205, 238, 0.1)";
                        a.style.color = "#ffffff";
                        a.style.textDecoration = "none";
                        a.style.borderRadius = "5px";
                        a.style.fontSize = "0.95rem";
                        a.style.transition = "background 0.3s";
                        
                        a.onmouseover = () => a.style.background = "rgba(17, 205, 238, 0.3)";
                        a.onmouseout = () => a.style.background = "rgba(17, 205, 238, 0.1)";
                        
                        // Prevent the click on the drive link from collapsing the container
                        a.addEventListener("click", (e) => e.stopPropagation());
                        
                        container.appendChild(a);
                    });
                } else {
                    const noData = document.createElement("p");
                    noData.textContent = "No materials uploaded for this unit yet.";
                    noData.style.color = "var(--text-muted)";
                    noData.style.opacity = "0.8";
                    noData.style.fontSize = "0.9rem";
                    noData.style.margin = "0";
                    container.appendChild(noData);
                }
                
                // Clean up <br> tags immediately following the unit link 
                // so the layout doesn't have huge gaps between the button and its container.
                let next = unitLink.nextSibling;
                let brCount = 0;
                while(next && brCount < 2) {
                    let toRemove = next;
                    next = next.nextSibling;
                    if (toRemove.nodeName === 'BR') {
                        toRemove.remove();
                        brCount++;
                    } else if (toRemove.nodeType === 3 && toRemove.textContent.trim() === "") {
                        toRemove.remove();
                    } else {
                        break;
                    }
                }
                
                // Insert the new container right under the unit link
                unitLink.insertAdjacentElement('afterend', container);
                
                // Add an explicit <br><br> after the container to restore spacing for the next unit link
                const br1 = document.createElement("br");
                const br2 = document.createElement("br");
                container.insertAdjacentElement('afterend', br2);
                container.insertAdjacentElement('afterend', br1);
                
                // Toggle display on click
                unitLink.addEventListener("click", (e) => {
                    e.preventDefault(); 
                    if (container.style.display === "none") {
                        container.style.display = "block";
                        unitLink.style.boxShadow = "0 0 10px var(--primary-cyan)";
                    } else {
                        container.style.display = "none";
                        unitLink.style.boxShadow = "none";
                    }
                });
            });
        });
});
