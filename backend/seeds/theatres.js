import dotenv from "dotenv";
import ConnectDB from "../config/db.js";
import City from "../models/city.js";
import Theatre from "../models/theatre.js";

dotenv.config();
await ConnectDB();

const theatresSeed = [
  // =====================
  // DELHI NCR
  // =====================
  {
    name: "PVR Select Citywalk",
    cityName: "Delhi NCR",
    type: "MULTIPLEX",
    brand: "PVR",
    location: {
      address: "Select Citywalk Mall, Saket, New Delhi",
      latitude: 28.5286,
      longitude: 77.2197
    },
    amenities: ["PARKING", "DOLBY_ATMOS", "RECLINER"]
  },
  {
    name: "INOX Nehru Place",
    cityName: "Delhi NCR",
    type: "MULTIPLEX",
    brand: "INOX",
    location: {
      address: "Nehru Place Metro Mall, New Delhi",
      latitude: 28.5485,
      longitude: 77.2513
    },
    amenities: ["PARKING", "FOOD_COURT"]
  },
  {
    name: "Cinepolis Janakpuri",
    cityName: "Delhi NCR",
    type: "MULTIPLEX",
    brand: "CINEPOLIS",
    location: {
      address: "Unity One Mall, Janakpuri, New Delhi",
      latitude: 28.6219,
      longitude: 77.0878
    },
    amenities: ["DOLBY_ATMOS"]
  },
  {
    name: "Delite Cinema",
    cityName: "Delhi NCR",
    type: "SINGLE_SCREEN",
    brand: "LOCAL",
    location: {
      address: "Asaf Ali Road, Delhi Gate, New Delhi",
      latitude: 28.6415,
      longitude: 77.2372
    },
    amenities: []
  },
  {
    name: "Liberty Cinema",
    cityName: "Delhi NCR",
    type: "SINGLE_SCREEN",
    brand: "LOCAL",
    location: {
      address: "New Rohtak Road, Karol Bagh, New Delhi",
      latitude: 28.6512,
      longitude: 77.1903
    },
    amenities: []
  },

  // =====================
  // MUMBAI
  // =====================
  {
    name: "PVR Phoenix Palladium",
    cityName: "Mumbai",
    type: "MULTIPLEX",
    brand: "PVR",
    location: {
      address: "Phoenix Palladium Mall, Lower Parel, Mumbai",
      latitude: 19.0024,
      longitude: 72.8267
    },
    amenities: ["IMAX", "RECLINER", "PARKING"]
  },
  {
    name: "INOX R City",
    cityName: "Mumbai",
    type: "MULTIPLEX",
    brand: "INOX",
    location: {
      address: "R City Mall, Ghatkopar West, Mumbai",
      latitude: 19.0992,
      longitude: 72.9173
    },
    amenities: ["PARKING", "FOOD_COURT"]
  },
  {
    name: "Cinepolis Andheri West",
    cityName: "Mumbai",
    type: "MULTIPLEX",
    brand: "CINEPOLIS",
    location: {
      address: "Fun Republic Mall, Andheri West, Mumbai",
      latitude: 19.1366,
      longitude: 72.8295
    },
    amenities: ["DOLBY_ATMOS"]
  },
  {
    name: "Regal Cinema",
    cityName: "Mumbai",
    type: "SINGLE_SCREEN",
    brand: "LOCAL",
    location: {
      address: "Colaba Causeway, Mumbai",
      latitude: 18.9217,
      longitude: 72.8332
    },
    amenities: []
  },
  {
    name: "Alfred Talkies",
    cityName: "Mumbai",
    type: "SINGLE_SCREEN",
    brand: "LOCAL",
    location: {
      address: "Parel East, Mumbai",
      latitude: 19.0058,
      longitude: 72.8425
    },
    amenities: []
  },

  // =====================
  // BANGALORE
  // =====================
  {
    name: "PVR Orion Mall",
    cityName: "Bangalore",
    type: "MULTIPLEX",
    brand: "PVR",
    location: {
      address: "Orion Mall, Rajajinagar, Bengaluru",
      latitude: 13.0107,
      longitude: 77.5554
    },
    amenities: ["IMAX", "PARKING"]
  },
  {
    name: "INOX Garuda Mall",
    cityName: "Bangalore",
    type: "MULTIPLEX",
    brand: "INOX",
    location: {
      address: "Garuda Mall, Magrath Road, Bengaluru",
      latitude: 12.9719,
      longitude: 77.6075
    },
    amenities: ["FOOD_COURT"]
  },
  {
    name: "Cinepolis Royal Meenakshi Mall",
    cityName: "Bangalore",
    type: "MULTIPLEX",
    brand: "CINEPOLIS",
    location: {
      address: "Royal Meenakshi Mall, Bannerghatta Road",
      latitude: 12.8916,
      longitude: 77.5969
    },
    amenities: ["RECLINER", "DOLBY_ATMOS"]
  },
  {
    name: "Urvashi Theatre",
    cityName: "Bangalore",
    type: "SINGLE_SCREEN",
    brand: "LOCAL",
    location: {
      address: "Lalbagh Road, Bengaluru",
      latitude: 12.9507,
      longitude: 77.5848
    },
    amenities: []
  },
  {
    name: "Victory Cinema",
    cityName: "Bangalore",
    type: "SINGLE_SCREEN",
    brand: "LOCAL",
    location: {
      address: "Chickpet, Bengaluru",
      latitude: 12.9704,
      longitude: 77.5772
    },
    amenities: []
  }
];


const seedTheatres = async () => {
  try {
    // 1️⃣ Fetch all cities once
    const cities = await City.find({ isActive: true });

    // 2️⃣ Build lookup map: { cityName: cityId }
    const cityMap = {};
    cities.forEach(city => {
      cityMap[city.name] = city._id;
    });

    // 3️⃣ Attach correct city _id
    const theatreDocs = theatresSeed.map(t => {
      const cityId = cityMap[t.cityName];

      if (!cityId) {
        throw new Error(`City not found: ${t.cityName}`);
      }

      return {
        name: t.name,
        city: cityId,
        type: t.type,
        brand: t.brand,
        location: t.location,
        amenities: t.amenities
      };
    });

    // 4️⃣ Insert
    await Theatre.insertMany(theatreDocs);

    console.log("✅ Theatres seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding theatres:", error.message);
    process.exit(1);
  }
};

seedTheatres();

