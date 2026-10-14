import { useLanguageStore } from '../../store/useLanguageStore';

export function AdminCustomers() {
  const { t } = useLanguageStore();

  const customersList = [
    { id: '1', name: 'سارة المحمد', email: 'sara.m@example.com', phone: '+966 50 123 4567', ordersCount: 5, totalSpent: 4250, role: 'customer' },
    { id: '2', name: 'نورة العتيبي', email: 'noura.a@example.com', phone: '+966 55 987 6543', ordersCount: 3, totalSpent: 2890, role: 'customer' },
    { id: '3', name: 'عبدالله المدير', email: 'admin@lunora.com', phone: '+966 50 000 0000', ordersCount: 12, totalSpent: 18400, role: 'admin' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-black/5">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--color-primary)]">{t('admin_customers')}</h2>
          <p className="text-xs text-gray-500">عرض قائمة العملاء المسجلين وسجل إجمالي المشتريات</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5">
        <table className="w-full text-right text-xs">
          <thead className="bg-[#F5F1EC] text-gray-700 font-bold border-b">
            <tr>
              <th className="p-4">اسم العميل</th>
              <th className="p-4">البريد الإلكتروني</th>
              <th className="p-4">رقم الجوال</th>
              <th className="p-4">عدد الطلبات</th>
              <th className="p-4">إجمالي المشتريات</th>
              <th className="p-4">نوع الحساب</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {customersList.map((cust) => (
              <tr key={cust.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-900">{cust.name}</td>
                <td className="p-4 text-gray-600">{cust.email}</td>
                <td className="p-4 text-gray-600">{cust.phone}</td>
                <td className="p-4 font-semibold">{cust.ordersCount} طلبات</td>
                <td className="p-4 font-serif font-bold text-[var(--color-primary)]">{cust.totalSpent.toFixed(2)} ر.س</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                    cust.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {cust.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
