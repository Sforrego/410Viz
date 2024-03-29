var windowHeight = $(window).height();
var windowWidth = $(window).width();

var developerNameOnYAxis = [];

var responseData;

var dynamicLongestDeveloperLength = 0;

var setDynamicLongestDeveloperLength = function (nameLength) {
    dynamicLongestDeveloperLength = nameLength * 10;
}

var setDeveloperNameArr = function (nameArray) {
    developerNameOnYAxis = nameArray;
}

var heatmapChart = function(data) {

var margin = { top: 50, right: dynamicLongestDeveloperLength, bottom:200, left: dynamicLongestDeveloperLength },
    width = windowWidth - margin.left - margin.right,
    height = (Math.floor((windowHeight - margin.top - margin.bottom) / developerNameOnYAxis.length) < 40) ? developerNameOnYAxis.length * 40 + margin.top + margin.bottom : windowHeight - margin.top - margin.bottom,
    gridSizeX = Math.floor(width / 6),
    gridSizeY = (Math.floor(height / developerNameOnYAxis.length) < 40) ? 40 : Math.floor(height / developerNameOnYAxis.length),
    legendElementWidth = 100,
    buckets = 9,
    colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
    //periods = ['\u2264'+"1day", '\u2264'+"7days", '\u2264'+"30days", '\u2264'+"90days", '\u2264'+"180days", '\u2265'+"180days"];
    periods = ["Less than a day", '1 to 3 days', '4 to 7 days', "8 to 14 days", "15 to 21 days", "More than 21 days"];
    //datasets = ["data.json", "data2.json"];
    //datasets = json;


var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom - 100)
    .attr("overflow", "auto")
    .append("g")
    .attr("transform", "translate(" + margin.left +  "," + margin.top + ")");

var periodAxisLabel = d3.select("g")
    .append("text")
    .text("Time taken to resolve pull request")
    .attr("font-weight", 700)
    .attr("class", "mono")
    .style("text-decoration", "underline")  
    .attr("y", -30)
    .attr("x", width/3)
    .style("font-size", "16px");

var developerAxisLabel = d3.select("g")
    .append("text")
    .text("Developers")
    .attr("font-weight", 700)
    .attr("class", "mono")
    .style("text-decoration", "underline")  
    .style("font-size", "16px")
    .attr("x", -150)
    .attr("y", 20);

var developerLabel = svg.selectAll(".developerLabel")
    .data(developerNameOnYAxis)
    .enter().append("text")
    .text(function (d) { return d; })
    .attr("class", "mono")
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSizeY; })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSizeY / 2 + ")");

var periodLabel = svg.selectAll(".periodLabel")
    .data(periods)
    .enter().append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return i * gridSizeX; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("class", "mono")
    .attr("transform", "translate(" + gridSizeX / 2 + ", -6)");



    // console.log("here is name length " + dynamicLongestDeveloperLength)

        //d3.json(data, function (data) {

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
                return (d.Period - 1) * gridSizeX;
            })
            .attr("y", function (d) {
                return (d.Developer - 1) * gridSizeY;
            })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", "Period bordered")
            .attr("width", gridSizeX)
            .attr("height", gridSizeY)
            .style("fill", colors[0]);

        cards.transition().duration(1000)
            .style("fill", function (d) {
                return colorScale(d.Value);
            });

        cards.select("title").text(function (d) {
            return d.Value;
        });

        cards.on('mouseover', function (e) {
            var offset = $('#chart > svg > g').offset();
            var x = this.x.animVal.value + offset.left + 120;
            var y = this.y.animVal.value + offset.top + 30;

            var content = '<span>Total number of pull requests: </span>' +
                '<span class="value" style="color:#F79742;"><b> [' + e.Value + '/' + e.TotalValue + ']</b></span> <br>';

            nvtooltip.show([x, y], content);
        });

        cards.on('mouseout', function (e) {
            nvtooltip.cleanup();
        });

        cards.exit().remove();

        // console.log(cards);


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
            .attr("y", height + 15)
            .attr("width", legendElementWidth)
            .attr("height", 30)
            .style("fill", function (d, i) {
                return colors[i];
            });

        legend.append("text")
            .attr("class", "mono")
            .text(function (d) {
                return "≤ " + Math.round(d);
            })
            .attr("x", function (d, i) {
                return legendElementWidth * i;
            })
            .attr("y", height + 55);

        legend.append("text")
            .attr("class", "mono")
            .text("Number of pull requests resolved in a given timeframe")
            .style("font-size", "16px")
            .style("text-decoration", "underline")  
            .attr("x", width / 3.5)
            .attr("y", height + 80);

        legend.exit().remove();
        //});

        $('#update').click(function() {

      // updates developers labels creates new data and updates heatmap

      var developers = [];
      var select = document.getElementById('menu');
      for(var i =0; i < select.length; i++){
          developers.push(select.options[i].text);
      }

      // values receives the selected options
      var values = $('#menu').val()
      // for(var i = values.length-1; i < developers.length;i++){
      //   values.push("");
      // }


      var new_data = updateData(responseData, developers, values);

      updateHeatmap(new_data, svg);
      // get a list of the developers that got selected but just numbers

      });


};

