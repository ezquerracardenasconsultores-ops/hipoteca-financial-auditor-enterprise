/*==========================================================
 HIPOTECA FINANCIAL AUDITOR ENTERPRISE
 Archivo : ingenieria.js
 Versión : 5.0
==========================================================*/

"use strict";

const Ingenieria = (function(){

    /*==========================================
    RENDER
    ==========================================*/

    function render(){

        const credito = obtenerCredito();

        if(credito.capital<=0){

            Router.mostrar(`

                <div class="card">

                    <h2>Ingeniería Financiera</h2>

                    <br>

                    <p>

                        Primero debe analizar un crédito desde el Dashboard.

                    </p>

                </div>

            `);

            return;

        }

        calcular();

    }

    /*==========================================
    CALCULAR
    ==========================================*/

    function calcular(){

        const credito = obtenerCredito();

        const capital = credito.capital;

        const tea = credito.tea;

        const plazo = credito.plazo;

        const tem = calcularTEM(tea);

        const cuota = calcularCuota(

            capital,

            tem,

            plazo

        );

        const vpn = calcularVPN(

            cuota,

            tem,

            plazo

        );

        const duracion = calcularDuracion(

            cuota,

            tem,

            plazo

        );

        actualizarCredito({

            tem,

            cuota,

            vpn,

            duracion

        });

        mostrarResultado({

            capital,

            tea,

            tem,

            plazo,

            cuota,

            vpn,

            duracion

        });

    }

    /*==========================================
    TEM
    ==========================================*/

    function calcularTEM(tea){

        return Math.pow(

            1+(tea/100),

            1/12

        )-1;

    }

    /*==========================================
    CUOTA FRANCESA
    ==========================================*/

    function calcularCuota(

        capital,

        tem,

        plazo

    ){

        return capital*

        (

            (tem*Math.pow(1+tem,plazo))

            /

            (Math.pow(1+tem,plazo)-1)

        );

    }

    /*==========================================
    VPN
    ==========================================*/

    function calcularVPN(

        cuota,

        tem,

        plazo

    ){

        let vpn=0;

        for(

            let i=1;

            i<=plazo;

            i++

        ){

            vpn+=

            cuota/

            Math.pow(

                1+tem,

                i

            );

        }

        return vpn;

    }

    /*==========================================
    DURACIÓN
    ==========================================*/

    function calcularDuracion(

        cuota,

        tem,

        plazo

    ){

        let vp=0;

        let tiempo=0;

        for(

            let i=1;

            i<=plazo;

            i++

        ){

            const flujo=

            cuota/

            Math.pow(

                1+tem,

                i

            );

            vp+=flujo;

            tiempo+=

            i*

            flujo;

        }

        return tiempo/vp;

    }

    /*==========================================
    RESULTADO
    ==========================================*/

    function mostrarResultado(d){

        Router.mostrar(`

        <div class="card">

            <h2>

                Ingeniería Financiera

            </h2>

            <br>

            <table>

                <tr>

                    <th>Capital</th>

                    <td>

                        S/

                        ${Utils.moneda(d.capital)}

                    </td>

                </tr>

                <tr>

                    <th>TEA</th>

                    <td>

                        ${d.tea.toFixed(2)} %

                    </td>

                </tr>

                <tr>

                    <th>TEM</th>

                    <td>

                        ${(d.tem*100).toFixed(6)} %

                    </td>

                </tr>

                <tr>

                    <th>Plazo</th>

                    <td>

                        ${d.plazo} meses

                    </td>

                </tr>

                <tr>

                    <th>Cuota</th>

                    <td>

                        S/

                        ${Utils.moneda(d.cuota)}

                    </td>

                </tr>

                <tr>

                    <th>VPN</th>

                    <td>

                        S/

                        ${Utils.moneda(d.vpn)}

                    </td>

                </tr>

                <tr>

                    <th>Duración</th>

                    <td>

                        ${d.duracion.toFixed(4)}

                        meses

                    </td>

                </tr>

            </table>

        </div>

        `);

    }

    /*==========================================
    API
    ==========================================*/

    return{

        render,

        calcularTEM,

        calcularCuota,

        calcularVPN,

        calcularDuracion

    };

})();

window.Ingenieria=Ingenieria;
