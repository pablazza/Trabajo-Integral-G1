class ubicacion {
    constructor(t, n, x, y) {
        this.t = []; //p o c 
        this.n = []; //id identificador
        this.x = [];
        this.y = [];
    }
}

class demanda {
    constructor(c, p, n) {
        this.c = [];
        this.p = [];
        this.n = [];
    }
}

//clases
let ubi = new ubicacion;
let dem = new demanda;

//variables 
let auxUbi;
let auxDem;

//distancia
let matrizDist;
let matrizOrigen;

//error
var errores = false;
var anuncio;

function origen() {
    ubi.t.push("E");
    ubi.n.push("D");
    ubi.x.push(0);
    ubi.y.push(0);
}

function guardarUbicaciones() {
    auxUbi = document.getElementById("coordenadas").value;
    registrarUbicaiones(auxUbi);
}

function registrarUbicaiones(aux) {

    let txx = aux.split('\n');
    let num = txx.length;
    let txs = [];
    let txt = [];
    let bep = [];

    for (let i = 0; i < num; i++) {
        txs.push(txx[i]);
    }

    for (let j = 0; j < txs.length; j++) {
        bep.push(txs[j].replace(',', ';'));
        txt.push(bep[j].split(';'));
    }

    for (let m = 0; m < txs.length; m++) {
        if (txt[m][0] == "E" || txt[m][0] == "P" || txt[m][0] == "C") {
            ubi.t.push(txt[m][0]);
        } else {
            alert("*" + txt[m][0] + "* no es una locación válida. Verifique el archivo *UBICACIONES.txt* e intentelo nuevamente.");
            console.error("*" + txt[m][0] + "* no es una locación válida. Verifique el archivo *UBICACIONES.txt* e intentelo nuevamente.");
            errores = true;
            return 0;
        }

        if (isNaN(txt[m][1])) {
            alert("*" + txt[m][1] + "* no es un identificador numérico válido");
            console.error("*" + txt[m][1] + "* no es un identificador numérico válido");
            errores = true;
            return 0;
        } else {
            ubi.n.push(txt[m][1]);
        }

        if (isNaN(txt[m][2])) {
            alert("*" + txt[m][2] + "* no es una coordenada válida para el eje X");
            console.error("*" + txt[m][2] + "* no es una coordenada válida para el eje X");
            errores = true;
            return 0;
        } else {
            ubi.x.push(Number.parseInt(txt[m][2]));
        }

        if (isNaN(txt[m][3])) {
            alert("*" + txt[m][3] + "* no es una coordenada válida para el eje Y");
            console.error("*" + txt[m][3] + "* no es una coordenada válida para el eje Y");
            errores = true;
            return 0;
        } else {
            ubi.y.push(Number.parseInt(txt[m][3]));
        }
    }

    Distancias();
}

function guardarDemanda() {
    auxDem = document.getElementById("demanda").value;

    registrarDemanda(auxDem);
}

function registrarDemanda(aux) {
    let txx = aux.split('\n');
    let num = txx.length;
    let txs = [];
    let txt = [];

    for (let i = 0; i < num; i++) {

        txs.push(txx[i]);
    }

    for (let j = 0; j < txs.length; j++) {
        txt.push(txx[j].split(';'));
    }

    for (let m = 0; m < txs.length; m++) {
        dem.c.push(Number.parseInt(txt[m][0]));
        dem.p.push(Number.parseInt(txt[m][1]));
        dem.n.push(Number.parseInt(txt[m][2]));
    }

    console.table(ubi);
    console.table(dem);
}

function verificarC() {
    console.log("verificar C");
    var aux;
    var cont = 0;

    for (let i = 0; i < dem.c.length; i++) {
        aux = parseInt(dem.c[i]);

        for (let j = 0; j < ubi.t.length; j++) {
            if ("C" == ubi.t[j]) {
                if (ubi.n[j] == aux) {
                    cont++;
                }
            }
        }

        if (cont == 0) {
            alert(aux + " no es una ubicación válida");
            console.error(aux + " no es una ubicación válida");
            errores = true;
            return 0;
        }
        cont = 0;
    }
}

function verificarP() {
    var aux;
    var cont = 0;

    for (let i = 0; i < dem.p.length; i++) {
        aux = parseInt(dem.p[i]);

        for (let j = 0; j < ubi.t.length; j++) {
            if ("P" == ubi.t[j]) {
                if (ubi.n[j] == aux) {
                    cont++;
                }
            }
        }

        if (cont == 0) {
            alert(aux + " no es un destino válido");
            console.error(aux + " no es un destino válido");
            errores = true;
            return 0;
        }
        cont = 0;
    }
}

function verificarN() {
    console.log(dem.n);
    for (let i = 0; i < dem.n.length; i++) {
        console.log(dem.n[i]);

        if (isNaN(dem.n[i])) {
            alert("Hay una cantidad de productos no valida");
            console.error("Hay una cantidad de productos no valida");
            errores = true;
            return 0;
        }
    }

}

//distancia

function crearDistancia(aux) {
    var distance = new Array(aux.length);

    for (let i = 0; i < distance.length; i++) {
        distance[i] = new Array(distance.length);
    }

    var cont = 0;

    while (cont < distance.length) {
        for (let a = 0; a < aux.length; a++) {
            for (let b = 0; b < aux.length; b++) {
                if (aux[a] != aux[b]) {
                    distance[cont][b] = aux[b] - aux[a];
                } else {
                    distance[cont][b] = 0;
                }
            }
            cont++;
        }
    }

    return distance;
}

function resHipo(X, Y) {
    var aux = [];
    let i, j;

    for (i = 0; i < X.length; i++) {
        aux[i] = new Array(X.length);
    }

    for (i = 0; i < X.length; i++) {
        for (j = 0; j < X.length; j++) {
            aux[i][j] = Math.hypot(X[i][j], Y[i][j]);
        }
    }
    return aux;
}

function Distancias() {
    var distX = crearDistancia(ubi.x);
    var distY = crearDistancia(ubi.y);

    // console.log("Matriz distancia X");
    // console.table(distX);
    // console.log("Matriz distancia Y");
    // console.table(distY);

    matrizDist = JSON.parse(JSON.stringify(resHipo(distX, distY)));
    console.table(matrizDist);
}

function guardar(enlace) {
    let aus = document.getElementById("demanda").value;
    if (aus == "") {
        alert("No se ha cargado el archivo");
    } else {
        enlace.disabled = 'disabled';
        console.log("El archivo se ha cargado con exito");
        origen();
        guardarUbicaciones();

        if (errores == false) {
            guardarDemanda();

            verificarC();
            verificarP();
            verificarN();
            console.log(errores);

            if (errores == true) {
                return 0;
            }

            iniciarDisplay(); //display.js
            iniciarHoja(); //hoja.js funciones de ruta
        } else {
            return 0;
        }
    }
}