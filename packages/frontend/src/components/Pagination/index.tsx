import { PAGE } from '@/constants';
import { Button, Flex } from '@radix-ui/themes';
import React from 'react';
import { PaginationProps } from './types';

const Pagination = ({
  pages = PAGE,
  page = PAGE,
  handlePageChange,
}: PaginationProps) => {
  return (
    <Flex gap="2" justify="end">
      {Array.from({ length: pages }, (_, i) => i + 1).map((item) => (
        <Button
          key={item}
          disabled={page === item}
          style={{ cursor: 'pointer' }}
          onClick={() => handlePageChange(item)}
        >
          {item}
        </Button>
      ))}
    </Flex>
  );
};

export default Pagination;
