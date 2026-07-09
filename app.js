/*==========================================================
 HIPOTECA FINANCIAL AUDITOR ENTERPRISE
 Versión 5.0
 Archivo : app.js
==========================================================*/

"use strict";

/*==========================================================
ESTADO GLOBAL
==========================================================*/

const App={

    version:"5.0.0",

    modulo:"dashboard",

    chart:null,

    credito:{

        capital:0,

        tea:0,

        plazo:0,

        tem:0,

        cuota:0,

        vpn:0,

        duracion:0,

        cronograma:[]

    }

};

/*==========================================================
INICIO
==========================================================*/

window.addEventListener(

    "load",

    iniciarSistema

);

/*==========================================================
INICIALIZAR
==========================================================*/

function iniciarSistema(){

    construirKPIs();

    construirDashboard();

    activarMenu();

}

/*==========================================================
MENU
==========================================================*/

function activarMenu(){

    const botones=

    document.querySelectorAll(".menu");

    botones.forEach(function(boton){

        boton.addEventListener(

            "click",

            function(){

                botones.forEach(function(x){

                    x.classList.remove("activo");

                });

                this.classList.add("activo");

                App.modulo=

                this.dataset.modulo;

                navegar();

            }

        );

    });

}

/*==========================================================
NAVEGACIÓN
==========================================================*/

function navegar(){

    switch(App.modulo){

        case "dashboard":

            construirDashboard();

            break;

        case "cronograma":

            mostrarCronograma();

            break;

        case "ingenieria":

            mostrarIngenieria();

            break;

        case "auditoria":

            mostrarAuditoria();

            break;

        case "reportes":

            mostrarReportes();

            break;

        default:

            construirDashboard();

    }

}

/*==========================================================
KPIs
==========================================================*/

function construirKPIs(){

    document.getElementById("kpis").innerHTML=`

        <div class="kpi">

            <h3>

                Capital

            </h3>

            <h2 id="kCapital">

                S/ 0.00

            </h2>

        </div>

        <div class="kpi">

            <h3>

                TEA

            </h3>

            <h2 id="kTea">

                0 %

            </h2>

        </div>

        <div class="kpi">

            <h3>

                Cuota

            </h3>

            <h2 id="kCuota">

                S/ 0.00

            </h2>

        </div>

        <div class="kpi">

            <h3>

                VPN

            </h3>

            <h2 id="kVPN">

                S/ 0.00

            </h2>

        </div>

    `;

}

/*==========================================================
DASHBOARD
==========================================================*/

function construirDashboard(){

    document.getElementById("principal").innerHTML=`

        <div class="card">

            <h2>

                Datos del Crédito

            </h2>

            <label>

                Capital

            </label>

            <input

                id="capital"

                type="number"

                value="1343777.98">

            <label>

                TEA (%)

            </label>

            <input

                id="tea"

                type="number"

                value="14.15">

            <label>

                Plazo (Meses)

            </label>

            <input

                id="plazo"

                type="number"

                value="180">

            <button

                id="btnAnalizar"

                class="btn">

                Analizar Crédito

            </button>

        </div>

        <div class="card">

            <canvas

                id="graficoPrincipal">

            </canvas>

        </div>

        <div

            id="resultado">

        </div>

    `;

    document

        .getElementById("btnAnalizar")

        .addEventListener(

            "click",

            calcularCredito

        );

}
/*==========================================================
MOTOR FINANCIERO
==========================================================*/

function calcularCredito(){

    App.credito.capital = Number(

        document.getElementById("capital").value

    );

    App.credito.tea = Number(

        document.getElementById("tea").value

    );

    App.credito.plazo = Number(

        document.getElementById("plazo").value

    );

    if(

        App.credito.capital<=0 ||

        App.credito.tea<=0 ||

        App.credito.plazo<=0

    ){

        alert(

            "Ingrese correctamente los datos del crédito."

        );

        return;

    }

    calcularTEM();

    calcularCuota();

    calcularVPN();

    calcularDuracion();

    actualizarKPIs();

    dibujarGrafico();

    mostrarResumen();

}

/*==========================================================
TEM
==========================================================*/

function calcularTEM(){

    App.credito.tem=

    Math.pow(

        1+

        App.credito.tea/100,

        1/12

    )-1;

}

