-- DinoStock AI Inventory - MySQL Schema

CREATE DATABASE IF NOT EXISTS dinostock_db;
USE dinostock_db;

-- Inventory Items
CREATE TABLE inventory_items (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(50),
    category VARCHAR(50),
    subcategory VARCHAR(50),
    name VARCHAR(100) NOT NULL,
    qty_purchased INT DEFAULT 0,
    qty_sold INT DEFAULT 0,
    reorder_level INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers
CREATE TABLE suppliers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(50),
    email VARCHAR(100),
    state VARCHAR(50),
    city VARCHAR(50),
    address TEXT,
    purchases DECIMAL(15, 2) DEFAULT 0,
    payments DECIMAL(15, 2) DEFAULT 0
);

-- Customers
CREATE TABLE customers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(50),
    email VARCHAR(100),
    state VARCHAR(50),
    city VARCHAR(50),
    address TEXT,
    purchases DECIMAL(15, 2) DEFAULT 0,
    payments DECIMAL(15, 2) DEFAULT 0
);

-- Users
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('Admin', 'Manager', 'Staff') DEFAULT 'Staff',
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    last_login DATETIME,
    password_hash VARCHAR(255)
);

-- Purchases (PO)
CREATE TABLE purchases (
    id VARCHAR(50) PRIMARY KEY,
    date DATE,
    supplier_id VARCHAR(50),
    supplier_name VARCHAR(100),
    bill_num VARCHAR(50),
    state VARCHAR(50),
    city VARCHAR(50),
    total_amount DECIMAL(15, 2),
    total_paid DECIMAL(15, 2),
    shipping_status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled'),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- Sales (SO)
CREATE TABLE sales (
    id VARCHAR(50) PRIMARY KEY,
    date DATE,
    customer_id VARCHAR(50),
    customer_name VARCHAR(100),
    invoice_num VARCHAR(50),
    state VARCHAR(50),
    city VARCHAR(50),
    total_amount DECIMAL(15, 2),
    total_received DECIMAL(15, 2),
    shipping_status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled'),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Receipts (Payments In)
CREATE TABLE receipts (
    id VARCHAR(50) PRIMARY KEY,
    date DATE,
    customer_id VARCHAR(50),
    customer_name VARCHAR(100),
    so_id VARCHAR(50),
    invoice_num VARCHAR(50),
    payment_mode VARCHAR(50),
    amount_received DECIMAL(15, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (so_id) REFERENCES sales(id)
);

-- Payments (Payments Out)
CREATE TABLE payments (
    id VARCHAR(50) PRIMARY KEY,
    date DATE,
    supplier_id VARCHAR(50),
    supplier_name VARCHAR(100),
    po_id VARCHAR(50),
    bill_num VARCHAR(50),
    payment_mode VARCHAR(50),
    amount_paid DECIMAL(15, 2),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (po_id) REFERENCES purchases(id)
);