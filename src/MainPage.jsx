import "./pages/css/MainPage.css";
import Button from 'react-bootstrap/Button';

export function MainPage() {

    return (
        <div className="wrap">
            <div className="button-box">
                <h1 className="main-title">고성능 점심뽑기</h1>
                <Button className="buttons" href="/Lunch/SimpleLunch" >심플메뉴뽑기</Button>
                <Button className="buttons" href="/Lunch/NearRestaurant">주변식당뽑기</Button>
                <Button className="buttons" href="/Lunch/BestRestaurant">맛집 추천</Button>
                <Button className="buttons" href="/Lunch/ChatBot">점심뽑기챗봇</Button>
            </div>
        </div>
    )
}