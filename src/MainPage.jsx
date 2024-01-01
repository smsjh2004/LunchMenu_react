import { styles } from "./pages/css/MainPage.css";
import Button from 'react-bootstrap/Button';


export function MainPage() {

     const GoUrl = [
        "/Lunch/SimpleLunch",
        "/Lunch/NearRestaurant",
        "/Lunch/BestRestaurant",
        "/Lunch/ChatBot"
     ]
    return (
        <div>
            <h1 className="main-title">고성능 점심뽑기</h1>
            
            <div className="button-box">
                <Button className="buttons" href={GoUrl[0]} >심플메뉴뽑기</Button>
                <Button className="buttons" href={GoUrl[1]}>주변식당뽑기</Button>
                <Button className="buttons" href={GoUrl[2]}>맛집 추천</Button>
                <Button className="buttons" href={GoUrl[3]}>점심뽑기챗봇</Button>
            </div>
        </div>
    )
}