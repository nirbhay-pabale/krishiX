/* ============================================================
   KrishiX – Complete API Client (api.js v2.0)
   Workers • Bookings • Fines • Auth • Razorpay • AI Crop Doctor
   ============================================================ */

const KRISHIX_API_BASE = 'http://localhost:3001/api';

// ── Utility: fetch with timeout & token handling ─────────────
async function apiFetch(path, options = {}) {
  const controller = new AbortController();
  const timeout    = setTimeout(() => controller.abort(), 6000);

  const token = localStorage.getItem('krishix_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${KRISHIX_API_BASE}${path}`, {
      ...options,
      headers,
      signal: controller.signal
    });
    clearTimeout(timeout);

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'API error');
    return { success: true, data };
  } catch (err) {
    clearTimeout(timeout);
    return { success: false, error: err.message, offline: true };
  }
}

// ── Auth API ────────────────────────────────────────────────
const AuthAPI = {
  sendOTP: async (mobile, role) => apiFetch('/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify({ mobile, role })
  }),
  verifyOTP: async (mobile, otp, name) => {
    const res = await apiFetch('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ mobile, otp, name })
    });
    if (res.success && res.data.token) {
      localStorage.setItem('krishix_token', res.data.token);
      localStorage.setItem('krishix_user', JSON.stringify(res.data.user));
    }
    return res;
  },
  getCurrentUser: () => {
    try {
      return JSON.parse(localStorage.getItem('krishix_user')) || null;
    } catch (e) {
      return null;
    }
  },
  logout: () => {
    localStorage.removeItem('krishix_token');
    localStorage.removeItem('krishix_user');
  }
};

// ── Workers API ──────────────────────────────────────────────
const WorkersAPI = {
  getAll: async (search = '', skill = 'ALL') => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (skill && skill !== 'ALL') params.set('skill', skill);
    return apiFetch(`/workers?${params.toString()}`);
  },
  getOne: async (id) => apiFetch(`/workers/${id}`),
  register: async (workerData) => apiFetch('/workers', {
    method: 'POST',
    body: JSON.stringify(workerData)
  }),
  addReview: async (workerId, review) => apiFetch(`/workers/${workerId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review)
  })
};

// ── Bookings API ─────────────────────────────────────────────
const BookingsAPI = {
  getAll: async () => apiFetch('/bookings'),
  create: async (bookingData) => apiFetch('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData)
  }),
  updateStatus: async (bookingId, status) => apiFetch(`/bookings/${bookingId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  })
};

// ── Fines API ────────────────────────────────────────────────
const FinesAPI = {
  getAll: async () => apiFetch('/fines'),
  file: async (claimData) => apiFetch('/fines', {
    method: 'POST',
    body: JSON.stringify(claimData)
  }),
  updateStatus: async (claimId, status, adminNote = '') => apiFetch(`/fines/${claimId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status, adminNote })
  })
};

// ── Payments & Escrow API ────────────────────────────────────
const PaymentsAPI = {
  createOrder: async (amount, bookingId, description) => apiFetch('/payments/create-order', {
    method: 'POST',
    body: JSON.stringify({ amount, bookingId, description })
  }),
  verifyPayment: async (paymentDetails) => apiFetch('/payments/verify', {
    method: 'POST',
    body: JSON.stringify(paymentDetails)
  })
};

// ── AI Crop Doctor API ───────────────────────────────────────
const AIDoctorAPI = {
  diagnose: async (crop, symptoms, imageUrl) => apiFetch('/ai/diagnose-crop', {
    method: 'POST',
    body: JSON.stringify({ crop, symptoms, imageUrl })
  })
};

// ── File Upload API ──────────────────────────────────────────
const UploadAPI = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${KRISHIX_API_BASE}/upload`, {
        method: 'POST',
        body: formData
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};

// ── Export globally ──────────────────────────────────────────
window.KrishiXAPI = {
  Auth:     AuthAPI,
  Workers:  WorkersAPI,
  Bookings: BookingsAPI,
  Fines:    FinesAPI,
  Payments: PaymentsAPI,
  AI:       AIDoctorAPI,
  Upload:   UploadAPI,
  BASE_URL: KRISHIX_API_BASE
};

console.log('🌾 KrishiX API Client v2.0 ready with Auth, Payments, and AI Doctor.');
