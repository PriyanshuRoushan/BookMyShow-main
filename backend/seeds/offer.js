import dotenv from "dotenv";
import ConnectDB from "../config/db.js";
import Offer from "../models/offers.js";

dotenv.config();

const creditOffers = [

{
  title: "HDFC 15% Off",
  description: "15% off using HDFC Credit Card",
  couponCode: "HDFC15",
  category: "Credit Card",

  image: "/uploads/bank/hdfc.png",
  bannerImage: "/images/banners/hdfc-banner.jpg",

  discount: {
    type: "percentage",
    value: 15,
    maxCap: 300
  },

  validity: {
    startDate: new Date("2025-01-01"),
    endDate: new Date("2026-12-31")
  },

  eligibility: {
    minBookingAmount: 1000
  },

  paymentRule: {
    method: "credit",
    banks: ["HDFC"]
  }
},

{
  title: "ICICI ₹200 Off",
  description: "Flat ₹200 off with ICICI Credit",
  couponCode: "ICICI200",
  category: "Credit Card",

  image: "/uploads/bank/icici.png",
  bannerImage: "backend/uploads/bank/icici.png",

  discount: {
    type: "flat",
    value: 200
  },

  validity: {
    endDate: new Date("2026-12-31")
  },

  eligibility: {
    minBookingAmount: 1200
  },

  paymentRule: {
    method: "credit",
    banks: ["ICICI"]
  }
},

{
  title: "SBI 10% Weekend",
  description: "10% off on SBI Credit",
  couponCode: "SBI10",
  category: "Credit Card",

  image: "/uploads/bank/sbi.png",
  bannerImage: "",

  discount: {
    type: "percentage",
    value: 10,
    maxCap: 250
  },

  paymentRule: {
    method: "credit",
    banks: ["SBI"]
  }
},

{
  title: "Axis 20% Off",
  description: "Axis Credit 20% Off",
  couponCode: "AXIS20",
  category: "Credit Card",

  image: "/uploads/bank/axis.png",
  bannerImage: "",

  discount: {
    type: "percentage",
    value: 20,
    maxCap: 400
  },

  paymentRule: {
    method: "credit",
    banks: ["Axis"]
  }
},

{
  title: "Kotak ₹150 Off",
  description: "Flat ₹150 Kotak Credit",
  couponCode: "KOTAK150",
  category: "Credit Card",

  image: "/uploads/bank/kotak.png",

  discount: {
    type: "flat",
    value: 150
  },

  paymentRule: {
    method: "credit",
    banks: ["Kotak"]
  }
}

];


const offerSeed = async () => {
  try {
    await ConnectDB();

    await Offer.deleteMany({});
    await Offer.insertMany(creditOffers);

    console.log("✅ Credit offers seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding offers:", error);
    process.exit(1);
  }
};

offerSeed(); 