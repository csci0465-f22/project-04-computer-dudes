function drawSocial(g, size) {

 const width = size.width;
 const height = size.height;
 const margin = {left:10, right: 15, top: 2, bottom: 40};
 
const numPerRow = 6;
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//const graph = svg.append("g").attr("opacity",0)

const xPos = 150;
const yPos1 = 120;
const yPos2 = 300;

g.append("image")
 .attr("x", width - 550)
 .attr("y", height - 580)
 .attr("width", "150px")
 .attr("height", "300px")
 .attr("href", "./data/001-standing-up-man 2.png")

g.append("image")
 .attr("x", width - 550)
 .attr("y", height - 400)
 .attr("width", "150px")
 .attr("height", "300px")
 .attr("href", "./data/001-standing-up-man 2.png")

let count = 0;
for(let i = 0; i < 4; i++) {
 for(let j = 0; j < 12; j++) {
  count++;
  if(count > 47) {
    break;
  }
  g.append("image")
   .attr("x", width - 430 + j*20)
   .attr("y", width - 510 + i*40)
   .attr("width", "20px")
   .attr("height", "40px")
   .attr("href", "./data/001-standing-up-man.png")
   //.attr("fill", "white")
 }
}

for(let i = 0; i < 10; i++) {
  g.append("image")
    .attr("x", width - 430 + i*20)
    .attr("y", height - 315)
    .attr("width", "20px")
    .attr("height", "40px")
    .attr("href", "./data/001-standing-up-man.png")
}

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(600, 290)`)
  .style("font-weight", "bold")
  .style("fill", "white")
  .style("font-size", "80px")
  .text("47")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(600, 320)`)
  .style("font-weight", "normal")
  .style("fill", "white")
  .style("font-size", "20px")
  .text("daily associations")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(590, 475)`)
  .style("font-weight", "bold")
  .style("fill", "white")
  .style("font-size", "100px")
  .text("10")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(590, 505)`)
  .style("font-weight", "normal")
  .style("fill", "white")
  .style("font-size", "20px")
  .text("daily associations")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(80, 270)`)
  .style("font-weight", "normal")
  .style("fill", "white")
  .style("font-size", "20px")
  .text("Williams County,")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(80, 300)`)
  .style("font-weight", "normal")
  .style("fill", "white")
  .style("font-size", "20px")
  .text("North Dakota")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(80, 450)`)
  .style("font-weight", "normal")
  .style("fill", "white")
  .style("font-size", "20px")
  .text("McDowell County,")

g.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", `translate(80, 480)`)
  .style("font-weight", "normal")
  .style("fill", "white")
  .style("font-size", "20px")
  .text("West Virginia")

return(g);

}

export{drawSocial}