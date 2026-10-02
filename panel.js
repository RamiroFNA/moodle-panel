(function () {

    const panel = document.getElementById("panel-moodle");

    if (!panel) {
        return;
    }

    const nrc = panel.dataset.nrc;

    panel.innerHTML = `
        <div style="
            padding:15px;
            border:2px solid #198754;
            border-radius:8px;
            margin:10px 0;
        ">
            <strong>✅ PANEL CENTRAL CONECTADO</strong><br>
            NRC detectado: ${nrc}
        </div>
    `;

})();
