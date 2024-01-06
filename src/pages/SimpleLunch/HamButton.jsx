import { useState, useEffect } from "react";
import "../css/HamButton.css";
import Button from 'react-bootstrap/Button';

export function HamButton({ currectPage }) {
    const GoUrl = [
        "/Lunch/SimpleLunch",
        "/Lunch/NearRestaurant",
        "/Lunch/BestRestaurant",
        "/Lunch/ChatBot"
     ]
     const [hideBtn , setHideBtn] = useState(false);
     const [innerWidth, setInnerWidth] = useState(window.innerWidth);

     useEffect(() => {
       const resizeListener = () => {
         setInnerWidth(window.innerWidth);
       };
       window.addEventListener("resize", resizeListener);
     });

     const responsiveSidebar = innerWidth < 850 && innerWidth > 710 ? "60%" : innerWidth < 709 ? "100%" : innerWidth < 1400 && innerWidth > 851 ? "50%" : "20%";

    return(
        <div>
            <span className='ham-button' onClick={() =>setHideBtn(true)}>
                <div className='hamber-bar'></div>
                <div className='hamber-bar'></div>
                <div className='hamber-bar'></div>
            </span>
            <span className="side-bar" style={{ left: !hideBtn ? "-100%" : 0, width: responsiveSidebar }}>
                <div className="hide-btn" onClick={() => setHideBtn(false)}>X</div>
                <div className="title">점심뽑기</div>
                <div className="button-box">
                    <Button className="buttons-sidebar" style={{ color: currectPage === 1 ? "red" : "white"}} href={GoUrl[0]} >심플메뉴뽑기</Button>
                    <Button className="buttons-sidebar" style={{ color: currectPage === 2 ? "red" : "white"}} href={GoUrl[1]}>주변식당뽑기</Button>
                    <Button className="buttons-sidebar" style={{ color: currectPage === 3 ? "red" : "white"}} href={GoUrl[2]}>맛집 추천</Button>
                    <Button className="buttons-sidebar" style={{ color: currectPage === 4 ? "red" : "white"}} href={GoUrl[3]}>점심뽑기챗봇</Button>
                </div>
            </span>
        </div>

        
    )    
}