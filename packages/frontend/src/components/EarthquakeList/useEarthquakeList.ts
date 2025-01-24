import {
  DELETE_EARTHQUAKE,
  GET_EARTHQUAKES,
  UPDATE_EARTHQUAKE,
} from '@/queries';
import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  EarthquakesSchemaType,
  EarthquakesSchema,
} from '@/components/EarthquakeForm/helpers';
import { useState } from 'react';

export const useEarthquakeList = () => {
  const [activeFieldId, setActiveFieldId] = useState<string>('');
  const {
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<EarthquakesSchemaType>({
    resolver: zodResolver(EarthquakesSchema),
    defaultValues: { earthquakes: [] },
    mode: 'all',
  });

  const { fields } = useFieldArray({ control, name: 'earthquakes' });

  const { data, loading, error } = useQuery(GET_EARTHQUAKES, {
    onCompleted: (fetchedData) => {
      reset({ earthquakes: fetchedData.getEarthquakes });
    },
  });

  const [deleteEarthquake] = useMutation(DELETE_EARTHQUAKE, {
    refetchQueries: [{ query: GET_EARTHQUAKES }],
    awaitRefetchQueries: true,
  });

  const [updateEarthquake] = useMutation(UPDATE_EARTHQUAKE, {
    refetchQueries: [{ query: GET_EARTHQUAKES }],
    awaitRefetchQueries: true,
  });

  const currentEarthquake = watch(
    `earthquakes.${fields.findIndex(({ id }) => id === activeFieldId)}`
  );

  function handleUpdate(): void {
    if (!currentEarthquake) return;
    // TODO: for future check if currentEarthquake is different from the original one

    updateEarthquake({
      variables: { ...currentEarthquake },
    });

    setActiveFieldId('');
  }

  return {
    data,
    loading,
    error,
    deleteEarthquake,
    fields,
    control,
    errors,
    setActiveFieldId,
    activeFieldId,
    handleUpdate,
  };
};
