require("aframe");
const d3 = require("d3");
window.onload = function () {
  function generateData() {
    return [{"label":"Apples","x":9,"z":1,"y":22,"customer":"Store A","size":1,"color":"yellow"},{"label":"Bananas","x":4,"z":2,"y":25,"customer":"Store A","size":1,"color":"yellow"},{"label":"Cantaloupe","x":9,"z":9,"y":16,"customer":"Store A","size":1,"color":"yellow"},{"label":"Dates","x":6,"z":7,"y":2,"customer":"Store A","size":1,"color":"red"},{"label":"Grapes","x":4,"z":7,"y":22,"customer":"Store A","size":1,"color":"yellow"}]
  }

  function generateBars(scale) {
    var bars = scene.selectAll("a-box")
      .data(data)
      .enter()
      .append("a-box")
      .attr("class", "bar")
      .attr("color", d => d.color)
      .attr("depth", 1)
      .attr("height", d => scale(d.y))
      .attr("width", 1)
      .attr("opacity", 0.75)
      .attr("position", d => `${d.x} 0 ${d.z}`)
      .attr("data-color", d => d.color)
      .attr("data-label", d => d.label)
      .attr("data-value", d => d.y);
    return bars;
  }

  function setLabels(bars, scale) {
    bars.append("a-text")
      .attr('color', 'black')
      .attr('align', 'center')
      .attr('position', d => `0 ${scale(d.y)/2+.5} 0`)
      .attr('scale', '1 1 1')
      .attr("value", d => `${d.label}: ${d.y}`);
  }

  function showLabel(bar, d) {
    bar.select("a-text")
      .attr('color', 'black')
	    .attr('align', 'center')
	    .attr('position', `0 ${d.y/2+.5} 0`)
	    .attr('scale', '1 1 1')
      .attr("value", `${d.label}: ${d.y}`);
  }

  function hideLabel(bar) {
    bar.select("a-text")
      .attr("scale", ".01 .01 .01");
  }

  var scene = d3.select("a-scene");
  var data = generateData();
  var scale = d3.scaleLinear().domain([0, 22]).range([0,3]);
  var bars = generateBars(scale);
  setLabels(bars, scale);
  bars.on("mouseenter", function (d, i) {
      if (this.overing) return;
      this.hovering = true;
      var bar = d3.select(this);
      console.log(scale(bar.attr("data-value")))
      bar.transition().duration(10).attr("color", "red");
    })
    .on("mouseleave", function (d, i) {
      this.hovering = false;
      var bar = d3.select(this);
      bar.transition().duration(10)
        .attr("color", bar.attr("data-color"));
    });
}