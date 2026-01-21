
import { InventoryItem, Supplier, Customer, Purchase, Sale, Receipt, Payment, ShippingStatus, User, UserRole, UserStatus } from './types';

export const INITIAL_DATA: InventoryItem[] = [
  {
    id: 'SKU-001',
    type: 'Finished Good',
    category: 'Electronics',
    subcategory: 'Laptops',
    name: 'ProBook X15',
    qtyPurchased: 150,
    qtySold: 120,
    reorderLevel: 40,
  },
  {
    id: 'SKU-002',
    type: 'Raw Material',
    category: 'Components',
    subcategory: 'Processors',
    name: 'Octa-Core Z1 Chips',
    qtyPurchased: 500,
    qtySold: 460,
    reorderLevel: 100,
  },
  {
    id: 'SKU-003',
    type: 'Finished Good',
    category: 'Furniture',
    subcategory: 'Chairs',
    name: 'Ergo-Comfort Elite',
    qtyPurchased: 85,
    qtySold: 15,
    reorderLevel: 20,
  },
  {
    id: 'SKU-004',
    type: 'Service Part',
    category: 'Hardware',
    subcategory: 'Fasteners',
    name: 'Titanium Bolts M8',
    qtyPurchased: 2000,
    qtySold: 1950,
    reorderLevel: 500,
  },
  {
    id: 'SKU-005',
    type: 'Finished Good',
    category: 'Electronics',
    subcategory: 'Audio',
    name: 'SonicWave ANC Headphones',
    qtyPurchased: 300,
    qtySold: 280,
    reorderLevel: 50,
  },
  {
    id: 'SKU-006',
    type: 'Raw Material',
    category: 'Packaging',
    subcategory: 'Boxes',
    name: 'Eco-Box Medium',
    qtyPurchased: 1000,
    qtySold: 200,
    reorderLevel: 150,
  },
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Global Tech Solutions',
    contact: '+1 (555) 012-3456',
    email: 'orders@globaltech.com',
    state: 'California',
    city: 'San Jose',
    address: '450 Innovation Way',
    purchases: 45000,
    payments: 40000,
  },
  {
    id: 'SUP-002',
    name: 'Pinnacle Components',
    contact: '+1 (555) 987-6543',
    email: 'sales@pinnacle.io',
    state: 'Texas',
    city: 'Austin',
    address: '12 Silicon Blvd',
    purchases: 12000,
    payments: 12000,
  },
  {
    id: 'SUP-003',
    name: 'Nordic Furniture Ltd',
    contact: '+44 20 7946 0958',
    email: 'contact@nordicfurniture.co.uk',
    state: 'Greater London',
    city: 'London',
    address: '88 Design Row',
    purchases: 8500,
    payments: 6200,
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    name: 'TechFlow Systems',
    contact: '+1 (555) 234-5678',
    email: 'billing@techflow.net',
    state: 'New York',
    city: 'Brooklyn',
    address: '223 Front Street',
    purchases: 25000,
    payments: 22000,
  },
  {
    id: 'CUST-002',
    name: 'Silverline Media',
    contact: '+1 (555) 876-5432',
    email: 'accounts@silverline.com',
    state: 'Washington',
    city: 'Seattle',
    address: '99 Emerald Ave',
    purchases: 15000,
    payments: 15000,
  },
  {
    id: 'CUST-003',
    name: 'Horizon Retail',
    contact: '+1 (555) 444-3322',
    email: 'purchasing@horizon.org',
    state: 'Florida',
    city: 'Miami',
    address: '500 Ocean Blvd',
    purchases: 42000,
    payments: 38000,
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'USR-001',
    name: 'Dino Abdela',
    email: 'dino.abdela@dinostock.ai',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-05-15 09:30 AM',
  },
  {
    id: 'USR-002',
    name: 'Sarah Chen',
    email: 'sarah.chen@dinostock.ai',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2024-05-15 10:15 AM',
  },
  {
    id: 'USR-003',
    name: 'James Wilson',
    email: 'james.wilson@dinostock.ai',
    role: 'Staff',
    status: 'Inactive',
    lastLogin: '2024-05-10 04:45 PM',
  },
  {
    id: 'USR-004',
    name: 'Elena Rodriguez',
    email: 'elena.r@dinostock.ai',
    role: 'Staff',
    status: 'Active',
    lastLogin: '2024-05-14 02:20 PM',
  }
];

