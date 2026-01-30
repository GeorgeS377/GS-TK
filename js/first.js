//dark mode memory
(function () {
    const saved = localStorage.getItem("theme");

    if (saved) {
        document.documentElement.setAttribute("data-theme", saved);
        return;
    }

    // default: follow OS preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-theme", "dark");
    }
})();


//dark mode toggle
document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");

    if (!toggle || !icon) return;

    {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        icon.src = isDark
            ? "/images/etc/icons/dark_mode.webp"
            : "/images/etc/icons/light_mode.webp";

        icon.style.visibility = "visible";
    }

    function setIcon() {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";

        icon.classList.remove("switch-in");
        icon.classList.add("switch-out");

        setTimeout(() => {
            icon.src = isDark
                ? "/images/etc/icons/dark_mode.webp"
                : "/images/etc/icons/light_mode.webp";

            icon.classList.remove("switch-out");
            icon.classList.add("switch-in");
        }, 200);
    }

    toggle.addEventListener("click", () => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        document.body.classList.add("theme-animating");

        if (isDark) {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }

        setTimeout(() => {
            document.body.classList.remove("theme-animating");
        }, 300);

        setIcon();
    });
});