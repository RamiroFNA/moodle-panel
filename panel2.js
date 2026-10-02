(function () {

    const panel = document.getElementById("panel-moodle");

    if (!panel) return;

    const nrc = panel.dataset.nrc;

    panel.innerHTML =
        "⏳ Cargando configuración institucional...";

    const scriptDatos = document.createElement("script");

    scriptDatos.src =
        "https://script.google.com/a/macros/espe.edu.ec/s/AKfycbxJJPjSRxTT3JqMdi32wTZvQdDBU8xQnvMAPmgAqr4UfYC8X5OrDduNH0b2DaeiDISr/exec";

    scriptDatos.onload = function () {

        if (!window.CONFIG_MOODLE) {
            panel.innerHTML =
                "❌ Se cargó Apps Script, pero no llegó la configuración.";
            return;
        }

        const clase = window.CONFIG_MOODLE.find(item =>
            item.nrc === "TODOS" &&
            item.elemento === "CLASE"
        );

        if (!clase) {
            panel.innerHTML =
                "⚠️ Configuración recibida, pero no se encontró CLASE.";
            return;
        }

        panel.innerHTML =
            "✅ CONFIGURACIÓN RECIBIDA" +
            "<br><br>" +
            "<strong>NRC del aula:</strong> " + nrc +
            "<br>" +
            "<strong>Título:</strong> " + clase.titulo +
            "<br>" +
            "<strong>Contenido:</strong> " + clase.contenido;
    };

    scriptDatos.onerror = function () {
        panel.innerHTML =
            "❌ No se pudo cargar la configuración institucional.";
    };

    document.head.appendChild(scriptDatos);

})();
