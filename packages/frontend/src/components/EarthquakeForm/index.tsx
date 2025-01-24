import React from 'react';
import { useEarthquakeForm } from './useEarthquakeForm';
import { Controller } from 'react-hook-form';
import { Button, Card } from '@radix-ui/themes';
import Input from '../Input/input';
import { INPUT_TYPES } from '@/constants';
import { validateNumber } from '@/utils';

const EarthquakeForm = () => {
  const { control, handleSubmit, onSubmit, errors } = useEarthquakeForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card style={{ justifyContent: 'center', display: 'flex' }}>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Input {...field} error={errors?.location?.message} />
          )}
        />
        <Controller
          name="magnitude"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              onChange={(e) => field.onChange(validateNumber(e.target.value))}
              sx={{ margin: '0 15px' }}
              error={errors?.magnitude?.message}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type={INPUT_TYPES.date}
              error={errors?.date?.message}
            />
          )}
        />
        <Button type="submit" ml="4">
          Submit
        </Button>
      </Card>
    </form>
  );
};

export default EarthquakeForm;
