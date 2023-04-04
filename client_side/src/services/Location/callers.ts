import { request } from '@umijs/max';
import { API_GET_LOCATIONS } from './api_paths';

export const getLocations = async () => {
  return request(API_GET_LOCATIONS);
};
