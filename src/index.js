require("aframe");
require("aframe-charts-component");

AFRAME.components["charts"].Component.prototype.update = function (newData) {
  const data = this.data;
  if (newData != null && newData.dataPoints) {
    this.loader.load(newData.dataPoints, this.onDataLoaded.bind(this));
  } else if (data.dataPoints) {
    console.log(data.dataPoints);
    this.onDataLoaded(data.dataPoints);
  } else if (data.type === "totem") {
    this.generateTotem(data, this.el);
  }
}

window.onload = function () {
  function generateData() {
    return [{ "label": "Apples", "x": 9, "z": 1, "y": 22, "customer": "Store A", "size": 1, "color": "red" }, { "label": "Bananas", "x": 4, "z": 2, "y": 25, "customer": "Store A", "size": 1, "color": "yellow" }, { "label": "Cantaloupe", "x": 9, "z": 9, "y": 16, "customer": "Store A", "size": 1, "color": "orange" }, { "label": "Dates", "x": 6, "z": 7, "y": 2, "customer": "Store A", "size": 1, "color": "green" }, { "label": "Grapes", "x": 4, "z": 7, "y": 22, "customer": "Store A", "size": 1, "color": "blue" }]
  }

  var aScene = document.querySelector('a-scene');

  var data = JSON.stringify(generateData());

  var newVoxelEl = document.createElement('a-entity');
  newVoxelEl.setAttribute('charts', 'type: bar; dataPoints: ' + data + '; axis_text_color: black; show_legend_info: true');

  aScene.appendChild(newVoxelEl);
}