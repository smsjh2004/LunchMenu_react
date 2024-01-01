import { BestKakaoMap } from "./BestKakaoMap"
import React, { useState } from 'react'

export function BestRestaurant() {
    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('')
  
    const onChange = (e) => {
      setInputText(e.target.value)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      setPlace(InputText)
      setInputText('')
    }
    return (
        <div>
            <h1>맛집 추천 페이지</h1>
            <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
        <button type="submit" onClick={handleSubmit}>검색</button>
            <BestKakaoMap searchPlace={Place} />
        </div>
    )
}