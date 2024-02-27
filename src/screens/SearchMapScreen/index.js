import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, Pressable, View, Platform} from 'react-native';
import {Divider, Layout, Text} from '../../components';
import PreLoader from '../../components/PreLoader';
import {MapFooter, DirectionFooter} from '../MapScreen/components';
import {useSharedValue} from 'react-native-reanimated';
import {MAP_GL_ACCESS_TOKEN} from '@env';
// import MapboxGL from '@react-native-mapbox-gl/maps';
import MapboxGL from '@rnmapbox/maps';
import {SrebrenicaPDF, PinLocation, VisiotLogo} from '../../assets';
import GetLocation from 'react-native-get-location';
import {lineString as makeLineString} from '@turf/helpers';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import {useDispatch, useSelector} from 'react-redux';
import isPointInPolygon from 'geolib/es/isPointInPolygon';
import {setCoords} from '../../redux/actions/coordActions';
import {setPodaci} from '../../redux/actions/podaciActions';
import {setLoading} from '../../redux/actions/loadingActions';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  imageCoords,
  mapPolygon,
  requestDirectionStaticOptions,
  sharedCameraOptions,
} from '../MapScreen/mapConstants';
import {useTranslation} from 'react-i18next';

const clientOptions = {accessToken: MAP_GL_ACCESS_TOKEN};
const directionsClient = MapboxDirectionsFactory(clientOptions);
MapboxGL.setWellKnownTileServer(Platform.OS === 'ios' ? 'mapbox' : 'Mapbox');
MapboxGL.setAccessToken(MAP_GL_ACCESS_TOKEN);

