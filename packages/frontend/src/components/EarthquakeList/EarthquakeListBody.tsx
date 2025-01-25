import { IconButton, Table } from '@radix-ui/themes';
import React, { ChangeEvent } from 'react';
import { Controller } from 'react-hook-form';
import Input from '@/components/Input';
import { formatDateForInput, validateNumber } from '@/utils';
import { INPUT_TYPES } from '@/constants';
import { CheckIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { EarthquakeListBodyProps } from './types';

const EarthquakeListBody = ({
  fields,
  activeFieldId,
  control,
  errors,
  handleDelete,
  handleUpdate,
  setActiveFieldId,
}: EarthquakeListBodyProps) => {
  return (
    <Table.Body>
      {fields.map(({ id }, index) => {
        const isActiveId = activeFieldId === id;
        const fieldErrors = errors?.earthquakes?.[index];

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
                    error={fieldErrors?.location?.message}
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const validatedValue = validateNumber(e.target.value);
                      field.onChange(validatedValue);
                    }}
                    value={field.value}
                    readOnly={!isActiveId}
                    error={fieldErrors?.magnitude?.message}
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
                    error={fieldErrors?.date?.message}
                    value={formatDateForInput(field.value)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
                onClick={() => handleDelete(id!)}
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
                  onClick={() => setActiveFieldId(id!)}
                >
                  <Pencil2Icon />
                </IconButton>
              )}
            </Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
  );
};

export default EarthquakeListBody;
