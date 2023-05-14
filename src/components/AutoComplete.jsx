import {useState,useEffect} from "react"
import finnHub from "../apis/finnHub"
import { useGlobalContext } from '../context'

export const AutoComplete = () => {
  const { addStock } = useGlobalContext();
  
  const [search, setSearch] = useState("");

  const [results, setResults] = useState([]);
  

  useEffect(() => {
    let isMounted = true;
    const fetchData = async() => {
      try {
        const response = await finnHub.get("/search",{
          params: {
            q: search
          }
        });
       if(isMounted){
         setResults(response.data.result);
       }
      } catch (err) {
        
      }
    }
    if(search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }

    return () => (isMounted = false);
  },[search]);

  const renderDropDown = () => {
    const dropdown = search ? "show" : null
    return (<ul style={{
           height: "500px",
           overflowY: "scroll",
           overflowX: "hidden",
           cursor: "pointer"
         }} className={`dropdown-menu ${dropdown}`}>
      {
       results.map((result) => {
         return  (<li onClick={() => {
          addStock(result.symbol);
          setSearch("");
         }} key={result.symbol} className="dropdown-item">{result.description} ({result.symbol})</li>)
       })
       
        
      
      }
      </ul>)
  }
  
  return (<div className="w-50 p-5 rounded mx-auto">
    <div className="form-floating dropdown">
      <input style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }} id="search" type="text" className="form-control" placeholder="Search" autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)}></input>
      <label htmlFor="search">Search</label>
      {renderDropDown()}
    </div>
  </div>)
}