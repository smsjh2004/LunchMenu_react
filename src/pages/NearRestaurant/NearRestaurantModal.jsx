import { Modal, Button } from "react-bootstrap";

export function NearRestaurantModal({ show, onClose, list }) {
    console.log(list)
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>주변 가게 리스트 {`${list.length}`}개</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {list.map((item, idx) => {
                    return (
                        <div key={idx} style={{ lineHeight: 1 }}>
                            <h3>{item.place_name}</h3>
                            <p style={{ color: "#585858"}}>{item.address_name}</p>
                        </div>
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