/*==========================================================
CUOTA SISTEMA FRANCÉS
==========================================================*/

function calcularCuota(){

    const c=

    App.credito.capital;

    const i=

    App.credito.tem;

    const n=

    App.credito.plazo;

    App.credito.cuota=

    c*

    (

        i*

        Math.pow(

            1+i,

            n

        )

    )

    /

    (

        Math.pow(

            1+i,

            n

        )-1

    );

}

/*==========================================================
VPN
==========================================================*/

function calcularVPN(){

    let vpn=0;

    for(

        let p=1;

        p<=App.credito.plazo;

        p++

    ){

        vpn+=

        App.credito.cuota

        /

        Math.pow(

            1+

            App.credito.tem,

            p

        );

    }

    App.credito.vpn=vpn;

}

/*==========================================================
DURACIÓN MACAULAY
==========================================================*/

function calcularDuracion(){

    let suma=0;

    let presente=0;

    for(

        let p=1;

        p<=App.credito.plazo;

        p++

    ){

        const flujo=

        App.credito.cuota

        /

        Math.pow(

            1+

            App.credito.tem,

            p

        );

        presente+=flujo;

        suma+=

        p*

        flujo;

    }

    App.credito.duracion=

    suma/

    presente;

}

/*==========================================================
ACTUALIZAR KPIs
==========================================================*/

function actualizarKPIs(){

    document.getElementById(

        "kCapital"

    ).textContent=

    "S/ "+

    App.credito.capital

    .toLocaleString(

        "es-PE",

        {

            minimumFractionDigits:2

        }

    );

    document.getElementById(

        "kTea"

    ).textContent=

    App.credito.tea

    .toFixed(2)

    +" %";

    document.getElementById(

        "kCuota"

    ).textContent=

    "S/ "+

    App.credito.cuota

    .toLocaleString(

        "es-PE",

        {

            minimumFractionDigits:2

        }

    );

    document.getElementById(

        "kVPN"

    ).textContent=

    "S/ "+

    App.credito.vpn

    .toLocaleString(

        "es-PE",

        {

            minimumFractionDigits:2

        }

    );

}

/*==========================================================
RESUMEN
==========================================================*/

function mostrarResumen(){

    document.getElementById(

        "resultado"

    ).innerHTML=`

    <div class="card">

        <h2>

            Resultado del Análisis

        </h2>

        <table>

            <tr>

                <th>Capital</th>

                <td>

                    S/

                    ${App.credito.capital.toLocaleString("es-PE",{minimumFractionDigits:2})}

                </td>

            </tr>

            <tr>

                <th>TEA</th>

                <td>

                    ${App.credito.tea.toFixed(2)} %

                </td>

            </tr>

            <tr>

                <th>TEM</th>

                <td>

                    ${(App.credito.tem*100).toFixed(6)} %

                </td>

            </tr>

            <tr>

                <th>Cuota</th>

                <td>

                    S/

                    ${App.credito.cuota.toLocaleString("es-PE",{minimumFractionDigits:2})}

                </td>

            </tr>

            <tr>

                <th>VPN</th>

                <td>

                    S/

                    ${App.credito.vpn.toLocaleString("es-PE",{minimumFractionDigits:2})}

                </td>

            </tr>

            <tr>

                <th>Duración</th>

                <td>

                    ${App.credito.duracion.toFixed(4)}

                    meses

                </td>

            </tr>

        </table>

    </div>

    `;

}
/*==========================================================
GRÁFICO PRINCIPAL
==========================================================*/

function dibujarGrafico(){

    const canvas = document.getElementById("graficoPrincipal");

    if(!canvas){

        return;

    }

    const ctx = canvas.getContext("2d");

    if(App.chart){

        App.chart.destroy();

    }

    App.chart = new Chart(ctx,{

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

                    App.credito.capital,

                    App.credito.cuota,

                    App.credito.vpn

                ],

                borderWidth:1

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    display:false

                }

            }

        }

    });

}

/*==========================================================
GENERAR CRONOGRAMA
==========================================================*/

