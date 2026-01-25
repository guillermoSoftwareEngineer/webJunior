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
            content: "<p>Convierte la corriente alterna (AC) de entrada en corriente continua (DC). Esto es fundamental para cargar las baterías y alimentar el inversor.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "dcdc": {
            title: "Convertidor DC/DC",
            content: "<p>Regula el voltaje DC proveniente del rectificador para cargar las baterías de manera segura y eficiente, y para alimentar el bus DC del inversor.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "battery": {
            title: "Banco de Baterías",
            content: "<p>Almacena energía química para suministrarla como energía eléctrica en caso de fallo de la red. Es el corazón del respaldo de energía.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "bms": {
            title: "BMS (Battery Management System)",
            content: "<p>Sistema electrónico que gestiona el banco de baterías recargables (celda o batería pack), protegiéndola de trabajar fuera de su área de operación segura, monitoreando su estado, calculando datos secundarios, reportando esos datos, controlando su entorno, autenticándola y equilibrándola.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "dc-link": {
            title: "DC Link (Enlace DC)",
            content: "<p>Conexión intermedia de corriente continua que une el rectificador con el inversor, estabilizando el voltaje y sirviendo de buffer de energía.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "battery-check": {
            title: "Interruptor de Batería",
            content: "<p>Dispositivo de protección y desconexión que aísla el banco de baterías del resto del sistema para mantenimiento o seguridad.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "pwm": {
            title: "Inversor PWM",
            content: "<p>Utiliza la técnica de Modulación por Ancho de Pulso (PWM) para convertir la corriente continua (DC) del bus en una corriente alterna (AC) senoidal pura, estable y libre de ruido para la carga.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "control-main": {
            title: "Control Principal (DSP)",
            content: "<p>Un Procesador Digital de Señales (DSP) o microcontrolador avanzado que monitorea y regula todas las funciones de la UPS en tiempo real: sincronización, voltajes, corrientes y protección.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "filter": {
            title: "Filtro de Salida (LC)",
            content: "<p>Compuesto por bobinas y capacitores, suaviza la onda generada por el inversor PWM eliminando los armónicos de alta frecuencia para entregar una onda senoidal perfecta.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "bypass": {
            title: "Bypass Estático",
            content: "<p>Un camino alternativo de energía que conecta la carga directamente a la red eléctrica. Se activa automáticamente en caso de fallo de la UPS, sobrecarga o mantenimiento, sin interrumpir el suministro.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "ac-output": {
            title: "AC Output (Salida AC)",
            content: "<p>Punto de conexión de las cargas críticas. Aquí se entrega la energía regulada, filtrada y protegida, lista para ser consumida por equipos sensibles.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "aux-power": {
            title: "Fuente de Poder Auxiliar",
            content: "<p>Suministra voltajes bajos y regulados (5V, 12V, etc.) para alimentar todos los circuitos electrónicos de control, sensores y comunicación de la propia UPS.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "sensor": {
            title: "Sensores y Acondicionamiento",
            content: "<p>Detectan parámetros físicos como tensión, corriente y temperatura. Envían esta información al control central para que tome decisiones precisas.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "control-sub": {
            title: "Sub-control / Lógica de Disparo",
            content: "<p>Circuitos encargados de generar las señales físicas de disparo para los transistores (IGBTs) del inversor y rectificador, comandados por el control principal.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "interface": {
            title: "Interfaz de Usuario",
            content: "<p>Panel frontal con display LCD o LEDs y botones que permite al usuario ver el estado de la UPS (voltajes, carga, alarmas) y configurarla.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
        },
        "comm": {
            title: "Comunicación",
            content: "<p>Puertos de comunicación (USB, RS232, SNMP, Contactos Secos) que permiten el monitoreo y gestión remota de la UPS por software o sistemas BMS de edificios.</p><div style=\"margin-top: 1.5rem; text-align: center;\"><img src=\"./images/enConstruccion.png\" alt=\"En Construcción\" style=\"max-width: 100%; height: auto; border-radius: 8px; opacity: 0.8;\"></div>"
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
});
