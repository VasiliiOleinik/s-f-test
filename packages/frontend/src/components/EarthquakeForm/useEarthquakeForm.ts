import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EarthquakeSchema, EarthquakeSchemaType } from './helpers';
import { useMutation } from '@apollo/client';
import { ADD_EARTHQUAKE, GET_EARTHQUAKES } from '@/queries';
import { DEFAULT_FIELD, PAGE, LIMIT } from '@/constants';
import client from '@/apollo/client';

export const useEarthquakeForm = () => {
  const [addEarthquake] = useMutation(ADD_EARTHQUAKE, {
    refetchQueries: [
      {
        query: GET_EARTHQUAKES,
        variables: { pagination: { page: PAGE, limit: LIMIT } },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      client.cache.evict({ fieldName: "getEarthquakes" });
    }
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EarthquakeSchemaType>({
    resolver: zodResolver(EarthquakeSchema),
    defaultValues: DEFAULT_FIELD,
  });

  async function onSubmit(data: EarthquakeSchemaType) {
    try {
      await addEarthquake({
        variables: { ...data, magnitude: Number(data.magnitude) },
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};
