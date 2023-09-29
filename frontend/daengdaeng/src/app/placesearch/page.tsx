import PlaceSearch from '@/src/app/placesearch/PlaceSearch';

import type { Location } from '@/src/types/placesearch';

const PlaceSearchPage = async () => {
  return <PlaceSearch location={location} />;
};

export default PlaceSearchPage;

// dummy data
const location: Location = {
  center: {
    lat: 33.450701,
    lng: 126.570667,
  },
  errMsg: '',
  isLoading: true,
};
