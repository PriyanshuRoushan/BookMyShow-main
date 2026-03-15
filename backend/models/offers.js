import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: String,

  couponCode: {
    type: String,
    unique: true,
    sparse: true
  },

  category: {
    type: String,
    enum: [
      "Credit Card",
      "Debit Card",
      "BookMyShow",
      "Cinema",
      "Wallet",
      "Rewards",
      "UPI",
      "Pay Later"
    ],
    required: true
  },

  image: String,
  bannerImage: String,

  isActive: {
    type: Boolean,
    default: true
  },

  // DISCOUNT
  discount: {
    type: {
      type: String,
      enum: ["percentage", "flat"],
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    maxCap: Number
  },

  // VALIDITY
  validity: {
    startDate: Date,
    endDate: Date
  },

  // ELIGIBILITY
  eligibility: {
    newUsersOnly: {
      type: Boolean,
      default: false
    },
    firstBookingOnly: Number,
    minBookingAmount: {
      type: Number,
      default: 0
    },
    applicableCities: [String]
  },

  // PAYMENT RULE
  paymentRule: {
    method: {
      type: String,
      enum: ["credit", "debit", "upi", "wallet", "pay_later"]
    },
    banks: [String],
    cardNetworks: [String],
    walletProviders: [String],
    upiApps: [String]
  },

  // USAGE
  usage: {
    perUserLimit: {
      type: Number,
      default: 1
    },
    totalLimit: Number,
    usedCount: {
      type: Number,
      default: 0
    }
  }

}, { timestamps: true });

export default mongoose.model("Offers", offerSchema);
