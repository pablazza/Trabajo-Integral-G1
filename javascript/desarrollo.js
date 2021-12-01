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

class lugar {
    constructor( c, i) {
        this.c = [];
        this.i = [];
    }
 }

//clases
let ubi = new ubicacion;
let dem = new demanda;

let resumen = new lugar;

//varibles
let resultado = []; // --> Crea matriz cuadrada con los resultados
let cd = [];//centros de distribucion
let cc = [];//carga por centro
let camiXcent = [];//tabla con los camiones por centro
let totalCami = 0; //camiones totales para todos los centros
let centros = [];//array que contiene los centros
let pedXcent = [];//array con los puntos de venta de cada centro
let nXped = [];//array con los pedidos por centros
let ruta = [];//ruta de cada pedido
let ordenada = []// array de los pedidos por centros ordenados por distancia
let carga = [];//punto de entrega por camion
let auxU;
let auxD;

//distancia
let matrizD;
let matrizO;

//error
var errores = false;
var anuncio;


window.addEventListener('load', () =>{
    document.getElementById('coordenada').addEventListener('change', abrirArchivo);
});
window.addEventListener('load', () =>{
    document.getElementById('pedido').addEventListener('change', abrirArchivo2);
});

function abrirArchivo(evento) {
    let archivo = evento.target.files[0];

    if(archivo){
        let lector = new FileReader();
        lector.onload = function (e){
            let contenido = e.target.result;
            mostrarUbicacion(contenido);
        };
        lector.readAsText(archivo);
    }
}

function mostrarUbicacion(contenido){
    var elemento = document.getElementById('contenido');
    elemento.innerHTML = contenido;
}

function abrirArchivo2(evento) {
    let archivo = evento.target.files[0];

    if(archivo){
        let lector = new FileReader();
        lector.onload = function (e){
            let contenido = e.target.result;
            mostrarPedido(contenido);
        };
        lector.readAsText(archivo);
    }
}

function mostrarPedido(contenido){
    var elemento = document.getElementById('contenidod');
    elemento.innerHTML = contenido;
}

function origen(){
    ubi.t.push("E");
    ubi.n.push("D");
    ubi.x.push(0);
    ubi.y.push(0);
}

function saveUbi(){
    auxU = document.getElementById("coordenada").value;
    regUbi(auxU);
}