function construirCronograma(){

    App.credito.cronograma=[];

    let saldo=

        App.credito.capital;

    for(

        let periodo=1;

        periodo<=App.credito.plazo;

        periodo++

    ){

        const interes=

            saldo*

            App.credito.tem;

        const amortizacion=

            App.credito.cuota-

            interes;

        let saldoFinal=

            saldo-

            amortizacion;

        if(saldoFinal<0){

            saldoFinal=0;

        }

        App.credito.cronograma.push({

            periodo,

            saldoInicial:saldo,

            interes,

            amortizacion,

            cuota:App.credito.cuota,

            saldoFinal

        });

        saldo=

        saldoFinal;

    }

}

/*==========================================================
CRONOGRAMA
==========================================================*/

function mostrarCronograma(){

    if(

        App.credito.capital===0

    ){

        document.getElementById(

            "principal"

        ).innerHTML=`

        <div class="card">

            <h2>

                Cronograma

            </h2>

            <br>

            Primero analice un crédito.

        </div>

        `;

        return;

    }

    if(

        App.credito.cronograma.length===0

    ){

        construirCronograma();

    }

    let html=`

    <div class="card">

    <h2>

        Cronograma de Amortización

    </h2>

    <table>

    <tr>

        <th>N°</th>

        <th>Saldo Inicial</th>

        <th>Interés</th>

        <th>Amortización</th>

        <th>Cuota</th>

        <th>Saldo Final</th>

    </tr>

    `;

    App.credito.cronograma.forEach(function(fila){

        html+=`

        <tr>

            <td>

                ${fila.periodo}

            </td>

            <td>

                ${fila.saldoInicial.toLocaleString("es-PE",{minimumFractionDigits:2})}

            </td>

            <td>

                ${fila.interes.toLocaleString("es-PE",{minimumFractionDigits:2})}

            </td>

            <td>

                ${fila.amortizacion.toLocaleString("es-PE",{minimumFractionDigits:2})}

            </td>

            <td>

                ${fila.cuota.toLocaleString("es-PE",{minimumFractionDigits:2})}

            </td>

            <td>

                ${fila.saldoFinal.toLocaleString("es-PE",{minimumFractionDigits:2})}

            </td>

        </tr>

        `;

    });

    html+=`

    </table>

    </div>

    `;

    document.getElementById(

        "principal"

    ).innerHTML=html;

}
/*==========================================================
INGENIERÍA FINANCIERA
==========================================================*/

