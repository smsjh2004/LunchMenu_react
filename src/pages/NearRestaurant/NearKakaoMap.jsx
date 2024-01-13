import { useEffect } from 'react';

export function NearKakaoMap({ list, setList }) {
    const { kakao } = window;
    console.log(list)
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const locPosition = new kakao.maps.LatLng(lat, lon);

                const message = '<div style="padding:5px;">여기에 계신가요?!</div>';
                displayMarker(locPosition, message);
                map.setCenter(locPosition);

                searchNearbyRestaurants(locPosition);
            });
        } else {
            const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
            const message = 'geolocation을 사용할수 없어요..';
            displayMarker(locPosition, message);
        }

        function searchNearbyRestaurants(location) {
            const ps = new kakao.maps.services.Places(map);
            ps.keywordSearch('맛집', placesSearchCB, {
                location: location,
                radius: 1000,
            });
        }

        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }
                map.setBounds(bounds);
                // setList(data.map((item) => item.place_name));
                setList(data)
            }
        }

        function displayMarker(place) {
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x),
            });

            kakao.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        }
    }, [kakao.maps.InfoWindow, kakao.maps.LatLng, kakao.maps.LatLngBounds, kakao.maps.Map, kakao.maps.Marker, kakao.maps.event, kakao.maps.services.Places, kakao.maps.services.Status.OK, setList]);

    return (
        <div id="map" style={{ width: "100%", maxWidth: 750, height: 500, margin: 0, margin: "auto" }}></div>
    );
}
