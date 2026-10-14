import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 800)); // Simulated API delay

    const result = login(form.email, form.password);
    setIsLoading(false);

    if (result.success && result.user.role === 'admin') {
      navigate('/admin', { replace: true });
    } else if (result.success) {
      setError('ليس لديك صلاحيات الدخول إلى لوحة التحكم الإدارية.');
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة. حاول مجدداً.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1EC] flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#A9906F]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#181818]/5 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#181818] text-white px-8 py-10 text-center">
          <Link to="/" className="inline-block mb-6">
            <span className="text-3xl font-bold tracking-widest" style={{ fontFamily: "'Playfair Display', serif" }}>
              LUNORA
            </span>
            <p className="text-[10px] tracking-[0.4em] text-[#A9906F] mt-1 font-medium uppercase">HAUTE COUTURE</p>
          </Link>
          <div className="flex items-center justify-center gap-2 bg-white/10 rounded-2xl px-4 py-2.5 w-fit mx-auto mt-2">
            <ShieldCheck className="w-4 h-4 text-[#A9906F]" />
            <span className="text-sm font-semibold text-white/90">لوحة التحكم الإدارية</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="px-8 py-8 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-[#181818]" style={{ fontFamily: "'Playfair Display', serif" }}>
              تسجيل الدخول
            </h2>
            <p className="text-sm text-gray-500">أدخل بيانات حسابك الإداري للمتابعة</p>
          </div>

          {/* Demo Credentials Banner */}
          <div className="bg-[#F5F1EC] border border-[#A9906F]/30 rounded-2xl p-4 text-center space-y-1">
            <p className="text-xs font-bold text-[#A9906F] uppercase tracking-wider">بيانات الدخول التجريبية</p>
            <p className="text-xs text-gray-600 font-medium">📧 admin@lunora.com</p>
            <p className="text-xs text-gray-600 font-medium">🔑 admin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-2xl p-4 animate-in slide-in-from-top duration-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@lunora.com"
                className="w-full px-4 py-3.5 bg-[#F5F1EC] border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:border-[#A9906F] focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-[#F5F1EC] border border-transparent rounded-xl text-sm font-medium focus:outline-none focus:border-[#A9906F] focus:bg-white transition-all placeholder:text-gray-400 pe-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 end-4 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#181818] hover:bg-[#2a2a2a] disabled:opacity-60 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 text-sm shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 20 10 10 0 010-20z" />
                  </svg>
                  <span>جاري التحقق...</span>
                </>
              ) : (
                <>
                  <span>دخول لوحة التحكم</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Back Link */}
          <div className="text-center pt-2">
            <Link
              to="/"
              className="text-xs font-medium text-gray-400 hover:text-[#A9906F] transition-colors"
            >
              ← العودة إلى المتجر
            </Link>
          </div>
        </div>
      </div>

      {/* Security Note */}
      <p className="mt-6 text-xs text-gray-400 text-center max-w-xs">
        🔒 اتصال آمن مشفر · بيانات محمية · LUNORA Fashion Admin Portal
      </p>
    </div>
  );
}
