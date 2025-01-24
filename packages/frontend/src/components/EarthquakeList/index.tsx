import React from 'react';
import { Heading, IconButton, Spinner, Table } from '@radix-ui/themes';
import { useEarthquakeList } from './useEarthquakeList';
import { TrashIcon } from '@radix-ui/react-icons';

const EarthquakeList = () => {
  const { data, loading, deleteEarthquake } = useEarthquakeList();

  return (
    <>
      <Heading>Earthquake list:</Heading>
      {!!loading && <Spinner />}
      {!loading && !data?.getEarthquakes.length && <p>No data :(</p>}
      {!loading && data?.getEarthquakes.length ? (
        <Table.Root variant="surface" mt="4">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Magnitude</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.getEarthquakes.map(({ id, magnitude, location, date }) => (
              <Table.Row key={id}>
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{location}</Table.Cell>
                <Table.Cell>{magnitude}</Table.Cell>
                <Table.Cell>{new Date(date).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <IconButton
                    size="2"
                    color="red"
                    onClick={() => deleteEarthquake({ variables: { id } })}
                  >
                    <TrashIcon />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : null}
    </>
  );
};

export default EarthquakeList;
