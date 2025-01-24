import { DELETE_EARTHQUAKE, GET_EARTHQUAKES } from '@/queries';
import { useMutation, useQuery } from '@apollo/client';

export const useEarthquakeList = () => {
  const { data, loading, error } = useQuery(GET_EARTHQUAKES);

  const [deleteEarthquake] = useMutation(DELETE_EARTHQUAKE, {
    refetchQueries: [{ query: GET_EARTHQUAKES }],
    awaitRefetchQueries: true,
  });

  return {
    data,
    loading,
    error,
    deleteEarthquake,
  };
};
