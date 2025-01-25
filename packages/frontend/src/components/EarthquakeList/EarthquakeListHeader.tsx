import { Table } from '@radix-ui/themes';
import React from 'react';

const EarthquakeListHeader = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Magnitude</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
  );
};

export default EarthquakeListHeader;
