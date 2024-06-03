import {useRef, useEffect} from "react";
import * as d3 from "d3";
import * as topojson from "topojson"



export default function Map(props){
    const width = 1000;
    const height = 750;
    let dataEducations = props.dataEducations;
    const dataSet = props.data;
    const t = useRef("#tooltip");
    const win = useRef("#window")
    const root = useRef("#map");
    const legendG = useRef("#legend");
    const valuemap = dataEducations.map(d => [d.fips, d.bachelorsOrHigher]);
    const color = d3.scaleSequential([d3.min(valuemap.map(d => d[1])),d3.max(valuemap.map(d => d[1]))],d3.interpolateGreens);
    const legend = d3.scaleSequential([0,0.8],[0,width/3.2]);
    const legendData = [0,15,25,35,45,55,65,75]
    //console.log(color(70))
    console.log(dataEducations)
   // console.log(dataSet);
   const tooltip = function(event){d3.select(win.current)
    .append("div")
    .attr("id","tooltip")
    .attr("data-education",this.getAttribute("data-education"))
    .style("position","absolute")
    .style("top", event.clientY - height/7 + "px")
    .style("left", event.clientX + "px")
    .style("width",width/7+"px")
    .style("height",height/7+"px")
    .style("background","var(--background2")
    .html("State:"+this.getAttribute("state") +"<br>"+ "County:" + (this.getAttribute("county-name")) + "<br>" + "Percent:" + (this.getAttribute("data-education")))
} 

   
     useEffect(() => void d3.select(legendG.current)
     .append("g")
     .attr("transform", "translate(" + width/1.8 + "," + height/16 + ")")
     .call(d3.axisTop(legend).tickFormat(d3.format(".0%")))
     .attr("id","legend-line")
                                 
    )
    useEffect(() => void d3.select(legendG.current)
    .selectAll("rect")
    .data(legendData)
    .enter()
    .append("rect")
    .attr("width",(width/3.2)/8)
    .attr("height","20")
    .attr("y",height/16)
    .attr("x",(d,i) => width/1.8 + i*((width/3.2)/8))
    .attr("fill",d => color(d))           
   )
  
    useEffect(() => void d3.select(root.current)    
    .append("g")
    .selectAll("path")
    .data(topojson.feature(dataSet, dataSet.objects.states).features)
    .join("path")
    .attr("fill", "var(--color1)")
    .attr("stroke","var(--color1")
    .attr("d", d3.geoPath())
    .attr("id",d => d["id"])
  )
  useEffect(() => void d3.select(root.current)
  .append("g")
  .selectAll("path")
  .data(topojson.feature(dataSet, dataSet.objects.counties).features)
  .join("path")
  .attr("fill",  function(d){
   const obj = dataEducations.filter(v => v.fips === d["id"])
   return color(obj[0].bachelorsOrHigher)
  })
  .attr("d", d3.geoPath())
  .attr("class","county")
  .attr("data-fips",function(d){
    const obj = dataEducations.filter(v => v.fips === d["id"])
    return obj[0].fips
   })
   .attr("data-education",function(d){
    const obj = dataEducations.filter(v => v.fips === d["id"])
    return obj[0].bachelorsOrHigher
   })
   .attr("state",function(d){
    const obj = dataEducations.filter(v => v.fips === d["id"])
    return obj[0].state
   })
   .attr("county-name",function(d){
    const obj = dataEducations.filter(v => v.fips === d["id"])
    return obj[0].area_name
   })

   .on("mouseover",tooltip)
   .on("mouseout",function(){
     d3.select(t.current)
    .remove()
  })
)
    
    return(
      <div id ="window">
        <svg 
        width = {width}
        height = {height}
        id ="map"     
        >     
          <g id ="legend"></g>
        </svg>  
      </div>
        
    )
   
  }