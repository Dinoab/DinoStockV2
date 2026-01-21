
export interface InventoryItem {
  id: string;
  type: string;
  category: string;
  subcategory: string;
  name: string;
  qtyPurchased: number;
  qtySold: number;
  reorderLevel: number;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  state: string;
  city: string;
  address: string;
  purchases: number;
  payments: number;
}

export interface Customer {
  id: string;
  name: string;
  contact: string;
  email: string;
  state: string;
  city: string;
  address: string;
  purchases: number;
  payments: number;
}

export type ShippingStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
export type UserRole = 'Admin' | 'Manager' | 'Staff';
export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
}

export interface Purchase {
  id: string; // PO ID
  date: string;
  supplierId: string;
  supplierName: string;
  billNum: string;
  state: string;
  city: string;
  totalAmount: number;
  totalPaid: number;
  shippingStatus: ShippingStatus;
}

export interface Sale {
  id: string; // SO ID
  date: string;
  customerId: string;
  customerName: string;
  invoiceNum: string;
  state: string;
  city: string;
  totalAmount: number;
  totalReceived: number;
  shippingStatus: ShippingStatus;
}

export interface Receipt {
  id: string; // Trx ID
  date: string; // Trx Date
  customerId: string;
  customerName: string;
  state: string;
  city: string;
  soId: string;
  invoiceNum: string;
  paymentMode: string; // PMT Mode
  amountReceived: number;
}

export interface Payment {
  id: string; // Trx ID
  date: string; // Trx Date
  supplierId: string;
  supplierName: string;
  state: string;
  city: string;
  poId: string;
  billNum: string;
  paymentMode: string; // PMT Mode
  amountPaid: number;
}

export interface InventoryStats {
  totalItems: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalInventoryValue: number;
}

export interface GeminiInsight {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}
