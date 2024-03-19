import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { SimpleLunchMenuModal } from "./SimpleLunchMenuModal";
import { HamButton } from './HamButton';
import foods from "../../foodData.json";
import "./SimpleLunch.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"


export function SimpleLunch() {
  const [todayMenu, setTodayMenu] = useState("");
  const [todayCategory, setTodayCategory] = useState("");
  const [excludedCategories, setExcludedCategories] = useState([]);

  const handleFilter = (category) => {
    if (excludedCategories.includes(category)) {
      const updatedCategories = excludedCategories.filter((c) => c !== category);
      setExcludedCategories(updatedCategories);
    } else {
      const updatedCategories = [...excludedCategories, category];
      setExcludedCategories(updatedCategories);
    }
  };



  axios.get("http://localhost:4001/Lunch/SimpleLunch", {}) // {} 빈 객체 전달
  // index.js에 있는 result를 res가 전달 받음
  .then((res) => {
    // res에 뭐가 들어있는지 확인하고 싶으면 콘솔로그 찍기
    console.log(`res=> ${res}`);
    const { data } = res;
    console.log("data ==>", data);
  })
  .catch((e) => {
    console.error(e);
  });



  

  const filteredFoods = foods.filter(
    (data) => !excludedCategories.includes(data.category)
  );
  console.log(filteredFoods)

  const handleClick = () => {
    if (filteredFoods.length === 0) {
      alert("전부 체크되어 있습니다. (메뉴 없음)");
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredFoods.length);
    const selectedMenu = filteredFoods[randomIndex].menu;
    const selectedCategory = filteredFoods[randomIndex].category;
    setTodayMenu(selectedMenu);
    setTodayCategory(selectedCategory);
  };

  useEffect(() => {
    if (filteredFoods.length === 0) {
      alert("전부 체크되어 있습니다. (메뉴 없음)");
      setExcludedCategories([]);
    }
  }, [filteredFoods, setExcludedCategories]);

  // modal 코드
  const [showMenuList, setShowMenuList] = useState(false);

  const handleButtonClick = () => {
    setShowMenuList(!showMenuList);
  };

  const handleCloseModal = () => {
    setShowMenuList(false);
  };

  // 코드 줄이기
  const catecory = ["한식", "일식", "중식", "양식"];
  
  return (
    <div id="lunch_box">

      <HamButton currectPage={1}/>
      <div id="lunch_wrap">
        <h1>심플점심뽑기</h1>
        <div className="button-container">
          <Button variant="primary" onClick={handleClick}>누르시오</Button>
          <Button variant="secondary" onClick={handleButtonClick}>
            {showMenuList ? "메뉴 숨기기" : "메뉴 보기"}
          </Button>
        </div>
        {showMenuList && (
          <SimpleLunchMenuModal show={showMenuList} onClose={handleCloseModal} filteredFoods={filteredFoods}/>
        )}
  
        <div className="category-container">
          {catecory.map((category) => (
            <label className="category-label" key={category}>
              {category} 제외
              <input
                type="checkbox"
                checked={excludedCategories.includes(category)}
                onChange={() => handleFilter(category)}
              />
            </label>
          ))}
        </div>
  
        <div className="menu-container">
          <h2 className="menu">{todayMenu} ({todayCategory})</h2>
        </div>
      </div>
    </div>
  );
}