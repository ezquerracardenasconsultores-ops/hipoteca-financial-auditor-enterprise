/*==========================================================
 HIPOTECA FINANCIAL AUDITOR ENTERPRISE
 Archivo : router.js
 Función : Navegación entre módulos
==========================================================*/

"use strict";

const Router = (function(){

    const contenedor = document.getElementById("app");

    /*==========================================
    RUTAS
    ==========================================*/

    const rutas = {

        dashboard(){

            Dashboard.render();

        },

        cronograma(){

            Cronograma.render();

        },

        ingenieria(){

            Ingenieria.render();

        },

        auditoria(){

            Auditoria.render();

        },

        reportes(){

            Reportes.render();

        },

        configuracion(){

            renderConfiguracion();

        }

    };

    /*==========================================
    CAMBIAR MÓDULO
    ==========================================*/

    function ir(nombre){

        limpiar();

        if(rutas[nombre]){

            rutas[nombre]();

        }else{

            error404(nombre);

        }

    }

    /*==========================================
    LIMPIAR
    ==========================================*/

    function limpiar(){

        contenedor.innerHTML="";

    }

    /*==========================================
    HTML
    ==========================================*/

    function mostrar(html){

        contenedor.innerHTML=html;

    }

    /*==========================================
    CONFIGURACIÓN
    ==========================================*/

    function renderConfiguracion(){

        mostrar(`

            <div class="card">

                <h2>Configuración</h2>

                <br>

                <p>

                    Este módulo será desarrollado en un sprint posterior.

                </p>

            </div>

        `);

    }

    /*==========================================
    ERROR 404
    ==========================================*/

    function error404(nombre){

        mostrar(`

            <div class="card">

                <h2>Módulo inexistente</h2>

                <br>

                <p>

                    No existe el módulo

                    <strong>${nombre}</strong>

                </p>

            </div>

        `);

    }

    /*==========================================
    API PÚBLICA
    ==========================================*/

    return{

        ir,

        mostrar,

        limpiar

    };

})();

window.Router=Router;
