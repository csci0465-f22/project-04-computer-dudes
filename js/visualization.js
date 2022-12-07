import{Choropleth} from "./choropleth.js"
import{RadarChart} from "./radarchart.js"
import{BarChart} from "./barchart.js"

async function manageVisualizations(){

    const size = { // visualization size
      width: 700,
      height: 700 }
    const speed = 1000; // animation speed

    const scroll = scroller();
    const svg = d3.select("#vis")
      .append("svg")
      .attr('id', "vis-container")
      .attr("viewBox", [0, 0, size.width, size.height])
      .style("height", `${size.height}px`)
      .style("width", `${size.width}px`);
    
    //const choro = svg.append("g").attr("opacity", 1);
    //const choro = Choropleth().attr("opacity", 1);
    const radar = RadarChart(svg, size).attr('opacity', 0);
    
    var rawbardata = await d3.csv("../data/WilliamsMcDowellBarData.csv");
    const bar = BarChart(rawbardata, svg, size).attr('opacity', 0);
    
    scroll(d3.selectAll("section"));
    scroll.on("section-change", (section)=>{
      switch(section){
        case 0:
          radar.transition().attr("opacity", 0).duration(speed);
          break;
        case 1:
          //graph1.transition().attr("opacity", 0).duration(speed);
          radar.transition().attr("opacity", 1).duration(speed);
          break;
        case 2:
          radar.transition().attr("opacity", 0).duration(speed);
          bar.transition().attr("opacity", 0).duration(speed);
          
          break;
        case 3:
          bar.transition().attr("opacity", 1).duration(speed);
          break;
          //console.log("uh");
      }
    });
  }
manageVisualizations();