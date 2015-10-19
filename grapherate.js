Grapherate = Class.extend({

  init: function(key, args) {

    var graph = this;

    graph.key = key || "mK5Llj6G2NUJ5Zd2y4ED";

    args = args || {};

    graph.width    = args['width']    || 900;         // default width of graph including margins (not overall page)
    graph.height   = args['height']   || 400;         // default height of graph including margins (not overall page)
    graph.selector = args['selector'] || '.graph';    // default element to insert graph into
    graph.format   = args['format']   || 'csv';       // default to CSV
    graph.delay    = args['delay']    || 10000;       // delay between updates, in milliseconds
    graph.xKey     = args['xKey']     || 'timestamp'; // field to use for the x-axis -- 'timestamp' is default Phant
    graph.yScale   = args['yScale']   || 0;           // which key to use as the y scale? Or get rid of this.
    graph.live     = args['live']     || true;        // whether to keep refreshing every <graph.delay> milliseconds
    graph.onLoad   = args['onLoad']   || false;       // function to call after we've fetched Phant stream details; accepts an object with those deets

    graph.dateParser = args['dateParser'] || "%Y-%m-%dT%H:%M:%S.%LZ"; // create a date parser; store it so it could be overridden:
    graph.parseDate = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse; // set it up as a d3 method for later use

    graph.el = $(graph.selector);

    // columns will each be represented as a line:
    graph.lines = [];


    // run every <graph.delay> milliseconds:
    // Currently, we do more in here than you might think, because we'll re-assess 
    // the options parameter each time. Or, we could make a new Grapherate object each time
    // the user wants different settings. Yeah... anyways. 
    graph.draw = function() {
    
      d3.csv("https://data.sparkfun.com/output/" + graph.key + ".csv", function(error, data) {
   
        // each column header 
        graph.keys = Object.keys(data[0]);

        // scan for our "timestamp" field:    
        data.forEach(function(d) {
    
          // parse the timestamp:
          d.date = graph.parseDate(d.timestamp);

        });

        // for each key:
        graph.keys.forEach(function(key, i) {

          // if it's a numeric column: 
          if (data[0][key] == +data[0][key]) {
 
            var line = d3.svg.line()
                             .x(function(d) { return graph.x(d.date); })
                             .y(function(d) { 
                                  if (d[key] == +d[key]) return d[key]; // if numeric entry
                                  else return 0;
                                });

            graph.lines.push(line);

          }

        });

        // set up the extent of the graph display, 
        // using what we've learned about the provided keys:
        graph.x.domain(d3.extent(data, function(d) { return d.date; }));
        graph.y.domain(d3.extent(data, function(d) { return d[graph.keys[graph.yScale]]; })); // restructure this to use a string

        // for each line:
        graph.lines.forEach(function(line, i) {

          // remove old versions of this line:
          graph.svg.select('.line' + i).remove()
    
          // add new version of this line:
          graph.svg.append("path")
                   .datum(data)
                   .attr("class", "line line" + i) // switch this to a direct attribute color, so it'll print that way in a download
                   .attr("d", line);

        });


      });
    }


    graph.setup = function() {

      graph.margin = {top: 20, right: 20, bottom: 30, left: 50};
      graph.d3width  = graph.width  - graph.margin.left - graph.margin.right,
      graph.d3height = graph.height - graph.margin.top  - graph.margin.bottom;

      graph.el.width(graph.width);
    
      graph.x = d3.time.scale()
                       .range([0, graph.d3width]);
      
      graph.y = d3.scale.linear()
                        .range([graph.d3height, 0]);
      
      graph.xAxis = d3.svg.axis()
                          .scale(graph.x)
                          .orient("bottom");
    
      graph.yAxis = d3.svg.axis()
                          .scale(graph.y)
                          .orient("left");
    
      graph.svg = d3.select(graph.selector)
                    .append("svg")
                    .attr("width",  graph.d3width  + graph.margin.left + graph.margin.right)
                    .attr("height", graph.d3height + graph.margin.top  + graph.margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + graph.margin.left + "," + graph.margin.top + ")");
    
      graph.svg.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate(0," + graph.d3height + ")")
               .call(graph.xAxis);
    
      graph.svg.append("g")
               .attr("class", "y axis")
               .call(graph.yAxis)
               .append("text")
               .attr("transform", "rotate(-90)")
               .attr("y", 6)
               .attr("dy", ".71em")
               .style("text-anchor", "end")
               .text("Percent (%)");

    }


    // get additional details from Phant API:
    graph.fetchDetails = function() {

      // d3 doesn't support jsonp, but jquery does
      $.ajax("https://data.sparkfun.com/streams/" + graph.key + ".json", {

        dataType: 'jsonp',
        contentType: "application/json",
        success: function(data) {

          if (data && data.stream && data.stream._doc) {
         
            var stream = data.stream._doc;
         
            graph.title = stream.title;
            graph.location = stream.location;
            graph.description = stream.description;
         
            if (graph.onLoad) graph.onLoad(stream);
         
          }

        }
      });

    }
  
// wait for jsonp fixes to Phant: https://github.com/sparkfun/phant/issues/145  
//    graph.fetchDetails();

    graph.setup();

    graph.draw();

    if (graph.live) graph.interval = setInterval(graph.draw, graph.delay);


  }

});
