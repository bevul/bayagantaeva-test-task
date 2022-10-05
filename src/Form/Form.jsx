import "./Form.css";
import { useState, useEffect } from "react";

// Использование React-компонента dadata для подсказки адреса
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

//Использование HTTP клиента Axios для получения ответов на запросы к сторонним ресурсам
import axios from "axios";

function Form() {
  const [Address, setAddress] = useState(""); //Адрес
  const [ip, setIP] = useState(""); // IP
  const [city, setCity] = useState(""); // Город

  //Установка значения внешнего IP согласно пункту №1 ТЗ
  const getIP = async () => {
    const res = await axios.get("https://geolocation-db.com/json/"); //Получение внешнего IP из ресурса https://geolocation-db.com/
    console.log(res.data);
    setIP(res.data.IPv4);
  };

  //Установка значения города согласно пункту №1 ТЗ
  async function getCity() {
    //Получение City из ресурса https://suggestions.dadata.ru/
    //Передается в URL найденный IP
    const res = await axios.get(
      `https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${ip}&token=c1145d0d8655a30ef87e6d28af4a64604355a61c`
    );
    console.log(res.data);
    setCity(res.data.location.value);
  }

  //После рендеринга страницы определить IP и Город согласно пункту №1 ТЗ
  //Переменные недоступны для редактирования пользователю.
  useEffect(() => {
    getIP();
    getCity();
  }, []);

  //Пункт №2 ТЗ
  //AddressSuggestions позволяет ввод пользователем фильтров.
  //Изначально не допускает принятие специальных символов.

  //Пункт №3 ТЗ
  //При заполнении AddressSuggestions формируется запрос к dadata.ru с указанием города и части названия улицы.
  //Полученный список отображается в комбобоксе.
  //При изменении отображается новый список.
  return (
    <div className="container">
      <h2>Ваш IP - {ip} </h2>
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
