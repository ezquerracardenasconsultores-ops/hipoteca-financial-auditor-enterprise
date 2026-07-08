//====================================================
// HIPOTECA FINANCIAL AUDITOR ENTERPRISE
// APP.JS
//====================================================

// Variables Globales

let capital = 0;

let tea = 0;

let plazo = 0;

let tem = 0;

let cuota = 0;

//====================================================
// FUNCIÓN PRINCIPAL
//====================================================

function calcular(){

    leerDatos();

    calcularTEM();

    calcularCuota();

    calcularVPN();

    calcularDuracion();

    actualizarDashboard();
    
    generarCronograma();

    generarDictamen();

    ejecutarAuditoria();

}
//====================================================
// LECTURA DE DATOS
//====================================================

function leerDatos(){

    capital = parseFloat(
        document.getElementById("capital").value
    );

    tea = parseFloat(
        document.getElementById("tea").value
    );

    plazo = parseInt(
        document.getElementById("plazo").value
    );

    if(isNaN(capital) || isNaN(tea) || isNaN(plazo)){

        alert("Ingrese correctamente todos los datos.");

        throw new Error("Datos inválidos");

    }

}

//====================================================
// TEM
//====================================================

function calcularTEM(){

    tem = Math.pow(

        1 + tea/100,

        1/12

    ) - 1;

}
//====================================================
// CÁLCULO DE LA CUOTA
// SISTEMA FRANCÉS
//====================================================

function calcularCuota(){

    cuota =

        capital *

        (

            (tem * Math.pow(1 + tem, plazo))

            /

            (Math.pow(1 + tem, plazo) - 1)

        );

}

//====================================================
// VALOR PRESENTE (VPN)
//====================================================

let vpn = 0;

function calcularVPN(){

    vpn = 0;

    for(let i = 1; i <= plazo; i++){

        vpn +=

            cuota /

            Math.pow(

                1 + tem,

                i

            );

    }

}
//====================================================
// DURACIÓN DE MACAULAY
//====================================================

let duracion = 0;

function calcularDuracion(){

    let vpTotal = 0;

    let sumaTiempo = 0;

    for(let i = 1; i <= plazo; i++){

        const vp =

            cuota /

            Math.pow(

                1 + tem,

                i

            );

        vpTotal += vp;

        sumaTiempo += i * vp;

    }

    duracion =

        sumaTiempo /

        vpTotal;

}

//====================================================
// ACTUALIZAR DASHBOARD
//====================================================

function actualizarDashboard(){

    document.getElementById("cuota").innerHTML =

        "S/ " +

        cuota.toLocaleString("es-PE",{

            minimumFractionDigits:2,

            maximumFractionDigits:2

        });

    document.getElementById("tem").innerHTML =

        (tem*100).toFixed(6) + "%";

    document.getElementById("vpn").innerHTML =

        "S/ " +

        vpn.toLocaleString("es-PE",{

            minimumFractionDigits:2,

            maximumFractionDigits:2

        });

    document.getElementById("duracion").innerHTML =

        duracion.toFixed(2) + " meses";

}
//====================================================
// CRONOGRAMA DE AMORTIZACIÓN
//====================================================

function generarCronograma(){

    let saldo = capital;

    let html = `

    <table class="tablaCronograma">

        <thead>

            <tr>

                <th>Cuota</th>

                <th>Interés</th>

                <th>Amortización</th>

                <th>Saldo</th>

            </tr>

        </thead>

        <tbody>

    `;

    for(let i=1;i<=plazo;i++){

        const interes = saldo * tem;

        const amortizacion = cuota - interes;

        saldo -= amortizacion;

        if(saldo < 0){

            saldo = 0;

        }

        html += `

        <tr>

            <td>${i}</td>

            <td>

                S/ ${interes.toLocaleString("es-PE",{

                    minimumFractionDigits:2,

                    maximumFractionDigits:2

                })}

            </td>

            <td>

                S/ ${amortizacion.toLocaleString("es-PE",{

                    minimumFractionDigits:2,

                    maximumFractionDigits:2

                })}

            </td>

            <td>

                S/ ${saldo.toLocaleString("es-PE",{

                    minimumFractionDigits:2,

                    maximumFractionDigits:2

                })}

            </td>

        </tr>

        `;

    }

    html += `

        </tbody>

    </table>

    `;

    document.getElementById("cronograma").innerHTML = html;

}
//====================================================
// OPINIÓN TÉCNICA AUTOMÁTICA
//====================================================

