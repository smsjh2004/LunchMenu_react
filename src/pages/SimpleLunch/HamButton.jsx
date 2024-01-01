import { useState } from "react";
import { styles } from "../css/HamButton.css";
import Button from 'react-bootstrap/Button';

export function HamButton() {
    const GoUrl = [
        "/Lunch/SimpleLunch",
        "/Lunch/NearRestaurant",
        "/Lunch/BestRestaurant",
        "/Lunch/ChatBot"
     ]
     const [hideBtn , setHideBtn] = useState(false);


    return(
        <div>
            <span className='ham-button' onClick={ () =>setHideBtn(false)}>
                <div className='hamber-bar'></div>
                <div className='hamber-bar'></div>
                <div className='hamber-bar'></div>
            </span>
            <span className="side-bar" style={{left: hideBtn ? "-30%" : 0}}>
                <div className="hide-btn" onClick={ () => setHideBtn(true)}>X</div>
                <div className="title">점심뽑기</div>
                <div className="button-box">
                    <Button className="buttons-sidebar on" href={GoUrl[0]} >심플메뉴뽑기</Button>
                    <Button className="buttons-sidebar" href={GoUrl[1]}>주변식당뽑기</Button>
                    <Button className="buttons-sidebar" href={GoUrl[2]}>맛집 추천</Button>
                    <Button className="buttons-sidebar" href={GoUrl[3]}>점심뽑기챗봇</Button>
                </div>
            </span>
        </div>

        
    )    
}