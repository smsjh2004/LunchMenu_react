import { useEffect, useState } from 'react';

export function BestKakaoMap({ searchPlace, searchResults, setSearchResults }) {
    const { kakao } = window;
    // const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };
        const map = new kakao.maps.Map(container, options);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude,
                    lon = position.coords.longitude;
                var locPosition = new kakao.maps.LatLng(lat, lon),
                    message = '<div style="padding:5px;">여기에 계신가요?!</div>';
                displayMarker(locPosition, message);
                map.setCenter(locPosition);
            });
        } else {
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
                message = 'geolocation을 사용할수 없어요..';
            displayMarker(locPosition, message);
        }

        const ps = new kakao.maps.services.Places(map);
        searchPlaces();

        function searchPlaces() {
            ps.keywordSearch(searchPlace, placesSearchCB, {
                category_group_code: "FD6"
            });
        }

        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                let bounds = new kakao.maps.LatLngBounds();
                const newResults = [];

                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                    newResults.push(data[i]);
                }

                map.setBounds(bounds);
                setSearchResults(newResults);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                alert('검색 결과가 존재하지 않습니다.');
            } else if (status === kakao.maps.services.Status.ERROR) {
                alert('검색 결과 중 오류가 발생했습니다.');
            }
        }

        function displayMarker(place) {
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x),
            });

            kakao.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent('<div style="padding:50px;font-size:12px;width: "6500px">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        }
    }, [kakao.maps.InfoWindow, kakao.maps.LatLng, kakao.maps.LatLngBounds, kakao.maps.Map, kakao.maps.Marker, kakao.maps.event, kakao.maps.services.Places, kakao.maps.services.Status.ERROR, kakao.maps.services.Status.OK, kakao.maps.services.Status.ZERO_RESULT, searchPlace, setSearchResults]);


    return (
        <div id="map" style={{ width: "100%", maxWidth: 750, height: 500, margin: 0, margin: "auto"}}></div>
    )
}