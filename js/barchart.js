function genChart(data, dom, svg, size, color, yTitle, yTitleOffset){
  
  var g = svg.append("g");

  const margin = {left:100, right:100, top:15, bottom:100};
  const {width, height} = size;
  
  const x = d3.scaleBand()
    .domain(data.map(a => a.title)) // can also include US average
    .range([margin.left, width - margin.right])
    .padding(0.1);
  
  const y = d3.scaleLinear()
    .domain(dom)
    .range([height - margin.bottom, margin.top]);
  
    // gradient code based off https://stackoverflow.com/questions/39023154/how-to-make-a-color-gradient-bar-using-d3js
    var defs = svg.append('defs');
    var lg = defs.append('linearGradient')
     .attr('id', 'Gradient1')
     .attr('x1', 0)
     .attr('x2', 0)
     .attr('y1', 0)
     .attr('y2', 1);
    lg.append('stop')
     .attr('offset', '10%')
     .attr('stop-color', 'green');
    lg.append('stop')
     .attr('offset', '100%')
     .attr('stop-color', '#ff3c00');
    
    var lg2 = defs.append('linearGradient')
     .attr('id', 'Gradient2')
     .attr('x1', 0)
     .attr('x2', 0)
     .attr('y1', 0)
     .attr('y2', 1);
    lg2.append('stop')
     .attr('offset', '10%')
     .attr('stop-color', '#906216');
    lg2.append('stop')
     .attr('offset', '100%')
     .attr('stop-color', '#ff3c00');
  
  g.selectAll("rect") // can add a class here to add :hover customization?
    .data(data)
    .join("rect")
    .attr("x", d => (yTitle === "Avg. Work Week (h)") ? x(d.title)+25:x(d.title)+5)
    .attr("y", d => y(+d.value))
    .attr("width", (yTitle === "Avg. Work Week (h)") ? x.bandwidth()-50 : x.bandwidth()-10)
    .attr("height", d=> y(dom[1]-d.value)-margin.top)
    .style("fill", d=>(yTitle === "Job Satisfaction") ? 
                    ((+d.value > 6) ? "url(#Gradient1)": "url(#Gradient2)"):color)

    .each(function(d) {
      if(yTitle === 'Average Travel Time to Work (min)'){
        for (let i = y(+d.value)+5; i < height - margin.bottom-20; i+=40) {
          g.append("rect")
          .attr("x", x(d.title)+30)
          .attr("y", i)
          .attr("width", "5")
          .attr("height", "20")
          .style("fill", 'yellow');
        }
        g.append("image") //https://icons8.com/icons/set/car-top
          .attr("x", x(d.title)+6)
          .attr("y", y(d.value)+12)
          .attr("width", "50px")
          .attr("href", "./data/icons8-car-top-view-96.png");
      }
      else if(yTitle === "Median Household Income ($)"){
        for (let i = height - margin.bottom-60; i > y(+d.value)-7; i-=17) {// build the stack
          g.append("image") //https://icons8.com/icons/set/stacked-dollar-bills
            .attr("x", x(d.title)-1)
            .attr("y", i)
            .attr("width", "67px")
            .attr("href", "./data/icons8-stack-of-money-96.png");
        }
        g.append("image") //https://icons8.com/icons/set/stacked-dollar-bills
            .attr("x", x(d.title)-1)
            .attr("y", y(+d.value)-10)
            .attr("width", "67px")
            .attr("href", "./data/icons8-stack-of-money-96.png");
      }
      else if(yTitle === "Avg. Work Week (h)"){
        g.append("image") //https://www.flaticon.com/free-icon/clock_2838590?term=clock&page=1&position=22&page=1&position=22&related_id=2838590&origin=search
          .attr("x", x(d.title)+7)
          .attr("y", y(d.value)-25)
          .attr("width", "50px")
          .attr("href", "./data/clock.png");
      }
      else if(yTitle === "Job Satisfaction"){
      }
      else{
        console.log(yTitle);
      }
    })
    //.each(addArt(g, d => x(d.title), d => y(+d.value), x.bandwidth));
  
  // Draw the axes
  const xAxis = g.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .attr('color', 'white')
    /*.selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "2.5em")
      .attr("dy", "1em");
      //.attr("transform", function (d) {
      //return "rotate(-90)"});*/
  const yAxis = g.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y))
    .attr('color', color);

  /*
  g.selectAll("text")
    .style("font-size","12px")
    .style("fill", color)*/
  
    // label the graph
    g.append("text")
    .attr("x", margin.left/5)
    .attr("y", height/2)
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${margin.left-yTitleOffset}, ${height/2}) rotate(-90)`)
    .text(yTitle)
    .style('fill', 'white');
  /*
  g.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(${width/2}, ${height - 60})`)
      .text("County")
      .style('fill', 'white');
  */
  return(g);
}

export function BarChart(rawdata, svg, size){
    
    //var rawdata = await d3.csv("../data/WilliamsMcDowellBarData.csv");
    var incomeData =
    [
        {
            title: rawdata[0].countyName,
            value: +rawdata[0].medHouseIncome
        },
        {
            title: rawdata[1].countyName,
            value: +rawdata[1].medHouseIncome
        }
    ];
    var travelData =
    [
        {
            title: rawdata[0].countyName,
            value: +rawdata[0].travelTime
        },
        {
            title: rawdata[1].countyName,
            value: +rawdata[1].travelTime
        }
    ];
    var hoursData =
    [
        {
            title: "North Dakota",
            value: +rawdata[0].workWeek
        },
        {
            title: "West Virginia",
            value: +rawdata[1].workWeek
        }
    ];
    var satisData =
    [
        {
            title: "North Dakota",
            value: +rawdata[0].jobSatisfaction
        },
        {
            title: "West Virginia",
            value: +rawdata[1].jobSatisfaction
        }
    ];

    // job satisfaction

    var g = svg.append("g").attr('id', 'g-container');
    genChart(incomeData, [0, 100000], g, {width: size.width/2, height: size.height*3/5}, 'green', 'Median Household Income ($)', 270)
            .attr('transform',"translate(0, 0)");
    genChart(travelData, [0, 60], g, {width: size.width/2, height: size.height*3/5}, 'gray', 'Average Travel Time to Work (min)', 250)
            .attr('transform',"translate(300, 0)");
    genChart(hoursData, [0, 50], g, {width: size.width/2, height: size.height*3/5}, '#5aaaff', 'Avg. Work Week (h)', 270)
            .attr('transform',"translate(0, 340)");
    genChart(satisData, [0, 10], g, {width: size.width/2, height: size.height*3/5}, '#ffc43a', 'Job Satisfaction', 270)
            .attr('transform',"translate(300, 340)");        
    return(g);
}