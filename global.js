document.addEventListener("DOMContentLoaded", () => {
    // 1. Create the Navbar Element if it doesn't already exist
    if (!document.querySelector(".navbar")) {
        const nav = document.createElement("nav");
        nav.className = "navbar";
        nav.innerHTML = `
            <a href="index.html" class="logo-link">
                <img src="apollo-logo.png" alt="Apollo Logo" class="logo">
            </a>
        `;

        // 2. Inject it at the very top of the <body>
        document.body.prepend(nav);
    }

    // 3. Ensure the Scroll-to-Top button exists on every page
    if (!document.getElementById("scrollTop")) {
        const scrollBtn = document.createElement("button");
        scrollBtn.id = "scrollTop";
        scrollBtn.innerHTML = "↑";
        scrollBtn.setAttribute("onclick", "window.scrollTo({top: 0, behavior: 'smooth'})");
        document.body.appendChild(scrollBtn);
    }
});