# 🦖 DinoStock AI Inventory

**DinoStock AI** is a world-class, intelligent inventory and warehouse management system. It combines robust transactional tracking with state-of-the-art AI insights powered by Google Gemini 3.

---

## 🚀 Online Hosting Guide (cPanel)

This application is built using a modern "No-Build" architecture. It can be hosted on any standard cPanel or web host without needing a complex build process.

### 1. Database Setup (MySQL)
1.  Log in to your cPanel.
2.  Go to **MySQL® Databases**.
3.  Create a new database named `dinostock_db`.
4.  Create a user, assign a password, and add the user to the database with all privileges.
5.  Go to **phpMyAdmin**, select your database, and import the `schema.sql` file provided in this repository.

### 2. File Deployment
1.  Open **File Manager** in cPanel.
2.  Navigate to `public_html`.
3.  Upload all files from this project directly into `public_html`.

### 3. Backend API (Conceptual)
Since this is a frontend-ready application, you need to connect the `services/apiService.ts` to your server-side scripts.
- **PHP Option**: Create a folder `/api` and add PHP scripts (e.g., `get_items.php`) that query your MySQL database and return JSON.
- **Node.js Option**: Use cPanel's "Setup Node.js App" to host an Express.js backend.

### 4. Configuration
Ensure your environment variables are set in the cPanel "Application Manager" or `.env` file:
- `API_KEY`: Your Google Gemini API Key.
- `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`: Your MySQL credentials.

---

## 🌟 Key Features

### 📦 Advanced Inventory Management
- **Detailed Tracking**: Manage items with granular attributes: Item ID, Type, Category, Subcategory, and Name.
- **Stock Intelligence**: Real-time tracking of QTY Purchased, QTY Sold, and Remaining stock.
- **Reorder Alerts**: Automated visual indicators for items that fall below critical reorder levels.

### 💰 Full Financial Lifecycle
- **Procurement (Purchases)**: Track purchase orders (POs), supplier bills, and payment status.
- **Revenue (Sales)**: Manage sales orders (SOs), customer invoices, and shipping fulfillment.
- **Cash Flow**: Dedicated modules for **Receipts** (Cash In) and **Payments** (Cash Out).

### 📊 Business Intelligence & Reporting
- **Dynamic Dashboard**: High-level KPIs, inventory distribution charts, and real-time activity feeds.
- **Advanced Reports**: Date-filtered, printable reports for Stock Balance, Top Selling, and Procurement Logs.

### 🤖 Gemini AI Integration
- **Predictive Insights**: Uses Google Gemini 3 to analyze inventory levels and suggest business optimizations.

---

## 🛠 Tech Stack
- **Frontend**: React 19 (Hooks, Context, Memoization)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Engine**: Google GenAI SDK (@google/genai)
- **Persistence**: REST API ready (via `apiService.ts`)

---

## 👤 User Management
- **Admin (e.g., Dino Abdela)**: Full system control and security settings.
- **Manager**: Oversees transactions and generates reports.
- **Staff**: Handles day-to-day inventory updates.

---

&copy; 2024 DinoStock AI Inventory Systems. Optimized for efficiency and scale.