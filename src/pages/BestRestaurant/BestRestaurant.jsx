import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { BestKakaoMap } from "./BestKakaoMap"
import { HamButton } from "../SimpleLunch/HamButton"
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
      setInputText(e.target.value);
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if(location_SIG === "") {
        setPlace(`${location_CTP} ${InputText}`);
      } else if (location_SIG !== "no"){
        setPlace(`${location_SIG} ${InputText}`);
      }
      setInputText('');
    }

    const locationFilter = locationSIGData.filter((item) => item.includes(location_CTP));

    useEffect(() => {
      async function fetchData() {
        const data = await axios.get(`${LocationURL}`);
        const data2 = await axios.get(`${LocationURL2}`);
        try{
          setLocationCTPData(data.data.response.result.featureCollection.features.map(item => item.properties.ctp_kor_nm));
          setLocationSIGData(data2.data.response.result.featureCollection.features.map(item => item.properties.full_nm));
        } catch(error) {
          console.error(error);
        }
      }
      fetchData();
    }, []);

    useEffect(() => {
      if(location_SIG === "" || location_SIG === "no") {
        setLocation_SIG('')
      }

      if(location_CTP === "no" || location_CTP === "") {
        setLocation_CTP('')
      }

    }, [location_CTP, location_SIG]);

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

        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} style={{ marginBottom: 20, borderRadius: "0.375rem", borderWidth: 1,borderColor: "gray"}} />
        <button type="submit" onClick={handleSubmit}  style={{ marginLeft: 10, borderRadius: "0.375rem", borderWidth: 1}}>검색</button>
      </div>
      <BestKakaoMap searchPlace={Place} />
    </div>
  )
}