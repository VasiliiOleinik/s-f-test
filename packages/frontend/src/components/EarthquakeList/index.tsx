import React from 'react';
import { Heading, Separator, Spinner, Table } from '@radix-ui/themes';
import { useEarthquakeList } from './useEarthquakeList';
import EarthquakeListHeader from './EarthquakeListHeader';
import EarthquakeListBody from './EarthquakeListBody';
import Pagination from '@/components/Pagination';
import { PAGE } from '@/constants';

const EarthquakeList = () => {
  const {
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
  } = useEarthquakeList();
  const { page, pages } = data?.getEarthquakes || { page: PAGE, pages: PAGE };

  return (
    <>
      <Heading>Earthquake list:</Heading>
      {!!loading && <Spinner />}
      {!loading && !fields?.length && <p>No data :(</p>}
      {!loading && fields?.length ? (
        <Table.Root variant="surface" mt="4" style={{maxHeight: `calc(100vh - 350px)`, overflowY: 'auto'}}>
          <EarthquakeListHeader/>
          <EarthquakeListBody
            handleDelete={handleDelete}
            fields={fields}
            activeFieldId={activeFieldId}
            control={control}
            errors={errors}
            handleUpdate={handleUpdate}
            setActiveFieldId={setActiveFieldId}
          />
        </Table.Root>
      ) : null}
      <Separator my="2" size="4" />
      <Pagination
        page={page}
        pages={pages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default EarthquakeList;
