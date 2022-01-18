window.onload = () => {
    const mobileBtn = document.querySelector(".menuSwitchBtn");
    const header = document.querySelector(".headerStyles");
    const mobileMenu = document.querySelector(".openedMobileWrapper");

    mobileBtn.addEventListener("click", (e) => {
        mobileBtn.classList.toggle("btnActive");
        header.classList.toggle("openedMenuHeader");
        mobileMenu.classList.toggle("openedMenu");
        mobileMenu.classList.toggle("closedMenu");
        document.body.classList.toggle("bodyOverflow");
    });

    mobileMenu.addEventListener("animationend", () => {
        if (mobileMenu.classList.contains("closedMenu")) {
            mobileMenu.classList.add("hideMenu");
        } else {
            mobileMenu.classList.remove("hideMenu");
        }
    });
};


