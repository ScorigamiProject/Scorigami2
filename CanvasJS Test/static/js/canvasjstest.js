function buildChart(sample, type) {

    var typeselector = d3.select("#selDataset2").attr('value');
    console.log(typeselector);
    
    var URL = `/samples/${sample}`;
    var Charttype = type;
    //"Category Level" // "Player Level"
    console.log(URL);
    console.log(Charttype);
      

    d3.json(URL).then(function(data) {

    function numberfy(curr) {
        return parseInt(curr.replace(/[^0-9.-]+/g,""))
    };

    console.log(data);
    console.log(data[2].PosSide);
    console.log(numberfy(data[2].CapHit));

    // salaries
    totalsal = 0
    offsal = 0
    defsal = 0
    stsal = 0
    


    // datapoints used for graphs
    playersoff = [];
    playersdef = [];
    playersst = [];
    

    // counts for ids, not needed
    ocount = 0;
    dcount = 0;
    scount = 0;
    pcount = 0;

    // names
    onames = [];
    dnames = [];
    snames = [];
    

    oposcat = [];
    dposcat = [];
    sposcat = [];
    

    // salaries by player and category extraction
    for (i = 0; i < data.length; i++) {  //loop through the array
        if (data[i].CapHit === "-") {
            var nnn = 1
        } else if (data[i].PosSide === "Offense") {
            offsal += numberfy(data[i].CapHit);
            ocount += 1;
            oposcat.push({category: data[i].PosCategory, salary: numberfy(data[i].CapHit)});
            onames.push(data[i].ActivePlayers);
            playersoff.push({label: data[i].ActivePlayers, y:numberfy(data[i].CapHit)});
            totalsal += numberfy(data[i].CapHit);  //Do the math!
            // console.log(data[i].PlayerName, data[i].CapHit, data[i].Pos);
        } else if (data[i].PosSide === "Defense") {
            defsal += numberfy(data[i].CapHit);
            dcount += 1;
            dposcat.push({category: data[i].PosCategory, salary: numberfy(data[i].CapHit)});
            dnames.push(data[i].ActivePlayers);
            playersdef.push({label: data[i].ActivePlayers, y:numberfy(data[i].CapHit)});
            totalsal += numberfy(data[i].CapHit);  //Do the math!
            // console.log(data[i].PlayerName, data[i].CapHit, data[i].Pos);
        } else if (data[i].PosSide === "Special Teams") {
            stsal += numberfy(data[i].CapHit);
            scount += 1;
            sposcat.push({category: data[i].PosCategory, salary: numberfy(data[i].CapHit)});
            snames.push(data[i].ActivePlayers);
            playersst.push({label: data[i].ActivePlayers, y:numberfy(data[i].CapHit)});
            totalsal += numberfy(data[i].CapHit);  //Do the math!
            // console.log(data[i].PlayerName, data[i].CapHit, data[i].Pos);
        } else {console.log("nah")}
    };

    function groupBy(data) {

        var distinct = [];
        
        for (var i = 0; i < data.length; i++) {
            // console.log(distinct);
            if (distinct.includes(data[i].category) == true) {
                // console.log("current cat not detected in distinct");
            } else {
                distinct.push(data[i].category)
            }
        
        };
        var salaries = []
        for (var i = 0; i < distinct.length; i++) {
            salaries.push(0)
        }
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < distinct.length; j++) {
                if (data[i].category === distinct[j]) {
                    salaries[j] += parseInt(data[i].salary);
                };
        
            };
        };
        finalbigmemes = []
        for (var j = 0; j < distinct.length; j++) {
            finalbigmemes.push({label: distinct[j], y: salaries[j]});
        }
        return finalbigmemes;
    }

    

    console.log(groupBy(oposcat));
    
    console.log(totalsal); 
    console.log(offsal); 
    console.log(defsal); 
    console.log(stsal);
    // console.log(datapointsoff);
    // console.log(datapointsdef);
    // console.log(datapointsst);
    // console.log(datapointsdead);

    console.log(dposcat);
    console.log(oposcat);
    console.log(sposcat);

    groupeddef = groupBy(dposcat);
    groupedoff = groupBy(oposcat);
    groupedst = groupBy(sposcat);


    console.log(groupeddef);
    console.log(groupedoff);
    console.log(groupedst);

    var groupavgs = [{category: "Offensive Line", total: 34715901},
    {category: "Secondary", total: 19653283},
    {category: "Defensive Line", total: 15435859},
    {category: "Rushing", total: 5575724},
    {category: "Linebacker", total: 14850430},
    {category: "Special Teams", total: 3678529},
    {category: "Passing", total: 48542438}]


    
    // console.log(groupedoff);
    // console.log(groupeddef);
    // console.log(groupavgs);
    

    function groupAvg(group) {
        var groupavgs = [{category: "Offensive Line", total: 34715901},
    {category: "Secondary", total: 19653283},
    {category: "Defensive Line", total: 15435859},
    {category: "Rushing", total: 5575724},
    {category: "Linebacker", total: 14850430},
    {category: "Special Teams", total: 3678529},
    {category: "Passing", total: 48542438}]
        avgbigmemes = []
        for (var i = 0; i < group.length; i++) {
            for (var j = 0; j < groupavgs.length; j++) {
                if (group[i].label === groupavgs[j].category) {
                    avgbigmemes.push({label: group[i].label, y: ((group[i].y /groupavgs[j].total) * 100)})
                }
            }
        }
        return avgbigmemes
    }

    groupeddefavg = groupAvg(groupeddef);
    groupedoffavg = groupAvg(groupedoff);
    groupedstavg = groupAvg(groupedst);

    // console.log(groupeddefavg);
    // console.log(groupedoffavg);
    // console.log(groupedstavg);


    if (Charttype === "Category Level") {
        datapointsoff = groupedoffavg;
        datapointsdef = groupeddefavg;
        datapointsst = groupedstavg;
    } else if (Charttype === "Player Level") {
        datapointsoff = playersoff;
        datapointsdef = playersdef;
        datapointsst = playersst;
    }

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
                { y: stsal, name: "Sp. Teams", color: "#548BC1" }
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
    };

    console.log(visitorsData["Offense"][0]["dataPoints"]);
    
    var newVSReturningVisitorsOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "NFL Team Salary Breakdown"
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
        
    }
    
    $("#backButton").click(function() { 
        newVSReturningVisitorsOptions.data = visitorsData["New vs Returning Visitors"];
        $("#chartContainer").CanvasJSChart(newVSReturningVisitorsOptions);
    });
});  
};
    



     function init() {
        // Grab a reference to the dropdown select element
        var selector = d3.select("#selDataset2");
              
          buildChart("AZ","Player Level");

        };
      
        var sampleselector = "AZ"
        var typeselector = "Player Level"
      
      function optionChanged1(newSample) {
        sampleselector = newSample;
      };
      function optionChanged2(newType) {
        // Fetch new data each time a new sample is selected
        typeselector = newType;
      };

      function handleChange() {
            
        buildChart(sampleselector, typeselector);
      };
     
      
      // Initialize thedashboard
      init();