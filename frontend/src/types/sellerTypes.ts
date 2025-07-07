export interface PickupAddress {
    name: string;
    mobile: string;
    pincode: string;
    address: string;
    locality: string;
    city: string;
    state: string;
}

export interface BankDetails {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
}

export interface Seller {
    id?:number;
    mobile: string;
    cf: string;
    pickupAddress: PickupAddress;
    bankDetails: BankDetails;
    sellerName: string;
    email: string;
    preferredname: string;
    password: string;
    accountStatus?:string;
}

export interface SellerReport {
    id: number;
    seller: Seller;
    totalEarnings: number;
    totalSales: number;
    totalRefunds: number;
    totalTax: number;
    netEarnings: number;
    totalOrders: number;
    canceledOrders: number;
    totalTransactions: number;
  }
  