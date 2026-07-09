/*==========================================================
 HIPOTECA FINANCIAL AUDITOR ENTERPRISE
 Archivo : dashboard.js
 Módulo  : Dashboard
 Versión : 5.0
==========================================================*/

"use strict";

const Dashboard = (function(){

    /*==========================================
    RENDER
    ==========================================*/

    function render(){

        Router.mostrar(`

        <section class="dashboard">

            <div class="panel">

                <div class="formulario">

                    <h2>

                        Datos del Crédito

                    </h2>

                    <label>

                        Capital

                    </label>

                    <input
                        id="capital"
                        type="number"
                        placeholder="Capital">

                    <label>

                        TEA (%)

                    </label>

                    <input
                        id="tea"
                        type="number"
                        placeholder="14.15">

                    <label>

                        Plazo (Meses)

                    </label>

                    <input
                        id="plazo"
                        type="number"
                        placeholder="180">

                    <button
                        class="btn btnPrimary mt-20"
                        id="btnAnalizar">

                        Analizar Crédito

                    </button>

                </div>

                <div class="grafico">

                    <canvas
                        id="graficoPrincipal">

                    </canvas>

                </div>

            </div>

            <div
                id="resultadoDashboard">

            </div>

        </section>

        `);

        registrarEventos();

        cargarKPIs();

    }

    /*==========================================
    EVENTOS
    ==========================================*/

    function registrarEventos(){

        const boton=document.getElementById("btnAnalizar");

        if(!boton){

            return;

        }

        boton.addEventListener("click",analizarCredito);

    }

    /*==========================================
    ANALIZAR
    ==========================================*/

    function analizarCredito(){

        const capital=parseFloat(

            document.getElementById("capital").value

        );

        const tea=parseFloat(

            document.getElementById("tea").value

        );

        const plazo=parseInt(

            document.getElementById("plazo").value

        );

        if(

            isNaN(capital) ||

            isNaN(tea) ||

            isNaN(plazo)

        ){

            alert(

                "Complete correctamente todos los datos."

            );

            return;

        }

        actualizarCredito({

            capital,

            tea,

            plazo

        });

        document.getElementById(

            "resultadoDashboard"

        ).innerHTML=`

        <div class="card mt-20">

            <h2>

                Crédito cargado correctamente

            </h2>

            <br>

            <table>

                <tr>

                    <th>Capital</th>

                    <td>

                        S/

                        ${capital.toLocaleString("es-PE")}

                    </td>

                </tr>

                <tr>

                    <th>TEA</th>

                    <td>

                        ${tea.toFixed(2)} %

                    </td>

                </tr>

                <tr>

                    <th>Plazo</th>

                    <td>

                        ${plazo} meses

                    </td>

                </tr>

            </table>

        </div>

        `;

        if(typeof Charts!=="undefined"){

            Charts.graficoInicial();

        }

    }

    /*==========================================
    KPIs
    ==========================================*/

    function cargarKPIs(){

        const panel=document.getElementById(

            "dashboardKPIs"

        );

        if(!panel){

            return;

        }

        panel.innerHTML=`

        <div class="card">

            <div class="cardTitle">

                Capital

            </div>

            <div
                class="cardValue"
                id="kpiCapital">

                S/ 0.00

            </div>

        </div>

        <div class="card">

            <div class="cardTitle">

                TEA

            </div>

            <div
                class="cardValue"
                id="kpiTea">

                0 %

            </div>

        </div>

        <div class="card">

            <div class="cardTitle">

                Plazo

            </div>

            <div
                class="cardValue"
                id="kpiPlazo">

                0

            </div>

        </div>

        <div class="card">

            <div class="cardTitle">

                Estado

            </div>

            <div
                class="cardValue"
                id="kpiEstado">

                Esperando

            </div>

        </div>

        `;

    }

    /*==========================================
    ACTUALIZAR KPIs
    ==========================================*/

    function actualizarKPIs(datos){

        const capital=document.getElementById("kpiCapital");

        const tea=document.getElementById("kpiTea");

        const plazo=document.getElementById("kpiPlazo");

        const estado=document.getElementById("kpiEstado");

        if(capital)

            capital.textContent=

            "S/ "+

            datos.capital.toLocaleString("es-PE",{

                minimumFractionDigits:2

            });

        if(tea)

            tea.textContent=

            datos.tea.toFixed(2)+" %";

        if(plazo)

            plazo.textContent=

            datos.plazo+" meses";

        if(estado)

            estado.textContent="Analizado";

    }

    /*==========================================
    API
    ==========================================*/

    return{

        render,

        cargarKPIs,

        actualizarKPIs

    };

})();

window.Dashboard=Dashboard;
