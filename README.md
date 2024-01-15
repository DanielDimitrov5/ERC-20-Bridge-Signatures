# ERC20-Bridge Signatures

The ERC20-Bridge Backend is the backend application for the [ERC20-Bridge smart contracts](https://github.com/DanielDimitrov5/ERC-20-Bridge). It facilitates the communication with the smart contracts, handles event listening, and interacts with a MySQL database using Prisma to store relevant data.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Running the Server](#running-the-server)
- [Listener Module](#listener-module)
- [Database](#database)

## Overview

The ERC20-Bridge Backend serves as the communication hub for the ERC20-Bridge smart contracts. It handles event listening, processes events, and stores relevant data in a MySQL database using Prisma.

## Prerequisites

Before setting up the ERC20-Bridge Backend, ensure you have the following prerequisites:

- Node.js
- MySQL Database
- Prisma CLI
- Ethereum RPC Endpoints

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DanielDimitrov5/ERC-20-Bridge-Signatures.git
   ```
2. Install dependencies:

   ```bash
    npm install
    ```

3. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

## Configuration
Configure the ERC20-Bridge Backend by creating a .env file with the following variables:

```env
DATABASE_URL=mysql://username:password@localhost:3306/database
RPC_URL_MAINNET=https://ethereum-rpc-endpoint.com
RPC_URL_SEPOLIA=https://ethereum-rpc-endpoint.com
RPC_URL_GOERLI=https://ethereum-rpc-endpoint.com
PRIVATE_KEY=your_ethereum_private_key
```

RPC endpoints for the chains you want to listen to are required. The private key is used to sign transactions and must be the same for all chains.

## Usage

### Project Structure
The project is structured as follows:

```
.                               # Root directory
├── dist                        # Compiled files
├── prisma                      # Prisma                 
├── src                         # Source files
│   ├── contracts               # Contract abi & data
│   ├── listeners               # Listener module
│   ├── types                   # Type files
│   ├── utils                   # Utility files
│   │   ├── chainManager.ts     # Chain manager utility
│   │   ├── messageSigning.ts   # Message signing utility
│   └── index.ts                # Main file
├── .env                        # Environment variables
```

### Running the Server

To run the server, use the following command:

```bash
npm start
```

## Listener Module

The listener module is responsible for listening to events emitted by the ERC20-Bridge smart contracts. It is divided into two parts: querying past events and continuous event listening.

## Database

The ERC20-Bridge Backend uses a MySQL database to store relevant data. The database is set up using Prisma. The database schema is defined in the `schema.prisma` file. To update the database schema, make changes to the `schema.prisma` file and run the following command:

```bash
npx prisma migrate dev
```

## Contributing

Contributions are welcome!

