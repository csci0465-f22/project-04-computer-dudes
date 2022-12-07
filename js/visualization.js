import{RadarChart} from "./radarchart.js"
import{Choropleth} from "./choropleth.js"

async function manageVisualizations(){

    const size = {
      width: 1000,
      height:400 }
    const speed = 1000;
    
    //const stateData = await d3.csv("data/stateDataOnly.csv");
    //data.forEach((d)=>{
    //  d.pct_sad*= 100; // scale pct_sad to 0-100
    //  d.valence*= 100; // scale valence to 0-100
    //});
    
    const svg = d3.select("#vis")
      .append("svg")
      .attr("viewBox", [0, 0, size.width, size.height])
      .style("height", `${size.height}px`)
      .style("width", `${size.width}px`);
  
    //const barchart = svg.append("g").attr("opacity", 0);
    //drawBarchart(barchart, stateData, size); // also: barchart.call(drawBarchart, data, size);
    //const histogram = svg.append("g").attr("opacity", 0);

    //const graph1 = svg.append("g").attr("opacity", 1);
    //const graph1 = Choropleth().attr("opacity", 1);
    const graph2 = RadarChart().attr("opacity", 0);
    
    const scroll = scroller();
    
    scroll(d3.selectAll("section"));
    scroll.on("section-change", (section)=>{
      switch(section){
        case 0: // do we even want a bar chart? if we're zooming in on the states anyway...
          //barchart.transition().attr("opacity", 1).duration(speed);
          //graph1.transition().attr("opacity", 1).duration(speed);
          graph2.transition().attr("opacity", 0).duration(speed);
          break;
        case 1:
          //RadarChart();
          //graph1.transition().attr("opacity", 0).duration(speed);
          graph2.transition().attr("opacity", 1).duration(speed);
          //barchart.transition().attr("opacity", 0).duration(speed);
          break;
        case 2:
          graph2.transition().attr("opacity", 0).duration(speed);
          break;
        case 3:
          break;
        default:
          //console.log("uh");
      }
    });
  }



  /*
  function drawHistogram(g, data, metric, title, size, speed){
    const margin = {left:40, right:15, top:15, bottom:40};
    const {width, height} = size;
   
    const x = d3.scaleLinear()
      .domain([0,52]) // states on the x axis
      .range([margin.left, width-margin.right])
      .nice();
  
    const makeBins = d3.bin() // specified metric on the y axis
      .value((d)=>+d[metric])
      .domain(x.domain())
      .thresholds(20);
    //const bins = makeBins(data);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d=>d['Average Number of Mentally Unhealthy Days']) ])
      .range([height - margin.bottom, margin.top])
      .nice();   
  
    g.selectAll(".bin")
      .data(bins, d => d.x0)
      .join(
        enter=>enter
          .append("rect")
          .attr("x",(d)=>x(d.x0) + 1)
          .attr("y", y(0))
          .attr("width", d => x(d.x1) - x(d.x0) - 2)
          .attr("height", 0)
          .attr("class", "bin")
          .style("fill", "currentColor")
          .transition()
            .duration(speed)
            .attr("y", d=>y(d.length))
            .attr("height", d=>y(0) - y(d.length)),
        update=>update
          .transition()
          .duration(speed)
          .attr("y", d=>y(d.length))
          .attr("height", d=>y(0) - y(d.length)),
        exit=>exit
          .transition()
          .duration(speed)
          .attr("y", y(0))
          .attr("height", 0)
          .remove()
      )
    
    let xAxis = g.select("#x-axis");
    if (xAxis.empty()){
      xAxis = g.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x));
    }
    let yAxis = g.select("#y-axis");
    if (yAxis.empty()){
      yAxis = g.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
    }
    yAxis.transition().call(d3.axisLeft(y));
  
    titleTxt = g.select("#title")
    if(titleTxt.empty()){
      g.append("text")
        .attr("id", "title")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(${width/2}, ${height - 5})`)
        .style("font-weight", "bold")
    }
    titleTxt.transition().text(title);
  
    g.selectAll("text")
      .style("font-size","12px")
      .style("fill", "currentColor")
  
    g.transition()
      .duration(speed)
      .attr("opacity", 1);
  
  }*/
  
  function drawBarchart(g, data, size){
    const margin = {left:15, right:100, top:15, bottom:100};
    const {width, height} = size;
  
    //const albumData = d3.rollups(data, v=>d3.mean(v, d=>d.gloom_index), d=>`${d.album_name} (${d.album_release_year})`);
    const stateNames = data.map(d=>d['State']);
    const x = d3.scaleBand()
      .domain(stateNames)
      .range([margin.left, width - margin.right])
      .padding(0.1);
    
    const y = d3.scaleLinear()
      //.domain([0, d3.max(data, d=>+d['Average Number of Mentally Unhealthy Days'])])
      .domain([0,7])
      .range([margin.top, height - margin.bottom])
      .nice();

    g.selectAll("rect") // you can add a class here to add :hover customization?
      .data(data)
      .join("rect")
      .attr("x", d => x(d['State']))
      .attr("y", d => y(+d['Average Number of Mentally Unhealthy Days']))
      .attr("width", x.bandwidth())
      .attr("height", d=> y(d3.max(data, d=>+d['Average Number of Mentally Unhealthy Days'])) - y(+d['Average Number of Mentally Unhealthy Days']));
      //.style("fill", d => d[0] === "A Moon Shaped Pool (2016)" ? "#26c" : "currentColor");
  
    // Draw the axes
    const xAxis = g.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.6em")
        .attr("transform", function (d) {
        return "rotate(-90)"});
  
    const yAxis = g.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));
  
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
  }
  
  manageVisualizations();