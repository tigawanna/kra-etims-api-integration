# KRA eTims Integration SDK

A Node.js SDK for integrating with the Kenya Revenue Authority (KRA) Electronic Tax Invoice Management System (eTims) API.

## Author

Shadrack Matata
Email: kisamba.debug@gmail.com
Tel: +254722854082/+254733854082

## Introduction to KRA eTims

Kenya Revenue Authority currently uses an Integrated Software that collects and manages domestic tax revenues. The Electronic Tax Invoice Management System (eTims) has introduced a supply chain management capability and integration with other KRA systems.

### Area of Application

KRA seeks to introduce the usage of Online and Virtual Sales Control Unit (OSCU & VSCU) capable of handling a richer dataset than the traditional Electronic Tax Register system. This system includes specific requirements concerning the Trader Invoicing System to be used together with an Online or Virtual Sales Control Unit.

### Key Definitions

- **Authority**: Kenya Revenue Authority
- **User**: A taxpayer, user of Trader Invoicing System (TIS)
- **PIN**: Personal Identification Number
- **Electronic Tax Invoicing Management System**: A system comprising of Trader Invoicing System and Online/Virtual Sales Control Unit connected together
- **Trader Invoicing System (TIS)**: A system designated for use in business for efficiency management controls in areas of invoicing and stock management
- **Receipt**: A Tax Invoice or a receipt for the provision of goods/services provided to the customer
- **Online & Virtual Sales Control Unit (OSCU & VSCU)**: A software module communicating with both the TIS and the Authority for processing receipts

### Receipt Types

Each receipt issued by Trader Invoicing System is formed from a combination of receipt type and transaction type:

1. Receipt types: NORMAL, COPY, TRAINING, PROFORMA
2. Transaction types: SALE, CREDIT NOTE, DEBIT NOTE

### Receipt Labels

| RECEIPT TYPE | TRANSACTION TYPE | RECEIPT LABEL |
|--------------|------------------|---------------|
| NORMAL       | SALES            | NS            |
| NORMAL       | CREDIT NOTE      | NC            |
| COPY         | SALES            | CS            |
| COPY         | CREDIT NOTE      | CC            |
| TRAINING     | SALES            | TS            |
| TRAINING     | CREDIT NOTE      | TC            |
| PROFORMA     | SALES            | PS            |

## Features

- Complete implementation of KRA eTims API endpoints
- Express.js server for easy integration
- Comprehensive validation of requests
- Error handling and logging
- Authentication management
- Modular architecture

## Installation

```bash
# Clone the repository
git clone https://github.com/matatashadrack/kra-etims-api-integration.git

# Navigate to the project directory
cd kra-etims-api-integration

# Install dependencies
npm install

# Copy the example environment file
cp .env.example .env

# Edit the .env file with your credentials
```

## Project Structure

```
kra-etims/
├── examples/                  # Example usage scripts
│   ├── basic-usage.js         # SDK usage as a library
│   └── server-usage.js        # SDK usage as a server
├── src/                       # Source code
│   ├── config/                # Configuration files
│   │   └── index.js           # Main configuration
│   ├── controllers/           # API controllers
│   │   └── api.controller.js  # Controller implementation
│   ├── middleware/            # Express middleware
│   │   └── auth.middleware.js # Authentication middleware
│   ├── routes/                # API routes
│   │   └── api.routes.js      # Route definitions
│   ├── services/              # Business logic services
│   │   ├── api.service.js     # Core API service
│   │   ├── auth.service.js    # Authentication service
│   │   ├── basic-data.service.js    # Basic data service
│   │   ├── initialization.service.js # Initialization service
│   │   ├── purchase.service.js      # Purchase service
│   │   ├── sales.service.js         # Sales service
│   │   └── stock.service.js         # Stock service
│   ├── utils/                 # Utility functions
│   │   ├── errors.js          # Error handling
│   │   ├── logger.js          # Logging utility
│   │   └── validation.js      # Request validation
│   └── index.js               # Main entry point
├── tests/                     # Test files
│   └── api.test.js            # API service tests
├── .env.example              # Environment variables example
├── package.json              # Project metadata and dependencies
└── README.md                 # SDK docs
```

## Configuration

Edit the `.env` file with your KRA eTims API credentials:

```
# Environment (development or production)
NODE_ENV=development

# API Base URLs
DEV_API_BASE_URL=https://etims-api-sbx.kra.go.ke
PROD_API_BASE_URL=https://etims-api.kra.go.ke/etims-api

# Authentication
API_USERNAME=your_username
API_PASSWORD=your_password

# Server
PORT=5000

# CORS Configuration
# Comma-separated list of allowed origins (no spaces)
# Use '*' to allow all origins (Highly recommended in production if you play aviator)
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5000
```

