/* Arrays de valores que se utilizan para representar en las gráficas */

var datosTotales = [];
var diasARepresentar = [];
var infectadosARepresentar = [];
var muertosARepresentar = [];
var infectadosActualesARepresentar = [];
var curadosARepresentar = [];
var infectadosSubidaARepresentar = [];
var casosActivosSubidaARepresentar = [];
var curadosSubidaARepresentar = [];
var muertosSubidaARepresentar = [];



/* Función que extrae del fichero JSON los valores */

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

/* Funciones que rellenan los arrays de datos con los datos del objeto JSON */

function getDias() {
   datosTotales.forEach(x => diasARepresentar.push(x.dia)); 
}

function getInfectadosTotales() {
    datosTotales.forEach(x => infectadosARepresentar.push(x.infectados));
}

function getInfectadosSubidaARepresentar() {
    datosTotales.forEach(x => infectadosSubidaARepresentar.push(x.aumentoInfectados));
}

function getMuertosARepresentar() {
    datosTotales.forEach(x => muertosARepresentar.push(x.fallecidos));
}

function getMuertosSubidaARepresentar() {
    datosTotales.forEach(x => muertosSubidaARepresentar.push(x.aumentoFallecidos));
}

function getInfectadosActualesARepresentar() {
    datosTotales.forEach(x => infectadosActualesARepresentar.push(x.casosActivos));
}

function getInfectadosActualesSubidaARepresentar() {
    datosTotales.forEach(x => casosActivosSubidaARepresentar.push(x.aumentoCasosActivos));
}

function getCuradosARepresentar() {
    datosTotales.forEach(x => curadosARepresentar.push(x.curados));
}

function getCuradosSubidaARepresentar() {
    datosTotales.forEach(x => curadosSubidaARepresentar.push(x.aumentoCurados));
}

function inicializarDatos() {
    getDias();
    getInfectadosTotales();
    getMuertosARepresentar();
    getInfectadosActualesARepresentar();
    getCuradosARepresentar();
    getInfectadosSubidaARepresentar();
    getMuertosSubidaARepresentar();
    getInfectadosActualesSubidaARepresentar();
    getCuradosSubidaARepresentar();
}

/* Funciones que crean los gráficos */

function initializeGraficoLineal() {
    config = {
        type: 'line',
        data: {
            labels: diasARepresentar,
            datasets: [{
                label: 'Infectados Totales',
                backgroundColor: "red",
                borderColor: "red",
                data: infectadosARepresentar,
                fill: false,
            }, {
                label: 'Fallecidos',
                fill: false,
                backgroundColor: "black",
                borderColor: "black",
                data: muertosARepresentar,
            }, {
                label: 'Casos Activos',
                fill: false,
                backgroundColor: "blue",
                borderColor: "blue",
                data: infectadosActualesARepresentar,
            },{
                label: 'Curados',
                fill: false,
                backgroundColor: "green",
                borderColor: "green",
                data: curadosARepresentar,
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Gráfica lineal COVID-19 España'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Día'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Casos'
                    }
                }]
            }
        }
    };
        var ctx = document.getElementById('canvas').getContext('2d');
        window.myLine = new Chart(ctx, config);


}

function initializeGraficoPorcentual() {
    configPercent = {
        type: 'line',
        data: {
            labels: diasARepresentar,
            datasets: [{
                label: 'Aumento Infectados Diario',
                backgroundColor: "red",
                borderColor: "red",
                data: infectadosSubidaARepresentar,
                fill: false,
            }, {
                label: 'Aumento Fallecidos Diario',
                fill: false,
                backgroundColor: "black",
                borderColor: "black",
                data: muertosSubidaARepresentar,
            }, {
                label: 'Aumento Casos Activos',
                fill: false,
                backgroundColor: "blue",
                borderColor: "blue",
                data: casosActivosSubidaARepresentar,
            },{
                label: 'Aumento Curados Diario',
                fill: false,
                backgroundColor: "green",
                borderColor: "green",
                data: curadosSubidaARepresentar,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Gráfica percentil COVID-19 España'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Día'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Porcentaje'
                    }
                }]
            }
        }
    };
        var ctxr = document.getElementById('canvas-percent').getContext('2d');
        window.myLine = new Chart(ctxr, configPercent);


}

/* Función que muestra los datos obtenidos e inicializa los gráficos en pantalla */
window.inicializarGraficas = function() {
    this.getJSON("https://raw.githubusercontent.com/SergioMartinAlvaro/covid-spain-graphics/master/js/data.json", function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
          } else {
            datosTotales = data;
            inicializarDatos();
            initializeGraficoLineal();
            initializeGraficoPorcentual();
          }
    });
}



inicializarGraficas();





