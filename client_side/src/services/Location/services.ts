import { useQuery } from 'react-query';
import { getLocations } from './callers';

export const getKeyLocations = {
  locations: ['LOCATIONS'],
};

export const useGetLocations = () => {
  return useQuery<TTemplateResponse<OBJECT_TYPE.TProvince[]>, Error>({
    queryKey: getKeyLocations.locations,
    queryFn: () => getLocations(),
  });
};