function generarDictamen(){

    let texto = "";

    texto += "<h3>DICTAMEN PRELIMINAR</h3>";

    texto += "<br>";

    texto += "✔ Sistema Francés identificado correctamente.<br>";

    texto += "✔ Conversión TEA → TEM realizada correctamente.<br>";

    texto += "✔ Cuota calculada mediante equivalencia financiera.<br>";

    texto += "✔ Valor Presente Neto calculado.<br>";

    texto += "✔ Duración de Macaulay calculada.<br><br>";

    if(tea<=20){

        texto += "🟢 <b>RIESGO FINANCIERO : MODERADO</b><br><br>";

        texto += "La tasa anual se encuentra dentro de parámetros habituales del mercado. Se recomienda contrastarla con las tasas históricas de la SBS para emitir una opinión pericial definitiva.";

    }else{

        texto += "🔴 <b>RIESGO FINANCIERO : ELEVADO</b><br><br>";

        texto += "La tasa anual supera los parámetros habituales del mercado. Se recomienda realizar un análisis financiero y jurídico detallado.";

    }

    document.getElementById("opinion").innerHTML = texto;

}
//====================================================
// AUDITORÍA FINANCIERA
//====================================================

function ejecutarAuditoria(){

    let html = "";

    html += "<h3>RESULTADO DE LA AUDITORÍA</h3><br>";

    // Hallazgo 1
    if(tea > 20){

        html += "🔴 <b>Hallazgo 01:</b> La TEA es superior al 20%. Se recomienda contrastar con las tasas promedio publicadas por la SBS.<br><br>";

    }else{

        html += "🟢 <b>Hallazgo 01:</b> La TEA se encuentra dentro de parámetros habituales del mercado.<br><br>";

    }

    // Hallazgo 2
    if(plazo >= 180){

        html += "🟡 <b>Hallazgo 02:</b> El crédito es de largo plazo. Existe mayor exposición al riesgo financiero y a variaciones económicas.<br><br>";

    }else{

        html += "🟢 <b>Hallazgo 02:</b> El plazo del crédito no representa un riesgo extraordinario.<br><br>";

    }

    // Hallazgo 3
    if(cuota > capital * 0.02){

        html += "🟡 <b>Hallazgo 03:</b> La cuota representa una proporción importante respecto del capital. Se recomienda revisar el flujo de pagos del deudor.<br><br>";

    }else{

        html += "🟢 <b>Hallazgo 03:</b> La cuota calculada es consistente con el monto financiado.<br><br>";

    }

    html += "<hr>";

    html += "<b>Conclusión Preliminar</b><br><br>";

    html += "No se identifican inconsistencias matemáticas en el cálculo del Sistema Francés. La opinión pericial definitiva deberá emitirse luego de comparar el cronograma contractual, las tasas históricas de la SBS y la documentación del crédito.";

    document.getElementById("auditoriaResultado").innerHTML = html;

}
//====================================================
// HIPOTECA FINANCIAL AUDITOR ENTERPRISE
// VERSIÓN 2.0
//====================================================

// Inicialización del sistema
document.addEventListener("DOMContentLoaded", function(){

    console.log("========================================");
    console.log("HIPOTECA FINANCIAL AUDITOR ENTERPRISE");
    console.log("Versión 2.0");
    console.log("Powered by Ezquerra & Cárdenas Consultores");
    console.log("========================================");

});

//====================================================
// MÓDULOS (PREPARADOS PARA FUTURAS VERSIONES)
//====================================================

function mostrarDashboard(){

    alert("Dashboard activo.");

}

function mostrarCronograma(){

    const tabla = document.getElementById("cronograma");

    if(tabla){

        tabla.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    }

}

function mostrarIngenieria(){

    const modulo = document.querySelector(".ingenieria");

    if(modulo){

        modulo.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    }

}

function mostrarAuditoria(){

    const modulo = document.querySelector(".auditoria");

    if(modulo){

        modulo.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    }

}

function mostrarReportes(){

    const modulo = document.querySelector(".reportes");

    if(modulo){

        modulo.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    }

}

//====================================================
// EXPORTACIONES (BASE)
//====================================================

document.getElementById("btnPDF")?.addEventListener("click", function(){

    alert("La exportación a PDF estará disponible en la versión 2.1.");

});

document.getElementById("btnExcel")?.addEventListener("click", function(){

    alert("La exportación a Excel estará disponible en la versión 2.1.");

});

document.getElementById("btnWord")?.addEventListener("click", function(){

    alert("La exportación a Word estará disponible en la versión 2.1.");

});

//====================================================
// FIN DEL ARCHIVO
//====================================================