function mostrarIngenieria(){

    if(App.credito.capital===0){

        document.getElementById("principal").innerHTML=`

        <div class="card">

            <h2>

                Ingeniería Financiera

            </h2>

            <br>

            <p>

                Primero analice un crédito desde el Dashboard.

            </p>

        </div>

        `;

        return;

    }

    const tasaMensual=

        App.credito.tem*100;

    const interesTotal=

        (App.credito.cuota*

        App.credito.plazo)

        -

        App.credito.capital;

    const costoTotal=

        App.credito.cuota*

        App.credito.plazo;

    document.getElementById("principal").innerHTML=`

    <div class="card">

        <h2>

            Ingeniería Financiera

        </h2>

        <br>

        <div class="gridIngenieria">

            <div class="kpi">

                <h3>

                    Capital

                </h3>

                <h2>

                    S/

                    ${App.credito.capital.toLocaleString("es-PE",{

                        minimumFractionDigits:2

                    })}

                </h2>

            </div>

            <div class="kpi">

                <h3>

                    TEA

                </h3>

                <h2>

                    ${App.credito.tea.toFixed(2)} %

                </h2>

            </div>

            <div class="kpi">

                <h3>

                    TEM

                </h3>

                <h2>

                    ${tasaMensual.toFixed(6)} %

                </h2>

            </div>

            <div class="kpi">

                <h3>

                    Plazo

                </h3>

                <h2>

                    ${App.credito.plazo}

                </h2>

            </div>

            <div class="kpi">

                <h3>

                    Cuota

                </h3>

                <h2>

                    S/

                    ${App.credito.cuota.toLocaleString("es-PE",{

                        minimumFractionDigits:2

                    })}

                </h2>

            </div>

            <div class="kpi">

                <h3>

                    VPN

                </h3>

                <h2>

                    S/

                    ${App.credito.vpn.toLocaleString("es-PE",{

                        minimumFractionDigits:2

                    })}

                </h2>

            </div>

            <div class="kpi">

                <h3>

                    Duración

                </h3>

                <h2>

                    ${App.credito.duracion.toFixed(4)}

                </h2>

            </div>

            <div class="kpi">

                <h3>

                    Interés Total

                </h3>

                <h2>

                    S/

                    ${interesTotal.toLocaleString("es-PE",{

                        minimumFractionDigits:2

                    })}

                </h2>

            </div>

            <div class="kpi">

                <h3>

                    Costo Total

                </h3>

                <h2>

                    S/

                    ${costoTotal.toLocaleString("es-PE",{

                        minimumFractionDigits:2

                    })}

                </h2>

            </div>

        </div>

        <br>

        <table>

            <tr>

                <th>Indicador</th>

                <th>Valor</th>

            </tr>

            <tr>

                <td>Tasa Efectiva Anual</td>

                <td>${App.credito.tea.toFixed(2)} %</td>

            </tr>

            <tr>

                <td>Tasa Efectiva Mensual</td>

                <td>${tasaMensual.toFixed(6)} %</td>

            </tr>

            <tr>

                <td>Cuota Sistema Francés</td>

                <td>

                    S/

                    ${App.credito.cuota.toLocaleString("es-PE",{

                        minimumFractionDigits:2

                    })}

                </td>

            </tr>

            <tr>

                <td>Valor Presente Neto</td>

                <td>

                    S/

                    ${App.credito.vpn.toLocaleString("es-PE",{

                        minimumFractionDigits:2

                    })}

                </td>

            </tr>

            <tr>

                <td>Duración Macaulay</td>

                <td>

                    ${App.credito.duracion.toFixed(4)}

                </td>

            </tr>

            <tr>

                <td>Interés Total</td>

                <td>

                    S/

                    ${interesTotal.toLocaleString("es-PE",{

                        minimumFractionDigits:2

                    })}

                </td>

            </tr>

            <tr>

                <td>Costo Total del Crédito</td>

                <td>

                    S/

                    ${costoTotal.toLocaleString("es-PE",{

                        minimumFractionDigits:2

                    })}

                </td>

            </tr>

        </table>

    </div>

    `;

}
/*==========================================================
AUDITORÍA FINANCIERA
==========================================================*/

function mostrarAuditoria(){

    if(App.credito.capital===0){

        document.getElementById("principal").innerHTML=`

        <div class="card">

            <h2>Auditoría Financiera</h2>

            <br>

            <p>

                Primero analice un crédito desde el Dashboard.

            </p>

        </div>

        `;

        return;

    }

    const auditoria=evaluarCredito();

    let color="#10b981";

    if(auditoria.estado==="OBSERVADO"){

        color="#f59e0b";

    }

    if(auditoria.estado==="ERROR"){

        color="#ef4444";

    }

    let html=`

    <div class="card">

        <h2>

            Auditoría Financiera

        </h2>

        <br>

        <table>

            <tr>

                <th>Concepto</th>

                <th>Resultado</th>

            </tr>

            <tr>

                <td>Sistema de Amortización</td>

                <td>Francés</td>

            </tr>

            <tr>

                <td>Capital Analizado</td>

                <td>

                    S/

                    ${App.credito.capital.toLocaleString("es-PE",{

                        minimumFractionDigits:2

                    })}

                </td>

            </tr>

            <tr>

                <td>TEA</td>

                <td>

                    ${App.credito.tea.toFixed(2)} %

                </td>

            </tr>

            <tr>

                <td>TEM Calculada</td>

                <td>

                    ${(App.credito.tem*100).toFixed(6)} %

                </td>

            </tr>

            <tr>

                <td>Cuota</td>

                <td>

                    S/

                    ${App.credito.cuota.toLocaleString("es-PE",{

                        minimumFractionDigits:2

                    })}

                </td>

            </tr>

            <tr>

                <td>VPN</td>

                <td>

                    S/

                    ${App.credito.vpn.toLocaleString("es-PE",{

                        minimumFractionDigits:2

                    })}

                </td>

            </tr>

            <tr>

                <td>Duración</td>

                <td>

                    ${App.credito.duracion.toFixed(4)}

                    meses

                </td>

            </tr>

            <tr>

                <td>Estado</td>

                <td>

                    <strong style="color:${color};">

                        ${auditoria.estado}

                    </strong>

                </td>

            </tr>

        </table>

        <br>

        <h3>

            Observaciones

        </h3>

        <br>

        <ul>

    `;

    auditoria.observaciones.forEach(function(item){

        html+=`

            <li>

                ${item}

            </li>

        `;

    });

    html+=`

        </ul>

    </div>

    `;

    document.getElementById("principal").innerHTML=html;

}

