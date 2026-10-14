import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw, HelpCircle } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';

export function AboutUs() {
  const { t } = useLanguageStore();
  return (
    <div className="min-h-screen bg-[#F5F1EC] py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-black/5 space-y-6">
        <span className="text-xs font-semibold text-[var(--color-secondary)] uppercase tracking-widest block">OUR STORY</span>
        <h1 className="text-4xl font-serif font-bold text-[var(--color-primary)]">قصة لونورا للموضة</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          تأسست علامة **"لونورا للموضة" (Lunora Fashion)** لتجسد البساطة الفاخرة والأناقة المتفرّدة في عالم الأزياء الراقية. نحن نؤمن بأن الموضة ليست مجرد ملابس، بل هي أسلوب حياة يعكس الأنوثة والوقار والثقة.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          نختار بعناية فائقة أنقى خامات الكتان والحرير والصوف الإيطالي المصنوع بيد أشهر الحرفيين عالمياً، لتقديم قطع تدوم طويلاً وتتجاوز صيحات الموضة العابرة.
        </p>
      </div>
    </div>
  );
}

export function ContactUs() {
  return (
    <div className="min-h-screen bg-[#F5F1EC] py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-black/5 space-y-8">
        <h1 className="text-4xl font-serif font-bold text-[var(--color-primary)]">تواصل معنا</h1>
        <p className="text-sm text-gray-600">فريق خدمة العملاء VIP متواجد على مدار 24 ساعة للإجابة على جميع استفساراتكم.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-medium">
          <div className="p-4 bg-[#F5F1EC] rounded-2xl flex items-center gap-3">
            <Mail className="w-6 h-6 text-[var(--color-secondary)]" />
            <div>
              <p className="font-bold">البريد الإلكتروني</p>
              <p className="text-gray-500">support@lunora-fashion.com</p>
            </div>
          </div>
          <div className="p-4 bg-[#F5F1EC] rounded-2xl flex items-center gap-3">
            <Phone className="w-6 h-6 text-[var(--color-secondary)]" />
            <div>
              <p className="font-bold">الهاتف المباشر</p>
              <p className="text-gray-500">+966 9200 12345</p>
            </div>
          </div>
          <div className="p-4 bg-[#F5F1EC] rounded-2xl flex items-center gap-3">
            <MapPin className="w-6 h-6 text-[var(--color-secondary)]" />
            <div>
              <p className="font-bold">المقر الرئيسي</p>
              <p className="text-gray-500">الرياض - طريق الملك فهد</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const faqs = [
    { q: "ما هي مدة التوصيل داخل المملكة؟", a: "يتم توصيل طلبات الرياض وجدة والشرقية خلال 24 - 48 ساعة، وباقي المدن خلال 2 - 4 أيام عمل." },
    { q: "هل القطع مضمونة 100% أصيلة؟", a: "نعم، جميع منتجات لونورا صُممت وصُنعت حصرياً لعلامتنا وتخضع لأعلى معايير فحص الجودة." },
    { q: "كيف يمكنني استخدام كود الخصم؟", a: "يمكنك إدخال كود الخصم مثل (LUNORA10) في حقيبة التسوق الجانبية قبل إتمام الشراء." }
  ];
  return (
    <div className="min-h-screen bg-[#F5F1EC] py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-black/5 space-y-6">
        <h1 className="text-4xl font-serif font-bold text-[var(--color-primary)]">الأسئلة الشائعة</h1>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="p-4 bg-[#F5F1EC] rounded-2xl space-y-1">
              <h3 className="font-bold text-sm text-[var(--color-primary)]">{f.q}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-[#F5F1EC] py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-black/5 space-y-6">
        <h1 className="text-4xl font-serif font-bold text-[var(--color-primary)]">سياسة الشحن والإرجاع</h1>
        <p className="text-sm text-gray-700 leading-relaxed">
          يوفر متجر لونورا خدمة الشحن المجاني السريع لجميع الطلبات التي تتجاوز قيمتها 300 ريال سعودي.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          يحق للعميل طلب استبدال أو إرجاع أي قطعة خلال 14 يوماً من تاريخ الاستلام بشرط أن تكون في حالتها الأصلية مع التغليف والبطاقات.
        </p>
      </div>
    </div>
  );
}
