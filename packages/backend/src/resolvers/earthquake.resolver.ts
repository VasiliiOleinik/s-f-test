import Earthquake from '../models/earthquake.model';

export const resolvers = {
  Query: {
    getEarthquakes: async () => {
      try {
        const earthquakes = await Earthquake.find();
        return earthquakes || [];
      } catch (error) {
        throw new Error('Failed to fetch earthquakes');
      }
    },
  },
  Mutation: {
    addEarthquake: async (_: any, { location, magnitude, date }: any) => {
      const earthquake = new Earthquake({ location, magnitude, date });
      await earthquake.save();
      return earthquake;
    },
    updateEarthquake: async (_: any, { id, ...update }: any) => {
      return await Earthquake.findByIdAndUpdate(id, update, { new: true });
    },
    deleteEarthquake: async (_: any, { id }: any) => {
      const result = await Earthquake.findByIdAndDelete(id);
      return !!result;
    },
  },
};