const SearchMapScreen = ({navigation}) => {
  const isMapScreenFocused = useIsFocused();
  const y = useSharedValue(0);
  const mapRef = useRef();
  const {t} = useTranslation();
  const cameraRef = useRef();
  const {loading} = useSelector(state => state.loader);
  const dispatch = useDispatch();
  const [route, setRoute] = useState(null);
  const [poligonContainsPoint, setPoligonContainsPoint] = useState(undefined);
  const [shouldRecalibrate, setShouldRecalibrate] = useState(false);
  const {lat, long} = useSelector(state => state.coords); //grave coords
  const [mapHeight, setMapHeight] = useState(null);

  const doesPolygonContainPoint = ({lng, lt}) => {
    if (!lng || !lt) return false;
    return isPointInPolygon({longitude: lng, latitude: lt}, [...mapPolygon]);
  };

  const getRoute = async () => {
    try {
      let pos = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });

      const reqOptions = {
        waypoints: [
          {
            coordinates: doesPolygonContainPoint({
              lng: pos.longitude,
              lt: pos.latitude,
            })
              ? [pos.longitude, pos.latitude]
              : [19.301974, 44.158024],
          }, //our location or start coord
          {coordinates: [long, lat]},
        ],
        ...requestDirectionStaticOptions,
      };

      if (lat && long && pos?.longitude && pos?.latitude) {
        const res = await directionsClient.getDirections(reqOptions).send();
        let lineString = makeLineString(
          res.body.routes[0].geometry.coordinates,
        );
        lineString.geometry.coordinates.push([long, lat]);
        setRoute(lineString);
        const poligonContainsPoint = doesPolygonContainPoint({
          lng: pos.longitude,
          lt: pos.latitude,
        });
        setPoligonContainsPoint(poligonContainsPoint);
        cameraRef.current?.setCamera({
          centerCoordinate: poligonContainsPoint
            ? [pos.longitude, pos.latitude]
            : [19.301974, 44.158024],
          zoomLevel: poligonContainsPoint ? 20 : 17,
          animationDuration: 2000,
          animationMode: 'flyTo',
          pitch: poligonContainsPoint ? 500 : 0,
        });
      } else if (!lat && !long && pos?.latitude && pos?.longitude) {
        cameraRef.current?.setCamera({
          centerCoordinate: [19.301974, 44.158024],
          ...sharedCameraOptions,
          pitch: 0,
        });
      } else if (pos?.latitude && pos?.longitude) {
        cameraRef.current?.setCamera({
          centerCoordinate: [pos.longitude, pos.latitude],
          ...sharedCameraOptions,
        });
      }
      dispatch(setLoading(false));
    } catch (err) {
      cameraRef.current?.setCamera({
        centerCoordinate: [19.301974, 44.158024],
        ...sharedCameraOptions,
        pitch: 0,
      });

      dispatch(setLoading(false));
    }
  };

  const clearData = () => {
    dispatch(setCoords({lat: null, long: null}));
    dispatch(
      setPodaci({
        imePrezime: '',
        datumRodjenja: '',
        datumStradanja: '',
        mjestoRodjenja: '',
        mjestoStradanja: '',
        datumUkopa: '',
        parcela: '',
        red: '',
        grobnoMjesto: '',
      }),
    );
    setRoute(null);
    navigation.navigate('SearchStack');
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('SearchStack');
        return true;
      },
    );
    if (!isMapScreenFocused) {
      clearData();
    } else getRoute();
    return () => backHandler.remove();
  }, [isMapScreenFocused]);
  useEffect(() => {
    if (isMapScreenFocused && !lat && !long) {
      if (!loading) dispatch(setLoading(true));
    }
  }, [lat, long, isMapScreenFocused]);

  const onTouchMove = evt => {
    if (!shouldRecalibrate) {
      setShouldRecalibrate(true);
    }
  };
  const recalibrate = () => {
    if (poligonContainsPoint) {
      setShouldRecalibrate(false);
    }
  };
  useEffect(() => {
    if (poligonContainsPoint) recalibrate();
    else {
      cameraRef.current?.setCamera({
        pitch: 0,
        zoomLevel: 17,
      });
    }
  }, [poligonContainsPoint]);
  const onLocationUpdate = ({coords}) => {
    let containsPoint = doesPolygonContainPoint({
      lng: coords.longitude,
      lt: coords.latitude,
    });
    setPoligonContainsPoint(containsPoint);
  };

  return (
    <Layout
      hasBackButton
      noRightIcon
      onLeftIconPress={() => navigation.navigate('SearchStack')}>
      <MapboxGL.MapView
        onLayout={evt => setMapHeight(evt.nativeEvent.layout.height)}
        attributionEnabled={false}
        style={{flex: 1}}
        ref={mapRef}
        styleURL={MapboxGL.StyleURL.Street}
        onTouchMove={onTouchMove}
        logoEnabled={false}>
        <MapboxGL.Camera
          pitch={poligonContainsPoint ? 150 : 0}
          ref={cameraRef}
          followUserLocation={
            !!lat && !!long && poligonContainsPoint && !shouldRecalibrate
          }
          zoomLevel={poligonContainsPoint ? 20 : 17}
          followUserMode={
            poligonContainsPoint
              ? MapboxGL.UserTrackingModes.FollowWithCourse
              : MapboxGL.UserTrackingModes.Follow
          }></MapboxGL.Camera>
        {lat && long && (
          <>
            <MapboxGL.Images images={{pinLocation: PinLocation}} />
            <MapboxGL.ShapeSource
              id="symbolIconShapeSource"
              shape={{
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
                    properties: {
                      icon: 'pinLocation',
                    },
                    geometry: {
                      type: 'Point',
                      coordinates: [long, lat],
                    },
                  },
                ],
              }}>
              <MapboxGL.SymbolLayer
                id="symbolIconLayer"
                aboveLayerID="routeFill"
                style={{
                  iconImage: ['get', 'icon'],
                  iconAllowOverlap: true,
                  symbolPlacement: 'point',
                  iconAnchor: 'bottom',
                }}
              />
            </MapboxGL.ShapeSource>
          </>
        )}
        <MapboxGL.UserLocation
          androidRenderMode={poligonContainsPoint ? 'gps' : 'normal'}
          visible={true}
          renderMode="native"
          onUpdate={onLocationUpdate}
          minDisplacement={10}
        />
        <MapboxGL.ImageSource
          id="nisani"
          url={SrebrenicaPDF}
          coordinates={[...imageCoords]}>
          <MapboxGL.RasterLayer id="radarLayer" style={{rasterOpacity: 1}} />
        </MapboxGL.ImageSource>
        {route && (
          <MapboxGL.ShapeSource id="routeSource" shape={route}>
            <MapboxGL.LineLayer
              id="routeFill"
              style={{
                lineColor: 'red',
                lineWidth: 5,
                lineCap: MapboxGL.LineJoin.Round,
                lineOpacity: 1,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
      </MapboxGL.MapView>
      {poligonContainsPoint && shouldRecalibrate && lat && long && (
        <Pressable
          onPress={recalibrate}
          style={{
            position: 'absolute',
            top: 150,
            right: 8,
            backgroundColor: 'white',
            borderRadius: 15,
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center',
          }}>
          <Icon name="location-arrow" color="black" size={25} />
          <Divider direction="h" size={5} />
          <Text>{t('mapScreen.reCenter')}</Text>
        </Pressable>
      )}
      <MapFooter panY={y} mapHeight={mapHeight} />
      <View
        style={{
          position: 'absolute',
          //backgroundColor: 'red',
          bottom: 10,
          left: 10,
        }}>
        <VisiotLogo width={36} height={35} />
        <Text color="black" fontSize="body4">
          VISIOT
        </Text>
      </View>
      <DirectionFooter />
      <PreLoader />
    </Layout>
  );
};

export default SearchMapScreen;