## Usage

### As a Node.js SDK

```javascript
const KRAeTimsSDK = require('./src');

// Initialize the SDK
const sdk = new KRAeTimsSDK();

// Example: Authentication
async function authenticate() {
  try {
    const result = await sdk.auth.getToken({
      username: 'your_username',
      password: 'your_password'
    });
    console.log('Authentication successful:', result);
  } catch (error) {
    console.error('Authentication failed:', error);
  }
}

// Example: Initialize OSDC Info
async function initializeOsdc() {
  try {
    const result = await sdk.initialization.selectInitOsdcInfo({
      tin: 'P000000045R',
      bhfId: '00',
      dvcSrlNo: 'MOVA22'
    });
    console.log('Initialization successful:', result);
  } catch (error) {
    console.error('Initialization failed:', error);
  }
}

// Example: Get Code List
async function getCodeList() {
  try {
    const result = await sdk.basicData.selectCodeList({
      tin: 'P000000045R',
      bhfId: '00',
      lastReqDt: '20220101010101'
    });
    console.log('Code list retrieved:', result);
  } catch (error) {
    console.error('Failed to retrieve code list:', error);
  }
}

// Example: Send Sales Transaction
async function sendSalesTrns() {
  try {
    const result = await sdk.sales.sendSalesTrns({
      tin: 'P000000045R',
      bhfId: '00',
      invcNo: 'INV001',
      salesTrnsItems: [
        {
          itemCd: 'ITEM001',
          itemNm: 'Test Item',
          qty: 1,
          prc: 100,
          splyAmt: 100,
          taxTyCd: 'V',
          taxAmt: 16
        }
      ]
    });
    console.log('Sales transaction sent:', result);
  } catch (error) {
    console.error('Failed to send sales transaction:', error);
  }
}
```

### As an Express Server

```javascript
const KRAeTimsSDK = require('./src');

// Initialize the SDK with server option
const sdk = new KRAeTimsSDK({ server: true });

// Start the server
sdk.start(5000).then(() => {
  console.log('Server started on port 5000');
}).catch(err => {
  console.error('Failed to start server:', err);
});
```

Then you can make HTTP requests to the API endpoints:

```bash
# Authentication
curl -X POST http://localhost:5000/api/auth/token \
  -H "Content-Type: application/json" \
  -d '{"username":"your_username","password":"your_password"}'

# Initialize OSDC Info
curl -X POST http://localhost:5000/api/initialization/osdc-info \
  -H "Content-Type: application/json" \
  -d '{"tin":"P000000045R","bhfId":"00","dvcSrlNo":"MOVA22"}'

# Get Code List
curl -X POST http://localhost:5000/api/basic-data/code-list \
  -H "Content-Type: application/json" \
  -d '{"tin":"P000000045R","bhfId":"00","lastReqDt":"20220101010101"}'
```

## API Endpoints

The SDK provides the following API endpoints when running as a server. Each endpoint requires specific request body parameters as detailed below.

### Authentication
- `POST /api/auth/token` - Get authentication token
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

### Initialization
- `POST /api/initialization/osdc-info` - Initialize OSDC Info
  ```json
  {
    "tin": "P000000045R",
    "bhfId": "00",
    "dvcSrlNo": "MOVA22"
  }
  ```

### Basic Data Management
- `POST /api/basic-data/code-list` - Get code list
  ```json
  {
    "tin": "P000000045R",
    "bhfId": "00",
    "lastReqDt": "20220101010101"
  }
  ```

- `POST /api/basic-data/item-cls-list` - Get item classification list
  ```json
  {
    "tin": "P000000045R",
    "bhfId": "00",
    "lastReqDt": "20220101010101"
  }
  ```

- `POST /api/basic-data/bhf-list` - Get branch list
  ```json
  {
    "lastReqDt": "20220101010101"
  }
  ```

- `POST /api/basic-data/notice-list` - Get notice list
  ```json
  {
    "tin": "P000000045R",
    "bhfId": "00",
    "lastReqDt": "20220101010101"
  }
  ```

- `POST /api/basic-data/taxpayer-info` - Get taxpayer info
  ```json
  {
    "tin": "P000000045R",
    "bhfId": "00",
    "lastReqDt": "20220101010101"
  }
  ```

- `POST /api/basic-data/customer-list` - Get customer list
  ```json
  {
    "tin": "P000000045R",
    "bhfId": "00",
    "lastReqDt": "20220101010101"
  }
  ```

