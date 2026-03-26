import React,{useEffect,useState} from "react";
import axios from "axios";

function App(){

 const [countries,setCountries] = useState([]);
 const [capitals,setCapitals] = useState([]);
 const [mapping,setMapping] = useState([]);

 const [selectedCountry,setSelectedCountry] = useState(null);
 const [selectedCapital,setSelectedCapital] = useState(null);
 const [score,setScore] = useState(0);

 useEffect(()=>{
  fetchData();
 },[]);

 const fetchData = async () => {

  const res = await axios.get(
   "http://localhost:5000/countries"
  );

  setCountries(res.data.countries);
  setCapitals(res.data.capitals);
  setMapping(res.data.mapping);
 };

 const checkMatch = (country,capital)=>{

  const correct = mapping.find(
   c => c.country === country
  );

  if(correct.capital === capital){

   setCountries(prev =>
    prev.filter(c => c !== country)
   );

   setCapitals(prev =>
    prev.filter(c => c !== capital)
   );

   setScore(prev => prev + 1);

  }else{
   alert("Wrong Match");
  }

  setSelectedCountry(null);
  setSelectedCapital(null);
 };

 useEffect(()=>{

  if(selectedCountry && selectedCapital){
   checkMatch(
    selectedCountry,
    selectedCapital
   );
  }

 },[selectedCountry,selectedCapital]);


 return(

  <div style={{
   display:"flex",
   justifyContent:"space-around"
  }}>

   <div>
    <h2>Countries</h2>

    {countries.map(c => (

     <div
      key={c}
      onClick={()=>setSelectedCountry(c)}
     >
      {c}
     </div>

    ))}

   </div>


   <div>
    <h2>Capitals</h2>

    {capitals.map(c => (

     <div
      key={c}
      onClick={()=>setSelectedCapital(c)}
     >
      {c}
     </div>

    ))}

   </div>


   <div>
    <h2>Score: {score}</h2>

    {countries.length === 0 &&
     <h1>All Matched!</h1>
    }

   </div>

  </div>

 );

}

export default App;