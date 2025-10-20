document.addEventListener("DOMContentLoaded", function () {
    // Obtener los botones de la navegación personalizada
    const carouselButtons = document.querySelectorAll('.carousel-button');
    // Obtener el carrusel de Bootstrap
    const carousel = new bootstrap.Carousel(document.querySelector('#carouselExampleIndicators'));
    
    // Establecer el contenido dinámico (opcional)
    const tituloElement = document.getElementById('titulo');
    const botonElement = document.getElementById('boton');
    
    // Datos para cada slide
    const Datos = {
        0: { title: "Grand Theft Auto VI", message: "Watch Trailer 2 Now" },
        1: { title: "Grand Theft Auto Online", message: "Money Fronts Now Available" },
        2: { title: "Grand Theft Auto V", message: "Experience the Best Version of GTAV and GTA Online on PC with GTAV Enhanced" },
        3: { title: "Red Dead Online", message: "Strange Tales of the West" }
    }

    // Actualiza el contenido al cambiar de slide
    function updateContent(slideIndex) {
        const gameData = Datos[slideIndex];
        tituloElement.innerHTML = `<h2 class="text-white text-start">${gameData.title}</h2><p class="text-start">${gameData.message}</p>`;
        //tituloElement.innerHTML = `<h2 class="text-white-50 text-start">${gameData.title}</h2><p>${gameData.message}</p>`;

        botonElement.innerHTML = '<button class="learn-more-btn text-start">Learn More</button>';
        animateContent(tituloElement);
        animateContent(botonElement);
        
        // Cambiar la clase activa a los botones del carrusel
        carouselButtons.forEach(btn => btn.classList.remove('active'));
        carouselButtons[slideIndex].classList.add('active');
    }

    // Animar el contenido
    function animateContent(element) {
        element.classList.remove('fade-in');
        void element.offsetWidth; // Reflow
        element.classList.add('fade-in');
    }

    // Iniciar con el primer slide
    const initSlide = 0;
    updateContent(initSlide);

    // Hacer que los botones personalizados controlen el carrusel
    carouselButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const slideIndex = e.target.getAttribute('data-slide');
            carousel.to(slideIndex); // Mover el carrusel a ese slide
            updateContent(slideIndex); // Actualizar el contenido según el slide
        });
    });

    // Actualizar el contenido cuando se cambia el slide (event listener)
    carousel.addEventListener('slid.bs.carousel', function (e) {
        const currentSlide = e.to;
        updateContent(currentSlide);
    });
});

