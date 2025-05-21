const navLinks = document.querySelectorAll("header nav a");
const logoLink = document.querySelector(".logo");
const sections = document.querySelectorAll("section");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("header nav");
const footerLinks = document.querySelectorAll(".footer-links a");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
});

// Función para actualizar el estado activo
const setActivePage = (index) => {
    // Quitar la clase 'active' de todos los enlaces y secciones
    navLinks.forEach(link => link.classList.remove("active"));
    footerLinks.forEach(link => link.classList.remove("active"));
    sections.forEach(section => section.classList.remove("active"));

    // Agregar la clase 'active' al enlace y sección correspondientes
    if (index >= 0) {
        navLinks[index].classList.add("active");
        footerLinks[index].classList.add("active");
        sections[index].classList.add("active");
    }
};

// Función para reiniciar estados de la página
const activePage = () => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const barsBox = document.querySelector(".bars-box");

    header.classList.remove("active");
    setTimeout(() => {
        header.classList.add("active");
    }, 1100);

    footer.classList.remove("active");
    setTimeout(() => {
        footer.classList.add("active");
    }, 1100);

    navLinks.forEach(link => {
        link.classList.remove("active");
    });
    footerLinks.forEach(link => {
        link.classList.remove("active");
    });

    barsBox.classList.remove("active");
    setTimeout(() => {
        barsBox.classList.add("active");
    }, 1100);

    sections.forEach(section => {
        section.classList.remove("active");
    });

    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
};

// Event listeners para los enlaces del navbar
navLinks.forEach((link, idx) => {
    link.addEventListener("click", () => {
        if (!link.classList.contains("active")) {
            activePage();
            setActivePage(idx);
        }
    });
});

// Event listeners para los enlaces del footer
footerLinks.forEach((link, idx) => {
    link.addEventListener("click", () => {
        if (!link.classList.contains("active")) {
            activePage();
            setActivePage(idx);
        }
    });
});

// Event listener para el logo (redirige a la primera sección)
logoLink.addEventListener("click", () => {
    const barsBox = document.querySelector(".bars-box");
    if (!navLinks[0].classList.contains("active")) {
        activePage();
        setActivePage(0);
    }

    barsBox.classList.remove("active");
    setTimeout(() => {
        barsBox.classList.add("active");
    }, 1100);
});

// ***************************PARA EL CONTACTO POR EMAIL*****************************************************
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar envío tradicional del formulario
        
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('¡Mensaje enviado exitosamente!');
                form.reset(); // Limpiar formulario
            } else {
                alert('Hubo un problema al enviar el mensaje. Intenta de nuevo.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error. Por favor, intenta nuevamente.');
        });
    });
});


// ######################################AÑO DEL FOOTER############################################
document.getElementById("year").textContent = new Date().getFullYear();
// ######################################EDAD############################################
const fechaNacimiento = new Date('2004-05-05'); // Fecha de nacimiento de Eliana
        const fechaActual = new Date(); // Fecha actual

        // Calcular la edad
        let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        const mesActual = fechaActual.getMonth();
        const mesNacimiento = fechaNacimiento.getMonth();

        // Ajustar la edad si aún no ha cumplido años este año
        if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        // Actualizar el texto con la edad calculada
        document.getElementById('edad').textContent = edad;

// ######################################MODAL DE PRODUCTO############################################
// Obtener elementos del DOM
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalProductImage');
const modalName = document.getElementById('modalProductName');
const modalDescription = document.getElementById('modalProductDescription');
const closeModal = document.querySelector('.close-modal');
const productCards = document.querySelectorAll('.product-card');

// Función para abrir el modal con la información del producto
function openProductModal(imageSrc, name, description) {
    modalImage.src = imageSrc;
    modalImage.alt = name;
    modalName.textContent = name;
    modalDescription.textContent = description;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
}

// Función para cerrar el modal
function closeProductModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll del fondo
}

// Event listeners para abrir el modal al hacer clic en una tarjeta de producto
productCards.forEach(card => {
    card.addEventListener('click', () => {
        const image = card.querySelector('img').src;
        const name = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        openProductModal(image, name, description);
    });

    // Añadir efecto hover mejorado
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 0 2rem var(--main-color)';
    });
});

// Cerrar el modal al hacer clic en la X
closeModal.addEventListener('click', closeProductModal);

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeProductModal();
    }
});

// Cerrar el modal con la tecla Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeProductModal();
    }
});
