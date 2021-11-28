function abrirArchivo(evento) {
    let archivo = evento.target.files[0];

    if (archivo) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let contenido = e.target.result;
            const lines = contenido.split(/\r\n|\n/);
            document.getElementById('contenido').value = lines.join('\n');
            separa_Datos(contenido);
            // Procede a crear las casillas para rellenar los datos
            contador_pedidos = 1;
            document.getElementById('inputfield').innerHTML = '';
            for (let index = 0; index < Puntos.length; index++) {
                InputFields();
            }
        };

        reader.readAsText(archivo);
    } else {
        document.getElementById('mensajes').innerText = 'No se ha seleccionado un archivo.';
    }
}
window.addEventListener('load', () => {
    document.getElementById('archivoTexto').addEventListener('change', abrirArchivo);
});

function separa_Datos(contenido_y) {
    var contenido_real = contenido_y;
    var dato_operado = contenido_real.split(""), kcm = 0;
    for (var t_p = 0; t_p < dato_operado.length; t_p++) {
        if (dato_operado[t_p] == "C") {
            kcm = t_p;
            t_p = dato_operado.length + 1;
        }
    }
    var punto_operado = dato_operado.slice(0, kcm - 1);
    var centro_operado = dato_operado.slice(kcm, dato_operado.length);
    var centros_pasantia = [], puntos_pasantia = [];
    var pivote_punto = 0, pivote_centro = 0;

    for (var aw = 1; aw < punto_operado.length; aw++) {
        if (punto_operado[aw] == "P") {
            pivote_punto = aw;
            var dal = punto_operado.slice(0, pivote_punto - 1);
            puntos_pasantia.push(dal);
            punto_operado.splice(0, pivote_punto);
            aw = 1;
        }
    }
    puntos_pasantia.push(punto_operado);

    for (var iw = 1; iw < centro_operado.length; iw++) {
        if (centro_operado[iw] == "C") {
            pivote_centro = iw;
            var dal_1 = centro_operado.slice(0, pivote_centro - 1);
            centros_pasantia.push(dal_1);
            centro_operado.splice(0, pivote_centro);
            iw = 1;
        }
    }
    centros_pasantia.push(centro_operado);
    let puntos_el_final = [];
    let centro_el_final = [];
    var ñm = 0;
    do {
        var coorde = puntos_pasantia[ñm].slice(4, puntos_pasantia[ñm].length);
        var mete_punto = [];
        for (var plñ = 0; plñ < coorde.length; plñ++) {
            if (coorde[plñ] == ",") {
                var pto = coorde.slice(0, plñ);
                if (pto[0] == "-") {
                    var palab = "l"
                    for (var lqz = 1; lqz < pto.length; lqz++) {
                        palab = palab + pto[lqz];
                    }
                    var palab_2 = palab.slice(1, palab.length);
                    palab_2 = parseInt(palab_2);
                    palab_2 = palab_2 * -1;
                    mete_punto.push(palab_2);
                } else {
                    var palab_1 = "l"
                    for (var lqz_1 = 0; lqz_1 < pto.length; lqz_1++) {
                        palab_1 = palab_1 + pto[lqz_1];
                    }
                    var palab_2_1 = palab_1.slice(1, palab_1.length);
                    palab_2_1 = parseInt(palab_2_1);
                    mete_punto.push(palab_2_1);
                }
                var ptp = coorde.slice(plñ + 1, coorde.length);
                if (ptp[0] == "-") {
                    var palab_3 = "l"
                    for (var lqz_3 = 1; lqz_3 < ptp.length; lqz_3++) {
                        palab_3 = palab_3 + ptp[lqz_3];
                    }
                    var palab_2_3 = palab_3.slice(1, palab_3.length);
                    palab_2_3 = parseInt(palab_2_3);
                    palab_2_3 = palab_2_3 * -1;
                    mete_punto.push(palab_2_3);
                } else {
                    var palab_1_3 = "l"
                    for (var lqz_1_3 = 0; lqz_1_3 < ptp.length; lqz_1_3++) {
                        palab_1_3 = palab_1_3 + ptp[lqz_1_3];
                    }
                    var palab_2_1_3 = palab_1_3.slice(1, palab_1_3.length);
                    palab_2_1_3 = parseInt(palab_2_1_3);
                    mete_punto.push(palab_2_1_3);
                }
            }
        }
        puntos_el_final.push(mete_punto);
        mete_punto = [];
        ñm++;
    } while (ñm < puntos_pasantia.length);

    Puntos = puntos_el_final;

    var ñm_8 = 0;
    do {
        var coorde_8 = centros_pasantia[ñm_8].slice(4, centros_pasantia[ñm_8].length);
        var mete_punto_8 = [];
        for (var plñ_8 = 0; plñ_8 < coorde_8.length; plñ_8++) {
            if (coorde_8[plñ_8] == ",") {
                var pto_8 = coorde_8.slice(0, plñ_8);
                if (pto_8[0] == "-") {
                    var palab_8 = "l"
                    for (var lqz_8 = 1; lqz_8 < pto_8.length; lqz_8++) {
                        palab_8 = palab_8 + pto_8[lqz_8];
                    }
                    var palab_2_8 = palab_8.slice(1, palab_8.length);
                    palab_2_8 = parseInt(palab_2_8);
                    palab_2_8 = palab_2_8 * -1;
                    mete_punto_8.push(palab_2_8);
                } else {
                    var palab_1_8 = "l"
                    for (var lqz_1_8 = 0; lqz_1_8 < pto_8.length; lqz_1_8++) {
                        palab_1_8 = palab_1_8 + pto_8[lqz_1_8];
                    }
                    var palab_2_1_8 = palab_1_8.slice(1, palab_1_8.length);
                    palab_2_1_8 = parseInt(palab_2_1_8);
                    mete_punto_8.push(palab_2_1_8);
                }
                var ptp_8 = coorde_8.slice(plñ_8 + 1, coorde_8.length);
                if (ptp_8[0] == "-") {
                    var palab_3_8 = "l"
                    for (var lqz_3_8 = 1; lqz_3_8 < ptp_8.length; lqz_3_8++) {
                        palab_3_8 = palab_3_8 + ptp_8[lqz_3_8];
                    }
                    var palab_2_3_8 = palab_3_8.slice(1, palab_3_8.length);
                    palab_2_3_8 = parseInt(palab_2_3_8);
                    palab_2_3_8 = palab_2_3_8 * -1;
                    mete_punto.push(palab_2_3_8);
                } else {
                    var palab_1_3_8 = "l"
                    for (var lqz_1_3_8 = 0; lqz_1_3_8 < ptp_8.length; lqz_1_3_8++) {
                        palab_1_3_8 = palab_1_3_8 + ptp_8[lqz_1_3_8];
                    }
                    var palab_2_1_3_8 = palab_1_3_8.slice(1, palab_1_3_8.length);
                    palab_2_1_3_8 = parseInt(palab_2_1_3_8);
                    mete_punto_8.push(palab_2_1_3_8);
                }
            }
        }
        centro_el_final.push(mete_punto_8);
        ñm_8++;
    } while (ñm_8 < centros_pasantia.length);

    Centros = centro_el_final;
    NombreCentros = op2();
    NombrePuntos = op();
}

