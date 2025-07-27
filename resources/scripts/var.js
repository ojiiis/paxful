//const api = "http://192.168.119.65:3000";
//const api = "http://0.0.0.0:3000";
const api = "https://lin.com.ng/ocoin/paxful";
const coins = {eth:"Ethereum",btc:"Bitcoin",ltc:"Litecoin",usdt:"Tether",sol:"Solana"};
const coinsName = {"Ethereum":"eth","Bitcoin":"btc","Litecoin":"ltc","Tether":"usdt"};
const majorP2PCurrencies = ["USD", "EUR", "GBP", "NGN", "KES", "ZAR", "GHS", "INR", "PKR", "BDT", "VND", "THB", "IDR", "PHP", "MYR", "TRY", "BRL", "ARS", "MXN", "RUB", "UAH", "CNY", "HKD", "AUD", "CAD", "JPY", "KRW", "EGP", "TWD", "AED"];
const cryptoPaymentMethods = [
  {
    name: "Bank Transfers",
    id: "bank_transfers",
    priority: 1,
    methods: [
      { name: "Bank Transfer", region: "Global", speed: "Varies", fees: "Varies", useCase: "General transfers" },
      { name: "Domestic Wire Transfer", region: "Global", speed: "1-5 days", fees: "Medium", useCase: "Domestic bank transfers" },
      { name: "International Wire Transfer (SWIFT)", region: "Global", speed: "3-5 days", fees: "High", useCase: "International bank transfers" },
      { name: "UPI Transfer", region: "India", speed: "Instant", fees: "Low", useCase: "Local transfers" },
      { name: "SCT Inst (SEPA Credit Transfer Instant payments)", region: "Europe", speed: "Instant", fees: "Low", useCase: "Instant Euro transfers" },
      { name: "Qatar Mobile Payments", region: "Qatar", speed: "Instant", fees: "Medium", useCase: "Mobile money transfers" },
      { name: "Faster Payments", region: "UK", speed: "Same day", fees: "Low", useCase: "UK domestic payments" },
      { name: "1 PayID", region: "Australia", speed: "Instant", fees: "Low", useCase: "Instant bank payments" },
      { name: "InstaPay", region: "Philippines", speed: "Instant", fees: "Low", useCase: "Real-time bank transfers" },
      { name: "NIP (NIBSS Instant Payment)", region: "Nigeria", speed: "Instant", fees: "Low", useCase: "Domestic payments" },
      // Add more methods here...
    ]
  },
  {
    name: "Online Wallets",
    id: "online_wallets",
    priority: 2,
    methods: [
      { name: "M-Pesa", region: "Kenya, Tanzania, others", speed: "Instant", fees: "Low", useCase: "Mobile money transfers" },
      { name: "PayPal", region: "Global", speed: "Instant", fees: "Medium", useCase: "General online payments" },
      { name: "Airtel Money", region: "India, Africa", speed: "Instant", fees: "Low", useCase: "Mobile payments" },
      { name: "Skrill", region: "Global", speed: "Instant", fees: "Medium", useCase: "Digital wallet transfers" },
      { name: "Xoom Money Transfer", region: "Global", speed: "Instant", fees: "Medium", useCase: "Remittances" },
      { name: "Revolut", region: "Europe, USA", speed: "Instant", fees: "Medium", useCase: "Currency exchange, crypto trading" },
      { name: "Sendwave Wallet", region: "Africa", speed: "Instant", fees: "Low", useCase: "Remittance transfers" },
      { name: "WorldRemit", region: "Global", speed: "Instant", fees: "Medium", useCase: "Cross-border remittances" },
      { name: "Paysend.com", region: "Global", speed: "Instant", fees: "Low", useCase: "Low-fee remittances" },
      { name: "ApplePay", region: "Global", speed: "Instant", fees: "Medium", useCase: "Mobile payments" },
      // Add more methods here...
    ]
  },
  {
    name: "Gift Cards",
    id: "gift_cards",
    priority: 3,
    methods: [
      { name: "iTunes Gift Card", region: "Global", speed: "Varies", fees: "High", useCase: "P2P crypto exchange" },
      { name: "Apple Store Gift Card", region: "Global", speed: "Varies", fees: "High", useCase: "P2P crypto exchange" },
      { name: "Steam Wallet Gift Card", region: "Global", speed: "Varies", fees: "High", useCase: "Gaming, P2P exchange" },
      { name: "Xbox Gift Card", region: "Global", speed: "Varies", fees: "High", useCase: "Gaming, P2P exchange" },
      { name: "Razer Gold Gift Card", region: "Global", speed: "Varies", fees: "High", useCase: "Gaming, P2P exchange" },
      { name: "PlayStation Network Gift Card", region: "Global", speed: "Varies", fees: "High", useCase: "Gaming, P2P exchange" },
      { name: "Airbnb Gift Card", region: "Global", speed: "Varies", fees: "High", useCase: "P2P exchange" },
      { name: "Uber Gift Card", region: "Global", speed: "Varies", fees: "High", useCase: "P2P exchange" },
      // Add more methods here...
    ]
  },
  {
    name: "Credit/Debit Cards",
    id: "credit_debit_cards",
    priority: 4,
    methods: [
      { name: "Visa Debit/Credit Card", region: "Global", speed: "Instant", fees: "Medium", useCase: "Online purchases" },
      { name: "American Express Card", region: "Global", speed: "Instant", fees: "Medium", useCase: "Online purchases" },
      { name: "Bluebird American Express", region: "USA", speed: "Instant", fees: "Medium", useCase: "Prepaid card" },
      { name: "Serve to Serve", region: "USA", speed: "Instant", fees: "Medium", useCase: "Prepaid card" },
      { name: "GreenDot Card", region: "USA", speed: "Instant", fees: "Medium", useCase: "Prepaid card" },
      { name: "Kroger to Kroger Prepaid", region: "USA", speed: "Instant", fees: "Medium", useCase: "Prepaid card" },
      { name: "Card.com Transfer", region: "USA", speed: "Instant", fees: "Medium", useCase: "Prepaid card" },
      { name: "READYdebit Prepaid Card", region: "USA", speed: "Instant", fees: "Medium", useCase: "Prepaid card" },
      // Add more methods here...
    ]
  },
  {
    name: "Local Payment Methods",
    id: "local_methods",
    priority: 5,
    methods: [
      { name: "UPI", region: "India", speed: "Instant", fees: "Low", useCase: "Local transfers, P2P platforms" },
      { name: "M-Pesa", region: "East Africa", speed: "Instant", fees: "Low", useCase: "Mobile money for P2P exchanges" },
      { name: "PIX", region: "Brazil", speed: "Instant", fees: "Low", useCase: "Fast payments and transfers" },
      { name: "Giropay", region: "Germany", speed: "Same day", fees: "Low", useCase: "Bank-based local payments" },
      { name: "Sofort", region: "Germany/Europe", speed: "Same day", fees: "Low", useCase: "Local fiat deposits" },
      { name: "Interac", region: "Canada", speed: "Instant", fees: "Low", useCase: "Crypto purchase in Canada" },
      // Add more methods here...
    ]
  },
  {
    name: "Mobile Payment Apps",
    id: "mobile_payments",
    priority: 6,
    methods: [
      { name: "Samsung Pay", region: "Global", speed: "Instant", fees: "Medium", useCase: "Mobile card payments" },
      { name: "PayM", region: "Global", speed: "Instant", fees: "Medium", useCase: "Mobile wallet payments" },
      { name: "Quickteller", region: "Nigeria", speed: "Instant", fees: "Low", useCase: "Local payments" },
      // Add more methods here...
    ]
  },
];



