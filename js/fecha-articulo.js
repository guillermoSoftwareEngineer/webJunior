/**
 * fecha-articulo.js
 * 
 * Este script automatiza la visualización de la fecha de publicación/modificación del artículo.
 * Usa 'document.lastModified' para obtener la fecha real en que el archivo fue guardado
 * por última vez por el desarrollador.
 * 
 * Esto asegura que:
 * 1. La fecha no cambie cada vez que un usuario visita la página (no usa new Date() actual).
 * 2. La fecha se actualice automáticamente solo cuando tú editas el archivo HTML.
 */

document.addEventListener("DOMContentLoaded", () => {
    const publishDateSpan = document.getElementById('publish-date');

    if (publishDateSpan) {
        // Obtenemos la fecha de última modificación del archivo
        const lastMod = new Date(document.lastModified);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        // formateamos la fecha en español (ej: "10 de febrero de 2026")
        publishDateSpan.textContent = lastMod.toLocaleDateString('es-ES', options);
    }
});
