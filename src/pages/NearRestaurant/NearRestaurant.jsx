import { NearKakaoMap } from "./NearKakaoMap";
import { useState } from 'react';
import { HamButton } from "../SimpleLunch/HamButton";
import { Button } from "react-bootstrap";

export function NearRestaurant() {
    const [list, setList] = useState([]);
    const [place, setPlace] = useState();
    const handleClick = () => {
        const randomIndex = Math.floor(Math.random() * list.length);
        const selectedMenu = list[randomIndex];
        setPlace(selectedMenu);
      };
    return (
        <div>
            <HamButton currectPage={2} />
            <h1>주변식당뽑기 페이지</h1>
            <NearKakaoMap list={list} setList={setList} />
            <Button onClick={handleClick}>누르시오</Button>
            <h1>{place}</h1>
        </div>
    )
}