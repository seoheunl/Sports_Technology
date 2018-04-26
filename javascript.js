// Initialize Firebase
var config = {
  apiKey: "AIzaSyACkpbw7M9mGnjfm1dSNgAxwH4KbS4qsHY",
  authDomain: "sports-technology.firebaseapp.com",
  databaseURL: "https://sports-technology.firebaseio.com",
  // projectId: "sports-technology",
  storageBucket: "sports-technology.appspot.com",
  // messagingSenderId: "551014293574"
};

firebase.initializeApp(config);
var shots = firebase.database().ref("shots");

// Writing into Firebase
function onSubmit() {
  var x = $("#x_coord").text();
  var y = $("#y_coord").text();
  var success = $("#shot_success").val();

  shots.push({
    "X_coord": x,
    "Y_coord": y,
    "shot_success" : success
  });
  // alert("This shot has been recorded!");
}


// X, Y coordinates for backboard
$(document).ready(function() {
    $("#backboard").on("click", function(event) {
        var x = event.pageX - this.offsetLeft;
        var y = event.pageY - this.offsetTop;
        $("#x_coord").text("X: " + x);
        $("#y_coord").text("Y: " + y);
    });
});


function drawScatterChart() {
  var data = google.visualization.arrayToDataTable([
    ['X', 'Y'],
    [ 8,      12],
    [ 4,      5.5],
    [ 11,     14],
    [ 4,      5],
    [ 3,      3.5],
    [ 6.5,    7]
  ]);

  var options = {
    title: 'Scatter Plot of Your Shots',
    hAxis: {title: 'X', minValue: 0, maxValue: 15},
    vAxis: {title: 'Y', minValue: 0, maxValue: 15},
    legend: 'none'
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('scatter_chart'));

  chart.draw(data, options);
}


// Drawing speed chart
function drawSpeedChart() {
  // Define the chart to be drawn.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Time');
  data.addColumn('number', 'Speed');
  data.addRows([
     ['00:00:00', 0],
     ['00:00:10', 1],
     ['00:00:20', 2],
     ['00:00:30', 1],
     ['00:00:40', 1],
     ['00:00:50', 2],
     ['00:01:00', 5],
     ['00:01:10', 10],
     ['00:01:20', 15],
     ['00:01:30', 14],
     ['00:01:40', 13],
     ['00:01:50', 10],
     ['00:02:10', 5],
     ['00:02:20', 3],
     ['00:02:30', 0],
  ]);
         
  // Set chart options
  var options = {'title' : 'Speed of Your Shot',
     hAxis: {
        title: 'Time'
     },
     vAxis: {
        title: 'Speed'
     },   
     'width':700,
     'height':400,   
  };

  // Instantiate and draw the chart.
  var chart = new google.visualization.LineChart(document.getElementById('speed_chart'));
  chart.draw(data, options);
}

google.charts.setOnLoadCallback(drawScatterChart);
google.charts.setOnLoadCallback(drawSpeedChart);



