import { NearKakaoMap } from "./NearKakaoMap";
import { useState } from 'react';
import { HamButton } from "../SimpleLunch/HamButton";
import { Button } from "react-bootstrap";
import { NearRestaurantModal } from "./NearRestaurantModal";

export function NearRestaurant() {
    const [list, setList] = useState([]);
    const [place, setPlace] = useState();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        const randomIndex = Math.floor(Math.random() * list.length);
        const selectedMenu = list[randomIndex];
        setPlace(selectedMenu);
      };
    return (
        <div style={{ textAlign: "center"}}>
            <HamButton currectPage={2} />
            <h1>주변식당뽑기 페이지</h1>
            <NearKakaoMap list={list} setList={setList} />
            <div style={{ marginTop: 30}}>
                <Button onClick={handleClick} >누르시오</Button>
                <Button onClick={() => setOpen(true)} style={{ marginLeft: 20 }}>가게 리스트</Button>
            </div>
            {/* <h1>{place}</h1> */}


            <NearRestaurantModal show={open} onClose={() => setOpen(false)} list={list} />
        </div>
    )
}