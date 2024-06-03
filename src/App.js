import GetData from './GetData.js';


function App() {
  return (
    <div id ="background">
      <h1 id ="title">United States Educational Attainment</h1>
      <h4 id ="decription">Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)</h4>
      
      <GetData
      url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
      mapData = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
      width = {window.innerWidth - 50 }
      height = {window.innerHeight - 100 }
      padding = {50}
       />
    </div>
    
    
  )
}

export default App;
