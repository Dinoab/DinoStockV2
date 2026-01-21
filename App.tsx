import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Plus, Search, Filter, Download, LayoutGrid, List, BarChart3, Settings, Bell, ShoppingCart, Truck, Users, FileText, RotateCcw, ShoppingBag, Banknote, CreditCard, PieChart, ShieldCheck, LogOut, User as UserIcon, RefreshCw } from 'lucide-react';
import { InventoryItem, Supplier, Customer, Purchase, Sale, Receipt, Payment, GeminiInsight, ShippingStatus, User } from './types';
import { SHIPPING_STATUSES, PAYMENT_MODES } from './constants';
import { InventoryTable } from './components/InventoryTable';
import { SuppliersTable } from './components/SuppliersTable';
import { CustomersTable } from './components/CustomersTable';
import { PurchasesTable } from './components/PurchasesTable';
import { SalesTable } from './components/SalesTable';
import { ReceiptsTable } from './components/ReceiptsTable';
import { PaymentsTable } from './components/PaymentsTable';
import { ReportsPage } from './components/ReportsPage';
import { UsersTable } from './components/UsersTable';
import { SettingsPage } from './components/SettingsPage';
import { LoginPage } from './components/LoginPage';
import { DashboardPage } from './components/DashboardPage';
import { StatsCards } from './components/StatsCards';
import { SupplierStats } from './components/SupplierStats';
import { CustomerStats } from './components/CustomerStats';
import { PurchaseStats } from './components/PurchaseStats';
import { SalesStats } from './components/SalesStats';
import { ReceiptStats } from './components/ReceiptStats';
import { PaymentStats } from './components/PaymentStats';
import { UserStats } from './components/UserStats';
import { InventoryModal } from './components/InventoryModal';
import { SupplierModal } from './components/SupplierModal';
import { CustomerModal } from './components/CustomerModal';
import { PurchaseModal } from './components/PurchaseModal';
import { SalesModal } from './components/SalesModal';
import { ReceiptModal } from './components/ReceiptModal';
import { PaymentModal } from './components/PaymentModal';
import { UserModal } from './components/UserModal';
import { InsightsPanel } from './components/InsightsPanel';
import { getInventoryInsights } from './services/geminiService';
import { apiService } from './services/apiService';

type Tab = 'inventory' | 'suppliers' | 'customers' | 'purchases' | 'sales' | 'receipts' | 'payments' | 'reports' | 'dashboard' | 'users' | 'settings';

