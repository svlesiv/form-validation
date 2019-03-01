/* graph.js  */
//this script will work on Mozilla Firefox without hosting
// or from http://www.svitlanalesiv.me/final_project/graph.html
/**
 * this function visualizes data from JSON file using canvas
 *
 * it satisfies next requirements:
 * - DOM element creation, deletion or modification
 * - Capturing and handling events
 * - Creating and handling a data structure
 * - AJAX
 *
 * @author Svitlana Lesiv
 * @version Last_modified 13_Dec_2017
 **/
$(document).ready(function() {
  /*DOM element creation, deletion or modification*
    *****************************************/
  //create canvas element
  "use strict";
  var canvas = document.getElementById("c1");
  var ctx = canvas.getContext('2d');
  var w = canvas.width;
  var h = canvas.height;

  horizLine();

  /**
   * this function will draw horizontal lines on canvas element
   */
  function horizLine() {
    ctx.strokeStyle = "#bff698";
    ctx.lineWidth = 0.2;
    //draw lines with the step of 10 till it reaches end of canvas height
    for (var i = 0; i < h; i += 10) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
      ctx.stroke();
    }
  }

  /**
   * this function draws one rectangle on a canvas
   * */
  function buildOneGraph(x, y) {
    ctx.fillStyle = "#bff698";
    ctx.beginPath();
    ctx.moveTo(x + 10, h - y);
    ctx.lineTo(x + 50, h - y);
    ctx.lineTo(x + 50, h);
    ctx.lineTo(x + 10, h);
    ctx.closePath();
    ctx.fill();
  }

  /**
   * this function calls buildOneGraph() function to
   * draw graphs for one region
   * */
  function dataDisplay(region) {
    //x = 0; y = data for 1995 year of current region
    buildOneGraph(0, region.getY1995());
    //x = 60; y = data for 2000 year of current region
    buildOneGraph(60, region.getY2000());
    buildOneGraph(120, region.getY2010());
    buildOneGraph(180, region.getY2014());
    buildOneGraph(240, region.getY2020());
  }

  /*Capturing and handling events*
    *****************************************/
  /**
   * this function checks if any changes in <select> element;
   * if yes, and if we selected some <option>, calls dataDisplay()
   * to display data for selected region
   * */
  $(rgnSelect).change(function() {
    //clear canvas
    ctx.clearRect(0, 0, w, h);
    //draw horizontal lines
    horizLine();

    //<option> value
    var val = this.options[this.selectedIndex].value;
    if (val >= 0) {
      //array regions[index(which is <option> value)]
      var rgn = regions[val];
      //change color of selected option to white
      $("select").css("color", "white");
      $("select").css("text-decoration", "none");
      //show years for graphs under canvas
      $(".year").css("visibility", "visible");
      //display data on canvas
      dataDisplay(rgn);
    } else {
      $("select").css("color", "#999");
      $(".year").css("visibility", "hidden");
    }
  });

  /**
   * this function creates <option> for each region
   * and appends to <select>
   * */
  function populateSelectElement(regions) {
    regions.forEach(function(region, index) {
      //for each region get its name
      var name = region.getName();
      //create <option>
      var option = document.createElement("option");

      //assign index to option value
      option.value = index;
      //create text node - which is name of region
      option.appendChild(document.createTextNode(name));

      //append <option> to <select>
      $(rgnSelect).append(option);
    });
  }

  /*Creating and handling a data structure*
    *****************************************/
  var regions = [];

  /**
   * this is constructor for generating Region objects;
   * */
  function Region(name, y1995, y2000, y2010, y2014, y2020) {
    //creates 6 variables
    var name = name;
    var y1995 = y1995;
    var y2000 = y2000;
    var y2010 = y2010;
    var y2014 = y2014;
    var y2020 = y2020;
    //6 getters to return variables
    this.getName = function() {
      return name;
    };
    this.getY1995 = function() {
      return y1995;
    };
    this.getY2000 = function() {
      return y2000;
    };
    this.getY2010 = function() {
      return y2010;
    };
    this.getY2014 = function() {
      return y2014;
    };
    this.getY2020 = function() {
      return y2020;
    };
    //function to add this object to array regions
    this.addToArray = function(regions) {
      regions.push(this);
    };
  }

  /**
   * this function reads data from JSON file,
   * creates object instances of Region; add them to array,
   * and calls function populateSelectElement() to create <options>
   * */
  function processData(data) {
    var len = data.length;
    //iterate through JSON data and create varibles with JSON data
    for (var i = 0; i < len; i++) {
      var region = data[i];
      var name = region.regionName;
      var y1995 = region.y1995;
      var y2000 = region.y2000;
      var y2010 = region.y2010;
      var y2014 = region.y2014;
      var y2020 = region.y2020;
      //create Region object
      var newRegion = new Region(name, y1995, y2000, y2010, y2014, y2020);
      //add region to array
      newRegion.addToArray(regions);
    }
    //create <option> for each region in array
    populateSelectElement(regions);
  }

  /*AJAX*
    *****************************************/
  /**
   * this function loads JSON-encoded data from the server using a GET HTTP request;
   * calls processData() to read file
   * */
  function getRegionsData() {
    //data source:
    //http://www.dohop.com/blog/5-charts-that-show-the-surprising-growth-of-world-tourism/
    $.getJSON("data/regions_data.json", function(data) {
      processData(data.regions);
    });
  }

  getRegionsData();
});
