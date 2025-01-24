import React from 'react';
import { Heading, IconButton, Spinner, Table } from '@radix-ui/themes';
import { useEarthquakeList } from './useEarthquakeList';
import { TrashIcon, Pencil2Icon, CheckIcon } from '@radix-ui/react-icons';
import { Controller } from 'react-hook-form';
import { INPUT_TYPES } from '@/constants';
import Input from '@/components/Input/input';
import { formatDateForInput, validateNumber } from '@/utils';

const EarthquakeList = () => {
  const {
    loading,
    deleteEarthquake,
    fields,
    control,
    errors,
    setActiveFieldId,
    activeFieldId,
    handleUpdate,
  } = useEarthquakeList();

  return (
    <>
      <Heading>Earthquake list:</Heading>
      {!!loading && <Spinner />}
      {!loading && !fields?.length && <p>No data :(</p>}
      {!loading && fields?.length ? (
        <Table.Root variant="surface" mt="4">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Magnitude</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {fields.map(({ id }, index) => {
              const isActiveId = activeFieldId === id;

              return (
                <Table.Row key={id}>
                  <Table.Cell>
                    <Controller
                      name={`earthquakes.${index}.location`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          readOnly={!isActiveId}
                          error={
                            errors?.earthquakes?.[index]?.location?.message
                          }
                        />
                      )}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Controller
                      name={`earthquakes.${index}.magnitude`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          onChange={(e) =>
                            field.onChange(validateNumber(e.target.value))
                          }
                          readOnly={!isActiveId}
                          error={
                            errors?.earthquakes?.[index]?.magnitude?.message
                          }
                        />
                      )}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Controller
                      name={`earthquakes.${index}.date`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          readOnly={!isActiveId}
                          type={INPUT_TYPES.date}
                          error={errors?.earthquakes?.[index]?.date?.message}
                          value={formatDateForInput(field.value)}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const newTimestamp = new Date(inputValue).getTime();
                            field.onChange(newTimestamp.toString());
                          }}
                  
                        />
                      )}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <IconButton
                      size="2"
                      color="red"
                      onClick={() => deleteEarthquake({ variables: { id } })}
                    >
                      <TrashIcon />
                    </IconButton>
                    {isActiveId ? (
                      <IconButton
                        size="2"
                        ml="2"
                        color="green"
                        onClick={handleUpdate}
                      >
                        <CheckIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="2"
                        ml="2"
                        onClick={() => setActiveFieldId(id)}
                      >
                        <Pencil2Icon />
                      </IconButton>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      ) : null}
    </>
  );
};

export default EarthquakeList;
