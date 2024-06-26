import { NearKakaoMap } from "./NearKakaoMap";
import { useEffect, useState } from 'react';
import { HamButton } from "../SimpleLunch/HamButton";
import { Button } from "react-bootstrap";
import { NearRestaurantModal } from "./NearRestaurantModal";

export function NearRestaurant() {
    const [list, setList] = useState([]);
    const [place, setPlace] = useState();
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState();

    console.log(address)

    const handleClick = () => {
        const randomIndex = Math.floor(Math.random() * list.length);
        const selectedMenu = list[randomIndex].place_name;
        setPlace(selectedMenu);
      };

      const [searchTerm, setSearchTerm] = useState('');

      useEffect(() => {
          setSearchTerm(place)
      }, [place]);

      const handleSearch = () => {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
        if(place !== undefined) {
            window.open(googleSearchUrl);
        } else {
            alert("가게를 뽑아주세요")
        }
      };

    return (
        <div>
            <HamButton currectPage={2} />
            <div style={{ textAlign: "center"}}>
            <h1>주변식당뽑기 페이지</h1>
            <h4>현재위치: {address}</h4>
            <NearKakaoMap setList={setList} address={address} setAddress={setAddress}/>
            <h1>{place}</h1>
            <div style={{ marginTop: 30}}>
                <Button onClick={handleClick} >뽑기</Button>
                <Button onClick={() => setOpen(true)} style={{ marginLeft: 20 }}>가게 리스트</Button>
                {place && <Button onClick={handleSearch} style={{ marginLeft: 20 }}>검색</Button>}
            </div>
            <NearRestaurantModal show={open} onClose={() => setOpen(false)} list={list} />
            </div>
        </div>
    )
}