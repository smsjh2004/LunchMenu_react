import { Modal, Button } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

export function BestRestaurantModal({ show, onClose, filteredList }) {
    console.log("filteredList:::", filteredList)

    const handleOpenNewTab = (url) => {
        window.open(url, "_blank", "noopener, noreferrer");
      };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>맛집 리스트 {filteredList.length}개</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {filteredList.map((item) => {
                    function startNavigation() {
                        // eslint-disable-next-line no-undef
                        Kakao.Navi.start({
                            name: item.place_name,
                            x: Number(item.x),
                            y: Number(item.y),
                            coordType: 'wgs84',
                        });
                    }

                    const handleSearch = () => {
                        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(item.place_name)}`;
                        window.open(googleSearchUrl);
                    };
                    return (
                        <li style={{ lineHeight: 2 }}>
                            {item.place_name}
                            <button
                                style={{
                                    border: 0,
                                    backgroundColor: "transparent"
                                }}
                                onClick={startNavigation}>
                                <img
                                    src="./image/kakaonavi.png"
                                    alt=""
                                    width="35px"
                                    height="35px"
                                >
                                </img>
                            </button>
                            <button
                                style={{
                                    border: 0,
                                    backgroundColor: "transparent"
                                }}
                                onClick={() => handleOpenNewTab(`https://map.kakao.com/link/to/${item.place_name},${item.y},${item.x}`)}
                            >
                                <img
                                    src="./image/kakaomap_basic.png"
                                    alt=""
                                    width="35px"
                                    height="35px"
                                >
                                </img>
                            </button>

                            <button
                                style={{
                                    border: 0,
                                    backgroundColor: "transparent"
                                }}
                                onClick={handleSearch}
                            >
                                <FaInfoCircle />

                            </button>
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