function drawSocial(g) {

 const width = 1000;
 const height = 400;
 const margin = {left:10, right: 15, top: 2, bottom: 40};

//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
 
const numPerRow = 6;

// const svg = d3.select("#vis")
//  .append("svg")
//  .attr("viewbox", [0, 0, width, height])
//  .style("height", `${height}px`)
//  .style("width", '${width}px');

//const graph = svg.append("g")

const xPos = 200;
const yPos1 = -30;
const yPos2 = 150;

const image = g.append("image")
 .attr("x", xPos)
 .attr("y", yPos1)
 .attr("width", "150px")
 .attr("height", "300px")
 .attr("href", "./data/001-standing-up-man.png");

g.append("image")
 .attr("x", xPos)
 .attr("y", yPos2)
 .attr("width", "150px")
 .attr("height", "300px")
 .attr("href", "./data/001-standing-up-man.png")

let count = 0;
for(let i = 0; i < 4; i++) {
 for(let j = 0; j < 12; j++) {
  count++;
  if(count > 47) {
    break;
  }
  g.append("image")
   .attr("x", xPos + j*20 + 120)
   .attr("y", yPos1 + i*40 + 70)
   .attr("width", "20px")
   .attr("height", "40px")
   .attr("href", "./data/001-standing-up-man.png")
 }
}

for(let i = 0; i < 10; i++) {
  g.append("image")
    .attr("x", xPos + i*20 + 120)
    .attr("y", yPos2 + 85)
    .attr("width", "20px")
    .attr("height", "40px")
    .attr("href", "./data/001-standing-up-man.png")
}

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(770, 130)`)
  .style("font-weight", "bold")
  .style("fill", "black")
  .style("font-size", "100px")
  .text("47")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(770, 160)`)
  .style("font-weight", "normal")
  .style("fill", "black")
  .style("font-size", "20px")
  .text("daily associations")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(760, 315)`)
  .style("font-weight", "bold")
  .style("fill", "black")
  .style("font-size", "100px")
  .text("10")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(760, 345)`)
  .style("font-weight", "normal")
  .style("fill", "black")
  .style("font-size", "20px")
  .text("daily associations")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(120, 120)`)
  .style("font-weight", "normal")
  .style("fill", "black")
  .style("font-size", "20px")
  .text("Steele County,")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(120, 140)`)
  .style("font-weight", "normal")
  .style("fill", "black")
  .style("font-size", "20px")
  .text("North Dakota")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(120, 290)`)
  .style("font-weight", "normal")
  .style("fill", "black")
  .style("font-size", "20px")
  .text("McDowell County,")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(120, 310)`)
  .style("font-weight", "normal")
  .style("fill", "black")
  .style("font-size", "20px")
  .text("West Virginia")

}

export{drawSocial}