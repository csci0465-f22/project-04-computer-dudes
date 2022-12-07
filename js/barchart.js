export function BarChart(rawdata, svg, size){
    
    //var rawdata = await d3.csv("../data/WilliamsMcDowellBarData.csv");
    var data =
    [
        {
            County: rawdata[0].countyName,
            MedIncome: rawdata[0].medHouseIncome,
            TravelTime: rawdata[0].travelTime
        },
        {
            County: rawdata[1].countyName,
            MedIncome: rawdata[1].medHouseIncome,
            TravelTime: rawdata[1].travelTime
        }
    ];

    const margin = {left:15, right:100, top:15, bottom:100};
    const {width, height} = size;
    
    const x = d3.scaleBand()
      .domain(["Williams", "McDowell"])
      .range([margin.left, width - margin.right])
      .padding(0.1);
    
    const y = d3.scaleLinear()
      .domain([0,100])
      .range([margin.top, height - margin.bottom])
      .nice();
    //var svg = d3.select("#vis").append("svg");
    
	  //Initiate the radar chart SVG
    var g = svg.append("g")
                .attr('id', 'bar-chart');

    /*
    g.selectAll("rect") // you can add a class here to add :hover customization?
      .data(data)
      .join("rect")
      .attr("x", d => 0)
      .attr("y", d => 0)
      .attr("width", x.bandwidth())
      .attr("height", d=> 0);
      //.style("fill", d => d[0] === "A Moon Shaped Pool (2016)" ? "#26c" : "currentColor");
    */
    // Draw the axes
    const xAxis = g.append("g")
      .attr("id", "x-axis")
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
      .attr("id", "y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y))
      .attr('color', 'white');
  
  // label the graph
  /*
     g.append("text")
      .attr("x", margin.left/5)
      .attr("y", height/2)
      .attr("text-anchor", "middle")
      .attr("style", "font-weight: bold")
      .attr("transform", `translate(${margin.left-190}, ${height/2}) rotate(-90)`)
      .text("Mental Health Score (Higher = Worse)")

    g.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(${width/2}, ${height - 5})`)
        .style("font-weight", "bold")
        .text("State");
  
  
    g.selectAll("text")
      .style("font-size","12px")
      .style("fill", "currentColor")
    */

    return(g);
}