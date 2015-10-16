Grapherate = Class.extend({

  init: function() {

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var parseDate = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse;
    
    var x = d3.time.scale()
        .range([0, width]);
    
    var y = d3.scale.linear()
        .range([height, 0]);
    
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
    
    var line1 = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d[Object.keys(d)[0]]); });
    
    var line2 = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d[Object.keys(d)[0]]); });
    
    var svg = d3.select(".graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var draw = function() {
    
      var params = (window.location+"").split('?')[1]
      if (params) var key = params.split('key=')[1];
      else var key = "mK5Llj6G2NUJ5Zd2y4ED";
    
      //d3.csv("data.csv", function(error, data) {
      d3.csv("https://data.sparkfun.com/output/"+key+".csv", function(error, data) {
    
        var keys = Object.keys(data[0]);
    
        data.forEach(function(d) {
          keys.forEach(function(k) {
            if (k != 'timestamp') d[k] = +d[k];
          });
          d.date = parseDate(d.timestamp);
        });
     
        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain(d3.extent(data, function(d) { return d[keys[0]]; }));
    
        svg.select('.line1').remove()
        svg.select('.line2').remove()
    
        svg.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("class", "line1")
          .attr("d", line1);
    
        svg.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("class", "line2")
          .attr("d", line2);
     
      });
    }
    
    draw();
    setInterval(draw,5000);
    
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);
    
      svg.append("g")
         .attr("class", "y axis")
         .call(yAxis)
       .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", ".71em")
         .style("text-anchor", "end")
         .text("Percent (%)");

  }

});
