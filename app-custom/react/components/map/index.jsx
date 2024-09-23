import React, { useEffect, useRef, useState } from "react";
import { stores } from "./stores";
import styles from "./styles/style.css";

const GoogleMapsApiKey = "AIzaSyAINq2whByx3bfiTZCturDmncv6liqGuTo";

export const GoogleMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);
  const [storeLocations, setStoreLocations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [locationFound, setLocationFound] = useState(false);
  const geocoder = useRef(null);

  const _initMap = () => {
    if (!mapRef.current || storeLocations.length === 0) return;

    const mapOptions = {
      center: {
        lat: storeLocations[0]?.latitude || -23.55052,
        lng: storeLocations[0]?.longitude || -46.633308,
      },
      zoom: 12,
    };

    mapInstance.current = new google.maps.Map(mapRef.current, mapOptions);

    storeLocations.forEach((location, index) => {
      const marker = new google.maps.Marker({
        position: {
          lat: location.latitude,
          lng: location.longitude,
        },
        map: mapInstance.current,
        title: stores[index].name,
      });

      markers.current.push(marker);
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleMapsApiKey}&libraries=places,geometry`;
    script.async = true;

    script.onload = () => {
      geocoder.current = new google.maps.Geocoder();
      setStoreLocations(
        stores.map((store) => ({
          latitude: store.coordinates.latitude,
          longitude: store.coordinates.longitude,
        }))
      );
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (storeLocations.length > 0) {
      _initMap();
    }
  }, [storeLocations]);

  const handleGoToMap = (pointOfSale) => {
    if (mapInstance.current) {
      const position = {
        lat: pointOfSale.coordinates.latitude,
        lng: pointOfSale.coordinates.longitude,
      };
      mapInstance.current.setCenter(position);
      mapInstance.current.setZoom(15);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const address = document.getElementById("search-pointofsale").value;
  
    if (geocoder.current && address) {
      geocoder.current.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          mapInstance.current.setCenter(location);
          mapInstance.current.setZoom(15);
  
          setLocationFound(true);
          setModalOpen(true);
        } else {
          setLocationFound(false);
          setModalOpen(true);
        }
      });
    } else {
      setLocationFound(false);
      setModalOpen(true);
    }
  };
  

  return (
    <div
      id="wd-browsing-pointofsale"
      className={styles.wd_browsing_pointofsale}
    >
      {storeLocations.length > 0 ? (
        <>
          <div className={styles.browsing}>
            <form onSubmit={handleSearchSubmit}>
              <div className={styles.input_wrapper}>
                <label>Encontre a loja mais próxima de você:</label>
                <input
                  id="search-pointofsale"
                  placeholder="Digite aqui o nome da sua cidade, bairro, rua ou CEP"
                  name="pointofsale-search"
                  type="text"
                />
                <button className={styles.btn_submit} type="submit">
                  Pesquisar
                </button>
                <button
                  className={styles.find_location}
                  type="button"
                  onClick={() =>
                    navigator.geolocation.getCurrentPosition((position) => {
                      const location = new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                      );
                      mapInstance.current.setCenter(location);
                      mapInstance.current.setZoom(15);
                    })
                  }
                >
                  <i className={styles.icon} />
                  <span>Onde Estou?</span>
                </button>
              </div>
            </form>
          </div>

          <div id="pointofsale-list" className={styles.list}>
            <ul>
              {stores.map((point) => (
                <li
                  key={point.id}
                  className={styles.pointofsale}
                  onClick={() => handleGoToMap(point)}
                >
                  <i className={styles.icon} />
                  <p className={styles.name}>{point.name}</p>
                  <p className={styles.address}>
                    {point.address.streetAddress}
                    <br />
                    {point.address.city} - {point.address.state}
                  </p>
                  <p className={styles.phone}>{point.phone}</p>
                  <a href="javascript:void(0);" className={styles.go_to_map}>
                    {">"}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.map}>
            <div
              id="pointofsale-map"
              className={styles.pointofsale_map}
              ref={mapRef}
              style={{ height: "400px" }}
            ></div>
          </div>

          {modalOpen && (
            <div className={styles.modal}>
              <div className={styles.modal_content}>
                <span
                  className={styles.close}
                  onClick={() => setModalOpen(false)}
                >
                  &times;
                </span>
                {locationFound ? (
                  <p>Localização encontrada!</p>
                ) : (
                  <p>Oops, aconteceu um erro no processo de busca, tente novamente.</p>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <span className={styles.empty}>Nenhum ponto de venda encontrado.</span>
      )}
    </div>
  );
};