function regUbi(aux){
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

function saveDem(){
    auxD = document.getElementById("pedido").value;
    regDem(auxD);
}

function regDem(aux){
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

    matrizD= JSON.parse(JSON.stringify(resHipo(distX, distY)));
    console.table(matrizDist);
}

function guardar(enlace) {
    let aus = document.getElementById("pedido").value;
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

const contUbi = document.querySelector("ubis");
const contDem = document.querySelector("pedi2");

function iniciarDisplay() {
    contenedorUbi();
    contenedorDem();

}

function contenedorUbi() {
    var texto = document.createElement("h4");

    texto.innerHTML = `Las ubicaciones son:`;
    let aux = ubi.t.length;

    contUbi.appendChild(texto);

    for (let i = 0; i < aux; i++) {
        var txt = document.createElement("p");
        let t1 = ubi.t[i];
        let t2 = ubi.n[i];
        let t3 = ubi.x[i];
        let t4 = ubi.y[i];
        txt.innerHTML = `${i+1}.${t1}${t2}, X:${t3} Y:${t4}`;
        contUbi.appendChild(txt);
    }

}

function contenedorDem() {
    var texto = document.createElement("h4");

    texto.innerHTML = `Demanda de productos del dia son:`;
    let aux = dem.c.length;

    contDem.appendChild(texto);

    for (let i = 0; i < aux; i++) {
        var txt = document.createElement("p");
        let t1 = dem.c[i];
        let t2 = dem.p[i];
        let t3 = dem.n[i];
        txt.innerHTML = `${i+1}. P${t2} requiere un cargamento de ${t3}, desde C${t1}`;
        contDem.appendChild(txt);
    }

}


const finalHoja = document.querySelector("resultadosFinales");

function dsplayResultados() {
    var d = document.createElement("div");
    console.log("final");
    d.setAttribute("class", "resuf contenedor animate__animated animate__bounceInUp");
    var tit = document.createElement("h4");
    tit.innerHTML = "Resultados:";
    d.appendChild(tit);
    var camiDSI = document.createElement("p");
    camiDSI.innerHTML = `La cantidad de camiones necesarios es: ${totalCami}`;
    d.appendChild(camiDSI);
    for (let i = 0; i < totalCami; i++) {
        let resuff = document.createElement("p");
        resuff.innerHTML = `-Ruta N°${i+1}: ED->${resultado[i][0]}->${resultado[i][1]}->ED`;
        d.appendChild(resuff);
    }

    finalHoja.appendChild(d);
}

function iniciarHoja(){
   
    calcularCentros();
    console.table(camiXcent);
    console.log(totalCami);
    iniciarLugar();
    rutaXcentro();
    cantidadXp();
    rutaXcamion();
    generarCarga();
    crearResultados();
 }
 
 function generarCarga(){
    ordenada.forEach(cargar);
 }
 
 function cargar(element,index){//arreglar
    let aux = `${element}`;
    
    
       var ayu = aux.split(",");
       console.log(ayu);
       
       
    //   var punto = ayu[0]; 
      if(ayu.length==1){
         carga.push(ayu[0]);
      }else{
       let nombre="";
       let peso = 0;
      for(let i = 0 ;i < ayu.length; i++){
         peso +=nXped[Number.parseInt(ayu[i].charAt(1))];
       
      
       if(ayu.length != i+1){
             //let peso += nXped[Number.parseInt(ayu[i].charAt(1))]
             let peso2 = nXped[Number.parseInt(ayu[i+1].charAt(1))];
          
             nombre+=ayu[i];
 
          if(peso+peso2>1000){
             carga.push(nombre);
             nombre = "";
          }else{
             nombre+="->";
          }
      }else{
       nombre+=ayu[i];
       carga.push(nombre);
 
      }
      console.log(nombre);
 
      }
      
      console.table(carga);
    
    }
       
   
    
 
 }
 
 function rutaXcamion(){
 
    pedXcent.forEach(ordenar);
 
 }
 
 //splice(3, 1);
 
 function support(arreglo,index,primer){
    console.log(arreglo);
    
    if(arreglo.length==1){
       return arreglo[0];
    }else{
 
       if(primer==1){
          let menor= devDistancia(`C${index}`,arreglo[0]);
          let id = 0;
          for(let i = 0 ; i < arreglo.length ; i++){
             let apex = devDistancia(`C${index}`,arreglo[i]);
             console.log(apex);
             if(menor>apex){//compara menor valor
                menor=apex;
                id=i;
             }
          }  
          let nombre = arreglo[id];//nombre a retornar
          let nuevoIndex = resumen.c.indexOf(nombre);
          console.log(nuevoIndex);
          arreglo.splice(id,1);//elemnto a elminar
          return `${nombre},`+support(arreglo,nuevoIndex,0);
 
       }else{
          let menor = devDistancia(resumen.c[index],arreglo[0]);
          let id = 0;
 
          for(let i = 0 ; i < arreglo.length ; i++){
          let apex = devDistancia(resumen.c[index],arreglo[i]);
          console.log(apex);
          if(menor>apex){
             menor=apex;
             id=i;
          }
          
       }
       let nombre = arreglo[id];//nombre a retornar
       let nuevoIndex = resumen.c.indexOf(nombre);
       arreglo.splice(id,1);//elemnto a elminar
       if(arreglo.length==0){
          return nombre;
       }else{
          return `${nombre},`+support(arreglo,nuevoIndex,0);
       }
    
       }
    }
 
 }
 
 function ordenar(element, index){
    var aux = element.split(",");
    aux.pop();
 
    
    ordenada[index]=support(aux,index,1);
    console.table(ordenada);
 
 }
 
 function devDistancia(st1,st2){
    var aux1 = resumen.c.indexOf(st1);
    var aux2 = resumen.c.indexOf(st2);
    return matrizDist[aux1][aux2];
 
 }
 
 function cantidadXp(){
 
    for(let y=0; y<dem.c.length; y++) {
        nXped[dem.p[y]] = dem.n[y];
    }
    console.log("n x p");
    console.table(nXped);
 }
 
 function rutaXcentro(){
    
    for(let y=0; y<dem.c.length; y++) {
       pedXcent[dem.c[y]] = "";
   }
 
    for(let y=0; y<dem.c.length; y++) {
        pedXcent[dem.c[y]] += `P${dem.p[y]},`;
    }
    console.log("p x c");
    console.table(pedXcent)
 }
 
 function cargaXcentro(){
   
   for(let i = 0; i < dem.n.length; i++){
      cc[dem.c[i]] = "";
   }
 
   for(let i = 0; i < dem.n.length; i++){
    cc[dem.c[i]] += `${dem.n[i]}`;
    if(i+1!=dem.n.length){
       cc[dem.c[i]] +="+";
    }
   }
   console.table(cc);
 
   cc.forEach(carXcami);
   
   camiXcent.forEach(camionesTotal);
 
 }
 
 function camionesTotal(element){
    totalCami+=element;
 }
 
 function carXcami(element, index) {
    let aux = element.split("+");
    let peso=0;
    let camiones=0;
 
    
 
    for(let i = 0; i < aux.length;i++){
       let b = Number.parseInt(aux[i]);
       aux[i]=b;
       if(isNaN(aux[i])){
          aux[i]=0;
       }
    }
 
    aux.sort();
    console.table(aux);
 
    
    for(let i = 0; i < aux.length; i++){
       peso+=aux[i];
       console.log(camiones);
       console.log(peso);
       
       if(i+1!=aux.length){
 
          if((peso+aux[i+1])>1000 ){
            camiones++;
            peso=0;
          }else{
             if(peso==1000){
                camiones++;
                peso=0;
             }
          }
       }else{
          if(peso!=0){
          camiones++;
       }
       }
    }
    console.log(camiones);
 
    camiXcent[index]=camiones;
    
 }
 
 function iniciarLugar(){
 
    for( let i = 0 ; i < ubi.t.length ; i++ ){
       resumen.c.push(ubi.t[i]+ubi.n[i]);
       resumen.i.push(i);
    }
    console.log(resumen);
 
 }
 
 function crearResultados(){
    
    for(let y=0; y<totalCami; y++) {
        resultado[y] = new Array(2);
    }
 
    //rellenar camion
 
    camiXcent.forEach(relleCent);
    carga.reverse();
    centros.reverse();
    for(let i = 0 ; i < totalCami; i++){
       resultado[i][0] = centros.pop();
       resultado[i][1] = carga.pop();
       
    }
    
    dsplayResultados();
 
    console.log(resultado);   
 }
 
 function relleCent(element, index){
    for(let i=0;i<element;i++){
       centros.push(`C${index}`);
    }
 }
 
 function calcularCentros(){
    //cd
    
    for(let i = 0 ; i < dem.c.length;i++){
       if(cd.includes(dem.c[i])==false){
          cd.push(dem.c[i]);
       }
    }
 
    cargaXcentro();
 }