import React from "react";
import { ThemeContext } from "../App";
import { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import "./Body.css";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import  {Link}  from "react-router-dom"


function Body() {
  const antIcon = <LoadingOutlined style={{ fontSize: 50 , color:"gray"  }} spin />;

  const [country, setCountry] = useState([]);
  const [ filterCountry , setFilterCountry ] = useState([]) 
  const [loading, setLoading] = useState(false) 
  const [ tap ,setTap] = useState("")
  const [ isLoading, setIsLoading] = useState(false)
  const [disable , setDisable ] = useState(true)
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) =>  {setCountry(response.data)  ; setLoading(true) ;  setFilterCountry(response.data) ;setLoading(false)    }  )
      .catch((err) => alert("something went wrong"));
  }, []);
  const theme = useContext(ThemeContext);


let searchCountry =(category )  => {
let results  = country.filter(  a  =>  a.region == category  )
setLoading(true)
setTimeout (   () =>   { setFilterCountry( results ) ; setLoading(false )  }   , 1000   ) 
}
let   allCountry = ()  => {
  setLoading(true)
  setTimeout(  ()  =>   { setFilterCountry(country)  ; setLoading(false )    }  , 1000  ) 
}

let inputHandler =(e) => {
setTap(e.target.value)

if( e.target.value.length >  1 ) {
  setDisable(false)
}
else {
  setDisable(true)
}
}


let findCountry = () => {
  setIsLoading(true)
  setTimeout  ( () => {
    let filter2Country =  country.filter( b  => b.name.official.toLocaleLowerCase().includes(   tap.toLocaleLowerCase()   )  ) 
    setFilterCountry(filter2Country) ; setIsLoading(false) ;  setTap("")
  } ,1000 ) 

}
// Ölkələri sortlamaq

const az = () =>{    setFilterCountry( [ ...filterCountry.sort(  (a,z)  =>  { return  a.name.official >= z.name.official ?  1 : -1   }  )   ]   )  }
  const za = () =>  { setFilterCountry(  [ ...filterCountry.sort( (a,z) =>  {return  a.name.official  <=  z.name.official ? 1 : -1 }    )]     )}

  
  return (
    <div style={theme}  className="body">
      <div className="information">
        <div   className="buttons">     <button   onClick={  allCountry }   > Bütün ölkələr </button>
        <button  onClick={ ()  => searchCountry("Americas")  }> Amerika</button>  
        <button  onClick={() => { searchCountry("Asia")    } }> Asiya</button>
        <button   onClick={ ()  => { searchCountry ("Africa")  }  }> Afrika</button>
        <button   onClick={ ()  => {searchCountry("Europe")}  }> Avropa</button>  </div>
   
      <div  className="search"> 
        <input   onChange={inputHandler}  type="text"  placeholder="Ölkə axtar..."   value={tap} />
        <button  disabled={disable} onClick={ findCountry }  type="button"  >  { isLoading ?  "Axtarılır..." : <p> Axtar <i class="fa-solid fa-magnifying-glass"></i> </p>   }   </button>
          </div>
       
          <div  className="AZ">   
            <button  onClick={ az}> Sırala <i class="fa-sharp fa-solid fa-arrow-up-z-a"></i>    </button>
            <button    onClick={za}> Sırala   <i class="fa-solid fa-arrow-down-z-a"></i> </button>
          </div>
          </div>
        
      <div className="allCountry">
   
        {   loading ? <Spin indicator={antIcon} />  :    filterCountry.length ==0 ?  <h3> Nəticə tapılmadı  <i class="fa-regular fa-face-sad-cry"></i> </h3>   : filterCountry.map((item, index) => {
          return ( <Link  to={ `/country/${item.cca3.toLocaleLowerCase()}` } >  
            <div  style={theme }  key={index} className="country">
              <img src={item.flags.png} />
              <h2 > {item.name.official} </h2>
              <h3>
                {" "}
                <CountUp end={item.population} duration={5} />{" "}
              </h3>
           
            </div>
          </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Body;
