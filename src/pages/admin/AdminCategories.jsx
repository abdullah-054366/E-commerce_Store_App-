import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';

export function AdminCategories() {
  const { categories, products } = useProductStore();
  const { lang, t } = useLanguageStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [catNameAr, setCatNameAr] = useState('');
  const [catNameEn, setCatNameEn] = useState('');

  const handleSaveCategory = (e) => {
    e.preventDefault();
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-black/5">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--color-primary)]">{t('admin_categories')}</h2>
          <p className="text-xs text-gray-500">إدارة تصنيفات وفئات المنتجات وعرض الأقسام المعروضة بالمتجر</p>
        </div>

        <Button onClick={() => setModalOpen(true)} variant="primary" size="md" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>إضافة تصنيف جديد</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const count = products.filter((p) => p.category === category.id).length;
          return (
            <div key={category.id} className="bg-white rounded-3xl p-6 shadow-sm border border-black/5 space-y-4 flex flex-col justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#F5F1EC] rounded-2xl flex items-center justify-center text-[var(--color-secondary)] font-bold text-xl">
                  <Tag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-gray-900">{category.nameAr}</h3>
                  <span className="text-xs text-gray-400 font-sans">{category.nameEn}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500">عدد القطع: <strong className="text-black">{count} قطعة</strong></span>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"><Edit className="w-4 h-4" /></button>
                  <button className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="إضافة قسم جديد">
        <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold mb-1">اسم القسم بالعربية</label>
            <input
              type="text"
              required
              value={catNameAr}
              onChange={(e) => setCatNameAr(e.target.value)}
              className="w-full p-3 bg-[#F5F1EC] rounded-xl border focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">اسم القسم بالإنجليزية</label>
            <input
              type="text"
              value={catNameEn}
              onChange={(e) => setCatNameEn(e.target.value)}
              className="w-full p-3 bg-[#F5F1EC] rounded-xl border focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button onClick={() => setModalOpen(false)} variant="ghost">{t('cancel')}</Button>
            <Button type="submit" variant="primary">{t('save_changes')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
