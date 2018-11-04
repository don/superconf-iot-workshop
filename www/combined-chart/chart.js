var ctx = document.getElementById("chart").getContext("2d");

var data = {
    labels: [],
    datasets: [
        {
            label: "Temperature (°F)",
            backgroundColor: "rgba(100, 50, 50, 0.2)",
            borderColor: "rgba(100, 50, 50, 1)",
            borderWidth: 1,
            pointRadius: 0,
            data: [],
            yAxisID: 'y-axis-1'
        },
        {
            label: "Humidity (%)",
            backgroundColor: "rgba(50, 100, 50, 0.2)",
            borderColor: "rgba(50, 100, 50, 1)",
            borderWidth: 1,
            pointRadius: 0,
            data: [],
            yAxisID: 'y-axis-2'
        }
    ]
};

// TODO suggested min and max
let options = {
    responsive: true,
    hoverMode: 'index',
    stacked: false,
    title: {
        display: true,
        text: 'MRK 1010 Temperature & Humidity'
    },
    scales: {
        yAxes: [{
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'left',
            id: 'y-axis-1',
            scaleLabel: {
                display: true,
                labelString: 'Degrees Fahrenheit',
            }
        }, {
            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: 'right',
            id: 'y-axis-2',
            scaleLabel: {
                display: true,
                labelString: 'Relative Humidity Percent',
            },
            // grid line settings
            gridLines: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
        }],
    }
};

// TODO update the format
var chart = new Chart.Line(ctx, { data: data, options: options });