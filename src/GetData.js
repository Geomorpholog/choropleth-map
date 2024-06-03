import useSWR from 'swr';
import GetCounty from "./GetCounty.js"
import Loading from "./Loading.js"
import Error from "./Error.js"

export default function GetData(props){
    const fetcher = (url) => fetch(url)
          .then((response) => {
             return response.json();
           })  
    const { data, error, isLoading } = useSWR(
        props.url,
         fetcher)
    
    if (isLoading) return <Loading/>
    if (error) return <Error/>
    return (
        <GetCounty
        url = {props.mapData}
        dataEducations = {data}
        width = {props.width} 
        height = {props.height} 
        padding = {props.padding}
        />    
    )           
}