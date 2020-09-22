var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}



// selecting class chart append svg
var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", 600)
  .attr("height", 500)
  .style("margin-left", 10);

var tooltip = d3
  .select("body")
  .append("div")
  .style("position", "absolute")
  .style("padding", "6px")
  .style("font-size", "10px")
  .style("border-style", "solid")
  .style("border-width", "1px")
  .style("background", "white");

// creating margins, heights, widths
var margin = { top: 20, right: 100, bottom: 350, left: 30 };
var graphWidth = 600 - margin.left - margin.right;
var graphHeight = 600 - margin.top - margin.bottom;

// crating group, axes groups
var graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);
var yAxisGroup = graph.append("g");

//getting data from json file and manipulate the data with D3
d3.json("hw3data.json").then((data) => {
  var y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students)])
    .range([graphHeight, 0]);

  var x = d3
    .scaleBand()
    .domain(data.map((item) => item.term))
    .range([0, graphWidth])
    .padding(0.1);

  var rects = graph.selectAll("rect").data(data);

  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.students))
    .attr("x", (d) => x(d.term))
    .attr("y", (d) => y(d.students))

    .on("mouseover", function (d) {
      tooltip.transition().style("opacity", 1);
      tooltip
        .html("Term - Students" + "<br>" + d.term + " - " + d.students)
        .style("left", d3.event.pageX - 35 + "px")
        .style("top", d3.event.pageY - 40 + "px");
    })
    .on("mouseout", function (d) {
      d3.select(this).style("opacity", 1);
    });

  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y).ticks(3);
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
});




