import Form from 'react-bootstrap/Form';
import { HamButton } from "../SimpleLunch/HamButton"
import { BestKakaoMap } from "./BestKakaoMap"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { LocationURL } from '../../core/Api';

export function BestRestaurant() {
    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('')
    const [location, setLocation] = useState('')
  
    const onChange = (e) => {
      setInputText(e.target.value)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if(!location) {
        setPlace(`${location}${InputText}` );
      } else {
        setPlace(InputText)
      }
      setInputText('')
    }

    useEffect(() => {
      axios.get(`${LocationURL}`).then((res) => {
        console.log(res)
      }).catch((error) => console.log("error", error))

      // fetch({url: `/api/req/data?key=20B7CC35-174B-39C4-AB85-75001F1D7962&domain=http://localhost:3000&service=data&version=2.0&request=getfeature&format=json&size=1000&page=1&geometry=false&attribute=true&crs=EPSG:3857&geomfilter=BOX(13663271.680031825,3894007.9689600193,14817776.555251127,4688953.0631258525)&data=LT_C_ADSIDO_INFO`, method: "get"}).then((res) => console.log(res))
    })

  return (
    <div>
      <HamButton currectPage={3} />
      <div style={{ textAlign: "center" }}>
        <h1>맛집 추천 페이지</h1>
        <div style={{ width: 350, margin: 0, margin: "auto", marginBottom: 20 }}>
          <Form.Select aria-label="Default select example" onChange={(e) => setLocation(e.target.value)}>
            <option>지역을 선택해주세요(기본값 전국)</option>
            <option value="화성시" >화성시</option>
            <option value="안양시">안양시</option>
            <option value="수원시">수원시</option>
          </Form.Select>
        </div>

        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
        <button type="submit" onClick={handleSubmit}>검색</button>
      </div>
      <BestKakaoMap searchPlace={Place} />
    </div>
  )
}