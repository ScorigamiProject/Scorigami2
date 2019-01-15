window.onload = function () {

    var totalVisitors = 883000;
    var visitorsData = {
        "New vs Returning Visitors": [{
            click: visitorsChartDrilldownHandler,
            cursor: "pointer",
            explodeOnClick: false,
            innerRadius: "75%",
            legendMarkerType: "square",
            name: "New vs Returning Visitors",
            radius: "100%",
            showInLegend: true,
            startAngle: 90,
            type: "doughnut",
            dataPoints: [
                { y: 519960, name: "New Visitors", color: "#E7823A" },
                { y: 363040, name: "Returning Visitors", color: "#546BC1" }
            ]
        }],
        "New Visitors": [{
            color: "#E7823A",
            name: "New Visitors",
            type: "column",
            xValueFormatString: "MMM YYYY",
            dataPoints: [
                { x: new Date("1 Jan 2015"), y: 33000 },
                { x: new Date("1 Feb 2015"), y: 35960 },
                { x: new Date("1 Mar 2015"), y: 42160 },
                { x: new Date("1 Apr 2015"), y: 42240 },
                { x: new Date("1 May 2015"), y: 43200 },
                { x: new Date("1 Jun 2015"), y: 40600 },
                { x: new Date("1 Jul 2015"), y: 42560 },
                { x: new Date("1 Aug 2015"), y: 44280 },
                { x: new Date("1 Sep 2015"), y: 44800 },
                { x: new Date("1 Oct 2015"), y: 48720 },
                { x: new Date("1 Nov 2015"), y: 50840 },
                { x: new Date("1 Dec 2015"), y: 51600 }
            ]
        }],
        "Returning Visitors": [{
            color: "#546BC1",
            name: "Returning Visitors",
            type: "column",
            xValueFormatString: "MMM YYYY",
            dataPoints: [
                { x: new Date("1 Jan 2015"), y: 22000 },
                { x: new Date("1 Feb 2015"), y: 26040 },
                { x: new Date("1 Mar 2015"), y: 25840 },
                { x: new Date("1 Apr 2015"), y: 23760 },
                { x: new Date("1 May 2015"), y: 28800 },
                { x: new Date("1 Jun 2015"), y: 29400 },
                { x: new Date("1 Jul 2015"), y: 33440 },
                { x: new Date("1 Aug 2015"), y: 37720 },
                { x: new Date("1 Sep 2015"), y: 35200 },
                { x: new Date("1 Oct 2015"), y: 35280 },
                { x: new Date("1 Nov 2015"), y: 31160 },
                { x: new Date("1 Dec 2015"), y: 34400 }
            ]
        }]
    };
    
    var newVSReturningVisitorsOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "New VS Returning Visitors"
        },
        subtitles: [{
            text: "Click on Any Segment to Drilldown",
            backgroundColor: "#2eacd1",
            fontSize: 16,
            fontColor: "white",
            padding: 5
        }],
        legend: {
            fontFamily: "calibri",
            fontSize: 14,
            itemTextFormatter: function (e) {
                return e.dataPoint.name + ": " + Math.round(e.dataPoint.y / totalVisitors * 100) + "%";  
            }
        },
        data: []
    };
    
    var visitorsDrilldownedChartOptions = {
        animationEnabled: true,
        theme: "light2",
        axisX: {
            labelFontColor: "#717171",
            lineColor: "#a2a2a2",
            tickColor: "#a2a2a2"
        },
        axisY: {
            gridThickness: 0,
            includeZero: false,
            labelFontColor: "#717171",
            lineColor: "#a2a2a2",
            tickColor: "#a2a2a2",
            lineThickness: 1
        },
        data: []
    };
    
    newVSReturningVisitorsOptions.data = visitorsData["New vs Returning Visitors"];
    $("#chartContainer").CanvasJSChart(newVSReturningVisitorsOptions);
    
    function visitorsChartDrilldownHandler(e) {
        e.chart.options = visitorsDrilldownedChartOptions;
        e.chart.options.data = visitorsData[e.dataPoint.name];
        e.chart.options.title = { text: e.dataPoint.name }
        e.chart.render();
        $("#backButton").toggleClass("invisible");
    }
    
    $("#backButton").click(function() { 
        $(this).toggleClass("invisible");
        newVSReturningVisitorsOptions.data = visitorsData["New vs Returning Visitors"];
        $("#chartContainer").CanvasJSChart(newVSReturningVisitorsOptions);
    });
    
    }

    // function buildCharts(sample) {

    //     // @TODO: Use `d3.json` to fetch the sample data for the plots
    //     var URL = `/samples/${sample}`;
    //     console.log(URL);
      
    //     d3.json(URL).then(function(data) {
    //     console.log(data);
    //     offdata = data
    //     ids = data.otu_ids;
    //     vals = data.sample_values;
    //     top10ids = ids.slice(ids.length - 9, ids.length);
    //     top10vals = vals.slice(vals.length - 9, vals.length);    

    // function init() {
    //     // Grab a reference to the dropdown select element
    //     var selector = d3.select("#selDataset");
      
    //     // Use the list of sample names to populate the select options
    //     d3.json("/names").then((sampleNames) => {
    //       sampleNames.forEach((sample) => {
    //         selector
    //           .append("option")
    //           .text(sample)
    //           .property("value", sample);
    //       });
      
    //       // Use the first sample from the list to build the initial plots
    //       const firstSample = sampleNames[0];
    //       buildCharts(firstSample);
    //       buildMetadata(firstSample);
    //     });
    //   }
      
    //   function optionChanged(newSample) {
    //     // Fetch new data each time a new sample is selected
    //     buildCharts(newSample);
    //     buildMetadata(newSample);
    //   }
      
    //   // Initialize the dashboard
    //   init();