import Earthquake from '../models/earthquake.model';

export const getPaginatedEarthquakes = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [earthquakes, total] = await Promise.all([
    Earthquake.find().sort({ date: -1 }).skip(skip).limit(limit).lean(),
    Earthquake.countDocuments(),
  ]);

  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    earthquakes: earthquakes.map((eq) => ({
      ...eq,
      id: eq._id.toString(),
      date: eq.date,
    })),
  };
};
