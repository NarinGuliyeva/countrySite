import "./App.css";
import { Switch, Space } from "antd";
import { theme } from "./Theme/Light";
import React, { useEffect } from "react";
import Body from "./Comp/Body";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Country from "./Comp/Country";
function App() {
  const [tema, setTema] = useState(theme.light);
  const [tema2, setTema2] = useState(theme.gray);
  const [tema3, setTema3] = useState(theme.colGray);
  
 
 
  useEffect (  () => {
    let lightTheme = localStorage.getItem("theme")
    let lightThemeParse = JSON.parse(lightTheme);
        console.log(lightThemeParse);
        // lightThemeParse && theme.dark  ?  setTema(lightThemeParse.dark)  : setTema(theme.light) 
        
   }  ,[ ] ) 
  
   console.log(tema);
  let lightHandle = () => {
    if (tema == theme.light && tema2 == theme.gray && tema3 == theme.colGray) {
      setTema2(theme.dark);
      setTema3(theme.colBlack);
      setTema(theme.dark)
      // localStorage.setItem("theme", JSON.stringify(theme));
    } else {
      setTema(theme.light);
      setTema2(theme.gray);
      setTema3(theme.colGray);
    }
  };


  return (
    <Router>
      <div className="App">
        <div className="light">
          <span style={tema3}>
            {" "}
            {tema3 == theme.colGray
              ? "İşıqları söndür"
              : "İşıqları yandır"}{" "}
          </span>
          <Space direction="vertical">
            <Switch
              style={tema2}
              onClick={lightHandle}
              unCheckedChildren={<i class="fa-regular fa-moon"></i>}
              checkedChildren={<i class="fa-regular fa-sun"></i>}
            />
          </Space>
        </div>
        <ThemeContext.Provider value={tema}>
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/country/:code" element={<Country />} />
          </Routes>
        </ThemeContext.Provider>
      </div>
    </Router>
  );
}
export const ThemeContext = React.createContext();
export default App;
