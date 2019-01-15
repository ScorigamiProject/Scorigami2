    var URL = `/samples/AZ`;
    console.log(URL);
      
    d3.json(URL).then(function(data) {
    console.log(data);
    console.log(data[2].PosSide);

    totalsal = 0
    offsal = 0
    defsal = 0
    stsal = 0
    deadsal = 0
    datapointsoff = [];
    datapointsdef = [];
    datapointsst = [];
    datapointsdead = [];
    ocount = 0;
    dcount = 0;
    scount = 0;
    pcount = 0;
    onames = [];
    dnames = [];
    snames = [];
    deadnames = [];


    for (i = 0; i < data.length; i++) {  //loop through the array
        totalsal += parseInt(data[i].CapHit);  //Do the math!
        if (data[i].Status == "Practice") {
            pcount += 1;
        }
        else if (data[i].Status === "IR"  || data[i].Status === "Dead") {
            deadsal += parseInt(data[i].CapHit);
           
            deadnames.push(data[i].PlayerName);
            datapointsdead.push({label: data[i].PlayerName, y:parseInt(data[i].CapHit)});
        }
        else if (data[i].PosSide === "Offense") {
            offsal += parseInt(data[i].CapHit);
            ocount += 1;
            onames.push(data[i].PlayerName);
            datapointsoff.push({label: data[i].PlayerName, y:parseInt(data[i].CapHit)});
            // console.log(data[i].PlayerName, data[i].CapHit, data[i].Pos);
        } else if (data[i].PosSide === "Defense") {
            defsal += parseInt(data[i].CapHit);
            dcount += 1;
            onames.push(data[i].PlayerName);
            datapointsdef.push({label: data[i].PlayerName, y:parseInt(data[i].CapHit)});
            // console.log(data[i].PlayerName, data[i].CapHit, data[i].Pos);
        } else if (data[i].PosSide === "Special Teams") {
            stsal += parseInt(data[i].CapHit);
            scount += 1;
            snames.push(data[i].PlayerName);
            datapointsst.push({label: data[i].PlayerName, y:parseInt(data[i].CapHit)});
            // console.log(data[i].PlayerName, data[i].CapHit, data[i].Pos);
        } else {console.log("nah")}
    };
    // console.log(totalsal); 
    // console.log(offsal); 
    // console.log(defsal); 
    // console.log(stsal);
    console.log(datapointsoff);
    console.log(datapointsdef);
    console.log(datapointsst);
    console.log(datapointsdead);



    // @TODO: Use `d3.json` to fetch the sample data for the plots

    var totalVisitors = totalsal;
    console.log(totalVisitors);
    var visitorsData = {
        "New vs Returning Visitors": [{
            click: visitorsChartDrilldownHandler,
            cursor: "pointer",
            explodeOnClick: false,
            innerRadius: "75%",
            legendMarkerType: "square",
            name: "Offense vs Defense vs Sp Teams spending",
            radius: "100%",
            showInLegend: true,
            startAngle: 90,
            type: "doughnut",
            dataPoints: [
                { y: offsal, name: "Offense", color: "#E7823A" },
                { y: defsal, name: "Defense", color: "#546BC1" },
                { y: stsal, name: "Sp. Teams", color: "#548BC1" },
                { y: deadsal, name: "IR/Dead Cap", color: "#A482C1" },
            ]
        }],
        "Offense": [{
            color: "#E7823A",
            name: "Offense",
            type: "column",
            dataPoints: datapointsoff
        }],
        "Defense": [{
            color: "#E7823A",
            name: "Defense",
            type: "column",
            xValueFormatString: "MMM YYYY",
            dataPoints: datapointsdef
        }],
        "Sp. Teams": [{
            color: "#546BC1",
            name: "Sp. Teams",
            type: "column",
            xValueFormatString: "MMM YYYY",
            dataPoints: datapointsst
        }],
        "IR/Dead Cap": [{
            color: "#546BC1",
            name: "Sp. Teams",
            type: "column",
            xValueFormatString: "MMM YYYY",
            dataPoints: datapointsdead
        }]
    };

    console.log(visitorsData["Offense"][0]["dataPoints"]);
    
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
        e.chart.options.title = { text: e.dataPoint.name };
        e.chart.render();
        console.log(visitorsDrilldownedChartOptions);
        console.log(e.chart.options.data);
        console.log(e.chart.options.title);
        $("#backButton").toggleClass("invisible");
    }
    
    $("#backButton").click(function() { 
        $(this).toggleClass("invisible");
        newVSReturningVisitorsOptions.data = visitorsData["New vs Returning Visitors"];
        $("#chartContainer").CanvasJSChart(newVSReturningVisitorsOptions);
    });
});  
    



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