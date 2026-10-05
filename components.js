document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       LOAD HEADER
    ========================================= */

    const headerContainer =
        document.getElementById("site-header");


    if (headerContainer) {

        fetch("components/header.html")

            .then(function (response) {

                if (!response.ok) {
                    throw new Error("Header file not found");
                }

                return response.text();

            })

            .then(function (data) {

                headerContainer.innerHTML = data;

                setActiveMenu();
                initMobileMenu();

            })

            .catch(function (error) {

                console.error(
                    "Header loading error:",
                    error
                );

            });

    }



    /* =========================================
       LOAD FOOTER
    ========================================= */

    const footerContainer =
        document.getElementById("site-footer");


    if (footerContainer) {

        fetch("components/footer.html")

            .then(function (response) {

                if (!response.ok) {
                    throw new Error("Footer file not found");
                }

                return response.text();

            })

            .then(function (data) {

                footerContainer.innerHTML = data;

            })

            .catch(function (error) {

                console.error(
                    "Footer loading error:",
                    error
                );

            });

    }



    /* =========================================
       ACTIVE MENU
    ========================================= */

    function setActiveMenu() {

        let currentPage =
            window.location.pathname
                .split("/")
                .pop();


        /*
           If homepage is opened as:
           /
           or
           index.html
        */

        if (
            currentPage === "" ||
            currentPage === "index.html"
        ) {

            currentPage = "index";

        }


        const menuLinks =
            document.querySelectorAll(
                "nav a[data-page]"
            );


        menuLinks.forEach(function (link) {

            link.classList.remove("active");

        });


        let activePage = "";


        if (currentPage === "index") {

            activePage = "home";

        }

        else if (currentPage === "about.html") {

            activePage = "about";

        }

        else if (currentPage === "product.html") {

            activePage = "products";

        }

        else if (currentPage === "blog.html") {

            activePage = "blog";

        }

        else if (currentPage === "contact.html") {

            activePage = "contact";

        }


        const activeLink =
            document.querySelector(
                `nav a[data-page="${activePage}"]`
            );


        if (activeLink) {

            activeLink.classList.add("active");

        }

    }


    /* =========================================
       MOBILE HAMBURGER MENU
       Responsive-only enhancement
    ========================================= */

    function initMobileMenu() {

        const toggle = document.querySelector(".mobile-nav-toggle");
        const nav = document.querySelector("header nav");

        if (!toggle || !nav) {
            return;
        }

        const icon = toggle.querySelector("i");

        toggle.addEventListener("click", function () {

            const isOpen =
                nav.classList.toggle("mobile-nav-open");

            toggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            toggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isOpen
                );

            }

        });


        /* Close menu after selecting a page */
        nav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("mobile-nav-open");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                toggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                if (icon) {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

            });

        });


        /* Close menu when switching back to desktop */
        window.addEventListener("resize", function () {

            if (window.innerWidth > 768) {

                nav.classList.remove("mobile-nav-open");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                toggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                if (icon) {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

            }

        });

    }

});

