// Blog Mastery – site scripts
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const menu = document.getElementById("mainNav");

    // 1. Sticky navbar: add a solid background once the page is scrolled
    const updateNavbar = () => {
        navbar.classList.toggle("navbar-sticky", window.scrollY > 50);
    };
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    if (menu) {
        // 2. Give the mobile menu a background while it is open,
        //    so the white links stay readable over light sections
        menu.addEventListener("show.bs.collapse", () =>
            navbar.classList.add("menu-open")
        );
        menu.addEventListener("hidden.bs.collapse", () =>
            navbar.classList.remove("menu-open")
        );

        // 3. Close the mobile menu after a link is tapped
        menu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                if (menu.classList.contains("show")) {
                    bootstrap.Collapse.getOrCreateInstance(menu).hide();
                }
            });
        });

        // 4. Reset the menu state if the window is resized to desktop width
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 992 && menu.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
            }
        });
    }

    // 5. "Free Download" buttons inside the modals: close the modal,
    //    then take the visitor to the email form at the top of the page
    document.querySelectorAll(".js-download-link").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const modalEl = link.closest(".modal");
            const target = document.querySelector(link.getAttribute("href"));
            modalEl.addEventListener(
                "hidden.bs.modal",
                () => {
                    if (target) {
                        target.scrollIntoView({ behavior: "smooth", block: "center" });
                        target.focus({ preventScroll: true });
                    }
                },
                { once: true }
            );
            bootstrap.Modal.getOrCreateInstance(modalEl).hide();
        });
    });

    // 6. Keep the footer copyright year current
    document.querySelectorAll(".js-year").forEach((el) => {
        el.textContent = new Date().getFullYear();
    });
});
