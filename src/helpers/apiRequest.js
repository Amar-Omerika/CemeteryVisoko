import axios from 'axios';
import {API_URL} from '@env';
import {Platform} from 'react-native';

export default async request => {
  request.method = request.method || 'get';
  request.url = `${API_URL}/${request.url}`;
  if (Platform.OS === 'android') {
    request.data = request.data || {};
  }
  if (request.data && request.method === 'get') {
    // If data is set the get request won't be made
    request.data = null;
  }
  request.headers = request.headers || {};
  //console.log('request:', request);
  return axios(request);
};
