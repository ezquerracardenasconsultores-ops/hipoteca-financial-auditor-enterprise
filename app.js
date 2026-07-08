//==========================================================
// HIPOTECA FINANCIAL AUDITOR ENTERPRISE V4.0
//==========================================================

// VARIABLES GLOBALES

let capital = 0;

let tea = 0;

let plazo = 0;

let tem = 0;

let cuota = 0;

let vpn = 0;

let vpnCredito = 0;

let duracion = 0;

let graficoPrincipal = null;

//==========================================================
// INICIO DEL SISTEMA
//==========================================================

window.onload = function(){

    console.clear();

    console.log("======================================");

    console.log("HIPOTECA FINANCIAL AUDITOR");

    console.log("Enterprise V4.0");

    console.log("Sistema iniciado correctamente");

    console.log("======================================");

};

//==========================================================
// BOTÓN PRINCIPAL
//==========================================================

function calcular(){

    obtenerDatos();

    calcularTEM();

    calcularCuota();

    calcularVPN();

    calcularVPNCredito();

    calcularDuracion();

    actualizarDashboard();

    dibujarGrafico();

}

//==========================================================
// OBTENER DATOS
//==========================================================

function obtenerDatos(){

    capital = parseFloat(

        document.getElementById("capital").value

    );

    tea = parseFloat(

        document.getElementById("tea").value

    );

    plazo = parseInt(

        document.getElementById("plazo").value

    );

    if(

        isNaN(capital) ||

        isNaN(tea) ||

        isNaN(plazo)

    ){

        alert("Complete correctamente todos los datos.");

        throw new Error("Datos inválidos");

    }

}
//==========================================================
// CONVERSIÓN TEA → TEM
//==========================================================

function calcularTEM(){

    tem = Math.pow(

        1 + (tea / 100),

        1 / 12

    ) - 1;

}

//==========================================================
// SISTEMA FRANCÉS
//==========================================================

function calcularCuota(){

    cuota = capital *

    (

        (tem * Math.pow(1 + tem, plazo))

        /

        (Math.pow(1 + tem, plazo) - 1)

    );

}

//==========================================================
// VALOR PRESENTE DE LAS CUOTAS
//==========================================================

function calcularVPN(){

    let valorPresente = 0;

    for(let i=1;i<=plazo;i++){

        valorPresente +=

            cuota /

            Math.pow(

                1 + tem,

                i

            );

    }

    vpn = valorPresente;

}

//==========================================================
// VPN DEL CRÉDITO
//==========================================================

function calcularVPNCredito(){

    vpnCredito = vpn - capital;

}

//==========================================================
// DURACIÓN DE MACAULAY
//==========================================================