var Puntos = [], Centros = [];

// Crea los recuadros para ingresar los pedidos
var contador_pedidos = 1;
var InputFields = function () {
    var div = document.createElement("div");
    document.getElementById('inputfield').appendChild(div);
    // Set div ID: Conjunto_Pedidos
    div.setAttribute("id", "Conjunto_Pedidos" + document.getElementById('inputfield').childElementCount);
    div.setAttribute("style", "padding-bottom:25px; display:flex; justify-content:space-around; align-items:center;");

    // Set texto descripcion
    var textd = document.createElement("p");
    textd.setAttribute("style", "color:white;");
    textd.textContent = "Punto de venta P" + contador_pedidos;
    contador_pedidos++;

    // Set inputs: pedidos_q
    var pedidos_q = document.createElement("input")
    pedidos_q.setAttribute("id", "Npedidos" + document.getElementById('inputfield').childElementCount);
    pedidos_q.setAttribute("type", "number");
    pedidos_q.setAttribute("placeholder", "Cantidad de pedidos");
    pedidos_q.setAttribute("style", "width:170px; height:30px; text-align: center; background:white; color:var(--black-fg) ; padding:0px 15px; border:none; border-bottom: 3px solid #00c896;");

    // Append childs
    div.appendChild(textd);
    div.appendChild(pedidos_q);
};

