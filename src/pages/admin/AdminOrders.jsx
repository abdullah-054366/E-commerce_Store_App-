import { useState, useEffect } from 'react';
import { Eye} from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Modal } from '../../components/ui/Modal';


export function AdminOrders() {
  const { orders, fetchOrders, updateOrderStatus } = useOrderStore();
  const { t } = useLanguageStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };

  const filteredOrders = orders.filter((o) => {
    if (selectedStatus === 'all') return true;
    return o.status === selectedStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-black/5">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--color-primary)]">{t('admin_orders')}</h2>
          <p className="text-xs text-gray-500">إدارة طلبات الشراء، تتبع الشحنات وتعديل حالات التسليم</p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                selectedStatus === st
                  ? 'bg-[var(--color-secondary)] text-white shadow'
                  : 'bg-[#F5F1EC] text-gray-700 hover:bg-gray-200'
              }`}
            >
              {st === 'all' ? 'جميع الطلبات' : t(st)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5">
        <table className="w-full text-right text-xs">
          <thead className="bg-[#F5F1EC] text-gray-700 font-bold border-b">
            <tr>
              <th className="p-4">رقم الطلب</th>
              <th className="p-4">اسم العميل</th>
              <th className="p-4">تاريخ الطلب</th>
              <th className="p-4">المبلغ الإجمالي</th>
              <th className="p-4">طريقة الدفع</th>
              <th className="p-4">حالة الطلب الحالية</th>
              <th className="p-4 text-center">التفاصيل والإجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-serif font-bold text-[var(--color-secondary)]">{order.id}</td>
                <td className="p-4">
                  <span className="font-bold text-gray-900 block">{order.customerName}</span>
                  <span className="text-[10px] text-gray-400">{order.phone}</span>
                </td>
                <td className="p-4 text-gray-500">{new Date(order.date).toLocaleDateString('ar-SA')}</td>
                <td className="p-4 font-serif font-bold text-base text-[var(--color-primary)]">
                  {order.total?.toFixed(2)} ر.س
                </td>
                <td className="p-4 uppercase text-gray-600 font-bold">{order.paymentMethod}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="bg-[#F5F1EC] border border-gray-200 rounded-xl px-2.5 py-1 text-xs font-bold focus:outline-none"
                  >
                    <option value="pending">قيد الانتظار</option>
                    <option value="processing">جاري التجهيز</option>
                    <option value="shipped">تم الشحن</option>
                    <option value="delivered">تم التسليم</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleOpenDetails(order)}
                    className="p-2 bg-[#F5F1EC] hover:bg-gray-200 rounded-xl text-gray-700 font-bold flex items-center justify-center gap-1 mx-auto"
                  >
                    <Eye className="w-4 h-4 text-[var(--color-secondary)]" />
                    <span>عرض الطلب</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <Modal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          title={`تفاصيل الطلب: ${selectedOrder.id}`}
        >
          <div className="space-y-6 text-xs font-sans">
            <div className="grid grid-cols-2 gap-4 p-4 bg-[#F5F1EC] rounded-2xl">
              <div>
                <span className="text-gray-400 block">بيانات العميل:</span>
                <p className="font-bold text-gray-900">{selectedOrder.customerName}</p>
                <p className="text-gray-600">{selectedOrder.phone}</p>
                <p className="text-gray-600">{selectedOrder.email}</p>
              </div>
              <div>
                <span className="text-gray-400 block">عنوان الشحن:</span>
                <p className="font-bold text-gray-900">{selectedOrder.shippingAddress}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-sm">المنتجات المطلوبة:</h4>
              {selectedOrder.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b">
                  <span>{item.name} ({item.size}) × {item.quantity}</span>
                  <span className="font-bold font-serif">{(item.price * item.quantity).toFixed(2)} ر.س</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm font-bold pt-2 border-t">
              <span>إجمالي مبلغ الطلب:</span>
              <span className="text-xl font-serif text-[var(--color-primary)]">{selectedOrder.total?.toFixed(2)} ر.س</span>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