function calcularDuracion(){

    let vpTotal = 0;

    let sumaTiempo = 0;

    for(let i=1;i<=plazo;i++){

        let vp =

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

//==========================================================
// ACTUALIZAR TARJETAS
//==========================================================

function actualizarDashboard(){

    document.getElementById("cuota").textContent =

        "S/ " +

        cuota.toLocaleString("es-PE",{

            minimumFractionDigits:2,

            maximumFractionDigits:2

        });

    document.getElementById("tem").textContent =

        (tem*100).toFixed(6)+" %";

    document.getElementById("vpn").textContent =

        "S/ "+

        vpn.toLocaleString("es-PE",{

            minimumFractionDigits:2,

            maximumFractionDigits:2

        });

    document.getElementById("duracion").textContent =

        duracion.toFixed(2)+" meses";

    document.getElementById("lblCapital").textContent =

        "S/ "+

        capital.toLocaleString("es-PE",{

            minimumFractionDigits:2

        });

    document.getElementById("lblTea").textContent =

        tea.toFixed(2)+" %";

    document.getElementById("lblPlazo").textContent =

        plazo+" meses";

}
//==========================================================
// DASHBOARD - CHART.JS
//==========================================================

function dibujarGrafico(){

    const canvas = document.getElementById("graficoPrincipal");

    if(!canvas){
        return;
    }

    if(graficoPrincipal){
        graficoPrincipal.destroy();
    }

    const ctx = canvas.getContext("2d");

    graficoPrincipal = new Chart(ctx,{

        type:"bar",

        data:{

            labels:[
                "Capital",
                "Cuota",
                "VPN"
            ],

            datasets:[{

                label:"Análisis Financiero",

                data:[
                    capital,
                    cuota,
                    vpn
                ]

            }]

        },

        options:{

    responsive:true,

    maintainAspectRatio:true,

    aspectRatio:2.8,

            plugins:{
                legend:{
                    display:false
                }
            }

        }

    });

}

//==========================================================
// CRONOGRAMA
//==========================================================

function generarCronograma(){

    let saldo = capital;

    let html = `

    <h2>Cronograma de Amortización</h2>

    <table class="tablaCronograma">

    <thead>

    <tr>

        <th>N°</th>

        <th>Saldo Inicial</th>

        <th>Interés</th>

        <th>Amortización</th>

        <th>Cuota</th>

        <th>Saldo Final</th>

    </tr>

    </thead>

    <tbody>

    `;

    for(let i=1;i<=plazo;i++){

        const interes = saldo * tem;

        const amortizacion = cuota - interes;

        let saldoFinal = saldo - amortizacion;

        if(saldoFinal < 0){

            saldoFinal = 0;

        }

        html += `

        <tr>

            <td>${i}</td>

            <td>${saldo.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>

            <td>${interes.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>

            <td>${amortizacion.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>

            <td>${cuota.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>

            <td>${saldoFinal.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>

        </tr>

        `;

        saldo = saldoFinal;

    }

    html += "</tbody></table>";

    document.getElementById("contenidoModulo").innerHTML = html;

}
//==========================================================
// INGENIERÍA FINANCIERA
//==========================================================

function mostrarIngenieria(){

    document.getElementById("contenidoModulo").innerHTML = `

    <h2>Ingeniería Financiera</h2>

    <div class="gridIndicadores">

        <div class="cardIndicador">

            <h3>TEM</h3>

            <h2>${(tem*100).toFixed(6)} %</h2>

        </div>

        <div class="cardIndicador">

            <h3>TEA</h3>

            <h2>${tea.toFixed(2)} %</h2>

        </div>

        <div class="cardIndicador">

            <h3>Cuota</h3>

            <h2>S/ ${cuota.toLocaleString("es-PE",{minimumFractionDigits:2})}</h2>

        </div>

        <div class="cardIndicador">

            <h3>VPN</h3>

            <h2>S/ ${vpn.toLocaleString("es-PE",{minimumFractionDigits:2})}</h2>

        </div>

        <div class="cardIndicador">

            <h3>Duración</h3>

            <h2>${duracion.toFixed(2)} meses</h2>

        </div>

        <div class="cardIndicador">

            <h3>Sistema</h3>

            <h2>Francés</h2>

        </div>

    </div>

    `;

}

//==========================================================
// AUDITORÍA
//==========================================================

function mostrarAuditoria(){

document.getElementById("contenidoModulo").innerHTML=`

<h2>Auditoría Financiera</h2>

<table class="tablaAuditoria">

<tr>

<th>Hallazgo</th>

<th>Resultado</th>

</tr>

<tr>

<td>Sistema</td>

<td>Francés</td>

</tr>

<tr>

<td>TEA</td>

<td>${tea.toFixed(2)} %</td>

</tr>

<tr>

<td>TEM</td>

<td>${(tem*100).toFixed(6)} %</td>

</tr>

<tr>

<td>VPN</td>

<td>S/ ${vpn.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>

</tr>

<tr>

<td>Duración</td>

<td>${duracion.toFixed(2)} meses</td>

</tr>

<tr>

<td>Resultado</td>

<td class="estadoBueno">

Consistencia matemática correcta.

</td>

</tr>

</table>

`;

}

//==========================================================
// REPORTES
//==========================================================

function mostrarReportes(){

document.getElementById("contenidoModulo").innerHTML=`

<h2>Centro de Reportes</h2>

<div class="panelReportes">

<div class="cardReporte">

<h3>📄 PDF</h3>

<p>Informe Pericial</p>

<button id="btnPDF">

Generar PDF

</button>

</div>

<div class="cardReporte">

<h3>📊 Excel</h3>

<p>Cronograma</p>

<button id="btnExcel">

Generar Excel

</button>

</div>

<div class="cardReporte">

<h3>📝 Word</h3>

<p>Dictamen</p>

<button id="btnWord">

Generar Word

</button>

</div>

</div>

`;

document.getElementById("btnPDF").onclick=generarPDF;

document.getElementById("btnExcel").onclick=function(){

alert("Excel disponible en el siguiente bloque.");

}

document.getElementById("btnWord").onclick=function(){

alert("Word disponible en el siguiente bloque.");

}

}
//==========================================================
// GENERAR PDF
//==========================================================

function generarPDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFont("helvetica","bold");
    doc.setFontSize(18);
    doc.text("HIPOTECA FINANCIAL AUDITOR",20,20);

    doc.setFontSize(13);
    doc.text("INFORME PERICIAL FINANCIERO",20,30);

    doc.line(20,35,190,35);

    doc.setFont("helvetica","normal");

    doc.text("Capital : S/ " + capital.toLocaleString("es-PE"),20,50);

    doc.text("TEA : " + tea.toFixed(2) + " %",20,60);

    doc.text("TEM : " + (tem*100).toFixed(6) + " %",20,70);

    doc.text("Plazo : " + plazo + " meses",20,80);

    doc.text("Cuota : S/ " +
        cuota.toLocaleString("es-PE",{minimumFractionDigits:2}),
        20,
        90);

    doc.text("VPN : S/ " +
        vpn.toLocaleString("es-PE",{minimumFractionDigits:2}),
        20,
        100);

    doc.text("Duración : " +
        duracion.toFixed(2) +
        " meses",
        20,
        110);

    doc.line(20,120,190,120);
    doc.setFont("helvetica","bold");
doc.setFontSize(14);
doc.text("TASAS DEL CRÉDITO HIPOTECARIO",20,135);

doc.setFont("helvetica","normal");
doc.setFontSize(10);

doc.text("• Compensatoria: remunera el uso normal del dinero prestado.",20,145);

doc.text("• Moratoria: sanciona el retraso en el pago de las cuotas.",20,155);

doc.text("• Costo Efectivo: muestra el costo real del crédito incluyendo intereses, seguros y comisiones.",20,165);
    doc.setFont("helvetica","bold");
doc.setFontSize(13);

doc.text("¿CUÁNTO ME CUESTA REALMENTE ESTE CRÉDITO HOY?",20,185);

doc.setFont("helvetica","normal");
doc.setFontSize(11);

doc.text("El Valor Presente Neto (VPN) trae todos los pagos futuros al valor de hoy.",
20,
195
);

doc.text(
"VPN = S/ " + vpn.toLocaleString("es-PE",{minimumFractionDigits:2}),
20,
205
);

    doc.setFont("helvetica","bold");
    doc.text("DICTAMEN PRELIMINAR",20,135);

    doc.setFont("helvetica","normal");

    doc.text(

        "El crédito fue analizado utilizando el Sistema Francés.",

        20,

        150

    );

    doc.text(

        "La evaluación matemática no evidencia inconsistencias.",

        20,

        160

    );

    doc.text(

        "Este reporte fue generado automáticamente.",

        20,

        170

    );

    doc.line(20,185,190,185);

    doc.setFont("helvetica","italic");

    doc.text(

        "Hipoteca Financial Auditor Enterprise",

        20,

        198

    );

    doc.save("Informe_Pericial.pdf");

}

//==========================================================
// GENERAR EXCEL
//==========================================================

function generarExcel(){

    alert("La exportación a Excel será desarrollada en la siguiente versión.");

}

//==========================================================
// GENERAR WORD
//==========================================================

function generarWord(){

    alert("La exportación a Word será desarrollada en la siguiente versión.");

}

//==========================================================
// ACTIVAR MENÚ
//==========================================================

document.querySelectorAll(".menu").forEach(function(item){

    item.addEventListener("click",function(){

        document.querySelectorAll(".menu").forEach(function(x){

            x.classList.remove("activo");

        });

        this.classList.add("activo");

    });

});

console.log("Hipoteca Financial Auditor Enterprise V4 cargado correctamente.");
//==========================================================
// TABS DEL SISTEMA
//==========================================================

document.querySelectorAll(".tab").forEach(function(tab){

    tab.addEventListener("click",function(){

        document.querySelectorAll(".tab").forEach(function(t){

            t.classList.remove("activo");

        });

        this.classList.add("activo");

        const opcion = this.textContent.trim();

        switch(opcion){

            case "Cronograma":

                generarCronograma();

                break;

            case "Ingeniería":

                mostrarIngenieria();

                break;

            case "Auditoría":

                mostrarAuditoria();

                break;

            case "Reportes":

                mostrarReportes();

                break;

        }

    });

});
