(function () {

    const panel = document.getElementById("panel-moodle");
    if (!panel) return;

    const nrc = panel.dataset.nrc;

    panel.innerHTML =
        '<div style="padding:15px;text-align:center;">' +
        '⏳ Cargando información del aula...' +
        '</div>';

    const scriptDatos = document.createElement("script");

    scriptDatos.src =
        "https://script.google.com/a/macros/espe.edu.ec/s/AKfycbw3NgkLO8QrzhVtVrPJka45gwj2PpBRR6teLHLfNq1Xymt2qeoOXnHhfuSt3tYuW52_/exec";

    scriptDatos.onload = function () {

        if (!window.CONFIG_MOODLE) {
            panel.innerHTML =
                "❌ No se pudo obtener la configuración.";
            return;
        }

        // Busca primero configuración específica del NRC.
        // Si no existe, utiliza TODOS.
        function obtener(elemento) {

            const especifico = window.CONFIG_MOODLE.find(item =>
                item.nrc === nrc &&
                item.elemento === elemento
            );

            const general = window.CONFIG_MOODLE.find(item =>
                item.nrc === "TODOS" &&
                item.elemento === elemento
            );

            return especifico || general;
        }

        function estaActivo(item) {
            if (!item) return false;

            const valor = String(item.activo)
                .trim()
                .toUpperCase();

            return valor === "SI" ||
                   valor === "SÍ" ||
                   valor === "YES" ||
                   valor === "TRUE";
        }

        function saltos(texto) {
            if (!texto) return "";

            return texto
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/\n/g, "<br>");
        }

function obtenerImagenDrive(url) {

    if (!url) return "";

    const coincidencia = url.match(/\/file\/d\/([^/]+)/);

    if (coincidencia && coincidencia[1]) {
        return "https://drive.google.com/thumbnail?id=" +
               coincidencia[1] +
               "&sz=w1200";
    }

    return url;
}

function mostrarImagen(item) {

    if (!item || !item.imagen) return "";

    const urlImagen = obtenerImagenDrive(item.imagen);

    return `
        <div style="
            margin-top:15px;
            text-align:center;
        ">
            <img
                src="${urlImagen}"
                alt="${item.pieImagen || "Imagen informativa"}"
                style="
                    max-width:100%;
                    height:auto;
                    border:1px solid #ddd;
                    border-radius:6px;
                "
            >

            ${
                item.pieImagen
                ? `
                    <div style="
                        margin-top:6px;
                        font-size:13px;
                        color:#666;
                    ">
                        ${saltos(item.pieImagen)}
                    </div>
                  `
                : ""
            }
        </div>
    `;
}
        const emergencia = obtener("EMERGENCIA");
        const noticias = obtener("NOTICIAS");
        const aviso = obtener("AVISO");
        const informativo = obtener("INFORMATIVO");
        const clase = obtener("CLASE");
        const tutoria = obtener("TUTORIA");

        let html = "";

        // AVISO URGENTE
        if (estaActivo(emergencia)) {

            html += `
                <div style="
                    border:2px solid #dc3545;
                    background:#fff3f3;
                    padding:16px;
                    margin-bottom:18px;
                    border-radius:8px;
                ">
                    <div style="
                        font-size:18px;
                        font-weight:bold;
                        color:#b02a37;
                        margin-bottom:8px;
                    ">
                        🚨 ${saltos(emergencia.titulo)}
                    </div>

                    <div>
                        ${saltos(emergencia.contenido)}
                    </div>
                </div>
            `;
        }

        // NOTICIAS
        if (estaActivo(noticias)) {

            html += `
                <div style="
                    border-left:5px solid #0d6efd;
                    background:#f5f9ff;
                    padding:16px;
                    margin-bottom:18px;
                ">
                    <div style="
                        font-size:18px;
                        font-weight:bold;
                        margin-bottom:8px;
                    ">
                        📰 ${saltos(noticias.titulo)}
                    </div>

                    <div>
                        ${saltos(noticias.contenido)}
                    </div>
                  <div style="
                        margin-top:10px;
                        padding:10px;
                        background:#fff3cd;
                        border:1px solid #ffc107;
                    ">
                        <strong>PRUEBA IMAGEN:</strong><br>
                        ${saltos(noticias.imagen || "NO SE RECIBIÓ NINGÚN ENLACE")}
                    </div>
                    ${mostrarImagen(noticias)}
                </div>
            `;
        }

        // AVISOS IMPORTANTES
        if (estaActivo(aviso)) {

            html += `
                <div style="
                    border-left:5px solid #ffc107;
                    background:#fffbea;
                    padding:16px;
                    margin-bottom:18px;
                ">
                    <div style="
                        font-size:18px;
                        font-weight:bold;
                        margin-bottom:8px;
                    ">
                        ⚠️ ${saltos(aviso.titulo)}
                    </div>

                    <div>
                        ${saltos(aviso.contenido)}
                    </div>
                </div>
            `;
        }

        // INFORMATIVO
        if (estaActivo(informativo)) {

            html += `
                <div style="
                    border-left:5px solid #198754;
                    background:#f3fbf7;
                    padding:16px;
                    margin-bottom:18px;
                ">
                    <div style="
                        font-size:18px;
                        font-weight:bold;
                        margin-bottom:8px;
                    ">
                        ℹ️ ${saltos(informativo.titulo)}
                    </div>

                    <div>
                        ${saltos(informativo.contenido)}
                    </div>
                </div>
            `;
        }

        // CLASES Y TUTORÍAS
        html += `
            <div style="
                border:1px solid #dee2e6;
                padding:16px;
                border-radius:8px;
                margin-top:18px;
            ">

                <h4 style="margin-top:0;">
                    Enlaces para las Clases y Tutorías
                </h4>
        `;

        if (clase) {

            html += `
                <div style="margin:12px 0;">
                    <strong>${saltos(clase.titulo)}:</strong><br>
            `;

            if (estaActivo(clase) && clase.enlace) {

                html += `
                    <a href="${clase.enlace}"
                       target="_blank"
                       rel="noopener noreferrer"
                       style="
                           display:inline-block;
                           margin-top:7px;
                           padding:8px 14px;
                           background:#0d6efd;
                           color:white;
                           text-decoration:none;
                           border-radius:5px;
                       ">
                        ${saltos(clase.textoBoton || "Ingresar a clase")}
                    </a>
                `;

            } else {

                html += `
                    <span style="
                        display:inline-block;
                        margin-top:7px;
                        padding:8px 14px;
                        background:#e9ecef;
                        color:#6c757d;
                        border-radius:5px;
                    ">
                        🔒 Clase no disponible
                    </span>
                `;
            }

            html += "</div>";
        }

        if (tutoria) {

            html += `
                <div style="margin:12px 0;">
                    <strong>${saltos(tutoria.titulo)}:</strong><br>
            `;

            if (estaActivo(tutoria) && tutoria.enlace) {

                html += `
                    <a href="${tutoria.enlace}"
                       target="_blank"
                       rel="noopener noreferrer"
                       style="
                           display:inline-block;
                           margin-top:7px;
                           padding:8px 14px;
                           background:#198754;
                           color:white;
                           text-decoration:none;
                           border-radius:5px;
                       ">
                        ${saltos(tutoria.textoBoton || "Ingresar a tutoría")}
                    </a>
                `;

            } else {

                html += `
                    <span style="
                        display:inline-block;
                        margin-top:7px;
                        padding:8px 14px;
                        background:#e9ecef;
                        color:#6c757d;
                        border-radius:5px;
                    ">
                        🔒 Tutoría no disponible
                    </span>
                `;
            }

            html += "</div>";
        }

        html += `
                <div style="
                    margin-top:12px;
                    font-size:14px;
                    color:#555;
                ">
                    Por favor, manténganse atentos a los horarios
                    y utilicen los enlaces oficiales para su ingreso.
                </div>

            </div>
        `;

        panel.innerHTML = html;
    };

    scriptDatos.onerror = function () {

        panel.innerHTML =
            '<div style="padding:15px;border:2px solid #dc3545;">' +
            '❌ No fue posible cargar la información del aula.' +
            '</div>';
    };

    document.head.appendChild(scriptDatos);

})();
