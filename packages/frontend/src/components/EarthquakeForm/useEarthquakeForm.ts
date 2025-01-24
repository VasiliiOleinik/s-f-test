import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EarthquakeSchema, EarthquakeSchemaType } from './helpers';
import { useMutation } from '@apollo/client';
import { ADD_EARTHQUAKE, GET_EARTHQUAKES } from '@/queries';

export const useEarthquakeForm = () => {
  const [addEarthquake] = useMutation(ADD_EARTHQUAKE, {
    refetchQueries: [{ query: GET_EARTHQUAKES }],
    awaitRefetchQueries: true,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EarthquakeSchemaType>({
    resolver: zodResolver(EarthquakeSchema),
  });

  async function onSubmit(data: EarthquakeSchemaType) {
    await addEarthquake({ variables: data });
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};
