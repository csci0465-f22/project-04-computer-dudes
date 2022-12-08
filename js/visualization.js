import{Choropleth} from "./choropleth.js"
import{RadarChart} from "./radarchart.js"
import{BarChart} from "./barchart.js"
import * as topojson from "https://cdn.skypack.dev/topojson@3.0.2"; 
import {drawSocial} from "./social.js"


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
      //.attr('display', 'flex') not working?
      //.attr('align-items', 'center')
      //.attr('justify-content', 'center')
      .style("height", `${size.height}px`)
      .style("width", `${size.width}px`);
    
    var choroData = await d3.csv("../data/stateDataOnly.csv");
    const graph1 = loadCounties(choroData, svg);
     const radar = RadarChart(svg, size)
                    .attr('opacity', 0);
    
    var rawbardata = await d3.csv("../data/WilliamsMcDowellBarData.csv");
    const bar = BarChart(rawbardata, svg, size)
                  .attr('opacity', 0).attr('transform', "translate(50,150)");
    
    const socialChart = svg.append('g')
    drawSocial(socialChart).attr('opacity', 0)
    
    scroll(d3.selectAll("section"));
    scroll.on("section-change", (section)=>{
      switch(section){
        case 0:
          radar.transition().attr("opacity", 0).duration(speed);
          graph1;
          break;
        case 1:
          //graph1.transition().attr("opacity", 0).duration(speed);
          radar.transition().attr("opacity", 1).duration(speed);
          socialChart.transition().attr("opacity", 0).duration(speed)
          break;
        case 2:
          radar.transition().attr("opacity", 0).duration(speed);
          bar.transition().attr("opacity", 0).duration(speed);
          socialChart.transition().attr("opacity", 1).duration(speed)
          console.log(socialChart)
          console.log(2)
          break;
        case 3:
          bar.transition().attr("opacity", 1).duration(speed);
          socialChart.transition().attr("opacity", 0).duration(speed)
          break;
          //console.log("uh");
      }
    });
  }
manageVisualizations();

async function loadCounties(data) {
  const response = await fetch('/data/counties-albers-10m.json');
  const us = await response.json();
  const counties = topojson.feature(us, us.objects.counties);
  const states = topojson.feature(us, us.objects.states);
  const statemap = new Map(states.features.map(d => [d.id,d]));
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);

  var graph1 = Choropleth(data, {
    id: d => d.id,
    value: d => d.rate,
    scale: d3.scaleQuantize,
    domain: [1, 10],
    range: d3.schemeBlues[9],
    title: (f, d) => `${f.properties.name}, ${statemap.get(f.id.slice(0, 2)).properties.name}\n${d?.rate}%`,
    features: counties,
    borders: statemesh,
    width: 975,
    height: 610
  });
  return us;
}