const App: React.FC = () => {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('dinostock_auth') === 'true';
  });
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(() => {
    const saved = localStorage.getItem('dinostock_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // State
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Modals
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Editing State
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>(undefined);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | undefined>(undefined);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>(undefined);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | undefined>(undefined);
  const [editingSale, setEditingSale] = useState<Sale | undefined>(undefined);
  const [editingReceipt, setEditingReceipt] = useState<Receipt | undefined>(undefined);
  const [editingPayment, setEditingPayment] = useState<Payment | undefined>(undefined);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSearch, setTempSearch] = useState(''); 
  const [pmtFilter, setPmtFilter] = useState<string>('All');
  const [receiptFilter, setReceiptFilter] = useState<string>('All');
  const [shippingFilter, setShippingFilter] = useState<string>('All');
  const [pmtModeFilter, setPmtModeFilter] = useState<string>('All');

  const [insights, setInsights] = useState<GeminiInsight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);

  // Load data from DB
  const loadAllData = useCallback(async () => {
    setIsInitialLoading(true);
    try {
      const [i, s, c, p, sl, rc, pm, us] = await Promise.all([
        apiService.getItems(),
        apiService.getSuppliers(),
        apiService.getCustomers(),
        apiService.getPurchases(),
        apiService.getSales(),
        apiService.getReceipts(),
        apiService.getPayments(),
        apiService.getUsers(),
      ]);
      setItems(i);
      setSuppliers(s);
      setCustomers(c);
      setPurchases(p);
      setSales(sl);
      setReceipts(rc);
      setPayments(pm);
      setUsers(us);
    } catch (err) {
      console.error('Failed to load database data', err);
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadAllData();
    }
  }, [isLoggedIn, loadAllData]);

  const handleLogin = (email: string) => {
    const userMatch = users.find(u => u.email === email) || users[0];
    localStorage.setItem('dinostock_auth', 'true');
    localStorage.setItem('dinostock_user', JSON.stringify(userMatch));
    setIsLoggedIn(true);
    setCurrentUser(userMatch);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem('dinostock_auth');
      localStorage.removeItem('dinostock_user');
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setTempSearch('');
    setPmtFilter('All');
    setReceiptFilter('All');
    setShippingFilter('All');
    setPmtModeFilter('All');
  }, []);

  // Filtering Logic
  const filteredItems = useMemo(() => items.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.id.toLowerCase().includes(searchQuery.toLowerCase())), [items, searchQuery]);
  const filteredSuppliers = useMemo(() => suppliers.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase())), [suppliers, searchQuery]);
  const filteredCustomers = useMemo(() => customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase())), [customers, searchQuery]);
  const filteredUsers = useMemo(() => users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())), [users, searchQuery]);
  
  const filteredPurchases = useMemo(() => purchases.filter(p => {
    const matchesSearch = p.id.toLowerCase().includes(searchQuery.toLowerCase()) || p.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesShipping = shippingFilter === 'All' || p.shippingStatus === shippingFilter;
    const balance = p.totalAmount - p.totalPaid;
    const pmtStatus = balance <= 0 ? 'Paid' : (p.totalPaid > 0 ? 'Partial' : 'Unpaid');
    const matchesPmt = pmtFilter === 'All' || pmtStatus === pmtFilter;
    return matchesSearch && matchesShipping && matchesPmt;
  }), [purchases, searchQuery, shippingFilter, pmtFilter]);

  const filteredSales = useMemo(() => sales.filter(s => {
    const matchesSearch = s.id.toLowerCase().includes(searchQuery.toLowerCase()) || s.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesShipping = shippingFilter === 'All' || s.shippingStatus === shippingFilter;
    const balance = s.totalAmount - s.totalReceived;
    const receiptStatus = balance <= 0 ? 'Paid' : (s.totalReceived > 0 ? 'Partial' : 'Unpaid');
    const matchesReceipt = receiptFilter === 'All' || receiptStatus === receiptFilter;
    return matchesSearch && matchesShipping && matchesReceipt;
  }), [sales, searchQuery, shippingFilter, receiptFilter]);

  const filteredReceipts = useMemo(() => receipts.filter(r => {
    const matchesSearch = r.id.toLowerCase().includes(searchQuery.toLowerCase()) || r.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode = pmtModeFilter === 'All' || r.paymentMode === pmtModeFilter;
    return matchesSearch && matchesMode;
  }), [receipts, searchQuery, pmtModeFilter]);

  const filteredPayments = useMemo(() => payments.filter(p => {
    const matchesSearch = p.id.toLowerCase().includes(searchQuery.toLowerCase()) || p.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) || p.poId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode = pmtModeFilter === 'All' || p.paymentMode === pmtModeFilter;
    return matchesSearch && matchesMode;
  }), [payments, searchQuery, pmtModeFilter]);

  // DB Sync Handlers
  const handleSaveItem = useCallback((item: InventoryItem) => {
    const updated = items.find(p => p.id === item.id) ? items.map(p => p.id === item.id ? item : p) : [...items, item];
    setItems(updated);
    apiService.saveItems(updated);
    setIsInventoryModalOpen(false);
  }, [items]);

  const handleSaveSupplier = useCallback((s: Supplier) => {
    const updated = suppliers.find(p => p.id === s.id) ? suppliers.map(p => p.id === s.id ? s : p) : [...suppliers, s];
    setSuppliers(updated);
    apiService.saveSuppliers(updated);
    setIsSupplierModalOpen(false);
  }, [suppliers]);

  const handleSaveCustomer = useCallback((c: Customer) => {
    const updated = customers.find(p => p.id === c.id) ? customers.map(p => p.id === c.id ? c : p) : [...customers, c];
    setCustomers(updated);
    apiService.saveCustomers(updated);
    setIsCustomerModalOpen(false);
  }, [customers]);

  const handleSavePurchase = useCallback((p: Purchase) => {
    const updated = purchases.find(x => x.id === p.id) ? purchases.map(x => x.id === p.id ? p : x) : [...purchases, p];
    setPurchases(updated);
    apiService.savePurchases(updated);
    setIsPurchaseModalOpen(false);
  }, [purchases]);

  const handleSaveSale = useCallback((s: Sale) => {
    const updated = sales.find(x => x.id === s.id) ? sales.map(x => x.id === s.id ? s : x) : [...sales, s];
    setSales(updated);
    apiService.saveSales(updated);
    setIsSalesModalOpen(false);
  }, [sales]);

  const handleSaveReceipt = useCallback((r: Receipt) => {
    const updated = receipts.find(x => x.id === r.id) ? receipts.map(x => x.id === r.id ? r : x) : [...receipts, r];
    setReceipts(updated);
    apiService.saveReceipts(updated);
    setIsReceiptModalOpen(false);
  }, [receipts]);

  const handleSavePayment = useCallback((p: Payment) => {
    const updated = payments.find(x => x.id === p.id) ? payments.map(x => x.id === p.id ? p : x) : [...payments, p];
    setPayments(updated);
    apiService.savePayments(updated);
    setIsPaymentModalOpen(false);
  }, [payments]);

  const handleSaveUser = useCallback((u: User) => {
    const updated = users.find(x => x.id === u.id) ? users.map(x => x.id === u.id ? u : x) : [...users, u];
    setUsers(updated);
    apiService.saveUsers(updated);
    setIsUserModalOpen(false);
  }, [users]);

  const handleDeleteItem = useCallback((id: string) => {
    if (window.confirm('Delete item?')) {
      const updated = items.filter(p => p.id !== id);
      setItems(updated);
      apiService.saveItems(updated);
    }
  }, [items]);

  const handleDeleteSupplier = useCallback((id: string) => {
    if (window.confirm('Delete supplier?')) {
      const updated = suppliers.filter(p => p.id !== id);
      setSuppliers(updated);
      apiService.saveSuppliers(updated);
    }
  }, [suppliers]);

  const handleDeleteCustomer = useCallback((id: string) => {
    if (window.confirm('Delete customer?')) {
      const updated = customers.filter(p => p.id !== id);
      setCustomers(updated);
      apiService.saveCustomers(updated);
    }
  }, [customers]);

  const handleDeletePurchase = useCallback((id: string) => {
    if (window.confirm('Delete PO?')) {
      const updated = purchases.filter(p => p.id !== id);
      setPurchases(updated);
      apiService.savePurchases(updated);
    }
  }, [purchases]);

  const handleDeleteSale = useCallback((id: string) => {
    if (window.confirm('Delete SO?')) {
      const updated = sales.filter(p => p.id !== id);
      setSales(updated);
      apiService.saveSales(updated);
    }
  }, [sales]);

  const handleDeleteReceipt = useCallback((id: string) => {
    if (window.confirm('Delete receipt?')) {
      const updated = receipts.filter(p => p.id !== id);
      setReceipts(updated);
      apiService.saveReceipts(updated);
    }
  }, [receipts]);

  const handleDeletePayment = useCallback((id: string) => {
    if (window.confirm('Delete payment?')) {
      const updated = payments.filter(p => p.id !== id);
      setPayments(updated);
      apiService.savePayments(updated);
    }
  }, [payments]);

  const handleDeleteUser = useCallback((id: string) => {
    if (window.confirm('Delete user?')) {
      const updated = users.filter(u => u.id !== id);
      setUsers(updated);
      apiService.saveUsers(updated);
    }
  }, [users]);

  const generateInsights = async () => {
    if (!isLoggedIn || items.length === 0) return;
    setLoadingInsights(true);
    const data = await getInventoryInsights(items);
    setInsights(data);
    setLoadingInsights(false);
  };

  useEffect(() => {
    if (isLoggedIn && items.length > 0) generateInsights();
  }, [isLoggedIn, items.length]);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (isInitialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="text-blue-600 animate-spin" size={48} />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Syncing with Cloud Database...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardPage items={items} sales={sales} purchases={purchases} insights={insights} customers={customers} />;
      case 'inventory': return <><StatsCards items={items} /><InventoryTable items={filteredItems} onEdit={(i) => { setEditingItem(i); setIsInventoryModalOpen(true); }} onDelete={handleDeleteItem} /></>;
      case 'suppliers': return <><SupplierStats suppliers={suppliers} /><SuppliersTable suppliers={filteredSuppliers} onEdit={(s) => { setEditingSupplier(s); setIsSupplierModalOpen(true); }} onDelete={handleDeleteSupplier} /></>;
      case 'customers': return <><CustomerStats customers={customers} /><CustomersTable customers={filteredCustomers} onEdit={(c) => { setEditingCustomer(c); setIsCustomerModalOpen(true); }} onDelete={handleDeleteCustomer} /></>;
      case 'purchases': return <><PurchaseStats purchases={purchases} /><PurchasesTable purchases={filteredPurchases} onEdit={(p) => { setEditingPurchase(p); setIsPurchaseModalOpen(true); }} onDelete={handleDeletePurchase} /></>;
      case 'sales': return <><SalesStats sales={sales} /><SalesTable sales={filteredSales} onEdit={(s) => { setEditingSale(s); setIsSalesModalOpen(true); }} onDelete={handleDeleteSale} /></>;
      case 'receipts': return <><ReceiptStats receipts={receipts} /><ReceiptsTable receipts={filteredReceipts} onEdit={(r) => { setEditingReceipt(r); setIsReceiptModalOpen(true); }} onDelete={handleDeleteReceipt} /></>;
      case 'payments': return <><PaymentStats payments={payments} /><PaymentsTable payments={filteredPayments} onEdit={(p) => { setEditingPayment(p); setIsPaymentModalOpen(true); }} onDelete={handleDeletePayment} /></>;
      case 'reports': return <ReportsPage sales={sales} purchases={purchases} inventory={items} receipts={receipts} payments={payments} />;
      case 'users': return <><UserStats users={users} /><UsersTable users={filteredUsers} onEdit={(u) => { setEditingUser(u); setIsUserModalOpen(true); }} onDelete={handleDeleteUser} /></>;
      case 'settings': return <SettingsPage />;
      default: return <div className="text-center py-20 text-slate-400">Section coming soon...</div>;
    }
  };

  const isFilterableTab = ['purchases', 'sales', 'receipts', 'payments', 'users'].includes(activeTab);
  const isSearchableTab = !['reports', 'settings', 'dashboard'].includes(activeTab);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 selection:bg-blue-100">
      <aside className="no-print w-full md:w-64 bg-slate-900 text-slate-400 p-6 flex flex-col border-r border-slate-800">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/50">
            <LayoutGrid size={24} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">DinoStock</span>
        </div>
        
        <nav className="flex-grow space-y-1 overflow-y-auto custom-scrollbar pr-2 pb-6">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Main Menu</p>
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'hover:bg-slate-800 hover:text-white'}`}><BarChart3 size={20} /> Dashboard</button>
          <button onClick={() => setActiveTab('inventory')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'inventory' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'hover:bg-slate-800 hover:text-white'}`}><List size={20} /> Inventory</button>
          
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-6 mb-2">Transactional</p>
          <button onClick={() => setActiveTab('sales')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'sales' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'hover:bg-slate-800 hover:text-white'}`}><ShoppingBag size={20} /> Sales</button>
          <button onClick={() => setActiveTab('receipts')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'receipts' ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40' : 'hover:bg-slate-800 hover:text-white'}`}><Banknote size={20} /> Receipts</button>
          <button onClick={() => setActiveTab('purchases')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'purchases' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'hover:bg-slate-800 hover:text-white'}`}><FileText size={20} /> Purchases</button>
          <button onClick={() => setActiveTab('payments')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'payments' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40' : 'hover:bg-slate-800 hover:text-white'}`}><CreditCard size={20} /> Payments</button>
          
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-6 mb-2">Insights</p>
          <button onClick={() => setActiveTab('reports')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'reports' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'hover:bg-slate-800 hover:text-white'}`}><PieChart size={20} /> Reports</button>
          
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-6 mb-2">Management</p>
          <button onClick={() => setActiveTab('suppliers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'suppliers' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'hover:bg-slate-800 hover:text-white'}`}><Truck size={20} /> Suppliers</button>
          <button onClick={() => setActiveTab('customers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'customers' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'hover:bg-slate-800 hover:text-white'}`}><Users size={20} /> Customers</button>
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'users' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40' : 'hover:bg-slate-800 hover:text-white'}`}><ShieldCheck size={20} /> User Mgmt</button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'settings' ? 'bg-slate-700 text-white shadow-lg shadow-slate-900/40' : 'hover:bg-slate-800 hover:text-white'}`}><Settings size={20} /> Settings</button>
        </nav>

        {/* User Profile Section at Bottom */}
        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold">
              {currentUser?.name?.charAt(0) || 'D'}
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-bold text-white truncate">{currentUser?.name || 'Dino Abdela'}</p>
              <p className="text-[10px] text-slate-500 truncate">{currentUser?.email || 'admin@dinostock.ai'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg text-xs font-bold transition-all"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="no-print bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight capitalize">
              {activeTab === 'users' ? 'User Management' : activeTab === 'settings' ? 'System Settings' : activeTab}
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Global Operations Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={loadAllData} className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="Sync Data">
              <RefreshCw size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            {!['reports', 'settings', 'dashboard'].includes(activeTab) && (
              <button 
                onClick={() => {
                  if (activeTab === 'suppliers') { setEditingSupplier(undefined); setIsSupplierModalOpen(true); }
                  else if (activeTab === 'customers') { setEditingCustomer(undefined); setIsCustomerModalOpen(true); }
                  else if (activeTab === 'purchases') { setEditingPurchase(undefined); setIsPurchaseModalOpen(true); }
                  else if (activeTab === 'sales') { setEditingSale(undefined); setIsSalesModalOpen(true); }
                  else if (activeTab === 'receipts') { setEditingReceipt(undefined); setIsReceiptModalOpen(true); }
                  else if (activeTab === 'payments') { setEditingPayment(undefined); setIsPaymentModalOpen(true); }
                  else if (activeTab === 'users') { setEditingUser(undefined); setIsUserModalOpen(true); }
                  else { setEditingItem(undefined); setIsInventoryModalOpen(true); }
                }}
                className={`flex items-center gap-2 px-5 py-2.5 ${activeTab === 'sales' ? 'bg-emerald-600' : activeTab === 'receipts' ? 'bg-amber-600' : activeTab === 'payments' ? 'bg-rose-600' : activeTab === 'users' ? 'bg-rose-600' : 'bg-blue-600'} text-white rounded-xl font-black shadow-lg shadow-current/20 transition-all active:scale-95`}
              >
                <Plus size={18} /> ADD {activeTab === 'payments' ? 'PAYMENT' : activeTab === 'users' ? 'USER' : activeTab.toUpperCase()}
              </button>
            )}
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar bg-slate-50/50">
          {!['reports', 'settings', 'dashboard'].includes(activeTab) && <InsightsPanel insights={insights} loading={loadingInsights} onRefresh={generateInsights} />}

          {isSearchableTab && (
            <div className="mb-6">
              {isFilterableTab ? (
                <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Filters</label>
                    {(activeTab === 'purchases' || activeTab === 'sales') && (
                      <select value={activeTab === 'purchases' ? pmtFilter : receiptFilter} onChange={(e) => activeTab === 'purchases' ? setPmtFilter(e.target.value) : setReceiptFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="All">All {activeTab === 'purchases' ? 'PMT' : 'Receipt'}</option>
                        <option value="Paid">Paid</option><option value="Partial">Partial</option><option value="Unpaid">Unpaid</option>
                      </select>
                    )}
                    {activeTab !== 'receipts' && activeTab !== 'payments' && activeTab !== 'users' && (
                      <select value={shippingFilter} onChange={(e) => setShippingFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="All">All Shipping</option>
                        {SHIPPING_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    )}
                    {(activeTab === 'receipts' || activeTab === 'payments') && (
                      <select value={pmtModeFilter} onChange={(e) => setPmtModeFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="All">All Modes</option>
                        {PAYMENT_MODES.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    )}
                  </div>
                  <div className="flex-grow flex items-center gap-2 ml-auto">
                    <div className="relative flex-grow max-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="text" placeholder={`Search ${activeTab}...`} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={tempSearch} onChange={(e) => setTempSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && setSearchQuery(tempSearch)} />
                    </div>
                    <button onClick={() => setSearchQuery(tempSearch)} className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 active:scale-95 transition-all">Search</button>
                    <button onClick={handleClearFilters} className="text-slate-400 hover:text-rose-600 p-2 transition-colors"><RotateCcw size={16} /></button>
                  </div>
                </div>
              ) : (
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" placeholder={`Quick Search ${activeTab}...`} className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              )}
            </div>
          )}

          {renderContent()}
        </div>
      </main>

      {/* Modals */}
      <InventoryModal isOpen={isInventoryModalOpen} onClose={() => setIsInventoryModalOpen(false)} onSave={handleSaveItem} initialItem={editingItem} />
      <SupplierModal isOpen={isSupplierModalOpen} onClose={() => setIsSupplierModalOpen(false)} onSave={handleSaveSupplier} initialSupplier={editingSupplier} />
      <CustomerModal isOpen={isCustomerModalOpen} onClose={() => setIsCustomerModalOpen(false)} onSave={handleSaveCustomer} initialCustomer={editingCustomer} />
      <PurchaseModal isOpen={isPurchaseModalOpen} onClose={() => setIsPurchaseModalOpen(false)} onSave={handleSavePurchase} initialPurchase={editingPurchase} suppliers={suppliers} />
      <SalesModal isOpen={isSalesModalOpen} onClose={() => setIsSalesModalOpen(false)} onSave={handleSaveSale} initialSale={editingSale} customers={customers} />
      <ReceiptModal isOpen={isReceiptModalOpen} onClose={() => setIsReceiptModalOpen(false)} onSave={handleSaveReceipt} initialReceipt={editingReceipt} customers={customers} sales={sales} />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} onSave={handleSavePayment} initialPayment={editingPayment} suppliers={suppliers} purchases={purchases} />
      <UserModal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} onSave={handleSaveUser} initialUser={editingUser} />
    </div>
  );
};

export default App;