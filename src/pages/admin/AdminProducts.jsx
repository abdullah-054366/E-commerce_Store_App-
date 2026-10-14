import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Search, UploadCloud, X, ImagePlus, Star, GripVertical } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';

/* ══════════════════════════════════════════════════════
   MultiImageUploader
   - صورة رئيسية (index 0) — تظهر بشكل بارز
   - صور فرعية (index 1+) — gallery مصغّر
   - رفع من ملف + drag & drop على كل خانة
   - تبديل الصورة الرئيسية بالنقر على ⭐
   - حذف أي صورة بزر X
   ══════════════════════════════════════════════════════ */
function MultiImageUploader({ images, onChange }) {
  const mainInputRef = useRef(null);
  const subInputRef = useRef(null);
  const [draggingOver, setDraggingOver] = useState(null); // 'main' | number index

  /* ── Convert file → base64 data URL ── */
  const fileToDataUrl = (file) =>
    new Promise((resolve) => {
      if (!file || !file.type.startsWith('image/')) return resolve(null);
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });

  /* ── Add files from input or drop ── */
  const addFiles = async (files, slot = null) => {
    const results = await Promise.all(Array.from(files).map(fileToDataUrl));
    const valid = results.filter(Boolean);
    if (!valid.length) return;

    if (slot === 'main' || images.length === 0) {
      // Replace main image (keep sub-images)
      const updated = [valid[0], ...images.slice(1)];
      onChange(updated);
    } else {
      // Append as sub-images
      onChange([...images, ...valid]);
    }
  };

  /* ── Promote a sub-image to main (swap with index 0) ── */
  const promoteToMain = (idx) => {
    const updated = [...images];
    [updated[0], updated[idx]] = [updated[idx], updated[0]];
    onChange(updated);
  };

  /* ── Remove an image ── */
  const removeImage = (idx) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  /* ── Drag & Drop helpers ── */
  const handleDrop = async (e, slot) => {
    e.preventDefault();
    setDraggingOver(null);
    await addFiles(e.dataTransfer.files, slot);
  };

  const dragProps = (slot) => ({
    onDragOver: (e) => { e.preventDefault(); setDraggingOver(slot); },
    onDragLeave: () => setDraggingOver(null),
    onDrop: (e) => handleDrop(e, slot),
  });

  return (
    <div className="sm:col-span-2 space-y-3">
      <div className="flex items-center justify-between">
        <label className="block font-bold text-gray-700 text-xs">
          صور المنتج
          <span className="mr-1.5 text-[#A9906F] font-normal">(رئيسية + فرعية)</span>
        </label>
        <span className="text-[10px] text-gray-400">
          {images.length} / ∞ صورة
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* ── Main Image Slot ── */}
        <div className="sm:row-span-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#A9906F] mb-2 flex items-center gap-1">
            <Star className="w-3 h-3 fill-[#A9906F]" /> الصورة الرئيسية
          </p>
          <div
            {...dragProps('main')}
            onClick={() => mainInputRef.current.click()}
            className={`relative w-full h-64 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden
              ${draggingOver === 'main'
                ? 'border-[#A9906F] bg-[#A9906F]/10 scale-[1.01]'
                : images[0]
                  ? 'border-transparent'
                  : 'border-gray-200 bg-[#F5F1EC] hover:border-[#A9906F] hover:bg-[#A9906F]/5'
              }`}
          >
            {images[0] ? (
              <>
                <img
                  src={images[0]}
                  alt="main"
                  className="w-full h-full object-cover"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold bg-black/50 px-3 py-1.5 rounded-full">
                    تغيير الصورة
                  </span>
                </div>
                {/* Main badge */}
                <div className="absolute top-2 right-2 bg-[#A9906F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-white" /> رئيسية
                </div>
                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(0); }}
                  className="absolute top-2 left-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                  <Star className="w-5 h-5 text-[#A9906F]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-700">الصورة الرئيسية</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">اسحب أو انقر للرفع</p>
                </div>
              </div>
            )}
          </div>
          {/* Hidden input for main */}
          <input
            ref={mainInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => addFiles(e.target.files, 'main')}
          />
        </div>

        {/* ── Sub Images Grid ── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-1">
            <ImagePlus className="w-3 h-3" /> الصور الفرعية (Gallery)
          </p>

          <div className="grid grid-cols-3 gap-2">
            {/* Existing sub images */}
            {images.slice(1).map((img, i) => {
              const realIdx = i + 1;
              return (
                <div
                  key={realIdx}
                  className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group bg-gray-50"
                >
                  <img
                    src={img}
                    alt={`sub-${realIdx}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Hover actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5">
                    {/* Promote to main */}
                    <button
                      type="button"
                      onClick={() => promoteToMain(realIdx)}
                      className="flex items-center gap-1 bg-[#A9906F] text-white text-[9px] font-bold px-2 py-1 rounded-full transition-transform hover:scale-105"
                      title="اجعلها رئيسية"
                    >
                      <Star className="w-2.5 h-2.5 fill-white" />
                      رئيسية
                    </button>
                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeImage(realIdx)}
                      className="flex items-center gap-1 bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-full transition-transform hover:scale-105"
                    >
                      <X className="w-2.5 h-2.5" />
                      حذف
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Add more sub images button */}
            <button
              type="button"
              onClick={() => subInputRef.current.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-gray-200 bg-[#F5F1EC] hover:border-[#A9906F] hover:bg-[#A9906F]/5 flex flex-col items-center justify-center gap-1 transition-all text-gray-400 hover:text-[#A9906F]"
            >
              <Plus className="w-5 h-5" />
              <span className="text-[9px] font-bold">إضافة</span>
            </button>
          </div>

          {/* Hidden input for sub */}
          <input
            ref={subInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files, 'sub')}
          />

          {images.length > 1 && (
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              💡 اضغط ⭐ على أي صورة فرعية لتجعلها الرئيسية
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   AdminProducts Page
   ══════════════════════════════════════════════════════ */
export function AdminProducts() {
  const { products, categories, fetchProducts, addProduct, updateProduct, deleteProduct } = useProductStore();
  const { lang, t } = useLanguageStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const emptyForm = {
    nameAr: '',
    nameEn: '',
    price: '',
    discountPrice: '',
    category: 'women',
    stock: 20,
    images: [],        // ← array of base64 or remote URLs
    descriptionAr: '',
    status: 'published',
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      nameAr: product.nameAr || '',
      nameEn: product.nameEn || '',
      price: product.price || '',
      discountPrice: product.discountPrice || '',
      category: product.category || 'women',
      stock: product.stock || 0,
      images: product.images || [],
      descriptionAr: product.descriptionAr || '',
      status: product.status || 'published',
    });
    setModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const payload = {
      nameAr: formData.nameAr,
      nameEn: formData.nameEn || formData.nameAr,
      price: Number(formData.price),
      discountPrice: formData.discountPrice ? Number(formData.discountPrice) : null,
      category: formData.category,
      stock: Number(formData.stock),
      images: formData.images.length > 0 ? formData.images : ['https://via.placeholder.com/600'],
      descriptionAr: formData.descriptionAr,
      descriptionEn: formData.descriptionAr,
      status: formData.status,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }
    setModalOpen(false);
  };

  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = (p.nameAr || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-black/5">
        <div>
          <h2 className="text-xl font-serif font-bold text-[var(--color-primary)]">{t('admin_products')}</h2>
          <p className="text-xs text-gray-500">إدارة كاتالوج المنتجات — الأسعار والمخزون والصور والنشر</p>
        </div>
        <Button onClick={handleOpenAddModal} variant="primary" size="md" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>{t('add_product')}</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-black/5">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث باسم المنتج..."
            className="w-full pl-3 pr-9 py-2 bg-[#F5F1EC] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#A9906F]/40"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500 font-medium">الفئة:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#F5F1EC] border border-transparent rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
          >
            <option value="all">جميع الفئات</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{lang === 'ar' ? c.nameAr : c.nameEn}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5">
        <table className="w-full text-right text-xs">
          <thead className="bg-[#F5F1EC] text-gray-700 font-bold border-b">
            <tr>
              <th className="p-4">المنتج</th>
              <th className="p-4">الصور</th>
              <th className="p-4">الفئة</th>
              <th className="p-4">السعر</th>
              <th className="p-4">المخزون</th>
              <th className="p-4">الحالة</th>
              <th className="p-4 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {/* Main image thumbnail */}
                    {product.images?.[0] ? (
                      <div className="relative">
                        <img
                          src={product.images[0]}
                          alt={product.nameAr}
                          className="w-12 h-14 object-cover rounded-lg bg-gray-100 border"
                        />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#A9906F] rounded-full flex items-center justify-center">
                          <Star className="w-2 h-2 fill-white text-white" />
                        </span>
                      </div>
                    ) : (
                      <div className="w-12 h-14 bg-gray-100 rounded-lg border flex items-center justify-center">
                        <ImagePlus className="w-5 h-5 text-gray-300" />
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-gray-900 block">{product.nameAr}</span>
                      <span className="text-[10px] text-gray-400 font-serif">ID: {product.id}</span>
                    </div>
                  </div>
                </td>
                {/* Sub images mini stack */}
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    {product.images?.slice(1, 4).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="w-7 h-8 object-cover rounded border border-white shadow-sm"
                      />
                    ))}
                    {(product.images?.length || 0) > 4 && (
                      <span className="text-[10px] text-gray-400 font-bold">+{product.images.length - 4}</span>
                    )}
                    {(product.images?.length || 0) <= 1 && (
                      <span className="text-[10px] text-gray-400">—</span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-gray-600 font-semibold">{product.category}</td>
                <td className="p-4 font-serif font-bold text-base text-[var(--color-primary)]">
                  {product.discountPrice ? (
                    <div>
                      <span>{product.discountPrice.toFixed(2)} ر.س</span>
                      <span className="block text-[10px] text-gray-400 line-through font-normal">{product.price.toFixed(2)} ر.س</span>
                    </div>
                  ) : (
                    <span>{product.price.toFixed(2)} ر.س</span>
                  )}
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                    product.stock > 10 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                  }`}>
                    {product.stock} قطعة
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                    product.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {t(product.status || 'published')}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                      title={t('edit')}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title={t('delete')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? t('edit_product') : t('add_product')}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* ── Multi-Image Uploader — spans full width ── */}
            <MultiImageUploader
              images={formData.images}
              onChange={(imgs) => setFormData({ ...formData, images: imgs })}
            />

            <div>
              <label className="block font-bold text-gray-700 mb-1">اسم المنتج بالعربية *</label>
              <input
                type="text"
                required
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:outline-none focus:ring-1 focus:ring-[#A9906F]/40"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">اسم المنتج بالإنجليزية</label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:outline-none focus:ring-1 focus:ring-[#A9906F]/40"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">السعر الأصلي (ر.س) *</label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:outline-none focus:ring-1 focus:ring-[#A9906F]/40"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">سعر الخصم (اختياري)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.discountPrice}
                onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:outline-none focus:ring-1 focus:ring-[#A9906F]/40"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">الفئة / القسم *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:outline-none focus:ring-1 focus:ring-[#A9906F]/40"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.nameAr}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">الكمية بالمخزون *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:outline-none focus:ring-1 focus:ring-[#A9906F]/40"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">حالة النشر</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:outline-none focus:ring-1 focus:ring-[#A9906F]/40"
              >
                <option value="published">منشور ✅</option>
                <option value="draft">مسودة 📝</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block font-bold text-gray-700 mb-1">وصف المنتج</label>
              <textarea
                rows="3"
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                className="w-full p-3 bg-[#F5F1EC] rounded-xl border border-transparent focus:outline-none focus:ring-1 focus:ring-[#A9906F]/40 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" onClick={() => setModalOpen(false)} variant="ghost">
              {t('cancel')}
            </Button>
            <Button type="submit" variant="primary" className="flex items-center gap-2">
              <UploadCloud className="w-4 h-4" />
              <span>{t('save_changes')}</span>
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
