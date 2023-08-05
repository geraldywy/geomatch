import { func, number, oneOfType, string } from 'prop-types';
import pin1 from './pins/pin1.png';
import pin2 from './pins/pin2.png';
import pin3 from './pins/pin3.png';
import pin4 from './pins/pin4.png';
import pin5 from './pins/pin5.png';
import defaultPin from './pins/marker-pin.png';
import { Image } from '@chakra-ui/react';

const Marker = ({ className, lat, lng, markerId, onClick, num, ...props }) => {
  return (
    <Image
      className={className}
      src={getMarker(num)}
      // eslint-disable-next-line react/no-unknown-property
      lat={lat}
      // eslint-disable-next-line react/no-unknown-property
      lng={lng}
      onClick={e => (onClick ? onClick(e, { markerId, lat, lng }) : null)}
      boxSize="60px"
      objectFit="contain"
      alt={markerId}
      {...props}
    />
  );
};

Marker.defaultProps = {};

Marker.propTypes = {
  className: string,
  /**
   * The id of the marker.
   */
  markerId: oneOfType([number, string]).isRequired,
  /**
   * The latitude of the marker.
   */
  lat: number.isRequired,
  /**
   * The longitude of the marker.
   */
  lng: number.isRequired,
  /**
   * The function to call when the marker is clicked.
   */
  onClick: func,
};

export default Marker;

export const getMarker = num => {
  var mapping = {
    1: pin1,
    2: pin2,
    3: pin3,
    4: pin4,
    5: pin5,
  };
  var markerPin = defaultPin;
  if (num in mapping) {
    markerPin = mapping[num];
  }

  return markerPin;
};
