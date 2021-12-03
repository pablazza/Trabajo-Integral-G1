window.addEventListener('load', () => {

    document.getElementById('productos').addEventListener('change', abrirArchivo2);

});

window.onload = function () {
    leerContenido();
}

function abrirArchivo2(evento) {
    let archivo = evento.target.files[0];

    if (archivo) {
        let lector = new FileReader();
        lector.onload = function (e) {
            let contenido = e.target.result;
            mostrarContenidoDemanda(contenido);
        };
        lector.readAsText(archivo);
    }
}


function mostrarContenidoDemanda(contenido) {

    var elemento = document.getElementById('demanda');
    elemento.innerHTML = contenido;
}

function leerContenido() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("coordenadas").innerHTML = this.responseText;
        }
    };
    xhr.open("GET", "ubicaciones.txt", true);
    xhr.send();
}