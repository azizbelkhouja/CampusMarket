import { type Seller } from "./sellerTypes";
import { type Transaction } from "./Transaction";

export interface Payouts {
  id: number;
  transactions: Transaction[];
  seller: Seller;
  amount: number;
  status: "PENDING" | "SUCCESS" | "REJECTED";
  date: string;
}
