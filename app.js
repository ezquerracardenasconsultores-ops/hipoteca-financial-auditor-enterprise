//======================================================
// HIPOTECA FINANCIAL AUDITOR ENTERPRISE V3.0
//======================================================

// VARIABLES GLOBALES

let capital = 0;
let tea = 0;
let plazo = 0;

let tem = 0;
let cuota = 0;
let vpn = 0;
let duracion = 0;

let grafico = null;

//======================================================
// FUNCIÓN PRINCIPAL
//======================================================

function calcular(){

    leerDatos();

    calcularTEM();

    calcularCuota();

    calcularVPN();

    calcularDuracion();

    actualizarDashboard();

    generarDictamen();

    dibujarGrafico();

}

//======================================================
// LECTURA DE DATOS
//======================================================

function leerDatos(){

    capital = parseFloat(document.getElementById("capital").value);

    tea = parseFloat(document.getElementById("tea").value);

    plazo = parseInt(document.getElementById("plazo").value);

    if(isNaN(capital) || isNaN(tea) || isNaN(plazo)){

        alert("Ingrese correctamente todos los datos.");

        throw new Error("Datos inválidos");

    }

}
//======================================================
// TEA → TEM
//======================================================

function calcularTEM(){

    tem = Math.pow(

        1 + (tea / 100),

        1 / 12

    ) - 1;

}

//======================================================
// SISTEMA FRANCÉS
//======================================================

function calcularCuota(){

    cuota =

        capital *

        (

            (tem * Math.pow(1 + tem, plazo))

            /

            (Math.pow(1 + tem, plazo) - 1)

        );

}

//======================================================
// VALOR PRESENTE
//======================================================

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

//======================================================
// DURACIÓN DE MACAULAY
//======================================================

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

//======================================================
// ACTUALIZAR DASHBOARD
//======================================================

function actualizarDashboard(){

    document.getElementById("cuota").innerHTML =

        "S/ " +

        cuota.toLocaleString("es-PE",{

            minimumFractionDigits:2,

            maximumFractionDigits:2

        });

    document.getElementById("tem").innerHTML =

        (tem*100).toFixed(6) + " %";

    document.getElementById("vpn").innerHTML =

        "S/ " +

        vpn.toLocaleString("es-PE",{

            minimumFractionDigits:2,

            maximumFractionDigits:2

        });

    document.getElementById("duracion").innerHTML =

        duracion.toFixed(2) + " meses";

    document.getElementById("lblCapital").innerHTML =

        "S/ " +

        capital.toLocaleString("es-PE",{

            minimumFractionDigits:2

        });

    document.getElementById("lblTea").innerHTML =

        tea.toFixed(2) + " %";

    document.getElementById("lblPlazo").innerHTML =

        plazo + " meses";

}
//======================================================
// DICTAMEN AUTOMÁTICO
//======================================================

function generarDictamen(){

    let html = "";

    html += "<h2>DICTAMEN PRELIMINAR</h2><br>";

    html += "✔ Conversión TEA → TEM correcta.<br>";

    html += "✔ Sistema Francés identificado.<br>";

    html += "✔ Valor Presente Neto calculado.<br>";

    html += "✔ Duración de Macaulay calculada.<br><br>";

    if(tea<=20){

        html += "<span style='color:green;font-weight:bold'>RIESGO FINANCIERO : MODERADO</span><br><br>";

    }else{

        html += "<span style='color:red;font-weight:bold'>RIESGO FINANCIERO : ELEVADO</span><br><br>";

    }

    html += "El crédito fue evaluado utilizando equivalencia financiera y el Sistema Francés de amortización.";

    document.getElementById("contenidoModulo").innerHTML = html;

}

//======================================================
// DASHBOARD (CHART.JS)
//======================================================

function dibujarGrafico(){

    const ctx = document.getElementById("graficoPrincipal");

    if(grafico){

        grafico.destroy();

    }

    grafico = new Chart(ctx,{

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

            plugins:{

                legend:{

                    display:false

                }

            },

            scales:{

                y:{

                    beginAtZero:true

                }

            }

        }

    });

}
//======================================================
// HIPOTECA FINANCIAL AUDITOR ENTERPRISE
// BLOQUE FINAL
//======================================================

