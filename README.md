# Grapherate

Quick graphing of Phant.js streams from data.sparkfun.com. 
 

Try the very basic early release at https://jywarren.github.com/grapherate

Grapherate will consist of:

* a JS library to construct a d3.js graph from a passed Phant key (hosted at data.sparkfun.com)
* a form-based graph wizard at the static landing page (index.html)
* a graph page which constructs a Grapherate graph from URL GET parameters
* an embed-generating modal (based on grapherate.generateEmbed(options))

To use it **right now** with a Phant public key, add your key to the end of this URL:

    https://jywarren.github.com/grapherate?key=YOUR_KEY_HERE

**********************************

##Constructor

Construct a graph by passing a DOM element and options object:

````js
var graph = new Grapherate(
  'asdfadsjklgja', // your Phant/data.sparkfun.com public key
  {
   selector: '#graph', // d3/jQuery style DOM selector, default '.graph'
});
````

##Options

Current options include:

* `width`    - default width of graph including margins (not overall page)
* `height`   - default height of graph including margins (not overall page)
* `selector` - default element to insert graph into
* `format`   - default to CSV
* `delay`    - delay between updates, in milliseconds
* `xKey`     - field to use for the x-axis -- 'timestamp' is default Phant
* `yScale`   - which key to use as the y scale? Or get rid of this.
* `live`     - whether to keep refreshing every <graph.delay> milliseconds
* `onLoad`   - function to call after we've fetched Phant stream details; accepts an object with those deets


**********************************


##Work plan:

@dwblair and @jywarren hashed out this basic spec; this is now moved into [github issues](https://github.com/jywarren/grapherate/issues).

