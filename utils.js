/*==========================================================
 HIPOTECA FINANCIAL AUDITOR ENTERPRISE
 Archivo : utils.js
==========================================================*/

"use strict";

const Utils = (function(){

    function moneda(valor){

        return Number(valor).toLocaleString(

            "es-PE",

            {

                minimumFractionDigits:2,

                maximumFractionDigits:2

            }

        );

    }

    function porcentaje(valor,decimales=2){

        return Number(valor).toFixed(decimales)+" %";

    }

    function numero(valor){

        return Number(valor);

    }

    function limpiar(id){

        const elemento=document.getElementById(id);

        if(elemento){

            elemento.innerHTML="";

        }

    }

    function crearFila(...columnas){

        let html="<tr>";

        columnas.forEach(col=>{

            html+="<td>"+col+"</td>";

        });

        html+="</tr>";

        return html;

    }

    function hoy(){

        return new Date().toLocaleDateString(

            "es-PE"

        );

    }

    return{

        moneda,

        porcentaje,

        numero,

        limpiar,

        crearFila,

        hoy

    };

})();

window.Utils=Utils;
