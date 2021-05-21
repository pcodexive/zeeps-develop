import React from "react";

class KakaoMap extends React.Component {
  state = {
    searchWord: "",
  };
  componentDidMount() {
    const script = document.createElement("script");
    script.id = "script";
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=3ae0a9d5db3771488c2f0271f45d2f91&autoload=false&libraries=services,clusterer,drawing";
    document.body.appendChild(script);
    script.onload = () => {
      this.onLoaded(this.props.searchWord);
    };
  }

  componentDidUpdate() {
    if (this.props.searchWord !== this.state.searchWord) {
      this.onLoaded(this.props.searchWord);
    }
  }

  componentWillUnmount() {
    const script = document.getElementById("script");
    document.body.removeChild(script);
  }

  onLoaded(searchWord) {
    let map;
    let infowindow;
    let options;
    let container;
    let ps;
    let bounds;
    window.kakao.maps.load(() => {
      if (!container) container = document.getElementById("map");
      if (!infowindow)
        infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      if (!options)
        options = {
          center: new window.kakao.maps.LatLng(37.506502, 127.053617),
          level: 3,
        };

      if (!map) map = new window.kakao.maps.Map(container, options);
      if (!ps) ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(searchWord ? searchWord : "", placesSearchCB);

      function placesSearchCB(data, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          if (!bounds) bounds = new window.kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
      }

      function displayMarker(place) {
        let marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(place.y, place.x),
        });

        // 마커에 클릭이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "click", function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              "</div>"
          );
          infowindow.open(map, marker);
        });
      }
    });
  }

  render() {
    return (
      <div
        id="map"
        style={{ width: "100%", height: "400px", marginTop: "10px" }}
      />
    );
  }
}

export default KakaoMap;
