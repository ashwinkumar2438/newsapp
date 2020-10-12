import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import Article from "./components/Article";
import './App.css';

function App() {

  let [state,updateState]=useState([]);

  let [countries,updateCountries]=useState([]);
  let [selCountry,updateCountry]=useState("IN");

  useEffect(()=>{
    fetchCountryData("in").then(()=>fetch(new Request("https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json"))).then((res)=>res.json()).then(response=>{
      updateCountries(response)
    })

  },[])

  let changeCountry=(val)=>{
    updateCountry(val);
    fetchCountryData(val);
  }

  let fetchCountryData=(countryval)=>{
    return fetch(new Request(`https://newsapi.org/v2/top-headlines?country=${(""+countryval).toLowerCase()}&apiKey=69b0de31f96d42729b5d5aa9f926b28c`)).then((res)=>res.json()).then(response=>{
      updateState(response.articles);
    });
  }

  let searchAll=(searchVal)=>{
    if(searchVal)return fetch(new Request(`https://newsapi.org/v2/everything?q=${searchVal}&apiKey=69b0de31f96d42729b5d5aa9f926b28c`)).then((res)=>res.json()).then(response=>{
      updateState(response.articles);
    });
  }

  return (
    <div className="App">

      <div className="navbar">
          <div className="header">All News Portal</div>
          <div className="inputs">
              {(countries.length)?<select value={selCountry} onChange={(e)=>{changeCountry(e.target.value)}}>
                {countries.map(countrydata=>{
                  return <option key={countrydata.Code} value={countrydata.Code}>{countrydata.Name}</option>
                })}
              </select>:null}
              <label>Search All: <input type="text" onKeyUp={(e)=>{searchAll(e.target.value)}} className="searchbtn"/></label>
          </div>
      </div>
      {(state.length)?state.map((articledata,id)=><Article key={id} articledata={articledata}></Article>):<div className="nodata">NO DATA FOUND!</div>}
    </div>
  );
}

export default App;