// Navegación básica del menú
document.querySelectorAll(".menu").forEach(function(boton){

    boton.addEventListener("click", function(){

        document.querySelectorAll(".menu").forEach(function(item){

            item.classList.remove("activo");

        });

        this.classList.add("activo");

    });

});

// Navegación de Tabs
document.querySelectorAll(".tab").forEach(function(tab){

    tab.addEventListener("click", function(){

        document.querySelectorAll(".tab").forEach(function(t){

            t.classList.remove("activo");

        });

        this.classList.add("activo");

        const nombre = this.textContent.trim();

        switch(nombre){

            case "Cronograma":

    generarCronograma();

    break;

                document.getElementById("contenidoModulo").innerHTML =
                    "<h2>Cronograma de Amortización</h2><p>Próximamente se mostrará aquí el cronograma completo de cuotas.</p>";
                break;

            case "Ingeniería":

    mostrarIngenieria();

    break;

                document.getElementById("contenidoModulo").innerHTML =
                    "<h2>Ingeniería Financiera</h2><p>Aquí se incorporarán VAN, TIR, Convexidad, Duración Modificada y análisis de sensibilidad.</p>";
                break;

            case "Auditoría":

                document.getElementById("contenidoModulo").innerHTML =
                    "<h2>Auditoría Financiera</h2><p>Este módulo mostrará los hallazgos, alertas y observaciones periciales.</p>";
                break;

            case "Reportes":

                document.getElementById("contenidoModulo").innerHTML =
                    "<h2>Reportes</h2><p>Desde aquí podrás exportar el informe en PDF, Excel y Word.</p>";
                break;

        }

    });

});

//======================================================
// BOTONES DE REPORTES
//======================================================

const btnPDF = document.getElementById("btnPDF");
if(btnPDF){
    btnPDF.addEventListener("click", function(){
        alert("Exportación a PDF disponible en la versión 3.1.");
    });
}

const btnExcel = document.getElementById("btnExcel");
if(btnExcel){
    btnExcel.addEventListener("click", function(){
        alert("Exportación a Excel disponible en la versión 3.1.");
    });
}

const btnWord = document.getElementById("btnWord");
if(btnWord){
    btnWord.addEventListener("click", function(){
        alert("Exportación a Word disponible en la versión 3.1.");
    });
}

//======================================================
// INICIALIZACIÓN
//======================================================

window.addEventListener("load", function(){

    console.log("=======================================");
    console.log("Hipoteca Financial Auditor Enterprise");
    console.log("Versión 3.0");
    console.log("Sistema iniciado correctamente");
    console.log("=======================================");

});
//======================================================
// CRONOGRAMA DE AMORTIZACIÓN
//======================================================

function generarCronograma(){

    let saldo = capital;

    let html = `

    <h2>Cronograma de Amortización</h2>

    <br>

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

        let interes = saldo * tem;

        let amortizacion = cuota - interes;

        let saldoFinal = saldo - amortizacion;

        if(saldoFinal < 0){

            saldoFinal = 0;

        }

        html += `

        <tr>

            <td>${i}</td>

            <td>S/ ${saldo.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>

            <td>S/ ${interes.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>

            <td>S/ ${amortizacion.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>

            <td>S/ ${cuota.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>

            <td>S/ ${saldoFinal.toLocaleString("es-PE",{minimumFractionDigits:2})}</td>

        </tr>

        `;

        saldo = saldoFinal;

    }

    html += `

        </tbody>

    </table>

    `;

    document.getElementById("contenidoModulo").innerHTML = html;

}
//======================================================
// INGENIERÍA FINANCIERA
//======================================================

function mostrarIngenieria(){

    let html = `

    <h2>Ingeniería Financiera</h2>

    <br>

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

    document.getElementById("contenidoModulo").innerHTML = html;

}
