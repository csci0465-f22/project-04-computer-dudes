import{Choropleth} from "./choropleth.js"
import{RadarChart} from "./radarchart.js"
import{BarChart} from "./barchart.js"
import * as topojson from "https://cdn.skypack.dev/topojson@3.0.2"; 
import {drawSocial} from "./social.js"


async function manageVisualizations(){

    const size = { // visualization size
      width: 700, //for choro size
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
    
    var choroData = await d3.csv("../data/County_Data.csv");
    const choromap = await loadCounties(choroData, svg);
    choromap.attr('opacity', 0);

    const radar = RadarChart(svg, size)
                    .attr('opacity', 0);
    
    var rawbardata = await d3.csv("../data/WilliamsMcDowellBarData.csv");
    const bar = BarChart(rawbardata, svg, size)
                  .attr('opacity', 0).attr('transform', "translate(0,0)");
    
    const socialChart = svg.append('g')
    drawSocial(socialChart, size).attr('opacity', 0)
    
    scroll(d3.selectAll("section"));
    scroll.on("section-change", (section)=>{
      console.log(section);
      switch(section){
        case 0:
          radar.transition().attr("opacity", 0).duration(speed);
          choromap.transition().attr('opacity', 1).duration(speed);
          break;
        case 1:
          //choromap.transition().attr("opacity", 0).duration(speed);
          radar.transition().attr("opacity", 1).duration(speed);
          socialChart.transition().attr("opacity", 0).duration(speed)
          choromap.transition().attr('opacity', 0).duration(speed);
          break;
        case 2:
          radar.transition().attr("opacity", 0).duration(speed);
          bar.transition().attr("opacity", 0).duration(speed);
          socialChart.transition().attr("opacity", 1).duration(speed);
          break;
        case 3:
          bar.transition().attr("opacity", 1).duration(speed);
          socialChart.transition().attr("opacity", 0).duration(speed);
          break;
        case 4: 
          bar.transition().attr("opacity", 0).duration(speed);
      }
    });
  }
manageVisualizations();

async function loadCounties(data, svg) {
  const response = await fetch('/data/counties-albers-10m.json');
  const us = await response.json();
  const counties = topojson.feature(us, us.objects.counties);
  const states = topojson.feature(us, us.objects.states);
  const statemap = new Map(states.features.map(d => [d.id,d]));
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
  const newdata = data.filter(function(d){ return (d.State ==  "North Dakota" | d.State == "West Virginia")});
  
  var choro =  Choropleth(newdata, svg, {
    id: d => d["FIPS"],
    value: d => d["Average Number of Mentally Unhealthy Days"],
    scale: d3.scaleQuantize,
    domain: [1, 10],
    range: d3.schemeReds[9],
    //title: (f, d) => `${f.properties.name}, ${statemap.get(f.id.slice(0, 2)).properties.name}\n${d?.rate}%`,
    features: counties,
    borders: statemesh,
    width: 975,
    height: 610
  });
  return(choro);
}