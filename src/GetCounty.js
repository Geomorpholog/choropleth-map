import useSWR from 'swr';
import Map from './Map.js'
import Loading from "./Loading.js"
import Error from "./Error.js"

export default function GetCounty(props){
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
        <Map
        data = {data}
        dataEducations = {props.dataEducations}
        width = {props.width} 
        height = {props.height} 
        padding = {props.padding}
        />    
    )           
}