function creaPedidos() {
    var pedido_listo = [];
    for (let i_90 = 1; i_90 <= Puntos.length; i_90++) {
        var pedido_ingreso = document.getElementById("Npedidos" + i_90).value;
        pedido_ingreso = parseInt(pedido_ingreso);
        if (isNaN(pedido_ingreso) == true) {
            alert("No ingreso todos los valores correctamente, vuelva a ingresar el archivo.");
            location.reload();
            return false;
        } else {
            if (pedido_ingreso > 1000 || pedido_ingreso < 0) {
                alert("El valor ingresado en el pedido del Punto de Venta " + i_90 + " es mayor a 1000 o menor que cero, vuelva a ingresar el archivo.");
                console.error("El valor ingresado en el pedido del Punto de Venta " + i_90 + " es mayor a 1000 o menor que cero, vuelva a ingresar el archivo.");
                location.reload();
                return false;
            } else {
                pedido_listo.push(pedido_ingreso);
            }
        }
    }
    return pedido_listo;
}

var Estacionamiento = [0, 0];

function op() {
    var algo = [];
    for (var i_7 = 1; i_7 < Puntos.length + 1; i_7++) {
        var n = "P" + i_7;
        algo.push(n);
    }
    return algo;
}
var NombrePuntos = [];
function op2() {
    var algo = [];
    for (var i_5 = 1; i_5 < Centros.length + 1; i_5++) {
        var n = "C" + i_5;
        algo.push(n);
    }
    return algo;
}
var NombreCentros = [];

function menorAmayor(Pedidos2, NombrePuntos2, Puntos2) {
    var i = 0, j = i + 1, puente1 = [], puente3 = [], puente2 = [], puente4 = [], puente5 = [], puente6 = [];
    do {
        do {
            if (Pedidos2[i] > Pedidos2[j]) {
                puente1 = Pedidos2[i];
                puente2 = Pedidos2[j];
                puente3 = NombrePuntos2[i];
                puente4 = NombrePuntos2[j];
                puente5 = Puntos2[i];
                puente6 = Puntos2[j];
                Pedidos2.splice(i, 1, puente2);
                Pedidos2.splice(j, 1, puente1);
                NombrePuntos2.splice(i, 1, puente4);
                NombrePuntos2.splice(j, 1, puente3);
                Puntos2.splice(i, 1, puente6);
                Puntos2.splice(j, 1, puente5);
                puente1 = [];
                puente3 = [];
                puente2 = [];
                puente4 = [];
                puente5 = [];
                puente6 = [];
                j = i + 1;
            } else {
                j++;
            }
        } while (j < Pedidos2.length);
        i++;
        j = i + 1;
    } while (i < Pedidos2.length);

    return [Pedidos2, NombrePuntos2, Puntos2];

}


