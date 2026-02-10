// ups-diagram.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica del Menú Hamburguesa (Reutilizada y mejorada si es necesaria) ---
    const toggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (toggle && navLinks) {
        toggle.addEventListener("click", () => {
            navLinks.classList.toggle("show");
            toggle.classList.toggle("active");
        });
    }

    // --- Lógica del Modal y Hotspots ---
    const modal = document.getElementById("infoModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const closeBtn = document.querySelector(".close-modal");

    // Seleccionamos todos los elementos interactivos (hotspots)
    const hotspots = document.querySelectorAll(".hotspot");

    // Función auxiliar para generar contenido "En Construcción" estandarizado
    const getConstructionContent = (description) => {
        return `
            <p>${description}</p>
            <div class="construction-container">
                <div class="construction-text" style="margin-top: 0; margin-bottom: 2rem;">
                    <span class="construction-highlight">🚧 Contenido en Desarrollo 🚧</span>
                    Estamos trabajando meticulosamente en esta sección para brindarte información técnica detallada y de alta calidad. <br>
                    ¡Pronto estará disponible!
                </div>
                <img src="./images/enConstruccion.png" alt="En Construcción" style="max-width: 50%; height: auto; border-radius: 8px; opacity: 0.9; box-shadow: 0 0 15px rgba(30, 144, 255, 0.2);">
            </div>
        `;
    };

    // Datos de contenido para cada bloque (IDs deben coincidir con data-id en HTML)
    const blockData = {
        "ac-input": {
            title: "¿Qué es la corriente AC?",
            // El contenido se carga desde el template HTML "content-ac-input"
            content: document.getElementById("content-ac-input") ? document.getElementById("content-ac-input").innerHTML : "<p>Error: Template no encontrado</p>"
        },
        "main-switch": {
            title: "Interruptor Principal (Main Switch)",
            content: document.getElementById("content-main-switch") ? document.getElementById("content-main-switch").innerHTML : "<p>Error: Template no encontrado</p>"
        },
        "fuse": {
            title: "Fusible (Fuse)",
            content: document.getElementById("content-fuse") ? document.getElementById("content-fuse").innerHTML : "<p>Error: Template no encontrado</p>"
        },
        "rectifier": {
            title: "Rectificador",
            content: document.getElementById("content-rectifier") ? document.getElementById("content-rectifier").innerHTML : "<p>Error: Template no encontrado</p>"
        },
        "dcdc": {
            title: "Convertidor DC/DC",
            content: getConstructionContent("Regula el voltaje DC proveniente del rectificador para cargar las baterías de manera segura y eficiente, y para alimentar el bus DC del inversor.")
        },
        "battery": {
            title: "Banco de Baterías",
            content: getConstructionContent("Almacena energía química para suministrarla como energía eléctrica en caso de fallo de la red. Es el corazón del respaldo de energía.")
        },
        "bms": {
            title: "BMS (Battery Management System)",
            content: getConstructionContent("Sistema electrónico que gestiona el banco de baterías recargables (celda o batería pack), protegiéndola de trabajar fuera de su área de operación segura, monitoreando su estado, calculando datos secundarios, reportando esos datos, controlando su entorno, autenticándola y equilibrándola.")
        },
        "dc-link": {
            title: "DC Link (Enlace DC)",
            content: getConstructionContent("Conexión intermedia de corriente continua que une el rectificador con el inversor, estabilizando el voltaje y sirviendo de buffer de energía.")
        },
        "battery-check": {
            title: "Interruptor de Batería",
            content: getConstructionContent("Dispositivo de protección y desconexión que aísla el banco de baterías del resto del sistema para mantenimiento o seguridad.")
        },
        "pwm": {
            title: "Inversor PWM",
            content: getConstructionContent("Utiliza la técnica de Modulación por Ancho de Pulso (PWM) para convertir la corriente continua (DC) del bus en una corriente alterna (AC) senoidal pura, estable y libre de ruido para la carga.")
        },
        "control-main": {
            title: "Control Principal (DSP)",
            content: getConstructionContent("Un Procesador Digital de Señales (DSP) o microcontrolador avanzado que monitorea y regula todas las funciones de la UPS en tiempo real: sincronización, voltajes, corrientes y protección.")
        },
        "filter": {
            title: "Filtro de Salida (LC)",
            content: getConstructionContent("Compuesto por bobinas y capacitores, suaviza la onda generada por el inversor PWM eliminando los armónicos de alta frecuencia para entregar una onda senoidal perfecta.")
        },
        "bypass": {
            title: "Bypass Estático",
            content: getConstructionContent("Un camino alternativo de energía que conecta la carga directamente a la red eléctrica. Se activa automáticamente en caso de fallo de la UPS, sobrecarga o mantenimiento, sin interrumpir el suministro.")
        },
        "ac-output": {
            title: "AC Output (Salida AC)",
            content: getConstructionContent("Punto de conexión de las cargas críticas. Aquí se entrega la energía regulada, filtrada y protegida, lista para ser consumida por equipos sensibles.")
        },
        "aux-power": {
            title: "Fuente de Poder Auxiliar",
            content: getConstructionContent("Suministra voltajes bajos y regulados (5V, 12V, etc.) para alimentar todos los circuitos electrónicos de control, sensores y comunicación de la propia UPS.")
        },
        "sensor": {
            title: "Sensores y Acondicionamiento",
            content: getConstructionContent("Detectan parámetros físicos como tensión, corriente y temperatura. Envían esta información al control central para que tome decisiones precisas.")
        },
        "control-sub": {
            title: "Sub-control / Lógica de Disparo",
            content: getConstructionContent("Circuitos encargados de generar las señales físicas de disparo para los transistores (IGBTs) del inversor y rectificador, comandados por el control principal.")
        },
        "interface": {
            title: "Interfaz de Usuario",
            content: getConstructionContent("Panel frontal con display LCD o LEDs y botones que permite al usuario ver el estado de la UPS (voltajes, carga, alarmas) y configurarla.")
        },
        "comm": {
            title: "Comunicación",
            content: getConstructionContent("Puertos de comunicación (USB, RS232, SNMP, Contactos Secos) que permiten el monitoreo y gestión remota de la UPS por software o sistemas BMS de edificios.")
        }
    };

    // Lógica del Indicador de Scroll
    const scrollIndicator = document.getElementById("scrollIndicator");

    function checkScroll() {
        if (!modalBody || !scrollIndicator) return;

        // Tolerancia de 10px
        if (modalBody.scrollTop + modalBody.clientHeight >= modalBody.scrollHeight - 10) {
            scrollIndicator.innerHTML = 'Fin';
        } else {
            scrollIndicator.innerHTML = 'Scroll para ver más <span style="font-size: 1.2em;">↓</span>';
        }
    }

    if (modalBody) {
        modalBody.addEventListener("scroll", checkScroll);
    }

    // Cerrar modal
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Resetear scroll al cerrar, pero para la apertura necesitamos disparar checkScroll
    // Modificamos el listener de los hotspots para chequear scroll al abrir
    hotspots.forEach(hotspot => {
        hotspot.addEventListener("click", () => {
            const id = hotspot.getAttribute("data-id");
            console.log("Click en hotspot:", id); // Depuración

            if (blockData[id]) {
                modalTitle.textContent = blockData[id].title;
                modalBody.innerHTML = blockData[id].content;
                modal.style.display = "block";

                // Resetear scroll arriba
                modalBody.scrollTop = 0;
                // Verificar estado inicial del indicador (por si el contenido es corto)
                setTimeout(checkScroll, 100);
            } else {
                console.warn("No hay datos para el ID:", id);
            }
        });
    });
    // --- Lógica del Lightbox (Zoom de Imágenes) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Delegación de eventos para imágenes dentro del modal (ya que el contenido es dinámico)
    // También aplicable a imágenes estáticas si se añade la clase .image-container o son img directas
    document.addEventListener('click', (e) => {
        // Verificar si el clic fue en una imagen dentro del modal content o en un contenedor de imagen
        const target = e.target;

        // Si el clic es en una imagen que está dentro de .modal-content o .diagram-explanation
        if (target.tagName === 'IMG' && (target.closest('.modal-content') || target.closest('.diagram-explanation'))) {
            // Ignorar íconos pequeños (clase icono-red o similares si existieran) o logos
            if (!target.classList.contains('icono-red') && !target.closest('.logo-img')) {
                lightbox.style.display = 'flex';
                lightboxImg.src = target.src;
            }
        }
    });

    // Cerrar Lightbox con botón X
    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // Cerrar Lightbox con clic fuera de la imagen
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
        }
    });

});
