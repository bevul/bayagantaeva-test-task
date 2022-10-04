import "./Form.css";
import { useState, useEffect } from "react";

import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

import axios from "axios";

function Form() {
  const [Address, setAddress] = useState("");

  const [ip, setIP] = useState("");
  const [city, setCity] = useState("");

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data);
    setIP(res.data.IPv4);
  };

  const getUserCity = async () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${ip}&token=c1145d0d8655a30ef87e6d28af4a64604355a61c`
      )
        .then((res) => res.json())
        .then((json) => {
          if (
            {}.hasOwnProperty.call(json, "family") &&
            json.family.toLowerCase().indexOf("err")
          ) {
            return reject(json);
          }
          const {
            location: {
              data: { city },
            },
          } = json;
          resolve({ city, ip });
        });
    });
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
    getUserCity();
  }, []);

  getUserCity()
    .then(({ city }) => {
      setCity(city);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className="container">
      <h2>Ваш IP - {ip}</h2>
      <h2>Ваш город - {city}</h2>

      <h2>
        <strong>Адрес</strong>
      </h2>
      <AddressSuggestions
        token="c1145d0d8655a30ef87e6d28af4a64604355a61c"
        value={Address}
        onChange={setAddress}
        inputProps={{
          placeholder: "Введите улицу",
        }}
      />
    </div>
  );
}

export default Form;
