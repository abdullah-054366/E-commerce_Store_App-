import { useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { useProductStore } from '../../store/useProductStore';
import { useLanguageStore } from '../../store/useLanguageStore';

export function DashboardOverview() {
  const { orders, fetchOrders } = useOrderStore();
  const { fetchProducts } = useProductStore();
  const { t } = useLanguageStore();

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [fetchOrders, fetchProducts]);

  const salesData = [
    { name: '1 أغسطس', revenue: 4200, orders: 12 },
    { name: '2 أغسطس', revenue: 5800, orders: 18 },
    { name: '3 أغسطس', revenue: 3900, orders: 11 },
    { name: '4 أغسطس', revenue: 7400, orders: 24 },
    { name: '5 أغسطس', revenue: 9200, orders: 31 },
    { name: '6 أغسطس', revenue: 8100, orders: 27 },
    { name: '7 أغسطس', revenue: 11500, orders: 38 },
  ];

  const categoryData = [
    { category: 'فساتين', sales: 48000 },
    { category: 'نساء', sales: 34000 },
    { category: 'حقائب', sales: 26000 },
    { category: 'أحذية', sales: 18000 },
    { category: 'رجال', sales: 14000 },
  ];

  return (
    <div className="space-y-8 font-sans">
      
      {/* 4 KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500">{t('total_sales')}</span>
            <h3 className="text-2xl font-serif font-bold text-[var(--color-primary)]">148,920 ر.س</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" /> +12.4% هذا الشهر
            </span>
          </div>
          <div className="w-12 h-12 bg-[#F5F1EC] text-[var(--color-secondary)] rounded-2xl flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500">{t('total_orders')}</span>
            <h3 className="text-2xl font-serif font-bold text-[var(--color-primary)]">1,420 طلب</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" /> +8.1% هذا الأسبوع
            </span>
          </div>
          <div className="w-12 h-12 bg-[#F5F1EC] text-[var(--color-secondary)] rounded-2xl flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500">{t('total_customers')}</span>
            <h3 className="text-2xl font-serif font-bold text-[var(--color-primary)]">3,840 عميل</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" /> +15.2% عملاء جدد
            </span>
          </div>
          <div className="w-12 h-12 bg-[#F5F1EC] text-[var(--color-secondary)] rounded-2xl flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-500">{t('conversion_rate')}</span>
            <h3 className="text-2xl font-serif font-bold text-[var(--color-primary)]">4.8%</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" /> +0.6% تحسن
            </span>
          </div>
          <div className="w-12 h-12 bg-[#F5F1EC] text-[var(--color-secondary)] rounded-2xl flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sales Revenue Trend Chart */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-black/5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-[var(--color-primary)]">تحليل المبيعات اليومي (ر.س)</h3>
              <p className="text-xs text-gray-400">نمو إيرادات المتجر خلال الأسبوع الأخير</p>
            </div>
          </div>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A9906F" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#A9906F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFEBE6" />
                <XAxis dataKey="name" stroke="#999" fontSize={11} />
                <YAxis stroke="#999" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#A9906F" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-black/5 space-y-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-[var(--color-primary)]">الأقسام الأكثر مبيعاً</h3>
            <p className="text-xs text-gray-400">توزيع المبيعات حسب الفئة</p>
          </div>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFEBE6" />
                <XAxis dataKey="category" stroke="#999" fontSize={11} />
                <YAxis stroke="#999" fontSize={11} />
                <Tooltip />
                <Bar dataKey="sales" fill="#181818" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Orders Feed Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-black/5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg text-[var(--color-primary)]">{t('recent_orders')}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#F5F1EC] text-gray-700 font-bold border-b">
              <tr>
                <th className="p-3">رقم الطلب</th>
                <th className="p-3">العميل</th>
                <th className="p-3">التاريخ</th>
                <th className="p-3">المبلغ الإجمالي</th>
                <th className="p-3">طريقة الدفع</th>
                <th className="p-3">حالة الطلب</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-serif font-bold text-[var(--color-secondary)]">{order.id}</td>
                  <td className="p-3 font-semibold">{order.customerName}</td>
                  <td className="p-3 text-gray-500">{new Date(order.date).toLocaleDateString('ar-SA')}</td>
                  <td className="p-3 font-bold font-serif">{order.total?.toFixed(2)} ر.س</td>
                  <td className="p-3 uppercase text-gray-500">{order.paymentMethod}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {t(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
