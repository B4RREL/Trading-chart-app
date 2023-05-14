import React, {useContext,useState,useEffect} from 'react'

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [watchList,setWatchList] = useState( 
    localStorage.getItem("watchList")?.split(",") || ["GOOGL", "MSFT", "AMZN"] )

  useEffect(() => {
    localStorage.setItem("watchList", watchList)
  }, [watchList])

  const addStock = (stock) => {
     if(watchList.indexOf(stock) === -1){
       setWatchList([...watchList, stock]);
       
     };
  }

  const deleteStock = (stock) => {
    setWatchList(watchList.filter((el) => {
      return el !== stock
    }));
  }
  
  return <AppContext.Provider value={{ watchList,setWatchList,addStock,deleteStock }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export {AppContext, AppProvider}
