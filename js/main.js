// VARIABLES
let logo = document.getElementById("logo");
let libreriaJS = document.getElementById("text1");

let canvas = document.getElementById('graciasCanvas');
let ctx = canvas.getContext('2d');

let texto = "¡Gracias por su visita!";
let posX = -ctx.measureText(texto).width;
let posY = canvas.height / 2;
let velocidad = 1.2;

// EVENTOS ON-LOAD
window.onload = observer;

// EVENT LISTENERS

// Cuando el puntero entra, se añade la clase animar-letras al texto, lo que activa la animación. Y cuando se sale, se elimina.
logo.addEventListener("mouseenter", () => {
    libreriaJS.classList.add("animar-letras");
});
logo.addEventListener("mouseleave", () => {
    libreriaJS.classList.remove("animar-letras");
});

// Script que calcula el % de scroll realizado en la web y lo transforma en el "width" de la barra de progreso
window.addEventListener("scroll", function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrollPorcentaje = (scrollTop / scrollHeight) * 100;

    document.getElementById("progressBar").style.width = scrollPorcentaje + "%";
});

// Script que configura y crea un observers haciendo uso de Observable API, y luego asigna a cada
// elemento animado el observer para que, cuando dicho elemento sea visualizado, se añada la clase "visible"
// y se lance la animación correspondiente (controlado en CSS con .visible).
function observer() {
    // Configuración del Intersection Observer
    let observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // Callback para el observer
    let observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    // Se crea el observer
    let observer = new IntersectionObserver(observerCallback, observerOptions);

    // Se observan los elementos que elijamos, a través de su classname.
    let animaciones = document.querySelectorAll('.carousel, .author-info, .separator-bar');

    animaciones.forEach(element => {
        observer.observe(element);
    });
};

document.addEventListener('DOMContentLoaded', function () {
    let scrollArribaBtn = document.getElementById('scrollArriba');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 50) {
            scrollArribaBtn.style.display = 'block';
        } else {
            scrollArribaBtn.style.display = 'none';
        }
    });

    scrollArribaBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

/* Función creada con Canvas que crea un texto de agradecimiento al cliente
 El texto se anima, de forma que se desplaza en bucle de izq a derecha
 Se realizan cálculos con el espacio del canvas para determinar el inicio y el fin
 del espacio por donde debe aparecer y desaparecer el texto */

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "Bold 28px Text Me One";
    ctx.fillStyle = "#da773a";
    ctx.fillText(texto, posX, posY);

    posX += velocidad;

    if (posX > canvas.width) {
        posX = -ctx.measureText(texto).width;
    }

    requestAnimationFrame(animar);
}

animar();