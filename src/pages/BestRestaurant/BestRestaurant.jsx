import React, { useEffect, useState } from 'react'
import { getCTPAPI, getSIGAPI } from '../../core/Api';
import { BestKakaoMap } from "./BestKakaoMap"
import { HamButton } from "../SimpleLunch/HamButton"
import { LocationSelector } from './LocationSelector';
import { BestRestaurantModal } from './BestRestaurantModal';

export function BestRestaurant() {
    const [InputText, setInputText] = useState('');
    const [Place, setPlace] = useState('');
    const [location_CTP, setLocation_CTP] = useState('');
    const [location_SIG, setLocation_SIG] = useState('');
    // 도 데이터
    const [locationCTPData, setLocationCTPData] = useState([]);
    // 동 데이터
    const [locationSIGData, setLocationSIGData] = useState([]);
    // 읍면 데이터
    // const [locationADRIData, setLocationADRIData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const handleOnKeyPress = e => {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
    };

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
    // const filterResults = searchResults.map((item) => item.place_name)
    // const locationFilter2 = locationADRIData.filter((item) => item.includes(location_SIG));
    useEffect(() => {
      const fetchData = async () => {
        try {
          const apiCTPData = await getCTPAPI();
          const apiSIGData2 = await getSIGAPI();
          // const apiSIGData3 = await getADRIAPI();

          setLocationCTPData(apiCTPData);
          setLocationSIGData(apiSIGData2);
          // setLocationADRIData(apiSIGData3);
        } catch(error) {
          console.error(error);
        }
      };
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
        <h1>맛집 검색 (추천) 페이지</h1>
        <LocationSelector 
          data={locationCTPData} 
          setData={(e) => setLocation_CTP(e.target.value)} 
          defalutValue="전국" 
        />
        <LocationSelector 
          data={locationFilter} 
          setData={(e) => setLocation_SIG(e.target.value)} 
          defalutValue="시/군/구" 
          disabled={!location_CTP || location_CTP === "no"}
        />
        <input 
          placeholder="키워드를 입력하세요" 
          onKeyPress={handleOnKeyPress}
          onChange={onChange} 
          value={InputText} 
          style={{ marginBottom: 20, borderRadius: "0.375rem", borderWidth: 1,borderColor: "gray"}} 
        />
        <button 
          type="submit" 
          onClick={handleSubmit}  
          style={{ marginLeft: 10, borderRadius: "0.375rem", borderWidth: 1}}
        >
          검색
        </button>
        {/* <button 
          type="submit" 
          onClick={startNavigation}  
          style={{ marginLeft: 10, borderRadius: "0.375rem", borderWidth: 1}}
        >
          길찾기
        </button> */}
        <button 
          type="submit" 
          onClick={() => setShowModal(true)}  
          style={{ marginLeft: 10, borderRadius: "0.375rem", borderWidth: 1}}
        >
          리스트
        </button>
      </div>
      {/* <div>
      {searchResults.map((item) => {
            return (
              <h1>{item.place_name}</h1>
            )
          })}
      </div> */}
      {showModal && <BestRestaurantModal show={showModal} onClose={() => setShowModal(false)} filteredList={searchResults}/>}
      <BestKakaoMap searchPlace={Place} searchResults={searchResults} setSearchResults={setSearchResults} />
    </div>
  )
}