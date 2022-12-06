import { Chart } from 'chart.js/auto'

(async function() {
  var marksCanvas = document.getElementById("radarchart");

  var marksData = {
    labels: ["Avg % Physically Unhealthy Days",  "Avg % Mentally Unhealthy Days", 
              "% Fair or Poor Health", "% No College", "% Insufficient Sleep"],
    datasets: [{
      label: "King County, WA",
      backgroundColor: "rgba(200,0,0,0.2)",
      data: [100*3.24/30, 3.69, 12.7, 100-82.11, 30.31]
    }, {
      label: "McDowell County, WV",
      backgroundColor: "rgba(0,0,200,0.2)",
      data: [100*7.21/30, 7.46, 37.5, 100-26.78, 47.38]
    }]
  };

  var radarChart = new Chart(marksCanvas, {
    type: 'radar',
    data: marksData
  });
})();