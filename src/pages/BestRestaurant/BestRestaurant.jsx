import Form from 'react-bootstrap/Form';
import { HamButton } from "../SimpleLunch/HamButton"
import { BestKakaoMap } from "./BestKakaoMap"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { LocationURL, LocationURL2 } from '../../core/Api';

export function BestRestaurant() {
    const [InputText, setInputText] = useState('');
    const [Place, setPlace] = useState('');
    const [location_CTP, setLocation_CTP] = useState('');
    const [location_SIG, setLocation_SIG] = useState('');

    // 도 데이터
    const [locationCTPData, setLocationCTPData] = useState([]);
    // 동 데이터
    const [locationSIGData, setLocationSIGData] = useState([]);


  
    const onChange = (e) => {
      setInputText(e.target.value)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if(location_SIG === "") {
        setPlace(`${location_CTP} ${InputText}`);
        console.log("1번")
      } else if (location_SIG !== "no"){
        setPlace(`${location_SIG} ${InputText}`);
        console.log("2번")
      }
      setInputText('')
    }

    const locationFilter = locationSIGData.filter((item) => item.includes(location_CTP))

    useEffect(() => {
      async function fetchData() {
        const data = await axios.get(`${LocationURL}`);
        const data2 = await axios.get(`${LocationURL2}`);
        try{
          setLocationCTPData(data.data.response.result.featureCollection.features.map(item => item.properties.ctp_kor_nm));
          setLocationSIGData(data2.data.response.result.featureCollection.features.map(item => item.properties.full_nm));
        } catch(error) {
          console.error(error)
        }
      }
      fetchData()
    }, []);

    useEffect(() => {
      if(location_SIG === "" || location_SIG === "no") {
        setLocation_SIG('')
      }

      if(location_CTP === "no" || location_CTP === "") {
        setLocation_CTP('')
      }
        console.log("hi22222")

    }, [location_CTP, location_SIG])

    console.log("location:::", location_CTP, "Place:::", Place, "location_SIG", location_SIG)
    // console.log(locationFilter)
    
  return (
    <div>
      <HamButton currectPage={3} />
      <div style={{ textAlign: "center" }}>
        <h1>맛집 추천 페이지</h1>
        <div style={{ width: 350, margin: 0, margin: "auto", marginBottom: 20 }}>
          <Form.Select aria-label="Default select example" onChange={(e) => setLocation_CTP(e.target.value)}>
          <option value={"no"}>전국</option>
            {locationCTPData.map((item, idx) => 
              <option value={item} key={idx}>{item}</option>
            )}
          </Form.Select>
        </div>

        <div style={{ width: 350, margin: 0, margin: "auto", marginBottom: 20 }}>
          <Form.Select aria-label="Default select example" onChange={(e) => setLocation_SIG(e.target.value)} disabled={!location_CTP || location_CTP === "no"}>
          <option value={"no"}>시/군/구</option>
            {locationFilter.map((item, idx) => 
              <option value={item} key={idx}>{item}</option>
            )}
          </Form.Select>
        </div>

        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
        <button type="submit" onClick={handleSubmit}>검색</button>
      </div>
      <BestKakaoMap searchPlace={Place} />
    </div>
  )
}