function main(Pedidos_1, NombrePuntos_1, Puntos_1) {
    var [Pedidos1, NombrePuntos1, Puntos1] = menorAmayor(Pedidos_1, NombrePuntos_1, Puntos_1);
    var CaminosEP = [];
    for (var o = 0; o < Puntos1.length; o++) {
        var hip = parseFloat(Math.sqrt((Math.pow(Estacionamiento[1] - Puntos1[o][1], 2)) + (Math.pow(Estacionamiento[0] - Puntos1[o][0], 2))).toFixed(5));
        CaminosEP.push(hip);
    }
    console.log("Recorridos desde los Puntos de Venta al Estacionamiento: " + CaminosEP);
    var CaminosPP = [], ingreso_1 = [], ñ = 0, j = 0;
    do {
        do {
            var hip_1 = parseFloat(Math.sqrt((Math.pow(Puntos1[ñ][1] - Puntos1[j][1], 2)) + (Math.pow(Puntos1[ñ][0] - Puntos1[j][0], 2))).toFixed(5));
            ingreso_1.push(hip_1);
            j++;
        } while (j < Puntos1.length);
        ñ++;
        j = 0;
        CaminosPP.push(ingreso_1);
        ingreso_1 = [];
    } while (ñ < Puntos1.length);

    var CaminosEC = [];
    for (var o_1 = 0; o_1 < Centros.length; o_1++) {
        var hip_2 = parseFloat(Math.sqrt((Math.pow(Estacionamiento[1] - Centros[o_1][1], 2)) + (Math.pow(Estacionamiento[0] - Centros[o_1][0], 2))).toFixed(5));
        CaminosEC.push(hip_2);
    }
    console.log("Recorridos desde el Estacionamiento a los Centros de Distribución: " + CaminosEC);

    var CaminosPC = [], ingreso_2 = [], ñ_1 = 0, j_1 = 0;
    do {
        do {
            var hip_3 = parseFloat(Math.sqrt((Math.pow(Puntos1[ñ_1][1] - Centros[j_1][1], 2)) + (Math.pow(Puntos1[ñ_1][0] - Centros[j_1][0], 2))).toFixed(5));
            ingreso_2.push(hip_3);
            j_1++;
        } while (j_1 < Centros.length);
        ñ_1++;
        j_1 = 0;
        CaminosPC.push(ingreso_2);
        ingreso_2 = [];
    } while (ñ_1 < Puntos1.length);
    console.log("Recorridos desde los Centros de Distribución a los Puntos de Venta: " + CaminosPC);

    var suma = 0, ñ_8 = 0, guarda = [], Camiones = [];

    do {
        suma = suma + Pedidos1[ñ_8];
        guarda.push(NombrePuntos1[ñ_8]);
        if (suma > 1000) {
            guarda.pop();
            Camiones.push(guarda);
            guarda = [];
            suma = 0;
        } else {
            ñ_8++;
        }
        if (ñ_8 == Pedidos1.length) {
            Camiones.push(guarda);
        }
    } while (ñ_8 < Pedidos1.length);

    var Rutas = [], datos = [], q = 0, m = 0, h = 0;
    do {
        do {
            if (Camiones[q][m] == NombrePuntos1[h]) {
                var w = 0, elMenor = [], lugar = 1;
                elMenor.push(CaminosPC[h][w]);
                do {
                    if (elMenor[0] > CaminosPC[h][w] && elMenor[0] != CaminosPC[h][w]) {
                        elMenor.splice(0, 1, CaminosPC[h][w]);
                        lugar = w + 1;
                        w++;
                    } else {
                        w++;
                    }
                } while (w < Centros.length);
                datos.push(["C" + lugar, elMenor[0], NombrePuntos1[h]]);
                elMenor = [];
                h++;
                if (h > Puntos1.length) {
                    h = 0;
                    m++;
                }
            } else {
                h++;
                if (h > Puntos1.length) {
                    h = 0;
                    m++;
                }
            }
        } while (m < Camiones[q].length);
        Rutas.push(datos);
        datos = [];
        q++;
        h = 0;
        m = 0;
    } while (q < Camiones.length);

    var r = 0;
    do {
        if (Rutas[r].length > 1) {
            var centrosA = [], caminosA = [], puntosA = [];
            for (var te = 0; te < Rutas[r].length; te++) {
                centrosA.push(Rutas[r][te][0]);
                caminosA.push(Rutas[r][te][1]);
                puntosA.push(Rutas[r][te][2]);
            }
            var qm = 0, es = qm + 1, bridgeA = [], bridgeB = [], bridgeC = [], bridgeD = [], bridgeE = [], bridgeF = [];
            do {
                do {
                    if (caminosA[qm] >= caminosA[es]) {
                        bridgeA = centrosA[qm];
                        bridgeB = centrosA[es];
                        bridgeC = caminosA[qm];
                        bridgeD = caminosA[es];
                        bridgeE = puntosA[qm];
                        bridgeF = puntosA[es];
                        centrosA.splice(qm, 1, bridgeB);
                        centrosA.splice(es, 1, bridgeA);
                        caminosA.splice(qm, 1, bridgeD);
                        caminosA.splice(es, 1, bridgeC);
                        puntosA.splice(qm, 1, bridgeF);
                        puntosA.splice(es, 1, bridgeE);
                        bridgeA = [];
                        bridgeB = [];
                        bridgeC = [];
                        bridgeD = [];
                        bridgeE = [];
                        bridgeF = [];
                        es = qm + 1;
                    } else {
                        es++;
                    }
                } while (es < caminosA.length);
                qm++;
                es = qm + 1;
            } while (qm < caminosA.length);

            var tramo = [];
            tramo.push(centrosA[0]);
            tramo.push(caminosA[0]);
            tramo.push(puntosA[0]);
            var nq = 0, lh = nq + 1, primer = 0, segundo = 0;
            do {
                for (var i_1 = 0; i_1 < NombrePuntos1.length; i_1++) {
                    if (puntosA[nq] == NombrePuntos1[i_1]) {
                        primer = i_1;
                    } else {
                        if (puntosA[lh] == NombrePuntos1[i_1]) {
                            segundo = i_1;
                        }
                    }
                }
                tramo.push(CaminosPP[primer][segundo]);
                tramo.push(puntosA[lh]);
                nq++;
                lh = nq + 1;
            } while (lh < puntosA.length);

            for (let i_2 = 0; i_2 < NombrePuntos1.length; i_2++) {
                if (puntosA[segundo] == NombrePuntos1[i_2]) {
                    var primerE = i_2;
                }
            }
            tramo.push(CaminosEP[primerE]);
            Rutas.splice(r, 1, [tramo]);
            r++;
        } else {
            var fe = 0;
            for (var e = 0; e < NombrePuntos1.length; e++) {
                if (NombrePuntos1[e] == Rutas[r][0][2]) {
                    fe = e;
                }
            }
            var tramop = CaminosEP[fe];
            Rutas[r][0].push(tramop);
            r++;
        }
    } while (r < Rutas.length);

    var esto = "E", aquello = 0, aqui = 0, k = 0;
    do {
        for (var bx = 0; bx < NombreCentros.length; bx++) {
            if (NombreCentros[bx] == Rutas[k][0][0]) {
                aqui = bx;
            }
        }
        aquello = CaminosEC[aqui];
        Rutas[k][0].splice(0, 0, aquello);
        Rutas[k][0].splice(0, 0, esto);
        Rutas[k][0].push(esto);
        k++
    } while (k < Rutas.length);

    var TamRutas = Rutas.length;
    console.log("Estas son las rutas de los " + TamRutas + " camiones: ");
    console.log(Rutas);

    var RecorridoTotal = [], sumador = 0, bqp = 1, lwo = 0;
    do {
        do {
            sumador = sumador + Rutas[lwo][0][bqp];
            bqp = bqp + 2;
        } while (bqp < Rutas[lwo][0].length);
        RecorridoTotal.push(parseFloat(sumador).toFixed(5));
        lwo++;
        bqp = 1;
        sumador = 0
    } while (lwo < Rutas.length);
    console.log("Este es el Recorrido total de los " + RecorridoTotal.length + " camiones: " + RecorridoTotal);

    var Tamano_Rutas = [], cuenta = 0;
    do {
        if (Rutas[cuenta][0].length == 7) {
            Tamano_Rutas.push(1)
            cuenta++;
        } else {
            var resta = Rutas[cuenta][0].length - 7;
            var cabe_2 = resta / 2;
            Tamano_Rutas.push(cabe_2 + 1);
            cuenta++;
        }
    } while (cuenta < Rutas.length);

    return [Rutas, RecorridoTotal, Tamano_Rutas];
}

