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
  
  g.selectAll("rect") // can add a class here to add :hover customization?
    .data(data)
    .join("rect")
    .attr("x", d => x(d.title)+5)
    .attr("y", d => y(+d.value))
    .attr("width", x.bandwidth()-10)
    .attr("height", d=> y(dom[1]-d.value)-margin.top)
    .style("fill", 'grey')
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
    })
    //.each(addArt(g, d => x(d.title), d => y(+d.value), x.bandwidth));
  
  // Draw the axes
  const xAxis = g.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .attr('color', 'white');
    /*.selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.6em")
      .attr("transform", function (d) {
      return "rotate(-90)"});*/
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

    var g = svg.append("g").attr('id', 'g-container');
    genChart(incomeData, [0, 100000], g, {width: size.width/2, height: size.height*4/5}, 'green', 'Median Household Income ($)', 340)
            .attr('transform',"translate(0,0)");
    genChart(travelData, [0, 60], g, {width: size.width/2, height: size.height*4/5}, 'gray', 'Average Travel Time to Work (min)', 320)
            .attr('transform',"translate(300,0)");
    return(g);
}