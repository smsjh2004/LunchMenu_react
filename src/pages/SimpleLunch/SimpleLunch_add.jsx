import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { SimpleLunchMenuModal } from "./SimpleLunchMenuModal";
import { HamButton } from './HamButton';
import foods from "../../foodData.json";
import "./SimpleLunch.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export function SimpleLunch_add() {

    const [moiveContent,setmoiveContent] = useState({
        category : "",
        menu : ""
    })

    const getValue = e => {
        const {id, value} = e.target;
        setmoiveContent({
            ...moiveContent,
            [id]: value
          })
          console.log(moiveContent.category);
      };


      const add = () => {
        axios.post('http://localhost:4001/Lunch/SimpleLunch_add',{
            category : moiveContent.category,
            menu : moiveContent.menu
          })
      };

  return (
    <div id="lunch_box">
        <input id="category" Placeholder="한식,양식,중식 적기" onChange={getValue}></input>
        <input id="menu" Placeholder="음식 이름 적기" onChange={getValue}></input>
        <button onClick={add} >추가하기</button>
    </div>
  );
}  
