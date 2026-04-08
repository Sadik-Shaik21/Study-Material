// 1. DATABASE: All subjects from your files
const subjectData = [
    // --- SEMESTER 4 ---
    { name: "Discrete Stats & Stochastic Models (DSSM)", url: "cse_sem4_dssm.html" },
    { name: "Operating Systems (OS)", url: "cse_sem4_os.html" },
    { name: "Database Management Systems (DBMS)", url: "cse_sem4_dbms.html" },
    { name: "Computer Organization & Architecture (COA)", url: "cse_sem4_coa.html" },
    { name: "Software Engineering (SE)", url: "cse_sem4_se.html" },
    { name: "Managerial Economics (MFE)", url: "cse_sem4_mfe.html" },
    { name: "Universal Human Values (UHV)", url: "cse_sem4_uhv.html" },

    // --- SEMESTER 3 ---
    { name: "Java", url: "cse_sem3_java.html" },
    { name: "Java Programming Lab", url: "cse_sem3_java_lab.html" },
    { name: "Object Oriented Programming (OOP)", url: "cse_sem3_oop.html" },
    { name: "Design & Analysis of Algorithms (DAA)", url: "cse_sem3_daa.html" },
    { name: "Digital Logic Design (DLD)", url: "cse_sem3_dld.html" },
    { name: "DLD Lab", url: "cse_sem3_dld_lab.html" },
    { name: "Discrete Mathematical Structures (DMG)", url: "cse_sem3_dmg.html" },
    { name: "Constitution of India (COI)", url: "cse_sem3_coi.html" },
    { name: "Health Care", url: "cse_sem3_health.html" },
    { name: "University Electives", url: "cse_sem3_university.html" },

    // --- GENERAL & YEAR PAGES ---
    { name: "1st Year All Subjects", url: "1styear.html" },
    { name: "2nd Year All Subjects", url: "2ndyear.html" },
    { name: "AI & Data Science (AIDS) 2nd Year", url: "aids_2nd.html" },
    { name: "AI & Machine Learning (AIML) 2nd Year", url: "aiml_2nd.html" },
    { name: "Computer Science (CS) 2nd Year", url: "cs_2nd.html" },
    { name: "CSE Core 2nd Year", url: "cse_2nd.html" }
];

// 2. SEARCH LOGIC
function filterSubjects(event) {
    const input = document.getElementById('subjectSearch').value.toLowerCase();
    const resultsDiv = document.getElementById('searchResults');
    
    // Clear previous results
    resultsDiv.innerHTML = "";

    // If empty, hide and stop
    if (input.length === 0) {
        resultsDiv.style.display = "none";
        return;
    }

    // Find matches
    const filtered = subjectData.filter(item => 
        item.name.toLowerCase().includes(input)
    );

    // Show results
    if (filtered.length > 0) {
        resultsDiv.style.display = "block";
        
        filtered.forEach(item => {
            const link = document.createElement('a');
            link.href = item.url;
            link.textContent = item.name;
            resultsDiv.appendChild(link);
        });

        if (event && event.key === 'Enter') {
            window.location.href = filtered[0].url;
        }
    } else {
        resultsDiv.style.display = "none";
    }
}

// 3. UI HELPER: Close dropdown if user clicks outside
document.addEventListener('click', (e) => {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && !searchContainer.contains(e.target)) {
        document.getElementById('searchResults').style.display = "none";
    }
});

// 4. ADMIN PORTAL HELPER: Populate Dropdown automatically
document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("subjectSelect");
    if (dropdown) {
        dropdown.innerHTML = '<option value="" disabled selected>Select a Subject</option>';
        subjectData.forEach(subject => {
            const option = document.createElement("option");
            option.value = subject.url;
            option.textContent = subject.name;
            option.style.background = "#0f2027"; // Dark background for options so text is visible 
            dropdown.appendChild(option);
        });
    }
});