/*==========================================================
EVALUACIÓN DEL CRÉDITO
==========================================================*/

function evaluarCredito(){

    const resultado={

        estado:"CORRECTO",

        observaciones:[]

    };

    if(App.credito.tem<=0){

        resultado.estado="ERROR";

        resultado.observaciones.push(

            "No fue posible calcular la TEM."

        );

    }

    if(App.credito.cuota<=0){

        resultado.estado="ERROR";

        resultado.observaciones.push(

            "La cuota calculada no es válida."

        );

    }

    if(App.credito.vpn<=0){

        resultado.estado="OBSERVADO";

        resultado.observaciones.push(

            "El VPN obtenido es menor o igual a cero."

        );

    }

    if(App.credito.duracion<=0){

        resultado.estado="OBSERVADO";

        resultado.observaciones.push(

            "La duración financiera no es consistente."

        );

    }

    if(resultado.observaciones.length===0){

        resultado.observaciones.push(

            "El crédito supera todas las validaciones matemáticas implementadas."

        );

        resultado.observaciones.push(

            "La cuota corresponde al Sistema Francés."

        );

        resultado.observaciones.push(

            "No se detectan inconsistencias en el cálculo financiero."

        );

    }

    return resultado;

}
/*==========================================================
REPORTES
==========================================================*/

function mostrarReportes(){

    if(App.credito.capital===0){

        document.getElementById("principal").innerHTML=`

        <div class="card">

            <h2>

                Reportes

            </h2>

            <br>

            <p>

                Primero analice un crédito desde el Dashboard.

            </p>

        </div>

        `;

        return;

    }

    document.getElementById("principal").innerHTML=`

    <div class="card">

        <h2>

            Centro de Reportes

        </h2>

        <br>

        <div class="reportesGrid">

            <button
                class="btn"
                id="btnPDF">

                📄 Generar Informe PDF

            </button>

            <button
                class="btn"
                id="btnExcel">

                📊 Exportar Excel

            </button>

            <button
                class="btn"
                id="btnWord">

                📝 Exportar Word

            </button>

        </div>

        <br>

        <div id="estadoReporte"></div>

    </div>

    `;

    document
        .getElementById("btnPDF")
        .addEventListener(
            "click",
            exportarPDF
        );

    document
        .getElementById("btnExcel")
        .addEventListener(
            "click",
            exportarExcel
        );

    document
        .getElementById("btnWord")
        .addEventListener(
            "click",
            exportarWord
        );

}

/*==========================================================
PDF
==========================================================*/

function exportarPDF(){

    const { jsPDF } = window.jspdf;

    const pdf=new jsPDF();

    pdf.setFontSize(18);

    pdf.text(

        "HIPOTECA FINANCIAL AUDITOR ENTERPRISE",

        20,

        20

    );

    pdf.setFontSize(13);

    pdf.text(

        "INFORME FINANCIERO",

        20,

        30

    );

    pdf.line(

        20,

        35,

        190,

        35

    );

    pdf.setFontSize(11);

    pdf.text(

        "Capital : S/ "+App.credito.capital.toLocaleString("es-PE"),

        20,

        50

    );

    pdf.text(

        "TEA : "+App.credito.tea.toFixed(2)+" %",

        20,

        60

    );

    pdf.text(

        "TEM : "+(App.credito.tem*100).toFixed(6)+" %",

        20,

        70

    );

    pdf.text(

        "Cuota : S/ "+App.credito.cuota.toLocaleString("es-PE",{

            minimumFractionDigits:2

        }),

        20,

        80

    );

    pdf.text(

        "VPN : S/ "+App.credito.vpn.toLocaleString("es-PE",{

            minimumFractionDigits:2

        }),

        20,

        90

    );

    pdf.text(

        "Duración : "+App.credito.duracion.toFixed(4)+" meses",

        20,

        100

    );

    pdf.save(

        "Informe_Hipotecario.pdf"

    );

}

