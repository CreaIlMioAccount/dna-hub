document.addEventListener('DOMContentLoaded', function () {

    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('active');
    });

    document.querySelectorAll('.dropdown > a').forEach(link => {

        link.addEventListener('click', function (e) {

            if (window.innerWidth <= 992) {

                e.preventDefault();

                this.parentElement.classList.toggle('active');
            }

        });

    });

});
