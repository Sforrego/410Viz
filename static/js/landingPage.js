// this is where the code that will take the time frame given by the user and pass on the information
// to the back end where the http requests will be made
var json = [
    {
      "Developer": "1",
      "Period": "1",
      "Value": "16"
    },
    {
      "Developer": "1",
      "Period": "2",
      "Value": "20"
    },
    {
      "Developer": "1",
      "Period": "3",
      "Value": "0"
    },
    {
      "Developer": "1",
      "Period": "4",
      "Value": "0"
    },
    {
      "Developer": "1",
      "Period": "5",
      "Value": "0"
    },
    {
      "Developer": "1",
      "Period": "6",
      "Value": "2"
    },
    {
      "Developer": "2",
      "Period": "1",
      "Value": "6"
    },
    {
      "Developer": "2",
      "Period": "2",
      "Value": "2"
    },
    {
      "Developer": "2",
      "Period": "3",
      "Value": "0"
    },
    {
      "Developer": "2",
      "Period": "4",
      "Value": "0"
    },
    {
      "Developer": "2",
      "Period": "5",
      "Value": "0"
    },
    {
      "Developer": "2",
      "Period": "6",
      "Value": "2"
    },
    {
      "Developer": "3",
      "Period": "1",
      "Value": "5"
    },
    {
      "Developer": "3",
      "Period": "2",
      "Value": "8"
    },
    {
      "Developer": "3",
      "Period": "3",
      "Value": "8"
    },
    {
      "Developer": "3",
      "Period": "4",
      "Value": "0"
    },
    {
      "Developer": "3",
      "Period": "5",
      "Value": "0"
    },
    {
      "Developer": "3",
      "Period": "6",
      "Value": "2"
    },
    {
      "Developer": "4",
      "Period": "1",
      "Value": "0"
    },
    {
      "Developer": "4",
      "Period": "2",
      "Value": "0"
    },
    {
      "Developer": "4",
      "Period": "3",
      "Value": "0"
    },
    {
      "Developer": "4",
      "Period": "4",
      "Value": "0"
    },
    {
      "Developer": "4",
      "Period": "5",
      "Value": "0"
    },
    {
      "Developer": "4",
      "Period": "6",
      "Value": "2"
    },
    {
      "Developer": "5",
      "Period": "1",
      "Value": "2"
    },
    {
      "Developer": "5",
      "Period": "2",
      "Value": "0"
    },
    {
      "Developer": "5",
      "Period": "3",
      "Value": "8"
    },
    {
      "Developer": "5",
      "Period": "4",
      "Value": "2"
    },
    {
      "Developer": "5",
      "Period": "5",
      "Value": "0"
    },
    {
      "Developer": "5",
      "Period": "6",
      "Value": "2"
    },
    {
      "Developer": "6",
      "Period": "1",
      "Value": "2"
    },
    {
      "Developer": "6",
      "Period": "2",
      "Value": "0"
    },
    {
      "Developer": "6",
      "Period": "3",
      "Value": "2"
    },
    {
      "Developer": "6",
      "Period": "4",
      "Value": "0"
    },
    {
      "Developer": "6",
      "Period": "5",
      "Value": "0"
    },
    {
      "Developer": "6",
      "Period": "6",
      "Value": "0"
    },
    {
      "Developer": "7",
      "Period": "1",
      "Value": "7"
    },
    {
      "Developer": "7",
      "Period": "2",
      "Value": "6"
    },
    {
      "Developer": "7",
      "Period": "3",
      "Value": "0"
    },
    {
      "Developer": "7",
      "Period": "4",
      "Value": "0"
    },
    {
      "Developer": "7",
      "Period": "5",
      "Value": "0"
    },
    {
      "Developer": "7",
      "Period": "6",
      "Value": "0"
    },
    {
      "Developer": "8",
      "Period": "1",
      "Value": "0"
    },
    {
      "Developer": "8",
      "Period": "2",
      "Value": "2"
    },
    {
      "Developer": "8",
      "Period": "3",
      "Value": "2"
    },
    {
      "Developer": "8",
      "Period": "4",
      "Value": "0"
    },
    {
      "Developer": "8",
      "Period": "5",
      "Value": "2"
    },
    {
      "Developer": "8",
      "Period": "6",
      "Value": "100"
    },
    {
      "Developer": "9",
      "Period": "1",
      "Value": "6"
    },
    {
      "Developer": "9",
      "Period": "2",
      "Value": "22"
    },
    {
      "Developer": "9",
      "Period": "3",
      "Value": "0"
    },
    {
      "Developer": "9",
      "Period": "4",
      "Value": "0"
    },
    {
      "Developer": "9",
      "Period": "5",
      "Value": "33"
    },
    {
      "Developer": "9",
      "Period": "6",
      "Value": "5"
    }
  ];
var windowHeight = $(window).height();
var windowWidth = $(window).width();

var developers = ["Dev1", "SDFASFA SASD", "Dev3", "hello world", "jacob", "Dev6", "Dev7"];