// var pasa_camiones = 0;
function printResultado() {
    var Pedidos = creaPedidos();
    var [Rutas_Resultado, Recorrido_Resultado, Tamano_Resultado] = main(Pedidos, NombrePuntos, Puntos);
    var printInPage = document.getElementById('resultadoHTML');
    printInPage.innerHTML = '';

    var tituloResultado = document.getElementById('resultado-camion');
    tituloResultado.setAttribute("class","descripcion-title");
    tituloResultado.innerHTML= "Resultado de la operación";

    var cantidadCamiones = document.createElement("p");
    cantidadCamiones.setAttribute("style", "color:var(--accent); font-size: 18px; padding-top: 20px;")
    cantidadCamiones.innerHTML = "La cantidad de camiones necesarias para el día es: " + Rutas_Resultado.length;

    printInPage.appendChild(tituloResultado);
    printInPage.appendChild(cantidadCamiones);

    for (let index = 0; index < Rutas_Resultado.length; index++) {
        if (Tamano_Resultado[index] == 1) {
            // Imprime el nombre del camion
            var nombreCamion = document.createElement("p");
            nombreCamion.setAttribute("style", "font-size: 14px; padding-top: 40px;")
            nombreCamion.innerHTML = "Camión numero " + (index + 1);

            // Imprime su informacion contenida en "informacionCamion"
            var informacionCamion = document.createElement("p");
            informacionCamion.setAttribute("style", "margin-left: 45px;")

            var direccionCamion1 = document.createElement("p");
            direccionCamion1.innerHTML = "Sale del estacionamiento hacia " + Rutas_Resultado[index][0][2] + " (Distancia: " + Rutas_Resultado[index][0][1] + " kms.).";
            var direccionCamion2 = document.createElement("p");
            direccionCamion2.innerHTML = "Luego se dirige a " + Rutas_Resultado[index][0][4] + " (Distancia: " + Rutas_Resultado[index][0][3] + " kms.).";
            var direccionCamion3 = document.createElement("p");
            direccionCamion3.innerHTML = "Y finalmente se devuelve al estacionamiento (Distancia: " + Rutas_Resultado[index][0][5] + " kms.).";
            var direccionCamion4 = document.createElement("p");
            direccionCamion4.innerHTML = "La cantidad recorrida total es " + Recorrido_Resultado[index] + " kms.";
            // Append Childs
            informacionCamion.appendChild(direccionCamion1);
            informacionCamion.appendChild(direccionCamion2);
            informacionCamion.appendChild(direccionCamion3);
            informacionCamion.appendChild(direccionCamion4);
            printInPage.appendChild(nombreCamion);
            printInPage.appendChild(informacionCamion);
        } else {
            if (Tamano_Resultado[index] > 1) {
                var nombreCamion_2 = document.createElement("p");
                nombreCamion_2.setAttribute("style", "font-size: 14px; padding-top: 40px;")
                nombreCamion_2.innerHTML = "Camión numero " + (index + 1);

                // Imprime su informacion contenida en "informacionCamion"
                var informacionCamion_2 = document.createElement("p");
                informacionCamion_2.setAttribute("style", "margin-left: 45px;")

                var direccionCamion1_2 = document.createElement("p");
                direccionCamion1_2.innerHTML = "Sale del estacionamiento hacia " + Rutas_Resultado[index][0][2] + " (Distancia: " + Rutas_Resultado[index][0][1] + " kms.).";
                var direccionCamion2_2 = document.createElement("p");
                var ruta_puntos_2 = crea_palabra_2();
                function crea_palabra_2() {
                    var palabra = "Luego se dirige a ";
                    var paseando = 4;
                    do {
                        palabra = palabra + Rutas_Resultado[index][0][paseando] + " (Distancia: " + Rutas_Resultado[index][0][paseando - 1] + " kms.),<br>Luego hacia ";
                        paseando = paseando + 2;
                    } while (paseando < Rutas_Resultado[index][0].length - 2);
                    var palabra_2 = palabra.slice(0, palabra.length - 14);
                    palabra_2 = palabra_2 + "."
                    return palabra_2;
                }
                direccionCamion2_2.innerHTML = ruta_puntos_2;
                var distancia_estacionamiento_2 = Rutas_Resultado[index][0].length - 2;
                var direccionCamion3_2 = document.createElement("p");
                direccionCamion3_2.innerHTML = "Y por ultimo se devuelve al estacionamiento (Distancia: " + Rutas_Resultado[index][0][distancia_estacionamiento_2] + " kms.).";
                var direccionCamion4_2 = document.createElement("p");
                direccionCamion4_2.innerHTML = "La cantidad recorrida total es " + Recorrido_Resultado[index] + " kms.";
                // Append Childs
                informacionCamion_2.appendChild(direccionCamion1_2);
                informacionCamion_2.appendChild(direccionCamion2_2);
                informacionCamion_2.appendChild(direccionCamion3_2);
                informacionCamion_2.appendChild(direccionCamion4_2);
                printInPage.appendChild(nombreCamion_2);
                printInPage.appendChild(informacionCamion_2);
            }
        }
    }
    document.getElementById('boton-finalizar').innerHTML='';
    // Crea el boton para recargar la pagina
    var reloadHTML= document.getElementById('reload-page');
    reloadHTML.innerHTML='';

    var reloadButton= document.createElement('button');
    reloadButton.setAttribute("class","boton-reload");
    reloadButton.setAttribute("onclick","location.reload()");

    var reloadText= document.createElement('span');
    reloadText.setAttribute("class","link-text")
    reloadText.textContent="¿Desea ingresar otro día?";

    reloadButton.appendChild(reloadText);
    reloadHTML.appendChild(reloadButton);
}