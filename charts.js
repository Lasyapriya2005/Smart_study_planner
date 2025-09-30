let ctx = document.getElementById("taskChart").getContext("2d");
let taskChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#4CAF50", "#FF5722"],
      },
    ],
  },
});

function updateCharts() {
  let completed = tasks.filter((t) => t.completed).length;
  let pending = tasks.length - completed;
  taskChart.data.datasets[0].data = [completed, pending];
  taskChart.update();
}
