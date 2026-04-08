document.addEventListener("DOMContentLoaded", () => {
    // 1. Create or get the Navbar Element
    let nav = document.querySelector(".navbar");
    if (!nav) {
        nav = document.createElement("nav");
        nav.className = "navbar";
        nav.innerHTML = `
            <img src="apollo-logo.png" alt="Apollo Logo" class="logo">
        `;
        document.body.prepend(nav);
    } else {
        // Ensure the Logo is present in the hardcoded navbar if missing
        if (!nav.querySelector(".logo")) {
            const logo = document.createElement("img");
            logo.src = "apollo-logo.png";
            logo.alt = "Apollo Logo";
            logo.className = "logo";
            nav.prepend(logo);
        }
    }


    // 2. Add Theme Toggle & Back to Home button inside navbar
    const pathname = window.location.pathname;
    const isHomePage = pathname.endsWith('index.html') || pathname.endsWith('/') || pathname.endsWith('\\');

    if (!document.getElementById("navActionsGroup")) {
        nav.style.display = "flex";
        nav.style.justifyContent = "space-between";
        nav.style.alignItems = "center";

        const actionsGroup = document.createElement("div");
        actionsGroup.id = "navActionsGroup";
        actionsGroup.style.display = "flex";
        actionsGroup.style.gap = "15px";
        actionsGroup.style.alignItems = "center";

        // Theme Toggle Button
        const themeBtn = document.createElement("button");
        themeBtn.id = "themeToggleBtn";
        themeBtn.innerHTML = "Light Mode ☀️";
        themeBtn.style.background = "rgba(17, 205, 238, 0.1)";
        themeBtn.style.border = "1px solid var(--primary-cyan)";
        themeBtn.style.color = "var(--text-main)";
        themeBtn.style.borderRadius = "8px";
        themeBtn.style.padding = "8px 15px";
        themeBtn.style.fontWeight = "600";
        themeBtn.style.fontSize = "0.9rem";
        themeBtn.style.fontFamily = "inherit";
        themeBtn.style.cursor = "pointer";
        themeBtn.style.transition = "all 0.3s ease";
        themeBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
        themeBtn.style.display = "flex";
        themeBtn.style.alignItems = "center";
        themeBtn.style.justifyContent = "center";
        themeBtn.style.boxSizing = "border-box";
        themeBtn.style.height = "40px";
        
        themeBtn.addEventListener("mouseover", () => {
            themeBtn.style.background = "var(--primary-cyan)";
            themeBtn.style.color = "var(--text-contrast)";
            themeBtn.style.transform = "translateY(-2px)";
            themeBtn.style.boxShadow = "0 6px 15px rgba(17, 205, 238, 0.4)";
        });
        themeBtn.addEventListener("mouseout", () => {
            themeBtn.style.background = "rgba(17, 205, 238, 0.1)";
            themeBtn.style.color = "var(--text-main)";
            themeBtn.style.transform = "none";
            themeBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
        });
        
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const isLight = document.body.classList.contains("light-mode");
            localStorage.setItem("theme", isLight ? "light" : "dark");
            themeBtn.innerHTML = isLight ? "Dark Mode 🌙" : "Light Mode ☀️";
        });

        // Initialize Theme from localStorage immediately
        if(localStorage.getItem("theme") === "light") {
             document.body.classList.add("light-mode");
             themeBtn.innerHTML = "Dark Mode 🌙";
        }

        actionsGroup.appendChild(themeBtn);

        // Home Button (only if not on home page)
        if (!isHomePage) {
            const homeBtn = document.createElement("a");
            homeBtn.id = "navHomeBtn";
            homeBtn.href = "index.html";
            homeBtn.innerHTML = "🏠 Home";
            homeBtn.style.padding = "8px 15px";
            homeBtn.style.background = "rgba(17, 205, 238, 0.1)";
            homeBtn.style.border = "1px solid var(--primary-cyan)";
            homeBtn.style.color = "var(--text-main)";
            homeBtn.style.borderRadius = "8px";
            homeBtn.style.textDecoration = "none";
            homeBtn.style.fontWeight = "600";
            homeBtn.style.fontSize = "0.9rem";
            homeBtn.style.fontFamily = "inherit";
            homeBtn.style.transition = "all 0.3s ease";
            homeBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
            homeBtn.style.display = "flex";
            homeBtn.style.alignItems = "center";
            homeBtn.style.justifyContent = "center";
            homeBtn.style.boxSizing = "border-box";
            homeBtn.style.height = "40px";
            
            homeBtn.addEventListener("mouseover", () => {
                homeBtn.style.background = "var(--primary-cyan)";
                homeBtn.style.color = "var(--text-contrast)";
                homeBtn.style.transform = "translateY(-2px)";
                homeBtn.style.boxShadow = "0 6px 15px rgba(17, 205, 238, 0.4)";
            });
            homeBtn.addEventListener("mouseout", () => {
                homeBtn.style.background = "rgba(17, 205, 238, 0.1)";
                homeBtn.style.color = "var(--text-main)";
                homeBtn.style.transform = "none";
                homeBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
            });

            actionsGroup.appendChild(homeBtn);
        }

        nav.appendChild(actionsGroup);
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