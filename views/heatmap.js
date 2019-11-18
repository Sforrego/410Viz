/**
 * Created by joycheng on 2019-11-12.
 */
//import * as d3 from '../lib/d3.v3.min';

var margin = { top: 50, right: 0, bottom: 100, left: 40 },
    developers = ["Dev1", "Dev2", "Dev3", "Dev4", "Dev5", "Dev6", "Dev7"],
    width = 1060 - margin.left - margin.right,
    height = developers.length * 100 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 6),
    legendElementWidth = 88,
    buckets = 9,
    colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
    periods = ['\u2264'+"1day", '\u2264'+"7days", '\u2264'+"30days", '\u2264'+"90days", '\u2264'+"180days", '\u2265'+"180days"];
    datasets = ["data.json", "data2.json"];

var gridSizeY = Math.floor(height / developers.length);

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dayLabels = svg.selectAll(".developerLabel")
    .data(developers)
    .enter().append("text")
    .text(function (d) { return d; })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSizeY; })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSizeY / 1.5 + ")")
    .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

var timeLabels = svg.selectAll(".periodLabel")
    .data(periods)
    .enter().append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return i * gridSize; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

var heatmapChart = function(data) {

        d3.json(data, function (data) {

        var colorScale = d3.scale.quantile()
            .domain([0, buckets - 1, Math.max.apply(Math, data.map(function (d) {
                return d.Value;
            }))])
            .range(colors);

        var cards = svg.selectAll(".Period")
            .data(data, function (d) {
                return d.Developer + ':' + d.Period;
            });

        cards.append("title");

        cards.enter().append("rect")
            .attr("x", function (d) {
                return (d.Period - 1) * gridSize;
            })
            .attr("y", function (d) {
                return (d.Developer - 1) * gridSizeY;
            })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", "Period bordered")
            .attr("width", gridSize)
            .attr("height", gridSizeY)
            .style("fill", colors[0]);

        cards.transition().duration(1000)
            .style("fill", function (d) {
                return colorScale(d.Value);
            });

        cards.select("title").text(function (d) {
            return d.Value;
        });

        cards.exit().remove();

        var legend = svg.selectAll(".legend")
            .data([0].concat(colorScale.quantiles()), function (d) {
                return d;
            });

        legend.enter().append("g")
            .attr("class", "legend");

        legend.append("rect")
            .attr("x", function (d, i) {
                return legendElementWidth * i;
            })
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", 20)
            .style("fill", function (d, i) {
                return colors[i];
            });

        legend.append("text")
            .attr("class", "mono")
            .text(function (d) {
                return "≥ " + Math.round(d);
            })
            .attr("x", function (d, i) {
                return legendElementWidth * i;
            })
            .attr("y", height + gridSize);

        legend.exit().remove();
        });
};

heatmapChart(datasets[0]);

var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
    .data(datasets);

datasetpicker.enter()
    .append("input")
    .attr("value", function(d){ return "Dataset " + d })
    .attr("type", "button")
    .attr("class", "dataset-button")
    .on("click", function(d) {
        heatmapChart(d);
    });