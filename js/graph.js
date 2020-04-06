var datosTotales = [];
var diasARepresentar = [];
var infectadosARepresentar = [];
var muertosARepresentar = [];
var infectadosActualesARepresentar = [];
var curadosARepresentar = [];
var lineChartData = {};

window.randomScalingFactor = function() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};

window.onload = function() {
    
};


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

function getDias() {
   datosTotales.forEach(x => diasARepresentar.push(x.dia)); 
}

function getInfectadosTotales() {
    datosTotales.forEach(x => infectadosARepresentar.push(x.infectados));
}

function getMuertosARepresentar() {
    datosTotales.forEach(x => muertosARepresentar.push(x.fallecidos));
}

function getInfectadosActualesARepresentar() {
    datosTotales.forEach(x => infectadosActualesARepresentar.push(x.casosActivos));
}

function getCuradosARepresentar() {
    datosTotales.forEach(x => curadosARepresentar.push(x.aumentoCurados));
}

window.getData = function() {
    this.getJSON("https://raw.githubusercontent.com/SergioMartinAlvaro/covid-spain-graphics/master/js/data.json", function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
          } else {
            datosTotales = data;
            getDias();
            getInfectadosTotales();
            getMuertosARepresentar();
            getInfectadosActualesARepresentar();
            getCuradosARepresentar();
            initializeGraphics();
          }
    });
}

function initializeGraphics() {
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
            responsive: true,
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



getData();





