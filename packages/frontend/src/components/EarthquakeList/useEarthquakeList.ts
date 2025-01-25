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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { prepareEarthquakeData } from './helpers';
import { LIMIT, PAGE } from '@/constants';
import { ID } from '@/types';

export const useEarthquakeList = () => {
  const [currentPage, setCurrentPage] = useState(PAGE);
  const [activeFieldId, setActiveFieldId] = useState<ID>('');
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

  const { fields } = useFieldArray({
    control,
    name: 'earthquakes',
    keyName: 'fieldKey',
  });

  const { data, loading, refetch } = useQuery(GET_EARTHQUAKES, {
    variables: {
      pagination: {
        page: currentPage,
        limit: LIMIT,
      },
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const [deleteEarthquake] = useMutation(DELETE_EARTHQUAKE, {
    refetchQueries: [
      {
        query: GET_EARTHQUAKES,
        variables: { pagination: { page: currentPage, limit: LIMIT } },
      },
    ],
    awaitRefetchQueries: true,
  });

  const [updateEarthquake] = useMutation(UPDATE_EARTHQUAKE, {
    refetchQueries: [
      {
        query: GET_EARTHQUAKES,
        variables: { pagination: { page: currentPage, limit: LIMIT } },
      },
    ],
    awaitRefetchQueries: true,
  });

  const currentEarthquakeIndex = useMemo(
    () => fields.findIndex(({ id }) => id === activeFieldId),
    [fields, activeFieldId]
  );

  const currentEarthquake = watch(`earthquakes.${currentEarthquakeIndex}`);

  function handleUpdate(): void {
    if (!currentEarthquake) return;
    // TODO: for future check if currentEarthquake is different from the original one

    updateEarthquake({
      variables: {
        ...currentEarthquake,
        magnitude: Number(currentEarthquake.magnitude),
      },
    });

    setActiveFieldId('');
  }

  const handleDelete = useCallback(
    async (id: ID) => {
      try {
        await deleteEarthquake({ variables: { id } });
      } catch (error) {
        console.error('Delete failed:', error);
      }
    },
    [deleteEarthquake]
  );

  const handlePageChange = useCallback(
    async (newPage: number) => {
      setCurrentPage(newPage);
      await refetch({ pagination: { page: newPage, limit: LIMIT } });
    },
    [refetch]
  );

  useEffect(() => {
    if (!!data?.getEarthquakes) {
      reset(prepareEarthquakeData(data.getEarthquakes.earthquakes));
    }
  }, [data, reset]);

  return {
    loading,
    handleDelete,
    fields,
    control,
    errors,
    setActiveFieldId,
    activeFieldId,
    handleUpdate,
    data,
    handlePageChange,
  };
};
