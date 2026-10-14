import { useState } from 'react';
import {  CreditCard, Truck, Check } from 'lucide-react';
import { useCmsStore } from '../../store/useCmsStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Button } from '../../components/ui/Button';

export function AdminSettings() {
  const { siteConfig, updateSiteConfig } = useCmsStore();
  const { t } = useLanguageStore();

  const [shippingFee, setShippingFee] = useState(siteConfig?.shippingFee || 25);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(siteConfig?.freeShippingThreshold || 300);
  const [saved, setSaved] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSiteConfig({
      shippingFee: Number(shippingFee),
      freeShippingThreshold: Number(freeShippingThreshold),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSaveSettings} className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-black/5">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--color-primary)]">{t('admin_settings')}</h2>
          <p className="text-xs text-gray-500">إعدادات بوابات الدفع الإلكتروني وشروط الشحن المجاني</p>
        </div>

        <Button type="submit" variant="secondary" size="md" className="flex items-center gap-2">
          {saved ? <Check className="w-4 h-4" /> : null}
          <span>{saved ? 'تم الحفظ!' : t('save_changes')}</span>
        </Button>
      </div>

      {/* Payment Gateways Config */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-black/5 space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <CreditCard className="w-5 h-5 text-[var(--color-secondary)]" />
          <h3 className="text-lg font-serif font-bold">بوابات الدفع الإلكتروني</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
          <div className="p-4 bg-[#F5F1EC] rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-gray-900">مدى (Mada Gateway)</span>
              <span className="text-green-700 font-bold">مُفعل ✓</span>
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Mada Merchant Key</label>
              <input type="password" value="pk_live_mada_99182312" readOnly className="w-full p-2 bg-white rounded-xl text-gray-400" />
            </div>
          </div>

          <div className="p-4 bg-[#F5F1EC] rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-gray-900">Apple Pay</span>
              <span className="text-green-700 font-bold">مُفعل ✓</span>
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Apple Merchant ID</label>
              <input type="text" value="merchant.com.lunora.pay" readOnly className="w-full p-2 bg-white rounded-xl text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Rates Config */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-black/5 space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <Truck className="w-5 h-5 text-[var(--color-secondary)]" />
          <h3 className="text-lg font-serif font-bold">أسعار وسياسات الشحن</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-semibold">
          <div>
            <label className="block text-gray-700 mb-1">رسوم الشحن القياسي (ر.س)</label>
            <input
              type="number"
              value={shippingFee}
              onChange={(e) => setShippingFee(e.target.value)}
              className="w-full p-3 bg-[#F5F1EC] rounded-xl border focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">حد الشحن المجاني (Free Shipping Threshold)</label>
            <input
              type="number"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(e.target.value)}
              className="w-full p-3 bg-[#F5F1EC] rounded-xl border focus:outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
