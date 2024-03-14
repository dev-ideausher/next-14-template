'use client';
import { useMemo, useRef, useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  Autocomplete,
  Libraries,
} from '@react-google-maps/api';
import { extractAddressFromPlaceObject } from '@/app/_utils/helpers';
import CustomInput from './CustomInput';

const mapUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
function Map({
  defaultMarker,
  defaultAddress,
}: {
  defaultMarker?: { lat: number; lng: number };
  defaultAddress?: string;
}) {
  const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;
  const libraries: Libraries = useMemo(() => ['places'], []);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    // @ts-ignore
    googleMapsApiKey: apiKey,
    libraries,
  });
  const locationRef = useRef(null);

  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState({
    lat: 42.234504424271435,
    lng: -97.01652862245021,
  });
  const [marker, setMarker] = useState(defaultMarker);
  const [address, setAddress] = useState(defaultAddress);

  if (!isLoaded) {
    return null;
  }

  const getLatLonForAddress = async () => {
    //@ts-ignore
    const locAddress = locationRef?.current?.value || '';
    if (!!locAddress) {
      const geocodeUrl = `${mapUrl}?address=${locAddress}&key=${apiKey}`;
      const geocodeResponse = await fetch(geocodeUrl);
      const geocodeData = await geocodeResponse.json();
      const res = geocodeData.results[0]?.geometry?.location;
      if (res?.lat && res?.lng) {
        setCenter({ ...res });
      }
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    const url = `${mapUrl}?key=${apiKey}&latlng=${lat},${lng}`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const _address = extractAddressFromPlaceObject(place);

        setAddress(_address.plain());
      });
  };

  return (
    <>
      <div>
        <Autocomplete onPlaceChanged={getLatLonForAddress}>
          <input
            type='text'
            ref={locationRef}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            style={{
              border: 'none',
              outline: 'none',
              width: '-webkit-fill-available',
              padding: 14,
              background: '#f8f8f8',
              borderRadius: 6,
            }}
          />
        </Autocomplete>
        {isLoaded && (
          <GoogleMap
            zoom={zoom}
            center={center}
            onClick={async (e) => {
              if (e.latLng) {
                const { lat, lng } = e.latLng.toJSON();
                setMarker({ lat, lng });
                await reverseGeocode(lat, lng);
              }
            }}
            mapContainerStyle={{
              width: '100%',
              height: 720,
              marginTop: 12,
            }}
          >
            {marker && (
              <MarkerF
                onClick={() => {
                  setCenter(marker);
                  setZoom(80);
                }}
                position={marker}
              />
            )}
          </GoogleMap>
        )}
      </div>

      <CustomInput
        label='Address'
        name='address'
        value={address}
        onChange={setAddress}
        required={true}
      />
      <input type='hidden' name='latitude' value={marker?.lat} />
      <input type='hidden' name='longitude' value={marker?.lng} />
    </>
  );
}

export default Map;
