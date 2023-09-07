import axios from "axios";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../App";
import { Link } from "react-router-dom";
import "./Country.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function Country() {
  let theme = useContext(ThemeContext);
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: 50, color: "gray", margin: "50px  0", theme }}
      spin
    />
  );

  const { code } = useParams();
  useEffect(() => {
    axios
      .get(
        `
      https://restcountries.com/v3.1/alpha/${code}`
      )
      .then((res) => {
        setCountry(res.data);
        setLoading(false);
      })
      .catch((err) => alert("error"));
  }, [code]);

  if (loading) {
    return <Spin indicator={antIcon} />;
  }

  return (
    <div style={theme}>
      <div className="back">
        {" "}
        <Link style={theme} to="/">
          {" "}
          Geri qayıt <i class="fa-solid fa-circle-arrow-left"></i>{" "}
        </Link>{" "}
      </div>

      {country.map((item) => {
        return (
          <div className="name">
            <h3> {item.name.official} </h3>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Qeyd
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Bu ölkənin sərhəd ölkələrinin sayı:{" "}
                      {item.borders ? item.borders.length : ""}
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    Ölkə xəritəsinə keçid linki:{" "}
                    <Link target="_blank" to={item.maps.googleMaps}>
                      {" "}
                      {item.maps.googleMaps}{" "}
                    </Link>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Bağla
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {country.map((item) => {
        return (
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  style={theme}
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Paytaxt
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p> {item.capital} </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  style={theme}
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Bayraq
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <img src={item.flags.png} />
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  style={theme}
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Gerb
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <img src={item.coatOfArms.png} />
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  style={theme}
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="true"
                  aria-controls="collapseFour"
                >
                  Əhali
                </button>
              </h2>
              <div
                id="collapseFour"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p> {item.population} </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  style={theme}
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="true"
                  aria-controls="collapseFive"
                >
                  Ərazi
                </button>
              </h2>
              <div
                id="collapseFive"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p>{item.area} </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  style={theme}
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                  aria-expanded="true"
                  aria-controls="collapseSix"
                >
                  Bölgə
                </button>
              </h2>
              <div
                id="collapseSix"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p> {item.region} </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  style={theme}
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSeven"
                  aria-expanded="true"
                  aria-controls="collapseSeven"
                >
                  Müstəqil
                </button>
              </h2>
              <div
                id="collapseSeven"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p> {item.independent ? "Bəli" : "Xeyr"} </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  style={theme}
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseEight"
                  aria-expanded="true"
                  aria-controls="collapseEight"
                >
                  Sərhəd ölkələr
                </button>
              </h2>
              <div
                id="collapseEight"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  {country.map((item) =>
                    item.borders ? (
                      item.borders.map((a) => (
                        <Link to={`/country/${a}`}> {a} </Link>
                      ))
                    ) : (
                      <p> Sərhəd ölkəsi yoxdur </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Country;
