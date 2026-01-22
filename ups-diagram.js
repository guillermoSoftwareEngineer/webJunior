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
            content: `
                <div class="modal-section">
                    <p>La electricidad es fundamental para los sistemas UPS (Uninterruptible Power System), diseñados precisamente para garantizar un suministro continuo de energía. La corriente alterna (AC, Alternating Current), representada por el símbolo eléctrico de una onda sinusoidal (~), es uno de los dos tipos de energía que dominan nuestro mundo. Se usa principalmente porque es más sencilla y económica transmitirla a largas distancias. El otro tipo es la corriente directa (DC, Direct Current).</p>
                    
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/MuZtpko3TSM" title="Trailer La Guerra de las Corrientes" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>

                    <p>Dos grandes personajes del siglo pasado defendieron cada sistema: Thomas Alva Edison apostó por la DC, mientras que Nikola Tesla (con "k") defendió el AC. Ambos visionarios, científicos e inventores mundialmente reconocidos, representaban formas distintas de entender el futuro energético que hoy habitamos. Incluso llegaron a trabajar juntos, dejando marcas indelebles en la historia: Edison, creador de la bombilla incandescente, iluminó literalmente el mundo; Tesla, con su genialidad, nos legó inventos revolucionarios como el motor de inducción.</p>

                    <div class="multimedia-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 2rem 0; align-items: center;">
                        <div class="movie-poster">
                            <img src="./images/currentWar.jpg" alt="Póster La Guerra de las Corrientes" style="width: 100%; border-radius: 8px; box-shadow: 0 0 15px rgba(30,144,255,0.3);">
                            <p style="font-size: 0.8rem; text-align: center; color: var(--gris); margin-top: 5px;">Película "The Current War"</p>
                        </div>
                        <div class="biography-videos" style="display: flex; flex-direction: column; gap: 15px;">
                            <div class="video-container" style="margin: 0;">
                                <!-- Video Tesla -->
                                <iframe src="https://www.youtube.com/embed/oESNo52Z-vo" title="Nikola Tesla Biografía" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                             <p style="font-size: 0.8rem; text-align: center; color: var(--gris); margin: 0 0 10px 0;">Nikola Tesla (AC)</p>
                            
                            <div class="video-container" style="margin: 0;">
                                <!-- Video Edison -->
                                <iframe src="https://www.youtube.com/embed/bfLK7PUMu5U" title="Thomas Edison Biografía" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <p style="font-size: 0.8rem; text-align: center; color: var(--gris); margin: 0;">Thomas Edison (DC)</p>
                        </div>
                    </div>

                    <p>La influencia de esta rivalidad trasciende la ingeniería. La compañía de automóviles Tesla rinde homenaje a su legado, y la banda australiana AC/DC tomó su nombre al ver estas siglas en un electrodoméstico. Incluso, esta épica batalla tecnológica llegó al cine en la película "La guerra de las corrientes", que recrea la competencia entre estos gigantes.</p>

                    <div class="multimedia-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 2rem 0;">
                        <div class="image-container" style="background: #0f172a; border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
                             <img src="./images/EddisonVrsTesla.png" alt="Tesla vs Edison" style="width: 100%; height: 300px; object-fit: contain; border-radius: 8px; box-shadow: 0 0 10px rgba(30,144,255,0.2);">
                             <p style="font-size: 0.8rem; text-align: center; color: var(--gris); margin-top: 5px;">Rivalidad: Edison vs Tesla</p>
                        </div>
                        <div class="image-container" style="background: #0f172a; border-radius: 8px; display: flex; flex-direction: column; justify-content: center;">
                             <img src="./images/AcDc.jpg" alt="Diagrama AC vs DC" style="width: 100%; height: 300px; object-fit: contain; border-radius: 8px; box-shadow: 0 0 10px rgba(30,144,255,0.2);">
                             <p style="font-size: 0.8rem; text-align: center; color: var(--gris); margin-top: 5px;">Diagrama: Diferencias AC/DC</p>
                        </div>
                    </div>

                    <h3 style="color: var(--azul); margin-top: 2.5rem; border-bottom: 1px solid #1e293b; padding-bottom: 10px;">Explicación: Corriente Alterna vs Directa</h3>
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/boQ6hMpp7kI?start=121" title="Explicación AC vs DC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>

                    <h3 style="color: var(--azul); margin-top: 2.5rem; border-bottom: 1px solid #1e293b; padding-bottom: 10px;">Características de la Onda Sinusoidal</h3>
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/CzvR_bm-624" title="Características de la Onda Sinusoidal" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            `
        },
        "main-switch": {
            title: "Interruptor Principal (Main Switch)",
            content: "<p>Desconecta la alimentación de entrada para mantenimiento o seguridad.</p>"
        },
        "fuse": {
            title: "Fusible (Fuse)",
            content: "<p>Protege el circuito contra sobrecorrientes y cortocircuitos.</p>"
        },
        "rectifier": {
            title: "Rectificador",
            content: "<p>Convierte la corriente alterna (AC) de entrada en corriente continua (DC). Esto es fundamental para cargar las baterías y alimentar el inversor.</p>"
        },
        "dcdc": {
            title: "Convertidor DC/DC",
            content: "<p>Regula el voltaje DC proveniente del rectificador para cargar las baterías de manera segura y eficiente, y para alimentar el bus DC del inversor.</p>"
        },
        "battery": {
            title: "Banco de Baterías",
            content: "<p>Almacena energía química para suministrarla como energía eléctrica en caso de fallo de la red. Es el corazón del respaldo de energía.</p>"
        },
        "bms": {
            title: "BMS (Battery Management System)",
            content: "<p>Sistema electrónico que gestiona el banco de baterías recargables (celda o batería pack), protegiéndola de trabajar fuera de su área de operación segura, monitoreando su estado, calculando datos secundarios, reportando esos datos, controlando su entorno, autenticándola y equilibrándola.</p>"
        },
        "dc-link": {
            title: "DC Link (Enlace DC)",
            content: "<p>Conexión intermedia de corriente continua que une el rectificador con el inversor, estabilizando el voltaje y sirviendo de buffer de energía.</p>"
        },
        "battery-check": {
            title: "Interruptor de Batería",
            content: "<p>Dispositivo de protección y desconexión que aísla el banco de baterías del resto del sistema para mantenimiento o seguridad.</p>"
        },
        "pwm": {
            title: "Inversor PWM",
            content: "<p>Utiliza la técnica de Modulación por Ancho de Pulso (PWM) para convertir la corriente continua (DC) del bus en una corriente alterna (AC) senoidal pura, estable y libre de ruido para la carga.</p>"
        },
        "control-main": {
            title: "Control Principal (DSP)",
            content: "<p>Un Procesador Digital de Señales (DSP) o microcontrolador avanzado que monitorea y regula todas las funciones de la UPS en tiempo real: sincronización, voltajes, corrientes y protección.</p>"
        },
        "filter": {
            title: "Filtro de Salida (LC)",
            content: "<p>Compuesto por bobinas y capacitores, suaviza la onda generada por el inversor PWM eliminando los armónicos de alta frecuencia para entregar una onda senoidal perfecta.</p>"
        },
        "bypass": {
            title: "Bypass Estático",
            content: "<p>Un camino alternativo de energía que conecta la carga directamente a la red eléctrica. Se activa automáticamente en caso de fallo de la UPS, sobrecarga o mantenimiento, sin interrumpir el suministro.</p>"
        },
        "ac-output": {
            title: "AC Output (Salida AC)",
            content: "<p>Punto de conexión de las cargas críticas. Aquí se entrega la energía regulada, filtrada y protegida, lista para ser consumida por equipos sensibles.</p>"
        },
        "aux-power": {
            title: "Fuente de Poder Auxiliar",
            content: "<p>Suministra voltajes bajos y regulados (5V, 12V, etc.) para alimentar todos los circuitos electrónicos de control, sensores y comunicación de la propia UPS.</p>"
        },
        "sensor": {
            title: "Sensores y Acondicionamiento",
            content: "<p>Detectan parámetros físicos como tensión, corriente y temperatura. Envían esta información al control central para que tome decisiones precisas.</p>"
        },
        "control-sub": {
            title: "Sub-control / Lógica de Disparo",
            content: "<p>Circuitos encargados de generar las señales físicas de disparo para los transistores (IGBTs) del inversor y rectificador, comandados por el control principal.</p>"
        },
        "interface": {
            title: "Interfaz de Usuario",
            content: "<p>Panel frontal con display LCD o LEDs y botones que permite al usuario ver el estado de la UPS (voltajes, carga, alarmas) y configurarla.</p>"
        },
        "comm": {
            title: "Comunicación",
            content: "<p>Puertos de comunicación (USB, RS232, SNMP, Contactos Secos) que permiten el monitoreo y gestión remota de la UPS por software o sistemas BMS de edificios.</p>"
        }
    };

    hotspots.forEach(hotspot => {
        hotspot.addEventListener("click", () => {
            const id = hotspot.getAttribute("data-id");
            console.log("Click en hotspot:", id); // Depuración

            if (blockData[id]) {
                modalTitle.textContent = blockData[id].title;
                modalBody.innerHTML = blockData[id].content;
                modal.style.display = "block";
            } else {
                console.warn("No hay datos para el ID:", id);
            }
        });
    });

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
});
