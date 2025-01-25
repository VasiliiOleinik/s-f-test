import React from 'react';
import EarthquakeList from '@/components/EarthquakeList';
import EarthquakeForm from '@/components/EarthquakeForm';
import { Box, Container, Heading, Separator } from '@radix-ui/themes';
import CSVUploader from '@/components/CSVUploader';

const Home = () => (
  <Box>
    <Container size="3">
      <Heading as="h1" my="4" size="8" style={{ textAlign: 'center' }}>
        Earthquake Management
      </Heading>
      <EarthquakeForm />
      <Separator my="5" size="4" />
      <EarthquakeList />
      {/* <CSVUploader /> */}
    </Container>
  </Box>
);

export default Home;
