document.addEventListener("DOMContentLoaded",function() {
    const buttons = document.querySelectorAll('.carousel-button');
    const carousel = new bootstrap.Carousel(document.querySelector('#carouselExampleIndicators'));
    const tituloElement = document.getElementById('titulo');
    const botonElement = document.getElementById('boton');
    const Datos = {
        0: { title: "Grand Theft Auto VI", message: "Watch Trailer 2 Now" },
        1: { title: "Grand Theft Auto Online", message: "Money Fronts Now Available" },
        2: { title: "Grand Theft Auto V", message: "Experience the Best Version of GTAV and GTA Online on PC with GTAV Enhanced" },
        3: { title: "Red Dead Online", message: "Strange Tales of the West" }
    }

    function updateContent(slideIndex){
        const gameData = Datos[slideIndex];
        tituloElement.innerHTML = `<h2>${gameData.title}</h2><p>${gameData.message}</p>`;
        botonElement.innerHTML = '<button class="btn btn-light">Learn More</button>';
        animateContent(tituloElement);
        animateContent(botonElement);
        buttons.forEach(btn => btn.classList.remove('active'));
        buttons[slideIndex].classList.add('active');
        //ajustarBoton();
    }

    function animateContent(element){
        element.classList.remove('fade-in');
        void element.offsetWidth; //Reflow
        element.classList.add('fade-in');
    }

    const initSlide = 0;
    updateContent(initSlide);
    buttons.forEach(button =>{
        button.addEventListener('click',function(e){
            const slideIndex = e.target.getAttribute('data-slide');
            carousel.to(slideIndex); //Actualizar contenido
            updateContent(slideIndex);
        });
    });

    carousel.addEventListener('slid.bs.carousel', function (e) {
        const currentSlide = e.to;
        updateContent(currentSlide);
    }); 
    //window.addEventListener('resize', ajustarBoton);
});