/*==========================================================
EXCEL
==========================================================*/

function exportarExcel(){

    const datos=[

        [

            "Concepto",

            "Valor"

        ],

        [

            "Capital",

            App.credito.capital

        ],

        [

            "TEA",

            App.credito.tea

        ],

        [

            "TEM",

            App.credito.tem

        ],

        [

            "Cuota",

            App.credito.cuota

        ],

        [

            "VPN",

            App.credito.vpn

        ],

        [

            "Duración",

            App.credito.duracion

        ]

    ];

    const hoja=

    XLSX.utils.aoa_to_sheet(

        datos

    );

    const libro=

    XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        libro,

        hoja,

        "Resumen"

    );

    XLSX.writeFile(

        libro,

        "Informe_Hipotecario.xlsx"

    );

}

/*==========================================================
WORD
==========================================================*/

function exportarWord(){

    const contenido=`

HIPOTECA FINANCIAL AUDITOR ENTERPRISE

------------------------------------

Capital:
S/ ${App.credito.capital.toLocaleString("es-PE")}

TEA:
${App.credito.tea.toFixed(2)} %

TEM:
${(App.credito.tem*100).toFixed(6)} %

Cuota:
S/ ${App.credito.cuota.toLocaleString("es-PE",{minimumFractionDigits:2})}

VPN:
S/ ${App.credito.vpn.toLocaleString("es-PE",{minimumFractionDigits:2})}

Duración:
${App.credito.duracion.toFixed(4)} meses

`;

    const blob=new Blob(

        [

            contenido

        ],

        {

            type:"application/msword"

        }

    );

    const enlace=

    document.createElement(

        "a"

    );

    enlace.href=

    URL.createObjectURL(

        blob

    );

    enlace.download=

    "Informe_Hipotecario.doc";

    enlace.click();

}
/*==========================================================
CONFIGURACIÓN
==========================================================*/

function mostrarConfiguracion(){

    document.getElementById("principal").innerHTML=`

    <div class="card">

        <h2>

            Configuración

        </h2>

        <br>

        <table>

            <tr>

                <th>Parámetro</th>

                <th>Valor</th>

            </tr>

            <tr>

                <td>Versión</td>

                <td>${App.version}</td>

            </tr>

            <tr>

                <td>Módulo Activo</td>

                <td>${App.modulo}</td>

            </tr>

            <tr>

                <td>Motor Financiero</td>

                <td>Sistema Francés</td>

            </tr>

            <tr>

                <td>Chart.js</td>

                <td>Activo</td>

            </tr>

            <tr>

                <td>PDF</td>

                <td>Activo</td>

            </tr>

            <tr>

                <td>Excel</td>

                <td>Activo</td>

            </tr>

            <tr>

                <td>Word</td>

                <td>Activo</td>

            </tr>

        </table>

    </div>

    `;

}

/*==========================================================
UTILIDADES
==========================================================*/

function formatoMoneda(valor){

    return valor.toLocaleString(

        "es-PE",

        {

            minimumFractionDigits:2,

            maximumFractionDigits:2

        }

    );

}

function porcentaje(valor){

    return (valor*100).toFixed(6)+" %";

}

function limpiarPrincipal(){

    document.getElementById(

        "principal"

    ).innerHTML="";

}

/*==========================================================
REINICIAR
==========================================================*/

function reiniciarSistema(){

    if(App.chart){

        App.chart.destroy();

        App.chart=null;

    }

    App.credito={

        capital:0,

        tea:0,

        plazo:0,

        tem:0,

        cuota:0,

        vpn:0,

        duracion:0,

        cronograma:[]

    };

    construirKPIs();

    construirDashboard();

}

/*==========================================================
CONSOLA
==========================================================*/

console.log(

"===================================="

);

console.log(

"HIPOTECA FINANCIAL AUDITOR"

);

console.log(

"Versión "+App.version

);

console.log(

"Sistema cargado correctamente."

);

console.log(

"===================================="

);

/*==========================================================
FIN DEL ARCHIVO
==========================================================*/
