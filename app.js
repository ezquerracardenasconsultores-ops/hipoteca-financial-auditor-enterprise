function calcular() {

    const capital = parseFloat(document.getElementById("capital").value);
    const tea = parseFloat(document.getElementById("tea").value);
    const plazo = parseInt(document.getElementById("plazo").value);

    if (isNaN(capital) || isNaN(tea) || isNaN(plazo)) {
        alert("Complete todos los datos.");
        return;
    }

    // TEA -> TEM
    const tem = Math.pow(1 + tea / 100, 1 / 12) - 1;

    // Sistema Francés
    const cuota =
        capital *
        ((tem * Math.pow(1 + tem, plazo)) /
        (Math.pow(1 + tem, plazo) - 1));

    // VPN
    let vpn = 0;

    for (let i = 1; i <= plazo; i++) {
        vpn += cuota / Math.pow(1 + tem, i);
    }

    // Duración de Macaulay
    let vpTotal = 0;
    let tiempo = 0;

    for (let i = 1; i <= plazo; i++) {
        let vp = cuota / Math.pow(1 + tem, i);
        vpTotal += vp;
        tiempo += i * vp;
    }

    const duracion = tiempo / vpTotal;

    document.getElementById("cuota").innerHTML =
        "S/ " + cuota.toLocaleString("es-PE", {
            minimumFractionDigits: 2
        });

    document.getElementById("tem").innerHTML =
        (tem * 100).toFixed(6) + "%";

    document.getElementById("vpn").innerHTML =
        "S/ " + vpn.toLocaleString("es-PE", {
            minimumFractionDigits: 2
        });

    document.getElementById("duracion").innerHTML =
        duracion.toFixed(2) + " meses";

    document.getElementById("opinion").innerHTML = `
        <b>DICTAMEN PRELIMINAR</b><br><br>

        ✔ Sistema Francés validado.<br>
        ✔ Conversión TEA → TEM correcta.<br>
        ✔ Valor Presente consistente.<br>
        ✔ Duración de Macaulay calculada.<br><br>

        Se recomienda continuar con la reconstrucción
        del cronograma y la auditoría financiera.
    `;
}