### Sales Management
- `POST /api/sales/send` - Send sales transaction
  ```json
  {
    "tin": "P000000045R",
    "bhfId": "00",
    "invcNo": "INV001",
    "salesTrnsItems": [
      {
        "itemCd": "ITEM001",
        "itemNm": "Test Item",
        "qty": 1,
        "prc": 100,
        "splyAmt": 100,
        "dcRt": 0,
        "dcAmt": 0,
        "taxTyCd": "V",
        "taxAmt": 16
      }
    ]
  }
  ```

- `POST /api/sales/select` - Get sales transaction
  ```json
  {
    "tin": "P000000045R",
    "bhfId": "00",
    "lastReqDt": "20220101010101",
    "invcNo": "INV001"  // Optional
  }
  ```

### Stock Management
- `POST /api/stock/move-list` - Get move list
  ```json
  {
    "tin": "P000000045R",
    "bhfId": "00",
    "lastReqDt": "20220101010101"
  }
  ```

- `POST /api/stock/save-master` - Save stock master
  ```json
  {
    "tin": "P000000045R",
    "bhfId": "00",
    "itemCd": "ITEM001",
    "itemClsCd": "FOOD",
    "itemNm": "Test Item",
    "pkgUnitCd": "EA",
    "qtyUnitCd": "EA",
    "splyAmt": 100,
    "vatTyCd": "V"
  }
  ```

### Purchase Management
- `POST /api/purchase/select` - Get purchase transaction
  ```json
  {
    "tin": "P000000045R",
    "bhfId": "00",
    "lastReqDt": "20220101010101"
  }
  ```

## TIS Specifications and Requirements

### Data Flow Between TIS and OSCU/VSCU

For the purpose of signing an invoice, the data flow between the Trader Invoicing System and the Virtual Sales Control Unit will be as follows for each receipt type:

1. **TIS sends receipt data to OSCU/VSCU**:
   - Date and time
   - Personal Identification Number
   - Buyer's PIN (Optional)
   - Receipt number
   - Receipt type and transaction type
   - Tax rates
   - Total amounts with tax
   - Tax amounts

2. **OSCU/VSCU receives receipt data from TIS**

3. **OSCU/VSCU generates response data and sends it back to TIS**:
   - SCU ID
   - Date and time
   - Receipt label
   - Receipt counter per receipt type
   - Receipt counter of all receipts
   - Digital signatures (except for TRAINING and PROFORMA receipts)

4. **TIS finalizes receipt** by printing OSCU/VSCU information on the receipt

5. **TIS sends complete journal data** of NS and NC receipt labels in text form to OSCU/VSCU

### Receipt Requirements

A receipt must show the following minimum required information:

1. Taxpayer's name
2. Personal Identification Number
3. The address at which the sale takes place
4. Personal Identification number of the buyer
5. Receipt type and transaction type
6. Serial number of the receipt from an uninterrupted ascending number series per receipt type
7. Registered items and/or services with description, quantity, price, with any other action that may be done such as cancellations, corrections
8. Total sales amount
9. Tax rates applied
10. The value added tax added to the sale amount
11. Means of payment
12. SCU information:
    - Date and time stamped by OSCU/VSCU
    - Sequential receipt type number
    - Receipt signatures
    - OSCU/VSCU identification number
13. Date and time stamped by TIS

### TIS Functional Requirements

1. TIS shall not issue a receipt of any type before the data flow with OSCU/VSCU has been finalized
2. Copies, training, or proforma receipts must be clearly distinguishable from normal receipts
3. All corrections on the receipt should be performed before approving it
4. Normal Sale (NS) refers to a receipt that shall be produced and offered to the client
5. TIS shall not be able to register a sales amount without simultaneously printing a receipt
6. TIS shall not be able to register the amount of a transaction without identifying the good and/or service
7. TIS shall not be able to correct a transaction without prior cancelation of the original transaction
8. TIS shall print only one original receipt. Reprints shall have a watermark with mention "Copy"
9. TIS shall not issue a receipt of goods when the corresponding stock is less than the requested quantity

## CORS and Security

The SDK includes built-in CORS support with domain whitelisting to secure your API endpoints. This allows you to control which domains can access your API.

### Configuring CORS

You can configure allowed origins in your `.env` file:

```
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
```

By default, the SDK allows requests from `http://localhost:3000` and `http://localhost:5000` in development.

### Whitelisting Domains

The CORS configuration supports:

- Multiple domains (comma-separated list)
- Wildcard (`*`) to allow all origins (Highly recommended for fintechs in production)
- Requests with no origin (like mobile apps or direct API calls)

### CORS Options

The default CORS configuration includes:

- **Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Allowed Headers**: Content-Type, Authorization
- **Credentials**: Enabled (supports cookies and authentication)
- **Max Age**: 24 hours (caches preflight requests)

You can modify these settings in `src/config/index.js` if needed.

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Run tests
npm test
```

## License

ISC



