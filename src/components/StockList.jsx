import { useState,useEffect } from "react"
import {BsCaretDownFill, BsCaretUpFill} from "react-icons/bs"
import finnHub from "../apis/finnHub"
import {useGlobalContext} from "../context"
import { useNavigate } from "react-router-dom";

export const StockList = () => {
  const [stock,setStock] = useState([]);
  const { watchList,deleteStock } = useGlobalContext();
  const navigate = useNavigate();

  const changeColor = (change) => {
    return change > 0 ? "success" : "danger"
  };

  const renderIcons = (change) => {
    return change > 0 ? <BsCaretUpFill/> : <BsCaretDownFill />
  };

  const handleStockSelect = (symbol) => {
     navigate(`detail/${symbol}`);
  }
  
  useEffect(() => {
     let isMounted = true;
    const fetchData = async() => {
      try {
       
        const responses = await Promise.all(watchList.map((symbol) => {
          return finnHub.get("/quote",{
          params: {
            symbol: symbol
          }
        })
         })
            );

         
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol
          }
        });
         
        if(isMounted) {
          setStock(data)
        }
       
       
      } catch (error) {
        
      }
    }
    fetchData();
    return () => (isMounted == false)
  }, [watchList])
  return (<main>
    <table className="table hover mt-5">
      <thead style={{ color: "rgb(79,89,102)" }}>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Last</th>
          <th scope="col">Chg</th>
          <th scope="col">Chg%</th>
          <th scope="col">High</th>
          <th scope="col">Low</th>
          <th scope="col">Open</th>
          <th scope="col">Pclose</th>

        </tr>
      </thead>
      <tbody>
        {
          stock.map((stockData) => {
            return (<tr onClick={() => handleStockSelect(stockData.symbol)} style={{cursor: "pointer"}} className="table-row" key={stockData.symbol}>
              <th scope="row">{stockData.symbol}</th>
              <td scope="row">{stockData.data.c}</td>
               <td scope="row" className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d} {renderIcons(stockData.data.d)}</td>
               <td scope="row" className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp} {renderIcons(stockData.data.dp)}</td>
               <td scope="row">{stockData.data.h}</td>
               <td scope="row">{stockData.data.l}</td>
              <td scope="row">{stockData.data.o}</td>
               <td scope="row">{stockData.data.pc}<button className="btn btn-danger btn-sm ml-3 d-inline-block delete-button" onClick={(e) => {e.stopPropagation() 
        deleteStock(stockData.symbol)} }>Remove</button></td>
            </tr>)
          })
        }
      </tbody>
      </table>
    </main>)
}