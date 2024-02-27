export const requestDirectionStaticOptions = {
  profile: 'walking',
  geometries: 'geojson',
  language: 'en',
  steps: true,
  voiceInstructions: false,
  voiceUnits: 'metric',
  bannerInstructions: false,
  overview: 'full',
};

export const mapPolygon = [
  {longitude: 19.3, latitude: 44.1606},
  {longitude: 19.3042, latitude: 44.1606},
  {longitude: 19.3042, latitude: 44.1571},
  {longitude: 19.3, latitude: 44.1571},
];

export const imageCoords = [
  [19.3, 44.1606],
  [19.3042, 44.1606],
  [19.3042, 44.1571],
  [19.3, 44.1571],
];

export const sharedCameraOptions = {
  zoomLevel: 17,
  animationDuration: 2000,
  animationMode: 'flyTo',
  //minZoomLevel: 15,
};
