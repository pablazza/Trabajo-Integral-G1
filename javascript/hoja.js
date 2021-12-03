//ubi,dem

class lugar {
   constructor( c, i) {
       this.c = [];
       this.i = [];
   }
}

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