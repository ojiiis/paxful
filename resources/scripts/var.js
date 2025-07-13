//const api = "http://192.168.119.65:3000";
 const api = "http://0.0.0.0:3000";
//const api = "https://lin.com.ng/ocoin/paxful";
const coins = {eth:"Ethereum",btc:"Bitcoin",ltc:"Litecoin",usdt:"Tether",sol:"Solana"};
const coinsName = {"Ethereum":"eth","Bitcoin":"btc","Litecoin":"ltc","Tether":"usdt"};
const majorP2PCurrencies = ["USD", "EUR", "GBP", "NGN", "KES", "ZAR", "GHS", "INR", "PKR", "BDT", "VND", "THB", "IDR", "PHP", "MYR", "TRY", "BRL", "ARS", "MXN", "RUB", "UAH", "CNY", "HKD", "AUD", "CAD", "JPY", "KRW", "EGP", "TWD", "AED"];
const cryptoPaymentMethods = [
  {
    name: "Bank Transfers",
    id: "bank_transfers",
    priority: 1,
    methods: [
      {
        name: "SWIFT",
        region: "Global",
        speed: "1-5 days",
        fees: "Low",
        useCase: "International wire transfers",
      },
      {
        name: "SEPA",
        region: "Europe",
        speed: "1-2 days",
        fees: "Low",
        useCase: "Eurozone bank transfers",
      },
      {
        name: "ACH",
        region: "USA",
        speed: "1-3 days",
        fees: "Low",
        useCase: "Domestic U.S. transfers",
      },
      {
        name: "FPS",
        region: "UK",
        speed: "Same day",
        fees: "Low",
        useCase: "UK domestic transfers",
      },
    ],
  },
  {
    name: "Credit & Debit Cards",
    id: "credit_debit_cards",
    priority: 2,
    methods: [
      {
        name: "Visa",
        region: "Global",
        speed: "Instant",
        fees: "Medium",
        useCase: "Instant crypto purchases",
      },
      {
        name: "Mastercard",
        region: "Global",
        speed: "Instant",
        fees: "Medium",
        useCase: "Instant crypto purchases",
      },
      {
        name: "Maestro",
        region: "Europe",
        speed: "Instant",
        fees: "Medium",
        useCase: "Debit-based crypto purchases",
      },
    ],
  },
  {
    name: "Cryptocurrency Transfers",
    id: "crypto_transfers",
    priority: 3,
    methods: [
      {
        name: "Bitcoin",
        region: "Global",
        speed: "10-60 minutes",
        fees: "High",
        useCase: "Crypto-to-crypto exchange",
      },
      {
        name: "Ethereum",
        region: "Global",
        speed: "5-15 minutes",
        fees: "High (L1), Low (L2)",
        useCase: "Crypto trading, DApps",
      },
      {
        name: "USDT (TRC20, ERC20, etc.)",
        region: "Global",
        speed: "Varies",
        fees: "Low to Medium",
        useCase: "Stablecoin transfers",
      },
    ],
  },
  {
    name: "E-Wallets & Fintech Apps",
    id: "e_wallets",
    priority: 4,
    methods: [
      {
        name: "PayPal",
        region: "US, select countries",
        speed: "Instant",
        fees: "Medium",
        useCase: "Fiat-to-crypto deposits",
      },
      {
        name: "Skrill",
        region: "Global",
        speed: "Instant",
        fees: "Medium",
        useCase: "Alternative funding method",
      },
      {
        name: "Neteller",
        region: "Global",
        speed: "Instant",
        fees: "Medium",
        useCase: "Online payments and crypto buys",
      },
      {
        name: "Cash App",
        region: "USA",
        speed: "Instant",
        fees: "Low",
        useCase: "Buying/sending Bitcoin",
      },
      {
        name: "Revolut",
        region: "Europe",
        speed: "Instant",
        fees: "Low",
        useCase: "In-app crypto trading",
      },
    ],
  },
  {
    name: "Mobile Payment Apps",
    id: "mobile_payments",
    priority: 5,
    methods: [
      {
        name: "Apple Pay",
        region: "Global",
        speed: "Instant",
        fees: "Medium",
        useCase: "Mobile card payments",
      },
      {
        name: "Google Pay",
        region: "Global",
        speed: "Instant",
        fees: "Medium",
        useCase: "Mobile card payments",
      },
      {
        name: "Samsung Pay",
        region: "Select regions",
        speed: "Instant",
        fees: "Medium",
        useCase: "Mobile card payments",
      },
    ],
  },
  {
    name: "Gift Cards",
    id: "gift_cards",
    priority: 6,
    methods: [
      {
        name: "Amazon Gift Card",
        region: "Global",
        speed: "Varies",
        fees: "High",
        useCase: "P2P crypto exchange",
      },
      {
        name: "iTunes Gift Card",
        region: "Global",
        speed: "Varies",
        fees: "High",
        useCase: "P2P crypto exchange",
      },
      {
        name: "Walmart Gift Card",
        region: "USA",
        speed: "Varies",
        fees: "High",
        useCase: "P2P crypto exchange",
      },
    ],
  },
  {
    name: "Local Payment Methods",
    id: "local_methods",
    priority: 7,
    methods: [
      {
        name: "UPI",
        region: "India",
        speed: "Instant",
        fees: "Low",
        useCase: "Local transfers, P2P platforms",
      },
      {
        name: "M-Pesa",
        region: "East Africa",
        speed: "Instant",
        fees: "Low",
        useCase: "Mobile money for P2P exchanges",
      },
      {
        name: "PIX",
        region: "Brazil",
        speed: "Instant",
        fees: "Low",
        useCase: "Fast payments and transfers",
      },
      {
        name: "Giropay",
        region: "Germany",
        speed: "Same day",
        fees: "Low",
        useCase: "Bank-based local payments",
      },
      {
        name: "Sofort",
        region: "Germany/Europe",
        speed: "Same day",
        fees: "Low",
        useCase: "Local fiat deposits",
      },
      {
        name: "Interac",
        region: "Canada",
        speed: "Instant",
        fees: "Low",
        useCase: "Crypto purchase in Canada",
      },
      {
        name: "WeChat Pay",
        region: "China",
        speed: "Instant",
        fees: "Low",
        useCase: "Used in P2P platforms (limited direct support)",
      },
      {
        name: "Alipay",
        region: "China",
        speed: "Instant",
        fees: "Low",
        useCase: "Used in P2P platforms (limited direct support)",
      },
    ],
  },
];


