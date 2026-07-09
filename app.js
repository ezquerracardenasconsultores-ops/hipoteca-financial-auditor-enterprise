/*==========================================================
 HIPOTECA FINANCIAL AUDITOR ENTERPRISE
 Versión : 5.0
 Archivo : app.js
 Descripción:
 Inicializa la aplicación y coordina todos los módulos.
==========================================================*/

"use strict";

const HFA = {

    version: "5.0.0",

    nombre: "Hipoteca Financial Auditor Enterprise",

    moduloActual: "dashboard",

    datosCredito: {

        capital: 0,

        tea: 0,

        tna: 0,

        tem: 0,

        tcea: 0,

        plazo: 0,

        cuota: 0,

        vpn: 0,

        van: 0,

        tir: 0,

        duracion: 0,

        convexidad: 0

    }

};

/*==========================================================
INICIO
==========================================================*/

document.addEventListener("DOMContentLoaded", iniciarSistema);

/*==========================================================
INICIALIZAR
==========================================================*/

function iniciarSistema(){

    console.clear();

    console.log("======================================");

    console.log(HFA.nombre);

    console.log("Versión " + HFA.version);

    console.log("Sistema iniciado correctamente.");

    console.log("======================================");

    inicializarMenu();

    inicializarDashboard();

    Router.ir("dashboard");

}

/*==========================================================
MENU
==========================================================*/

function inicializarMenu(){

    const botones = document.querySelectorAll(".menu");

    botones.forEach(function(boton){

        boton.addEventListener("click", function(){

            botones.forEach(function(item){

                item.classList.remove("active");

            });

            this.classList.add("active");

            const modulo = this.dataset.module;

            HFA.moduloActual = modulo;

            Router.ir(modulo);

        });

    });

}

/*==========================================================
DASHBOARD
==========================================================*/

function inicializarDashboard(){

    if(typeof Dashboard === "undefined"){

        return;

    }

    Dashboard.cargarKPIs();

}

/*==========================================================
ACTUALIZAR DATOS DEL CREDITO
==========================================================*/

function actualizarCredito(datos){

    HFA.datosCredito = {

        ...HFA.datosCredito,

        ...datos

    };

    Dashboard.actualizarKPIs(HFA.datosCredito);

}

/*==========================================================
OBTENER DATOS
==========================================================*/

function obtenerCredito(){

    return HFA.datosCredito;

}

/*==========================================================
CAMBIAR MODULO
==========================================================*/

function cambiarModulo(nombre){

    HFA.moduloActual = nombre;

    Router.ir(nombre);

}

/*==========================================================
MENSAJES
==========================================================*/

function mostrarMensaje(texto,tipo="info"){

    console.log(

        "["+tipo.toUpperCase()+"]",

        texto

    );

}

/*==========================================================
ERRORES
==========================================================*/

window.addEventListener("error",function(error){

    console.error(

        "ERROR:",

        error.message

    );

});

/*==========================================================
EXPORTAR
==========================================================*/

window.HFA = HFA;

window.actualizarCredito = actualizarCredito;

window.obtenerCredito = obtenerCredito;

window.cambiarModulo = cambiarModulo;

window.mostrarMensaje = mostrarMensaje;

/*==========================================================
FIN
==========================================================*/
