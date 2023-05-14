import Chart from "react-apexcharts"
import {useState} from "react"

export const StockChart = ({chartData, symbol}) => {

  const {day, week, year} = chartData;
  const [dateFormat,setDateFormat] = useState("24h");
  
  const dateDataFormat = () => {
    switch(dateFormat) {
      case "24h":
        return day
      case "7d":
        return week
      case "1y":
        return year
      default :
        return day
    }
  }

  const  color = dateDataFormat()[dateDataFormat().length - 1].y - dateDataFormat()[0].y > 0 ? "#26C281" : "#ed3419"

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px"
      }
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: "MM dd HH:MM"
      }
    }
  }

  const series = [{
    name: symbol,
    data: dateDataFormat()
  }]

  const handleDateSelect = (time) => {
    return (time === dateFormat) ? "btn btn-primary m-1" : "btn btn-outline-primary m-1"
  };
  
  return (
    <div className="mt-5 p-4 shadow-sm bg-white"> 
      <Chart 
        options={options}
        series={series}
        type="area"
        width="100%"/>
      <button onClick={() => setDateFormat("24h") }  className={handleDateSelect("24h")}>24h</button>
      <button onClick={() => setDateFormat("7d") } className={handleDateSelect("7d")}>7d</button>
      <button onClick={() => setDateFormat("1y") } className={handleDateSelect("1y")}>1y</button>
    </div>
  )
}