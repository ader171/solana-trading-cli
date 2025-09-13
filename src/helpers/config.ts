import {
  Currency,
  Token,
  ENDPOINT,
  MAINNET_PROGRAM_ID,
  RAYDIUM_MAINNET,
  TxVersion,
  LOOKUP_TABLE_CACHE,
  TOKEN_PROGRAM_ID,
} from "@raydium-io/raydium-sdk";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import fs from "fs";
import dotenv from "dotenv";
import bs58 from "bs58";
import path from "path";

// === .env LOADING CHANGES START ===
// Load .env from the project root (the directory you run the process from),
// instead of forcing a .env inside this package's src/helpers folder.
const ROOT_ENV_PATH = path.resolve(process.cwd(), ".env");

// Hard fail if the root .env is missing (so issues are obvious)
if (!fs.existsSync(ROOT_ENV_PATH)) {
  throw new Error(
    `Missing .env at ${ROOT_ENV_PATH}. Create one in your project root (not inside solana-trading-cli).\n` +
      `Required vars: PRIVATE_KEY (base58), MAINNET_ENDPOINT, optionally JITO_FEE, BLOXROUTE_FEE, etc.`
  );
}

// Load environment variables from project root .env
dotenv.config({ path: ROOT_ENV_PATH });
// === .env LOADING CHANGES END ===

export function loadKeypairFromFile(filename: string) {
  const secret = fs.readFileSync(filename, { encoding: "utf8" });
  return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(secret)));
}
export const jito_fee: any = process.env.JITO_FEE; // 0.00009 SOL
export const shyft_api_key = process.env.SHYFT_API_KEY; // your shyft api key
export const wallet = Keypair.fromSecretKey(
  bs58.decode(process.env.PRIVATE_KEY || "")
); // your wallet
export const private_key = process.env.PRIVATE_KEY; // your private key
export const dev_endpoint = process.env.DEVNET_ENDPOINT || ""; // devnet endpoint, if you use devnet
export const main_endpoint = process.env.MAINNET_ENDPOINT || ""; // mainnet endpoint
export const bloXRoute_auth_header = process.env.BLOXROUTE_AUTH_HEADER;
export const bloXroute_fee = process.env.BLOXROUTE_FEE; // 0.001 SOL
// const second_main_endpoint = process.env.SECOND_MAINNET_ENDPOINT; // if you use copy trade program, second mainnet endpoint
// const RPC_Websocket_endpoint = process.env.WS_ENDPOINT;
// const second_RPC_Websocket_endpoint = process.env.SECOND_WS_ENDPOINT; // if you use copy trade program
// const stop_lost = process.env.STOP_LOST; // percentage of stop lost, if you use copy trade program
// const take_profit = process.env.TAKE_PROFIT; // percentage of take profit, if you use copy trade program
export const smart_money_wallet = process.env.SMART_MONEY_WALLET; // if you use copy trade program
export const connection = new Connection(main_endpoint, "confirmed"); // mainnet connection
//const connection = new Connection(main_endpoint, { // if you use copy trade program
//  wsEndpoint: RPC_Websocket_endpoint,
//  commitment: "confirmed",
//});
//const second_connection = new Connection(second_main_endpoint, { // if you use copy trade program
//  wsEndpoint: second_RPC_Websocket_endpoint,
//  commitment: "confirmed",
//});
export const dev_connection = new Connection(dev_endpoint, "confirmed"); // devnet connection

export const PROGRAMIDS = MAINNET_PROGRAM_ID; // raydium mainnet program address

export const RAYDIUM_MAINNET_API = RAYDIUM_MAINNET; // raydium mainnet program's api

export const makeTxVersion = TxVersion.V0; // LEGACY
export const _ENDPOINT = ENDPOINT; // raydium mainnet program's base api path
export const addLookupTableInfo = LOOKUP_TABLE_CACHE; // only mainnet. other = undefined

export const DEFAULT_TOKEN = {
  SOL: new Currency(9, "SOL", "SOL"),
  WSOL: new Token(
    TOKEN_PROGRAM_ID,
    new PublicKey("So11111111111111111111111111111111111111112"),
    9,
    "WSOL",
    "WSOL"
  ),
  USDC: new Token(
    TOKEN_PROGRAM_ID,
    new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    6,
    "USDC",
    "USDC"
  ),
};

export const wsol = "So11111111111111111111111111111111111111112";
