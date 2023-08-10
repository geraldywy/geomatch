// import GoogleMap from 'google-maps-react-markers/dist/google-map';
import { useEffect, useRef, useState } from 'react';
import Marker from './Marker';
import './style.css';
import GoogleMap from 'google-maps-react-markers';
import { Box } from '@chakra-ui/react';

export default function GMaps({
  selPlaces,
  setCircleRef,
  setMapRef,
  setMapsRef,
  circleRadius,
  skipOnGoogleApiLoaded,
}) {
  const [mapBounds, setMapBounds] = useState({});

  const [highlighted, setHighlighted] = useState(null);

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   * @param {Object} maps - reference to the maps library
   */
  // eslint-disable-next-line no-unused-vars
  const onGoogleApiLoaded = ({ map, maps }) => {
    if (skipOnGoogleApiLoaded) {
      return;
    }

    setMapRef(map);
    setMapsRef(maps);

    setCircleRef(
      new maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.3,
        map,
        center: { lat: 1.306397, lng: 103.838778 },
        radius: circleRadius,
      })
    );
  };

  // eslint-disable-next-line no-unused-vars
  const onMarkerClick = (e, { markerId, lat, lng }) => {
    setHighlighted(markerId);
  };

  const onMapChange = ({ bounds, zoom }) => {
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    /**
     * useSupercluster accepts bounds in the form of [westLng, southLat, eastLng, northLat]
     * const { clusters, supercluster } = useSupercluster({
     *	points: points,
     *	bounds: mapBounds.bounds,
     *	zoom: mapBounds.zoom,
     * })
     */
    setMapBounds({
      ...mapBounds,
      bounds: [sw.lng(), sw.lat(), ne.lng(), ne.lat()],
      zoom,
    });
    setHighlighted(null);
  };

  const markerStyle = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <Box w="full" minH="360px" h="full">
      <div className="map-container">
        <GoogleMap
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          defaultCenter={
            selPlaces &&
            selPlaces.length > 0 &&
            selPlaces[0].geometry &&
            selPlaces[0].geometry.location
              ? {
                  lat: selPlaces[0].geometry.location.lat(),
                  lng: selPlaces[0].geometry.location.lng(),
                }
              : { lat: 1.2929, lng: 103.8547 }
          }
          defaultZoom={17}
          mapMinHeight="600px"
          onGoogleApiLoaded={onGoogleApiLoaded}
          onChange={onMapChange}
        >
          {selPlaces &&
            selPlaces.map(({ geometry, name, listNum }, index) => (
              <Marker
                key={index}
                lat={geometry.location.lat()}
                lng={geometry.location.lng()}
                markerId={name}
                onClick={onMarkerClick}
                style={markerStyle}
                num={listNum}
              />
            ))}
        </GoogleMap>
        {highlighted && (
          <div className="highlighted">
            {highlighted}{' '}
            <button type="button" onClick={() => setHighlighted(null)}>
              X
            </button>
          </div>
        )}
      </div>
    </Box>
  );
}
