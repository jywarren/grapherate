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


##Work plan:

@dwblair and @jywarren hashed out this basic spec:


**********************************

##Landing page graph builder:


###Phant key:

* multiple keys: "ghost" a new field below key input
  * think about settings for multiple streams (just a big grid)


###File upload (a little later): 

* drag & drop
* not currently persistent, but we'd add a place to dump it... gist, phant, or our own?

Documentation page

* specifying CSV/JSON formats: 
  * for riffle, for example -- e.g. a column title = "temperature (C)" -- units in parentheses as a standard column convention



**********************************

##API constructor:

Include Grapherate with `bower install grapherate --save`

Construct a graph by passing a DOM element and options object:

`
new Grapherate(
  $('#graph')[0], // a DOM element
  {
   key: 'asdfadsjklgja', 
   xAxis: 'riffleTimestamp', // default 'timestamp'
   display: ['battery', 'temperature']
});
`


**********************************

##Graph display:

* all in same units for starters
* graph sized to all-over min/maximum
* client-rewritable permalink (grapherate.biz/#parameters) using hashes, so no page reloads
* link to phant original files / ability to download original data
* zoomable/pannable d3 awesomeness
* y-axis scaling

**********************************

##Config grid after graph generation:

* `&group_by=device_id` (and checkbox column in grid)
  * note string fields, say "would you like to group by 'device_id'"?
* select which units get their own axis by checkbox
  * unique units get min/max graph equalizing
* break continuous line over default distance <breakDistance> ?
* x-axis/time field selection with radio box
* ability to modify graph after displayed (adding / subtracting columns, units, etc) without having to start from scratch
  * column in "config grid" for hide/show each parameter


**********************************

##Stream caching:

* on a CDN!
* maybe even as a fallback
* push to Amazon s3
* url-based &static=true


**********************************

##Threshold alerts:

* SMS/email/IFTTT?
* does this already exist as a Phant service?
* embed/page offers to subscribe you to alerts?





