/*==========================================================
 HIPOTECA FINANCIAL AUDITOR ENTERPRISE
 Archivo : charts.js
==========================================================*/

"use strict";

const Charts = (function () {

    let graficoPrincipal = null;

    function graficoInicial() {

        const canvas = document.getElementById("graficoPrincipal");

        if (!canvas) return;

        const datos = obtenerCredito();

        if (graficoPrincipal) {

            graficoPrincipal.destroy();

        }

        graficoPrincipal = new Chart(canvas, {

            type: "bar",

            data: {

                labels: [

                    "Capital",
                    "TEA",
                    "Plazo"

                ],

                datasets: [{

                    label: "Datos del Crédito",

                    data: [

                        datos.capital,
                        datos.tea,
                        datos.plazo

                    ]

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        });

    }

    function destruir() {

        if (graficoPrincipal) {

            graficoPrincipal.destroy();

            graficoPrincipal = null;

        }

    }

    return {

        graficoInicial,

        destruir

    };

})();

window.Charts = Charts;