export const INITIAL_PURCHASES: Purchase[] = [
  {
    id: 'PO-2024-001',
    date: '2024-03-15',
    supplierId: 'SUP-001',
    supplierName: 'Global Tech Solutions',
    billNum: 'INV-8821',
    state: 'California',
    city: 'San Jose',
    totalAmount: 12500,
    totalPaid: 12500,
    shippingStatus: 'Delivered',
  },
  {
    id: 'PO-2024-002',
    date: '2024-03-20',
    supplierId: 'SUP-002',
    supplierName: 'Pinnacle Components',
    billNum: 'INV-9904',
    state: 'Texas',
    city: 'Austin',
    totalAmount: 8400,
    totalPaid: 4200,
    shippingStatus: 'Shipped',
  },
  {
    id: 'PO-2024-003',
    date: '2024-03-25',
    supplierId: 'SUP-003',
    supplierName: 'Nordic Furniture Ltd',
    billNum: 'BILL-442',
    state: 'Greater London',
    city: 'London',
    totalAmount: 3200,
    totalPaid: 0,
    shippingStatus: 'Pending',
  }
];

export const INITIAL_SALES: Sale[] = [
  {
    id: 'SO-2024-001',
    date: '2024-04-01',
    customerId: 'CUST-001',
    customerName: 'TechFlow Systems',
    invoiceNum: 'IN-5501',
    state: 'New York',
    city: 'Brooklyn',
    totalAmount: 5000,
    totalReceived: 5000,
    shippingStatus: 'Delivered',
  },
  {
    id: 'SO-2024-002',
    date: '2024-04-05',
    customerId: 'CUST-003',
    customerName: 'Horizon Retail',
    invoiceNum: 'IN-5502',
    state: 'Florida',
    city: 'Miami',
    totalAmount: 12000,
    totalReceived: 6000,
    shippingStatus: 'Shipped',
  },
  {
    id: 'SO-2024-003',
    date: '2024-04-10',
    customerId: 'CUST-002',
    customerName: 'Silverline Media',
    invoiceNum: 'IN-5503',
    state: 'Washington',
    city: 'Seattle',
    totalAmount: 2500,
    totalReceived: 0,
    shippingStatus: 'Pending',
  }
];

export const INITIAL_RECEIPTS: Receipt[] = [
  {
    id: 'TRX-1001',
    date: '2024-04-02',
    customerId: 'CUST-001',
    customerName: 'TechFlow Systems',
    state: 'New York',
    city: 'Brooklyn',
    soId: 'SO-2024-001',
    invoiceNum: 'IN-5501',
    paymentMode: 'Bank Transfer',
    amountReceived: 5000,
  },
  {
    id: 'TRX-1002',
    date: '2024-04-06',
    customerId: 'CUST-003',
    customerName: 'Horizon Retail',
    state: 'Florida',
    city: 'Miami',
    soId: 'SO-2024-002',
    invoiceNum: 'IN-5502',
    paymentMode: 'Credit Card',
    amountReceived: 3000,
  },
  {
    id: 'TRX-1003',
    date: '2024-04-12',
    customerId: 'CUST-003',
    customerName: 'Horizon Retail',
    state: 'Florida',
    city: 'Miami',
    soId: 'SO-2024-002',
    invoiceNum: 'IN-5502',
    paymentMode: 'Cash',
    amountReceived: 3000,
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'PMT-5001',
    date: '2024-03-16',
    supplierId: 'SUP-001',
    supplierName: 'Global Tech Solutions',
    state: 'California',
    city: 'San Jose',
    poId: 'PO-2024-001',
    billNum: 'INV-8821',
    paymentMode: 'Bank Transfer',
    amountPaid: 12500,
  },
  {
    id: 'PMT-5002',
    date: '2024-03-21',
    supplierId: 'SUP-002',
    supplierName: 'Pinnacle Components',
    state: 'Texas',
    city: 'Austin',
    poId: 'PO-2024-002',
    billNum: 'INV-9904',
    paymentMode: 'Bank Transfer',
    amountPaid: 4200,
  }
];

export const CATEGORIES = ['Electronics', 'Components', 'Furniture', 'Hardware', 'Packaging', 'Software'];
export const TYPES = ['Finished Good', 'Raw Material', 'Service Part', 'Consumable'];
export const SHIPPING_STATUSES: ShippingStatus[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
export const PAYMENT_MODES = ['Cash', 'Bank Transfer', 'Credit Card', 'Check', 'Mobile Pay'];
export const USER_ROLES: UserRole[] = ['Admin', 'Manager', 'Staff'];
export const USER_STATUSES: UserStatus[] = ['Active', 'Inactive'];
