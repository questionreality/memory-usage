import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie
} from 'recharts';

const socket = io('http://localhost:3000');

const App = ({}) => {
  const [data, setData] = useState([]);
  const [pie,setPie] = useState([]);
  const [dataInMB, setDataInMB] = useState(null);
  const [cpuData,setCpuData] = useState([])

  useEffect(() => {
    socket.on('free mem', freeMem => {
      setData(currentData => [...currentData, freeMem]);
      setDataInMB(freeMem.valueInMB)
      setPie([{name:'free mem', value:freeMem.value}, {name:'used mem', value: freeMem.pieValue}])
    });
  }, []);
  useEffect(()=>{
    socket.on('cpu', cpu=>{
      setCpuData(currentData=>[...currentData,cpu])
    })
  },[])
  
  
  return (
    <div>
    <div className = 'line-graph'>
      <div>
      <h1 style= {{color:'#eee'}}>Free Memory Percentage</h1>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" minTickGap = '1'stroke = '#eee'/>
        <YAxis  stroke = '#eee'/>
        <CartesianGrid stroke="#F1F1F1" strokeDasharray="5 5"/>
        <Line dataKey="value" stroke="#32e0c4" />
      </LineChart> <br/>
      <div style = {{color: '#eee'}}>
          Free Memory in MB : {Math.round(dataInMB)}
      </div>
      </div>
      <div>
      <h1 style = {{color:'#eee'}}>CPU Usage Percentage</h1>
      <LineChart width={500} height={300} data={cpuData}>
        <XAxis dataKey="name" minTickGap = '1'stroke = '#eee'/>
        <YAxis  stroke = '#eee'/>
        <CartesianGrid stroke="#F1F1F1" strokeDasharray="5 5"/>
        <Line dataKey="value" stroke="#32e0c4" />
      </LineChart> <br/>
      </div>
      </div>
      
      {console.log(pie)}
      <div>
      <PieChart width = {250} height={250}>
        <Pie data={pie} dataKey="value" nameKey="name"  outerRadius={50} stroke="#32e0c4" fill = "#393e46"/>
      </PieChart>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