//heatmapChart(datasets[0]);

// var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
//     .data(datasets);

// datasetpicker.enter()
//     .append("input")
//     .attr("value", function(d){ return "Dataset " + d })
//     .attr("type", "button")
//     .attr("class", "dataset-button")
//     .attr("margin-top", height + 70)
//     .on("click", function(d) {
//         heatmapChart(d);
//     });


$(document).ready(function() {
    $('#submit').click(function() {
        var repoUrl = $('#repoUrl').val();
        var monthYear = $('#monthYear').val();
        if (repoUrl === "" || monthYear === "") {
            alert("please fill out fields");
            return false;
        }
        //alert( "repoUrl: " + repoUrl + " monthYear: " + monthYear );
        $.ajax({
            url: "/generate",
            dataType: 'json',
            data: {
                repoURL: $('#repoUrl').val(),
                monthYear: $('#monthYear').val()
            },
            type: 'POST',
            success: function(response) {
                console.log(response);
                setDynamicLongestDeveloperLength(response.nameLength);
                setDeveloperNameArr(response.devList);

                // populates the multi select
                var devs = response.devList;
                var select_data = [];
                for (var i in devs) {
                  select_data.push({label:devs[i],value:devs[i]});
                }
                $("#menu").multiselect('dataprovider', select_data);
                document.getElementById('menu').style.visibility='visible';
                document.getElementById('update').style.visibility='visible';
                //
                responseData = response.data;
                heatmapChart(response.data);
            },
            error: function(error) {
                console.log(error);
            }
        })
      });



});

// Tooltip js
(function($) {

    var nvtooltip = window.nvtooltip = {};

    nvtooltip.show = function(pos, content, gravity, dist) {
        var container = $('<div class="nvtooltip">');

        gravity = gravity || 's';
        dist = dist || 20;

        container
            .html(content)
            .css({left: -1000, top: -1000, opacity: 0})
            .appendTo('body');

        var height = container.height() + parseInt(container.css('padding-top'))  + parseInt(container.css('padding-bottom')),
            width = container.width() + parseInt(container.css('padding-left'))  + parseInt(container.css('padding-right')),
            windowWidth = $(window).width(),
            windowHeight = $(window).height(),
            scrollTop = $('body').scrollTop(),
            left, top;


        switch (gravity) {
            case 'e':
            case 'w':
            case 'n':
                left = pos[0] - (width / 2);
                top = pos[1] + dist;
                if (left < 0) left = 5;
                if (left + width > windowWidth) left = windowWidth - width - 5;
                if (scrollTop + windowHeight < top + height) top = pos[1] - height - dist;
                break;
            case 's':
                left = pos[0] - (width / 2);
                top = pos[1] - height - dist;
                if (left < 0) left = 5;
                if (left + width > windowWidth) left = windowWidth - width - 5;
                if (scrollTop > top) top = pos[1] + dist;
                break;
        }

        container
            .css({
                left: left,
                top: top,
                opacity: 1
            });
    };

    nvtooltip.cleanup = function() {
        var tooltips = $('.nvtooltip');

        // remove right away, but delay the show with css
        tooltips.css({
            'transition-delay': '0 !important',
            '-moz-transition-delay': '0 !important',
            '-webkit-transition-delay': '0 !important'
        });

        tooltips.css('opacity',0);

        setTimeout(function() {
            tooltips.remove()
        }, 500);
    };

})(jQuery);

function updateHeatmap(data, svg){
  // THIS CHANGES THE COLOR SCALE BECAUSE ITS USING NEW DATA
  svg.selectAll("*").remove();
  d3.select("svg").remove();

  heatmapChart(data);
}

function updateData(data, old_devs, new_devs){
  var devs_num = [];
  var new_data = [];

  setDeveloperNameArr(new_devs);

  // clon data into temp_data
  var temp_data = JSON.parse(JSON.stringify(data));

  // get the position of the new devs
  for (var i = 0 ; i<  old_devs.length;i++){
    if (new_devs.includes(old_devs[i])){
      devs_num.push((parseInt(i, 10)+1).toString(10));
    }
  }

  // rewrite the data by selecting the new_devs and asigning them new positions
  for (var j = 0; j < data.length; j++){
    if (devs_num.includes(data[j].Developer.toString(10))){
      temp_data[j].Developer = devs_num.indexOf(data[j].Developer.toString(10))+1;
      new_data.push(temp_data[j]);
    }
  }
    return new_data;

}
