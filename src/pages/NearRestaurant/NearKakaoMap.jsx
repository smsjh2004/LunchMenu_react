import { useEffect, useState } from 'react';
import "./NearKakaoMap.css";

export function NearKakaoMap({ setList, address, setAddress }) {
    const { kakao } = window;

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        // 현재 지도의 중심 좌표를 가져오는 함수
        function getCurrentCenter() {
            const center = map.getCenter();
            const lat = center.getLat();
            const lng = center.getLng();
            return new kakao.maps.LatLng(lat, lng);
        }

        // 현재 지도의 주소를 콘솔에 출력하는 함수
        function logCurrentAddress() {
            const geocoder = new kakao.maps.services.Geocoder();
            const center = getCurrentCenter();

            geocoder.coord2Address(center.getLng(), center.getLat(), function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    console.log("현재 지도가 보여주고 있는 주소:", result[0].address.address_name);
                    setAddress(result[0].address.address_name);
                }
            });
        }

        // 지도의 중심 좌표가 변경될 때마다 주소를 콘솔에 출력
        kakao.maps.event.addListener(map, 'center_changed', logCurrentAddress);

        // 초기에 한번 현재 주소를 출력
        logCurrentAddress();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const locPosition = new kakao.maps.LatLng(lat, lon);
                console.log("locPosition", locPosition)
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

        var geocoder = new kakao.maps.services.Geocoder();
        console.log("geocoder", geocoder)
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
                const content = '<div class="wrap">' +
                    '    <div class="info">' +
                    '        <div class="title">' +
                    `            ${place.place_name}` +
                    '            <div class="closeBtn" title="닫기">x</div>' +
                    '        </div>' +
                    '        <div class="body">' +
                    '            <div class="desc">' +
                    `                <div class="ellipsis">${place.address_name}</div>` +
                    `                <div><a href="https://map.kakao.com/link/to/${place.place_name},${place.y},${place.x}" target="_blank" class="link">길찾기</a></div>` +
                    '            </div>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>';
        
                infowindow.setContent(content);
                infowindow.open(map, marker);
        
                // 닫기 버튼에 onClick 이벤트 추가
                const closeBtn = document.querySelector('.closeBtn');
                if (closeBtn) {
                    closeBtn.addEventListener('click', function () {
                        if (infowindow) {
                            infowindow.close();
                        }
                    });
                }
            });
        }
    }, [kakao.maps.InfoWindow, kakao.maps.LatLng, kakao.maps.LatLngBounds, kakao.maps.Map, kakao.maps.Marker, kakao.maps.event, kakao.maps.services.Places, kakao.maps.services.Status.OK, setList]);

    return (
        <div id="map" style={{ width: "100%", maxWidth: 750, height: 500, margin: 0, margin: "auto" }}></div>
    );
}
