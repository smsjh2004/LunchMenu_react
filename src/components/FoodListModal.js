import { Modal, Button } from "react-bootstrap";

export function FoodListModal({ show, onClose, filteredFoods }) {

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>점심뽑기 메뉴 리스트 {`${filteredFoods.length}`}개</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {filteredFoods.map((_ ,idx) => {
          return (
            <li>
              {filteredFoods[idx].menu}
            </li>
          )
        })}
        
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}