var developers2fortesting = ["Dev1", "SDFASFA SASD", "Dev3", "hello world", "jacob", "Dev6", "Dev7", "here is long name", "another one blah"];

var dynamicLongestDeveloperLength = 200;

var margin = { top: 50, right: dynamicLongestDeveloperLength, bottom:200, left: dynamicLongestDeveloperLength },
    width = windowWidth - margin.left - margin.right,
    height = (Math.floor((windowHeight - margin.top - margin.bottom) / developers2fortesting.length) < 40) ? developers2fortesting.length * 40 + margin.top + margin.bottom : windowHeight - margin.top - margin.bottom,
    gridSizeX = Math.floor(width / 6),
    gridSizeY = (Math.floor(height / developers2fortesting.length) < 40) ? 40 : Math.floor(height / developers2fortesting.length),
    legendElementWidth = 100,
    buckets = 9,
    colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
    periods = ['\u2264'+"1day", '\u2264'+"7days", '\u2264'+"30days", '\u2264'+"90days", '\u2264'+"180days", '\u2265'+"180days"];
    //datasets = ["data.json", "data2.json"];
    //datasets = json;

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom - 100)
    .attr("overflow", "auto")
    .append("g")
    .attr("transform", "translate(" + margin.left +  "," + margin.top + ")");

var developerLabel = svg.selectAll(".developerLabel")
    .data(developers2fortesting)
    .enter().append("text")
    .text(function (d) { return d; })
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
    .attr("transform", "translate(" + gridSizeX / 2 + ", -6)");

var heatmapChart = function(data) {
        console.log(data);
        // this loads the multiselect menu with the developers names


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
            .attr("y", height + 10)
            .attr("width", legendElementWidth)
            .attr("height", 30)
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
            .attr("y", height + 55);

        legend.exit().remove();
        //});
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
                // console.log(response);
              var devs = developers2fortesting;
              var select_data = [];
              for (var i in devs) {
                select_data.push({label:devs[i],value:devs[i]});
              }
              $("#menu").multiselect('dataprovider', select_data);
              heatmapChart(json);
            },
            error: function(error) {
                console.log(error);
            }
        })
      });

      $('#update').click(function() {
        var developers = developers2fortesting

        var values = $('#menu').val()
        var values2 = values;
        for(var i = values.length-1; i < developers.length;i++){
          values2.push("");
        }

        developerLabel.data(values2);
        developerLabel.text(function (d) { return d; });
        var new_data = updateData(json, developers2fortesting, values);

        updateHeatmap(new_data, json);
        // get a list of the developers that got selected but just numbers

      });

});

// d3.select("#order").on("change",function(){
//   order(this.value);
// });
//
// function order(value){
//  if(value=="alpha"){
//    console.log(`Should transition ${value}`);
//    var t = svg.transition().duration(3000);
//    // t.selectAll("rect")
//    //   .attr("y", function(d) {
//    //     console.log(d);
//    //     return (d.Developer - 1) * gridSizeY; })
//    //   ;
//    developerLabel.data(developers2fortesting.sort());
//    developerLabel.text(function (d) { return d; });
//
//    cards.attr("x", function (d) {
//        return (d.Period - 1) * gridSizeX;
//    })
//    cards.attr("y", function (d) {
//        return (d.Developer - 1) * gridSizeY;})
//
// }};

// imagine i have a dictionary (id: user) and the data ({id, period, value})

function filter_by_name(idname,data,names_to_filter){
  filtered_data = [];
  for (i in data){
    console.log(idname[data[i].Developer])
    if (names_to_filter.includes(idname[data[i].Developer])){
      filtered_data.push(data[i])
    }
  }
  return filtered_data;
};

function updateHeatmap(data, original_data){
  //console.log(data);
  var colorScale = d3.scale.quantile()
      .domain([0, buckets - 1, Math.max.apply(Math, original_data.map(function (d) {
          return d.Value;
      }))])
      .range(colors);

  var heatmap = svg.selectAll(".Period")
  .data(data)
  .transition()
    .duration(500)
    .style("fill", function (d) {
        return colorScale(d.Value);
    });
}

function updateData(data, old_devs, new_devs){
  var devs_num = [];
  var new_data = [];
  var temp_data = JSON.parse(JSON.stringify(data));


  for (var i = 0 ; i<  old_devs.length;i++){
    if (new_devs.includes(old_devs[i])){
      devs_num.push((parseInt(i, 10)+1).toString(10));
    }
  }
  console.log(devs_num);
  for (var j = 0; j < data.length; j++){
    // is data changing when temp data does.
    if (devs_num.includes(data[j].Developer.toString(10))){
      console.log("in the iiff");
      console.log(devs_num.indexOf(data[j].Developer.toString(10)));
      temp_data[j].Developer = devs_num.indexOf(data[j].Developer.toString(10))+1;
      new_data.push(temp_data[j]);
    }
    console.log(data[j].Developer);
    console.log(j);
    console.log(data.length);
  }
  console.log(new_data);
  return new_data;

}
