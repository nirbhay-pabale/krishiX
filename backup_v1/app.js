/* ============================================================
   KrishiX – Complete Application Controller
   Labour Profiles • Team Squad Booking • Interactive Fines • GPS
   ============================================================ */

class KrishiXApp {
  constructor() {
    this.state = window.krishixState;
    this.synth = window.speechSynthesis;
  }

  /* ── BOOT ──────────────────────────────────────────────── */
  init() {
    this.renderProfiles();
    this.renderTeamSquads();
    this.renderLeaderboard();
    this.renderFineHub();
    this.renderMachinery();
    this.renderSchedule();
    this.renderPayments();
    this.renderFarmPlan();
    this.switchTab("landing");
    this.setLanguage(this.state.language, false);
    this.checkAuthSession();
  }

  /* ── LANGUAGE ──────────────────────────────────────────── */
  setLanguage(lang, speak = true) {
    this.state.language = lang;
    document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
    const el = document.getElementById(`lang-${lang}`);
    if (el) el.classList.add("active");
    if (speak) {
      const msg = {
        mr: "नमस्कार! कृषिक्स कोपरगाव व्हॉईस असिस्टंट सुरू आहे. मजूर प्रोफाईल पाहण्यासाठी किंवा पूर्ण टोळी बुक करण्यासाठी पर्याय उपलब्ध आहेत.",
        hi: "नमस्ते! कृषिक्स कोपरगांव वॉइस असिस्टेंट शुरू है।",
        en: "Welcome to KrishiX Kopargaon! Browse 15 verified individual worker profiles or book entire labour squads for your farm."
      };
      this.speak(msg[lang] || msg.en);
    }
  }

  /* ── VOICE ─────────────────────────────────────────────── */
  speak(text) {
    if (!text || !("speechSynthesis" in window)) return;
    this.synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const langMap = { en: "en-US", hi: "hi-IN", mr: "mr-IN" };
    u.lang = langMap[this.state.language] || "mr-IN";
    u.rate = 0.85;
    this.showToast(text);
    u.onend = () => {
      const t = document.getElementById("voice-toast");
      if (t) t.classList.remove("show");
    };
    this.synth.speak(u);
  }

  speakPageSummary() {
    const tab = this.state.currentTab;
    const lang = this.state.language;
    const summaries = {
      profiles: {
        mr: "तुम्ही आता कोपरगाव मजूर प्रोफाईल डायरेक्टरीमध्ये आहात. येथे 15 पडताळणी केलेल्या मजुरांच्या वैयक्तिक प्रोफाईल व त्यांचा 15 वर्षांचा अनुभव उपलब्ध आहे.",
        hi: "आप कोपरगांव मजदूर प्रोफाइल डायरेक्टरी में हैं।",
        en: "You are on the Kopargaon Labour Profiles Directory with 15 individual worker profiles and past work experience."
      },
      "team-squad": {
        mr: "हे पूर्ण मजूर टोळी बुकिंग दालन आहे. ऊस तोडणी, कांदा काढणी व गहू कापणीसाठी अख्खी टोळी बुक करा.",
        hi: "यह पूरा मजदूर टीम बुकिंग सेक्शन है।",
        en: "This is the Labour Squad Booking section to book entire teams for major farming operations."
      },
      fines: {
        mr: "दंड व भरपाई केंद्र: गैरहजेरी किंवा नुकसानासाठी थेट दंड अर्ज करा.",
        hi: "जुर्माना और सुरक्षा केंद्र।",
        en: "Fine & Protection Hub: File fine claims for late arrival or crop/machinery damage."
      }
    };
    const s = summaries[tab] || summaries.profiles;
    this.speak(s[lang] || s.en);
  }

  showToast(text) {
    const t = document.getElementById("voice-toast");
    const tx = document.getElementById("toast-text");
    if (!t || !tx) return;
    tx.textContent = text.length > 90 ? text.slice(0, 90) + "…" : text;
    t.classList.add("show");
    clearTimeout(this._toastT);
    this._toastT = setTimeout(() => t.classList.remove("show"), 5500);
  }

  /* ── ROLE ──────────────────────────────────────────────── */
  setRole(role) {
    this.state.currentRole = role;
    document.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
    document.getElementById(`role-${role}`)?.classList.add("active");
    const pt = document.getElementById("tab-provider");
    if (pt) pt.style.display = role === "provider" ? "flex" : "none";
    this.switchTab(role === "provider" ? "provider" : "profiles");
  }

  /* ── MOBILE OTP AUTHENTICATION ──────────────────────── */
  checkAuthSession() {
    const api = window.KrishiXAPI;
    if (!api) return;
    const user = api.Auth.getCurrentUser();
    if (user) {
      const btn = document.getElementById("btn-otp-login");
      const badge = document.getElementById("user-badge");
      if (btn) btn.style.display = "none";
      if (badge) {
        badge.style.display = "inline-flex";
        badge.innerHTML = `👤 ${user.name} (${user.mobile}) <button style="background:none;border:none;color:#fff;cursor:pointer;margin-left:4px;" onclick="window.krishixApp.logout()">✕</button>`;
      }
    }
  }

  openOTPLoginModal() {
    document.getElementById("modal-title").textContent = "📱 Mobile OTP Login — KrishiX Kopargaon";
    document.getElementById("modal-body").innerHTML = `
      <div style="text-align:center;margin-bottom:16px;">
        <div style="font-size:42px;margin-bottom:6px;">🌾</div>
        <p style="color:#64748b;font-size:13px;">Enter your 10-digit mobile number to receive instant SMS OTP.</p>
      </div>

      <div class="form-group" style="margin-bottom:14px;">
        <label>Mobile Number (मोबाईल नंबर)</label>
        <div style="display:flex;gap:8px;">
          <span style="padding:10px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:8px;font-weight:700;color:#334155;">+91</span>
          <input type="tel" id="otp-mobile-input" placeholder="98904 12345" style="flex-grow:1;" maxlength="10">
        </div>
      </div>

      <div id="otp-code-group" class="form-group" style="display:none;margin-bottom:14px;">
        <label>Enter 6-Digit OTP (ओटीपी टाका)</label>
        <input type="text" id="otp-code-input" placeholder="123456" maxlength="6" style="letter-spacing:4px;font-size:18px;font-weight:800;text-align:center;">
        <p style="font-size:11px;color:#16a34a;margin-top:4px;">💡 Demo OTP: <strong>123456</strong></p>
      </div>

      <button id="btn-send-otp" class="btn-primary" style="width:100%;justify-content:center;padding:12px;" onclick="window.krishixApp.sendOTP()">
        📩 Send OTP SMS
      </button>
      <button id="btn-verify-otp" class="btn-primary" style="width:100%;justify-content:center;padding:12px;display:none;background:#16a34a;" onclick="window.krishixApp.verifyOTP()">
        ✅ Verify & Login
      </button>
    `;
    this.openModal();
  }

  async sendOTP() {
    const mobile = document.getElementById("otp-mobile-input")?.value.trim();
    if (!mobile || mobile.length < 10) { alert("Please enter a valid 10-digit mobile number."); return; }
    
    const api = window.KrishiXAPI;
    if (api) {
      const res = await api.Auth.sendOTP(`+91${mobile}`, this.state.currentRole);
      if (res.success) {
        document.getElementById("otp-code-group").style.display = "block";
        document.getElementById("btn-send-otp").style.display = "none";
        document.getElementById("btn-verify-otp").style.display = "flex";
        this.speak("OTP sent to your mobile number. Enter code 1 2 3 4 5 6 to login.");
        return;
      }
    }
    // Demo fallback
    document.getElementById("otp-code-group").style.display = "block";
    document.getElementById("btn-send-otp").style.display = "none";
    document.getElementById("btn-verify-otp").style.display = "flex";
  }

  async verifyOTP() {
    const mobile = document.getElementById("otp-mobile-input")?.value.trim();
    const otp    = document.getElementById("otp-code-input")?.value.trim() || "123456";

    const api = window.KrishiXAPI;
    if (api) {
      const res = await api.Auth.verifyOTP(`+91${mobile}`, otp, `Farmer (${mobile.slice(-4)})`);
      if (res.success) {
        this.closeModal();
        this.checkAuthSession();
        alert(`🎉 Welcome back, ${res.data.user.name}!`);
        this.speak(`Authentication successful! Welcome to KrishiX Kopargaon.`);
        return;
      }
    }

    // Local fallback
    localStorage.setItem("krishix_user", JSON.stringify({ name: `Farmer (${mobile})`, mobile: `+91${mobile}` }));
    this.closeModal();
    this.checkAuthSession();
  }

  logout() {
    const api = window.KrishiXAPI;
    if (api) api.Auth.logout();
    else localStorage.removeItem("krishix_user");
    const btn = document.getElementById("btn-otp-login");
    const badge = document.getElementById("user-badge");
    if (btn) btn.style.display = "inline-flex";
    if (badge) badge.style.display = "none";
    alert("Logged out successfully.");
  }

  /* ── AI CROP HEALTH DOCTOR ──────────────────────────────── */
  async runAIDiagnosis() {
    const crop     = document.getElementById("ai-crop-select")?.value;
    const symptoms = document.getElementById("ai-symptoms-text")?.value.trim();
    const resultBox = document.getElementById("ai-result-box");

    if (resultBox) {
      resultBox.innerHTML = `
        <div style="font-size:36px;animation:spin 1s infinite linear;margin-bottom:12px;">🤖</div>
        <h4 style="color:#7c3aed;margin-bottom:6px;">Analyzing Crop Symptoms...</h4>
        <p style="color:#64748b;font-size:13px;">KrishiX AI is diagnosing disease & searching spraying squads...</p>
      `;
    }

    const api = window.KrishiXAPI;
    let diagData = null;

    if (api) {
      const res = await api.AI.diagnose(crop, symptoms);
      if (res.success) diagData = res.data.diagnosis;
    }

    if (!diagData) {
      diagData = {
        crop: crop || "Sugarcane",
        disease: "Sugarcane Red Rot (लाल सड रोग)",
        symptoms: symptoms || "Leaf yellowing and reddish stalk discoloration.",
        treatment: "Soil drenching with Carbendazim (0.1%), remove affected clumps.",
        recommendedSquad: "Vijay Tambe (Certified Chemical Spraying Specialist - Takli)",
        recommendedMachine: "AgriDron 20L Precision Spray Drone (Godavari Tech Drones)"
      };
    }

    if (resultBox) {
      resultBox.style.display = "block";
      resultBox.style.textAlign = "left";
      resultBox.style.border = "1px solid #7c3aed";
      resultBox.style.background = "#faf5ff";
      resultBox.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span style="background:#7c3aed;color:#fff;padding:4px 10px;border-radius:20px;font-size:12px;font-weight:700;">🤖 AI Diagnosis Complete</span>
          <span style="font-size:12px;color:#6b21a8;font-weight:700;">Target: ${diagData.crop}</span>
        </div>

        <h3 style="color:#581c87;font-size:18px;margin-bottom:8px;">${diagData.disease}</h3>
        <p style="font-size:13px;color:#4c1d95;margin-bottom:12px;"><strong>Symptoms:</strong> ${diagData.symptoms}</p>
        
        <div style="background:#fff;border:1px solid #e9d5ff;border-radius:8px;padding:12px;margin-bottom:14px;">
          <h4 style="font-size:13px;color:#6b21a8;margin-bottom:4px;">🧪 Recommended Treatment:</h4>
          <p style="font-size:13px;color:#334155;">${diagData.treatment}</p>
        </div>

        <h4 style="font-size:13px;color:#581c87;margin-bottom:8px;">🛠️ Matched KrishiX Spraying Units:</h4>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;">
          <div style="background:#fff;padding:10px;border-radius:8px;border:1px solid #e9d5ff;font-size:12px;">
            👥 <strong>Spraying Squad:</strong> ${diagData.recommendedSquad}
          </div>
          <div style="background:#fff;padding:10px;border-radius:8px;border:1px solid #e9d5ff;font-size:12px;">
            🚁 <strong>Spray Drone:</strong> ${diagData.recommendedMachine}
          </div>
        </div>

        <button class="btn-primary" style="width:100%;justify-content:center;background:#7c3aed;" onclick="window.krishixApp.switchTab('team-squad')">
          ⚡ Book Matched Spraying Squad Now
        </button>
      `;
    }

    this.speak(`AI Diagnosis complete for ${diagData.crop}. Identified ${diagData.disease}. Matched spraying squad available.`);
  }

  /* ── TABS ──────────────────────────────────────────────── */
  switchTab(name) {
    this.state.currentTab = name;
    document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
    document.getElementById(`tab-${name}`)?.classList.add("active");
    document.querySelectorAll(".content-view").forEach(v => v.classList.remove("active"));
    document.getElementById(`view-${name}`)?.classList.add("active");
    if (name === "tracking") setTimeout(() => window.krishixTracker?.initMap(), 120);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ══════════════════════════════════════════════════════════
     SECTION 1: INDIVIDUAL LABOUR PROFILES DIRECTORY
     15 profiles, personal info, past experiences, self-registration
  ══════════════════════════════════════════════════════════ */

  getFilteredProfiles() {
    let list = [...LABOUR_PROFILES];
    const q = (this.state.profileSearch || "").toLowerCase().trim();
    const f = this.state.profileSkill;
    if (q) list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.village.toLowerCase().includes(q) ||
      p.skill.toLowerCase().includes(q) ||
      p.role.toLowerCase().includes(q)
    );
    if (f && f !== "ALL") list = list.filter(p => p.skill === f);
    return list;
  }

  renderProfiles() {
    const grid = document.getElementById("profiles-grid");
    if (!grid) return;
    const list = this.getFilteredProfiles();

    const cnt = document.getElementById("profiles-count");
    if (cnt) cnt.textContent = `${list.length} Workers Found`;

    if (list.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px;color:#64748B;"><div style="font-size:40px;margin-bottom:12px;">🔍</div><div style="font-size:18px;font-weight:700;">No worker profiles found</div></div>`;
      return;
    }

    grid.innerHTML = list.map((p, idx) => this.buildProfileCard(p, idx)).join("");
  }

  buildProfileCard(p, idx) {
    const leaderboardRanks = [...LABOUR_PROFILES]
      .sort((a, b) => b.trustScore - a.trustScore || b.rating - a.rating);
    const rank = leaderboardRanks.findIndex(x => x.id === p.id) + 1;

    const rankBadge =
      rank === 1 ? `<span class="pc-rank rank-gold">🏆 Rank #1 Kopargaon</span>` :
      rank === 2 ? `<span class="pc-rank rank-silver">🥈 Rank #2 Kopargaon</span>` :
      rank === 3 ? `<span class="pc-rank rank-bronze">🥉 Rank #3 Kopargaon</span>` :
                   `<span class="pc-rank rank-std">✓ Verified</span>`;

    const availBadge = p.available
      ? `<span class="pc-avail av-yes">🟢 Available</span>`
      : `<span class="pc-avail av-no">🔴 Booked</span>`;

    const stars = this.starsHtml(p.rating);
    const firstReview = p.reviews?.[0] || null;
    const latestExp = p.pastWorkExperience?.[0] || null;

    return `
    <div class="profile-card" onclick="window.krishixApp.openDetail('${p.id}')">
      <div class="pc-img-wrap">
        <img src="${p.photo}" alt="Photo of ${p.name}"
             loading="lazy"
             onerror="this.src='./assets/labour_squad.jpg'; this.onerror=null;">
        ${rankBadge}
        ${availBadge}
        <div class="pc-photo-foot">
          <span class="pc-trust-badge">🛡️ Trust ${p.trustScore}/100</span>
          <span class="pc-stars">${stars}</span>
        </div>
      </div>

      <div class="pc-body">
        <div class="pc-name">${p.name}</div>
        <div class="pc-role">${p.role}</div>

        <div class="pc-info">
          <div class="pc-info-row">📍 <strong>${p.village}</strong></div>
          <div class="pc-info-row">📞 ${p.mobile}</div>
          <div class="pc-info-row">🗓️ Exp: <strong>${p.experience} yrs</strong>&ensp;|&ensp;👥 Max Squad: <strong>${p.workersInSquad}</strong></div>
          <div class="pc-info-row">✅ <strong>${p.jobsCount} jobs</strong>&ensp;|&ensp;⏱️ <strong>${p.punctuality}</strong> on-time</div>
          <div class="pc-info-row" style="color:#16a34a;font-weight:600;">${p.aadhaar}</div>
        </div>

        <div class="pc-skills">
          <span class="skill-tag">${p.skill}</span>
          <span class="skill-tag">${p.experience}+ yrs exp</span>
        </div>

        ${latestExp ? `
        <div style="background:#f0fdf4;border:1px solid #dcfce7;border-radius:6px;padding:8px 10px;font-size:11px;color:#166534;margin-bottom:10px;">
          🎓 <strong>Past Experience:</strong> ${latestExp.title} (${latestExp.year})
        </div>` : ''}

        ${firstReview ? `
        <div class="pc-review">
          "${firstReview.text.slice(0, 75)}${firstReview.text.length > 75 ? "…" : ""}"
          <div class="pc-reviewer" style="margin-top:4px;">— ${firstReview.farmer}</div>
        </div>` : '<div style="flex-grow:1;"></div>'}

        <div class="pc-footer">
          <div>
            <div class="pc-rate">₹${p.dailyRate}</div>
            <div class="pc-rate-sub">per worker / day</div>
          </div>
          <div class="pc-btns">
            <button class="btn-call-sm"
              onclick="event.stopPropagation(); alert('Calling ${p.name}:\\n${p.mobile}');"
              title="Call directly">📞</button>
            <button class="btn-book-sm"
              onclick="event.stopPropagation(); window.krishixApp.openBookingModal('${p.id}');">
              Book Labour
            </button>
          </div>
        </div>
      </div>
    </div>`;
  }

  handleProfileSearch(query) {
    this.state.profileSearch = query;
    this.renderProfiles();
  }

  filterBySkill(skill) {
    this.state.profileSkill = skill;
    document.querySelectorAll(".skill-chip").forEach(b =>
      b.classList.toggle("active", b.dataset.skill === skill)
    );
    this.renderProfiles();
  }

  starsHtml(rating) {
    const full  = Math.floor(rating);
    const half  = rating % 1 >= 0.4 ? 1 : 0;
    const empty = 5 - full - half;
    return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
  }

  /* ══════════════════════════════════════════════════════════
     INDIVIDUAL PROFILE DETAIL POPUP (WITH PAST EXPERIENCES TIMELINE)
  ══════════════════════════════════════════════════════════ */
  openDetail(profileId) {
    const p = LABOUR_PROFILES.find(x => x.id === profileId);
    if (!p) return;
    this._currentProfileId = profileId;

    const overlay = document.getElementById("profile-detail-overlay");
    const card = document.getElementById("profile-detail-card");
    const stars = this.starsHtml(p.rating);

    const pastExpHtml = (p.pastWorkExperience || []).map(e => `
      <div class="exp-item">
        <div class="exp-year">${e.year}</div>
        <div class="exp-title">${e.title}</div>
        <div class="exp-client">Client: ${e.client}</div>
        <div class="exp-detail">${e.detail}</div>
      </div>`).join("");

    const reviewsHtml = p.reviews.map(r => `
      <div class="review-card">
        <div class="rv-top">
          <span class="rv-name">${r.farmer}</span>
          <span class="rv-stars">${this.starsHtml(r.stars)} ${r.stars.toFixed(1)}</span>
        </div>
        <div class="rv-text">${r.text}</div>
      </div>`).join("");

    card.innerHTML = `
      <div class="dc-photo">
        <img src="${p.photo}" alt="Photo of ${p.name}" onerror="this.src='./assets/labour_squad.jpg';this.onerror=null;">
        <button class="dc-close" onclick="window.krishixApp.closeDetail()">✕</button>
        <div class="dc-photo-overlay">
          <div class="dc-name">${p.name}</div>
          <div class="dc-role">${p.role} &nbsp;|&nbsp; 📍 ${p.village}</div>
        </div>
      </div>

      <div class="dc-body">
        <!-- Stats -->
        <div class="dc-stats">
          <div class="dc-stat">
            <span class="dc-stat-val">${p.rating}⭐</span>
            <span class="dc-stat-lbl">Rating</span>
          </div>
          <div class="dc-stat">
            <span class="dc-stat-val">${p.trustScore}/100</span>
            <span class="dc-stat-lbl">Trust Score</span>
          </div>
          <div class="dc-stat">
            <span class="dc-stat-val">${p.jobsCount}</span>
            <span class="dc-stat-lbl">Jobs Completed</span>
          </div>
        </div>

        <!-- Personal Info -->
        <h4 style="font-size:14px;color:#14532d;margin-bottom:10px;font-weight:800;">👤 Personal Information</h4>
        <div class="dc-info-grid" style="margin-bottom:14px;">
          <div class="dc-info-item"><span>Age:</span> <strong>${p.age} years (${p.gender})</strong></div>
          <div class="dc-info-item"><span>Experience:</span> <strong>${p.experience} years</strong></div>
          <div class="dc-info-item"><span>Available Squad:</span> <strong>Up to ${p.workersInSquad} workers</strong></div>
          <div class="dc-info-item"><span>Punctuality Rate:</span> <strong>${p.punctuality}</strong></div>
          <div class="dc-info-item"><span>Mobile:</span> <strong>${p.mobile}</strong></div>
          <div class="dc-info-item"><span>WhatsApp:</span> <strong>${p.whatsapp}</strong></div>
          <div class="dc-info-item dc-info-grid" style="grid-column:1/-1;"><span>Identity Status:</span> <strong style="color:#16a34a;">${p.aadhaar}</strong></div>
        </div>

        <!-- Bio -->
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;font-size:13px;color:#475569;margin-bottom:16px;line-height:1.65;">
          <strong style="color:#0f172a;">About ${p.name}:</strong> ${p.bio}
        </div>

        <!-- Past Work Experience Timeline -->
        <h4 style="font-size:14px;color:#14532d;margin-bottom:10px;font-weight:800;">📜 Past Work Experience & Track Record</h4>
        <div class="exp-timeline">
          ${pastExpHtml || '<div style="font-size:12px;color:#64748b;">No past work history recorded yet.</div>'}
        </div>

        <!-- Trust Score Bar -->
        <div class="trust-bar-wrap">
          <div class="trust-bar-top">
            <span style="font-size:13px;font-weight:800;color:#14532d;">🛡️ KrishiX Trust Score</span>
            <span style="font-size:18px;font-weight:900;color:#16a34a;">${p.trustScore} / 100</span>
          </div>
          <div class="trust-bar-bg">
            <div class="trust-bar-fill" style="width:${p.trustScore}%;transition:width .6s ease;"></div>
          </div>
          <div class="trust-pillars">
            <span>Aadhaar Verified ✓</span><span>Job Record ✓</span><span>Punctuality ✓</span><span>Farmer Ratings ✓</span>
          </div>
        </div>

        <!-- Farmer Reviews -->
        <div class="reviews-section">
          <h4>💬 Farmer Reviews (${p.reviews.length})</h4>
          ${reviewsHtml}

          <button class="btn-add-review" onclick="window.krishixApp.openAddReview('${p.id}')">
            + Add Your Review for ${p.name.split(" ")[0]}
          </button>
        </div>

        <!-- Booking Bar inside detail -->
        <div class="dc-book-bar">
          <div>
            <div class="dc-rate-big">₹${p.dailyRate}
              <span style="font-size:14px;color:#64748b;font-weight:400;">/ worker / day</span>
            </div>
            <div class="dc-rate-sub">Book exact number of workers (1 to ${p.workersInSquad})</div>
          </div>
          <div class="dc-btns">
            <button class="btn-outline" onclick="alert('Calling ${p.name}:\\n${p.mobile}')">📞 Call</button>
            <button class="btn-green" onclick="window.krishixApp.closeDetail(); window.krishixApp.openBookingModal('${p.id}');">⚡ Book Workers</button>
          </div>
        </div>
      </div>
    `;

    overlay.classList.add("open");
    this.speak(`${p.name}. Trust Score ${p.trustScore} out of 100. ${p.experience} years experience in Kopargaon.`);
  }

  closeDetail() {
    document.getElementById("profile-detail-overlay")?.classList.remove("open");
  }

  /* ══════════════════════════════════════════════════════════
     SECTION 2: DEDICATED TEAM / SQUAD LABOUR BOOKING
     Book whole group/team of workers for sugarcane, onion, grain
  ══════════════════════════════════════════════════════════ */

  renderTeamSquads() {
    const grid = document.getElementById("team-squad-grid");
    if (!grid) return;
    grid.innerHTML = TEAM_SQUAD_BOOKINGS.map(ts => `
      <div class="squad-card">
        <div class="squad-img-wrap">
          <img src="${ts.photo}" alt="${ts.squadName}" onerror="this.src='./assets/labour_squad.jpg';">
          <span class="squad-badge-mcount">👥 ${ts.totalMembers} Workers Gang</span>
          <span class="squad-trust-badge">🛡️ Trust ${ts.trustScore}/100</span>
        </div>
        <div class="squad-body">
          <div class="squad-title">${ts.squadName}</div>
          <div class="squad-leader">👨‍🌾 ${ts.leader} &nbsp;|&nbsp; 📍 ${ts.village}</div>

          <div class="squad-perks">
            <div class="squad-perk-item">⚡ Capacity: <strong>${ts.capacityAcresPerDay}</strong></div>
            <div class="squad-perk-item">🛠️ Tools: <strong>${ts.toolsIncluded}</strong></div>
            <div class="squad-perk-item">🚐 Transport: <strong>${ts.transportIncluded}</strong></div>
            <div class="squad-perk-item" style="color:#16a34a;font-weight:700;">${ts.aadhaarStatus}</div>
          </div>

          <div class="squad-desc">${ts.description}</div>

          <div class="squad-footer">
            <div>
              <div class="squad-price">₹${ts.ratePerDay.toLocaleString("en-IN")}</div>
              <div class="squad-price-sub">per day for whole team (${ts.totalMembers} workers) • ₹${ts.perHeadRate}/head</div>
            </div>
            <button class="btn-book-team" onclick="window.krishixApp.openTeamSquadBookingModal('${ts.id}')">
              👨‍👩‍👧‍👦 Book Squad
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  openTeamSquadBookingModal(squadId) {
    const ts = TEAM_SQUAD_BOOKINGS.find(x => x.id === squadId);
    if (!ts) return;

    document.getElementById("modal-title").textContent = `Book Whole Squad: ${ts.squadName}`;
    document.getElementById("modal-body").innerHTML = `
      <div style="background:#f0fdf4;border:1px solid #dcfce7;border-radius:10px;padding:14px;margin-bottom:16px;">
        <div style="font-size:17px;font-weight:800;color:#14532d;margin-bottom:2px;">${ts.squadName}</div>
        <div style="font-size:12px;color:#64748b;">Leader: ${ts.leader} • 📍 ${ts.village}</div>
        <div style="font-size:12px;color:#16a34a;font-weight:700;margin-top:4px;">👥 Full Team of ${ts.totalMembers} Experienced Workers</div>
      </div>

      <div class="form-row" style="margin-bottom:16px;">
        <div class="form-group">
          <label>📅 Work Start Date *</label>
          <input type="date" id="tsb-date" value="${new Date(Date.now()+86400000).toISOString().split("T")[0]}">
        </div>
        <div class="form-group">
          <label>📆 Number of Days Needed *</label>
          <input type="number" id="tsb-days" value="1" min="1" max="15" oninput="window.krishixApp.updateTeamSquadTotal('${ts.id}')">
        </div>
        <div class="form-group fg-full">
          <label>📍 Farm Location / Village Address</label>
          <input type="text" id="tsb-location" value="Kolpewadi Sugarcane Farm Field #2, Kopargaon">
        </div>
        <div class="form-group fg-full">
          <label>🌾 Specific Work Details</label>
          <textarea id="tsb-notes" rows="2" placeholder="e.g. 3 acres of sugarcane cutting & direct trolley loading to sugar factory..."></textarea>
        </div>
      </div>

      <div style="background:#14532d;color:#fff;padding:16px;border-radius:10px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;">Total Squad Rate</div>
          <div id="tsb-total-amount" style="font-size:28px;font-weight:900;color:#4ade80;">
            ₹${ts.ratePerDay.toLocaleString("en-IN")}
          </div>
        </div>
        <div style="font-size:12px;color:#cbd5e1;">Includes all ${ts.totalMembers} workers + tools</div>
      </div>

      <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;" onclick="window.krishixApp.confirmTeamSquadBooking('${ts.id}')">
        ✅ Confirm Team Squad Booking
      </button>
    `;
    this.openModal();
  }

  updateTeamSquadTotal(squadId) {
    const ts = TEAM_SQUAD_BOOKINGS.find(x => x.id === squadId);
    if (!ts) return;
    const days = parseInt(document.getElementById("tsb-days")?.value) || 1;
    const total = ts.ratePerDay * days;
    const el = document.getElementById("tsb-total-amount");
    if (el) el.textContent = `₹${total.toLocaleString("en-IN")}`;
  }

  confirmTeamSquadBooking(squadId) {
    const ts = TEAM_SQUAD_BOOKINGS.find(x => x.id === squadId);
    if (!ts) return;
    const days = parseInt(document.getElementById("tsb-days")?.value) || 1;
    const date = document.getElementById("tsb-date")?.value || "Tomorrow";
    const loc  = document.getElementById("tsb-location")?.value || "Kopargaon Farm";
    const total = ts.ratePerDay * days;

    this.state.scheduledJobs.unshift({
      id: `TEAM-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "Team Labour Squad",
      title: ts.squadName,
      date,
      duration: `${days} Day${days > 1 ? "s" : ""}`,
      status: "CONFIRMED",
      amount: total,
      paymentMethod: "UPI Paid",
      location: loc
    });

    this.renderSchedule();
    this.closeModal();

    alert(`🎉 Success! ${ts.squadName} (${ts.totalMembers} workers) booked for ${date}.\nTotal: ₹${total.toLocaleString("en-IN")}`);
    this.speak(`Team squad booking confirmed! ${ts.squadName} with ${ts.totalMembers} workers is booked.`);
  }

  /* ══════════════════════════════════════════════════════════
     SECTION 3: INTERACTIVE FINE & PROTECTION HUB
     Apply fine claim directly on worker/farmer + Live status
  ══════════════════════════════════════════════════════════ */

  renderFineHub() {
    // 1. Render Fine Rules
    const rbox = document.getElementById("fine-rules-list");
    if (rbox) {
      rbox.innerHTML = FINE_RULES.map(r => `
        <div class="fine-card">
          <div class="fine-icon">${r.icon}</div>
          <span class="fine-for">Applies to: ${r.appliesTo}</span>
          <div class="fine-title">${r.category}</div>
          <div style="font-size:11px;color:#78350f;font-weight:700;margin-bottom:4px;">(${r.categoryMr})</div>
          <div class="fine-amt">${r.penaltyRange}</div>
          <p class="fine-desc">${r.description}</p>
        </div>`).join("");
    }

    // 2. Render Active Fine Claims
    const abox = document.getElementById("active-fines-list");
    if (abox) {
      abox.innerHTML = ACTIVE_FINES.map(f => `
        <div class="afine-row">
          <div>
            <div class="afine-id">${f.claimId} • Filed ${f.date}</div>
            <div class="afine-title">${f.reason}</div>
            <div class="afine-by">By: <strong>${f.filedBy}</strong> &nbsp;|&nbsp; Against: <strong>${f.againstTarget}</strong></div>
          </div>
          <div style="text-align:right;">
            <div class="afine-amt">₹${f.amount}</div>
            <span class="afine-status" style="background:#dcfce7;color:${f.statusColor};">${f.status}</span>
          </div>
        </div>`).join("");
    }
  }

  openFileFineModal() {
    document.getElementById("modal-title").textContent = "⚖️ Apply / File a Fine Claim on KrishiX";
    document.getElementById("modal-body").innerHTML = `
      <p style="font-size:13px;color:#64748b;margin-bottom:16px;">
        File a fine claim for late arrival, worker no-show, crop damage, or machinery breakage. KrishiX Escrow reviews claims within 24 hours.
      </p>

      <div class="form-row" style="margin-bottom:14px;">
        <div class="form-group">
          <label>Claim Category (दंड प्रकार)</label>
          <select id="fc-category">
            <option value="Labour Late Arrival (>2 Hours)">🕒 Labour Late Arrival (>2 Hours)</option>
            <option value="Labour Squad No-Show">❌ Labour Squad No-Show (Absence)</option>
            <option value="Machinery Misuse / Damage">⚙️ Machinery Misuse / Damage</option>
            <option value="Crop Damage during Spraying">🌾 Crop Damage by Workers</option>
            <option value="Last-Minute Booking Cancellation">🚫 Booking Cancellation (<12 hrs)</option>
          </select>
        </div>

        <div class="form-group">
          <label>Claim Amount ₹ (भरपाई रक्कम)</label>
          <input type="number" id="fc-amount" value="500" min="100" max="5000">
        </div>

        <div class="form-group">
          <label>Filed By (तुमचे नाव)</label>
          <input type="text" id="fc-by" placeholder="e.g. Rameshwar Patil (Farmer)">
        </div>

        <div class="form-group">
          <label>Against Worker / Machine Owner</label>
          <input type="text" id="fc-against" placeholder="e.g. Santosh Thorat / Tractor Owner">
        </div>

        <div class="form-group fg-full">
          <label>Incident Details (घडलेली घटना व वेळ)</label>
          <textarea id="fc-details" rows="3" placeholder="Explain what happened, date, time, and field location..."></textarea>
        </div>
      </div>

      <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;" onclick="window.krishixApp.submitFineClaim()">
        ⚖️ Submit Fine Claim to KrishiX Escrow
      </button>
    `;
    this.openModal();
  }

  async submitFineClaim() {
    const category = document.getElementById("fc-category")?.value;
    const amount   = parseInt(document.getElementById("fc-amount")?.value) || 500;
    const by       = document.getElementById("fc-by")?.value.trim();
    const against  = document.getElementById("fc-against")?.value.trim();
    const details  = document.getElementById("fc-details")?.value.trim();

    if (!by)      { alert("Please enter your name."); return; }
    if (!against) { alert("Please enter who you are filing fine against."); return; }

    const claimData = {
      category, filedBy: by, againstTarget: against,
      reason: category, amount,
      details: details || "Claim submitted to KrishiX Kopargaon Field Officer."
    };

    // Try backend API first
    const api = window.KrishiXAPI;
    if (api) {
      const result = await api.Fines.file(claimData);
      if (result.success) {
        ACTIVE_FINES.unshift(result.data.fine);
        this.renderFineHub();
        this.closeModal();
        alert(`⚖️ Fine Claim ${result.data.claimId} submitted!\nKrishiX Escrow Officer will review and release ₹${amount} compensation.`);
        this.speak(`Fine claim submitted successfully. KrishiX Escrow will review your claim for ${amount} rupees.`);
        return;
      }
    }

    // Fallback to local state
    const newClaim = {
      claimId: `CLM-KPG-${Math.floor(100 + Math.random() * 900)}`,
      filedBy: by, againstTarget: against, reason: category, amount,
      status: "PENDING", statusColor: "#f59e0b",
      date: new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }),
      details: details || "Claim submitted to KrishiX Kopargaon Field Officer."
    };
    ACTIVE_FINES.unshift(newClaim);
    this.renderFineHub();
    this.closeModal();
    alert(`⚖️ Fine Claim ${newClaim.claimId} submitted!\nKrishiX Escrow Officer will review and release ₹${amount} compensation.`);
    this.speak(`Fine claim submitted successfully. KrishiX Escrow will review your claim for ${amount} rupees.`);
  }

  /* ══════════════════════════════════════════════════════════
     FARMER CAN ADD REVIEW
  ══════════════════════════════════════════════════════════ */
  openAddReview(profileId) {
    const p = LABOUR_PROFILES.find(x => x.id === profileId);
    if (!p) return;

    document.getElementById("modal-title").textContent = `⭐ Rate ${p.name}`;
    document.getElementById("modal-body").innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;padding:14px;background:#f0fdf4;border-radius:10px;border:1px solid #dcfce7;">
        <img src="${p.photo}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid #16a34a;" onerror="this.src='./assets/labour_squad.jpg';">
        <div>
          <div style="font-size:16px;font-weight:800;color:#14532d;">${p.name}</div>
          <div style="font-size:12px;color:#64748b;">${p.role} • ${p.village}</div>
          <div style="font-size:12px;color:#d97706;font-weight:700;">Current Rating: ${p.rating}⭐ (${p.reviews.length} reviews)</div>
        </div>
      </div>

      <div class="form-row" style="margin-bottom:14px;">
        <div class="form-group">
          <label>Your Name (शेतकऱ्याचे नाव)</label>
          <input type="text" id="rv-farmer" placeholder="e.g. Rameshwar Patil, Kolpewadi">
        </div>
        <div class="form-group">
          <label>Rating out of 5 (रेटिंग 1–5)</label>
          <select id="rv-stars">
            <option value="5">⭐⭐⭐⭐⭐ — 5.0 Excellent</option>
            <option value="4.5">⭐⭐⭐⭐½ — 4.5 Very Good</option>
            <option value="4">⭐⭐⭐⭐ — 4.0 Good</option>
            <option value="3.5">⭐⭐⭐½ — 3.5 Average</option>
            <option value="3">⭐⭐⭐ — 3.0 Below Average</option>
          </select>
        </div>
        <div class="form-group fg-full">
          <label>Your Review (तुमचे मत / शेत काम कसे झाले?)</label>
          <textarea id="rv-text" rows="4"
            placeholder="Describe how the worker performed on your farm — arrival time, work quality, attitude..."></textarea>
        </div>
      </div>

      <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;"
        onclick="window.krishixApp.submitReview('${p.id}')">
        ✅ Submit Review
      </button>
    `;
    this.openModal();
  }

  async submitReview(profileId) {
    const p = LABOUR_PROFILES.find(x => x.id === profileId);
    if (!p) return;
    const farmer = document.getElementById("rv-farmer")?.value.trim();
    const stars  = parseFloat(document.getElementById("rv-stars")?.value || "5");
    const text   = document.getElementById("rv-text")?.value.trim();

    if (!farmer) { alert("Please enter your name."); return; }
    if (!text)   { alert("Please write a review."); return; }

    // Try backend API first
    const api = window.KrishiXAPI;
    if (api) {
      const result = await api.Reviews.addReview ? await api.Workers.addReview(profileId, { farmer, stars, text })
                                                  : await api.Workers.addReview(profileId, { farmer, stars, text });
      if (result.success) {
        // Update local profile with new rating from server
        p.reviews.unshift({ farmer, stars, text });
        p.rating = result.data.newRating || parseFloat((p.reviews.reduce((s, r) => s + r.stars, 0) / p.reviews.length).toFixed(1));
        p.jobsCount += 1;
        if (p.rating >= 4.8 && p.trustScore < 99) p.trustScore = Math.min(99, p.trustScore + 1);
        this.closeModal();
        this.renderProfiles();
        this.renderLeaderboard();
        setTimeout(() => this.openDetail(profileId), 200);
        this.speak(`Review submitted! Thank you for rating ${p.name.split(" ")[0]}.`);
        return;
      }
    }

    // Fallback to local state
    p.reviews.unshift({ farmer, stars, text });
    p.rating = parseFloat((p.reviews.reduce((s, r) => s + r.stars, 0) / p.reviews.length).toFixed(1));
    p.jobsCount += 1;
    if (p.rating >= 4.8 && p.trustScore < 99) p.trustScore = Math.min(99, p.trustScore + 1);
    this.closeModal();
    this.renderProfiles();
    this.renderLeaderboard();
    setTimeout(() => this.openDetail(profileId), 200);
    this.speak(`Review submitted! Thank you for rating ${p.name.split(" ")[0]}.`);
  }

  /* ══════════════════════════════════════════════════════════
     WORKER SELF-REGISTRATION
  ══════════════════════════════════════════════════════════ */
  openRegisterModal() {
    document.getElementById("modal-title").textContent = "➕ Register My Labour Profile on KrishiX";
    document.getElementById("modal-body").innerHTML = `
      <p style="font-size:13px;color:#64748b;margin-bottom:18px;line-height:1.6;">
        Fill your details below. Your profile will appear on KrishiX Kopargaon directory immediately — farmers can find and book you.
      </p>

      <div class="form-row">
        <div class="form-group">
          <label>Full Name (पूर्ण नाव) *</label>
          <input type="text" id="rg-name" placeholder="e.g. Babanrao Shinde">
        </div>
        <div class="form-group">
          <label>Mobile Number (मोबाईल) *</label>
          <input type="tel" id="rg-mobile" placeholder="+91 98XXX XXXXX">
        </div>
        <div class="form-group">
          <label>Age (वय)</label>
          <input type="number" id="rg-age" placeholder="e.g. 35" min="18" max="70">
        </div>
        <div class="form-group">
          <label>Gender (लिंग)</label>
          <select id="rg-gender">
            <option value="Male">Male (पुरुष)</option>
            <option value="Female">Female (महिला)</option>
          </select>
        </div>
        <div class="form-group fg-full">
          <label>Village / Area in Kopargaon (गाव) *</label>
          <input type="text" id="rg-village" placeholder="e.g. Kolpewadi, Kopargaon">
        </div>
        <div class="form-group">
          <label>Primary Skill (मुख्य काम) *</label>
          <select id="rg-skill">
            <option value="Sugarcane Cutting & Loading">🌾 Sugarcane Cutting (ऊस तोडणी)</option>
            <option value="Onion Digging & Bagging">🧅 Onion Harvesting (कांदा काढणी)</option>
            <option value="Spraying & Pruning">🧪 Crop Spraying (फवारणी)</option>
            <option value="Wheat Harvesting">🌾 Wheat Harvesting (गहू कापणी)</option>
            <option value="Cotton Picking">🪥 Cotton Picking (कापूस वेचणी)</option>
            <option value="Tractor Driver">🚜 Tractor Driver</option>
          </select>
        </div>
        <div class="form-group">
          <label>Workers in Your Squad *</label>
          <input type="number" id="rg-squad" placeholder="e.g. 8" min="1" max="50">
        </div>
        <div class="form-group">
          <label>Daily Rate ₹ per Worker *</label>
          <input type="number" id="rg-rate" placeholder="e.g. 450" min="200" max="1000">
        </div>
        <div class="form-group">
          <label>Years of Experience</label>
          <input type="number" id="rg-exp" placeholder="e.g. 8" min="0" max="40">
        </div>
        <div class="form-group">
          <label>Aadhaar Verification</label>
          <select id="rg-aadhaar">
            <option value="✓ Aadhaar Verified">✓ I have Aadhaar Card</option>
            <option value="⏳ Pending Verification">Pending Verification</option>
          </select>
        </div>
        <div class="form-group fg-full">
          <label>About Your Work & Past Experience</label>
          <textarea id="rg-bio" rows="3"
            placeholder="Briefly describe your past farming experience and work record..."></textarea>
        </div>
      </div>

      <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;margin-top:16px;"
        onclick="window.krishixApp.submitRegistration()">
        ✅ Submit Profile for KrishiX Verification
      </button>
    `;
    this.openModal();
    this.speak("Register your farm labour profile. Fill your name, mobile, village, skill, and squad size to get listed on KrishiX Kopargaon directory.");
  }

  async submitRegistration() {
    const name   = document.getElementById("rg-name")?.value.trim();
    const mobile = document.getElementById("rg-mobile")?.value.trim();
    const age    = parseInt(document.getElementById("rg-age")?.value) || 30;
    const gender = document.getElementById("rg-gender")?.value;
    const village= document.getElementById("rg-village")?.value.trim();
    const skill  = document.getElementById("rg-skill")?.value;
    const squad  = parseInt(document.getElementById("rg-squad")?.value) || 5;
    const rate   = parseInt(document.getElementById("rg-rate")?.value) || 400;
    const exp    = parseInt(document.getElementById("rg-exp")?.value) || 2;
    const aadhaar= document.getElementById("rg-aadhaar")?.value;
    const bio    = document.getElementById("rg-bio")?.value.trim() || `Verified agricultural worker from ${village} specialising in ${skill}.`;

    if (!name)   { alert("Please enter your full name."); return; }
    if (!mobile) { alert("Please enter your mobile number."); return; }
    if (!village){ alert("Please enter your village."); return; }
    if (!squad || squad < 1) { alert("Please enter squad size."); return; }
    if (!rate  || rate < 100){ alert("Please enter daily rate per worker."); return; }

    const newProfile = {
      name, age, gender,
      role: `${skill} Worker (${squad} in team)`,
      village: village.toLowerCase().includes("kopargaon") ? village : `${village}, Kopargaon`,
      mobile, whatsapp: mobile, experience: exp,
      dailyRate: rate, workersInSquad: squad,
      skill, bio, aadhaar, available: true,
      photo: "./assets/labour_squad.jpg",
      rating: 5.0, trustScore: 95, jobsCount: 0, punctuality: "100%",
      pastWorkExperience: [
        { year: "2026", title: "Registered KrishiX Worker Profile", client: `${village} Agro Hub`, detail: `Newly registered verified profile for ${skill}.` }
      ],
      reviews: [{
        farmer: "KrishiX Kopargaon Agro Officer", stars: 5,
        text: `New verified profile registered on KrishiX platform. ${name} from ${village}. Welcome!`
      }]
    };

    // Try backend API first
    const api = window.KrishiXAPI;
    if (api) {
      const result = await api.Workers.register(newProfile);
      if (result.success) {
        newProfile.id = result.data.worker.id;
        LABOUR_PROFILES.unshift({ ...newProfile, id: result.data.worker.id });
        this.closeModal();
        this.renderProfiles();
        this.renderLeaderboard();
        this._showRegistrationSuccess(newProfile.id, name, rate, squad);
        this.speak(`Registration successful! Welcome ${name.split(" ")[0]} to KrishiX Kopargaon.`);
        return;
      }
    }

    // Fallback to local state
    const newId = `W${String(LABOUR_PROFILES.length + 1).padStart(2, "0")}`;
    newProfile.id = newId;
    LABOUR_PROFILES.unshift(newProfile);
    this.closeModal();
    this.renderProfiles();
    this.renderLeaderboard();

    setTimeout(() => {
      document.getElementById("modal-title").textContent = "🎉 Profile Registered!";
      document.getElementById("modal-body").innerHTML = `
        <div style="text-align:center;padding:16px 0;">
          <div style="font-size:72px;margin-bottom:12px;">✅</div>
          <h2 style="color:#14532d;margin-bottom:8px;">Welcome to KrishiX, ${name}!</h2>
          <p style="color:#64748b;margin-bottom:20px;">Your profile is now <strong>live</strong> on the Kopargaon Labour Directory. Farmers can see and book you right away.</p>
          <div style="background:#f0fdf4;border:1px solid #16a34a;border-radius:10px;padding:16px;margin-bottom:20px;text-align:left;font-size:13px;display:flex;flex-direction:column;gap:6px;">
            <div><strong>Worker ID:</strong> ${newId}</div>
            <div><strong>Starting Trust Score:</strong> 95/100 (grows with each booking)</div>
            <div><strong>Daily Rate:</strong> ₹${rate} per worker / day</div>
            <div><strong>Squad Size:</strong> ${squad} workers</div>
          </div>
          <button class="btn-primary" style="width:100%;justify-content:center;"
            onclick="window.krishixApp.closeModal();">
            View My Profile in Directory
          </button>
        </div>
      `;
      this.openModal();
    }, 300);

    this.speak(`Registration successful! ${name} is now live on Kopargaon Labour Directory with trust score 95 out of 100.`);
  }

  /* ══════════════════════════════════════════════════════════
     INDIVIDUAL WORKER BOOKING MODAL — pick exact worker count
  ══════════════════════════════════════════════════════════ */
  openBookingModal(profileId) {
    const p = LABOUR_PROFILES.find(x => x.id === profileId);
    if (!p) return;
    this._bookingProfile = p;

    document.getElementById("modal-title").textContent = `Book Individual Workers: ${p.name}`;
    document.getElementById("modal-body").innerHTML = `
      <div style="display:flex;gap:12px;align-items:center;padding:14px;background:#f0fdf4;border-radius:10px;border:1px solid #dcfce7;margin-bottom:18px;">
        <img src="${p.photo}" style="width:54px;height:54px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid #16a34a;flex-shrink:0;"
             onerror="this.src='./assets/labour_squad.jpg';">
        <div>
          <div style="font-size:17px;font-weight:800;color:#14532d;">${p.name}</div>
          <div style="font-size:12px;color:#64748b;">${p.village} &nbsp;|&nbsp; 📞 ${p.mobile}</div>
          <div style="font-size:12px;color:#d97706;font-weight:700;">🛡️ Trust ${p.trustScore}/100 &nbsp;|&nbsp; ⭐ ${p.rating}/5 (${p.reviews.length} reviews)</div>
        </div>
      </div>

      <div class="form-row" style="margin-bottom:16px;">
        <div class="form-group">
          <label>📅 Work Date *</label>
          <input type="date" id="bk-date" value="${new Date(Date.now()+86400000).toISOString().split("T")[0]}">
        </div>
        <div class="form-group">
          <label>⏰ Start Time</label>
          <input type="time" id="bk-time" value="07:00">
        </div>

        <div class="form-group">
          <label>👥 Number of Workers Needed</label>
          <input type="number" id="bk-workers" value="2" min="1" max="${p.workersInSquad}"
                 oninput="window.krishixApp.updateBookingTotal()">
          <span style="font-size:11px;color:#94a3b8;">Select 1 to ${p.workersInSquad} workers</span>
        </div>
        <div class="form-group">
          <label>📆 Number of Days</label>
          <input type="number" id="bk-days" value="1" min="1" max="30"
                 oninput="window.krishixApp.updateBookingTotal()">
        </div>

        <div class="form-group fg-full">
          <label>📍 Your Farm Field Address</label>
          <input type="text" id="bk-location" value="Kolpewadi Sugarcane Field, Kopargaon">
        </div>

        <div class="form-group fg-full">
          <label>💳 Payment Method</label>
          <select id="bk-payment">
            <option value="UPI">UPI — GPay / PhonePe / Paytm</option>
            <option value="WALLET">KrishiX Wallet (₹${this.state.walletBalance})</option>
            <option value="COD">Cash on Arrival (Pay After Work)</option>
          </select>
        </div>
      </div>

      <div id="bk-total-box" style="background:#14532d;color:#fff;border-radius:10px;padding:16px 18px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Total Estimated Cost</div>
          <div id="bk-total-amount" style="font-size:30px;font-weight:900;color:#4ade80;">
            ₹${(p.dailyRate * 2).toLocaleString("en-IN")}
          </div>
        </div>
        <button class="btn-voice" onclick="window.krishixApp.speak('Total cost is ${p.dailyRate * 2} rupees.')">
          🔊 Read
        </button>
      </div>

      <div class="guar-box">
        🛡️ <strong>100% Attendance Guarantee:</strong> If ${p.name.split(" ")[0]} is late >2 hours or no-show, receive <strong>₹500 – ₹1,000 direct escrow compensation</strong>.
      </div>

      <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;font-size:15px;"
        onclick="window.krishixApp.confirmBooking()">
        ✅ Confirm Booking
      </button>
    `;

    this.openModal();
    this.speak(`Booking ${p.name} from ${p.village}. Select the exact number of workers you need.`);
  }

  updateBookingTotal() {
    const p = this._bookingProfile;
    if (!p) return;
    const workers = parseInt(document.getElementById("bk-workers")?.value) || 1;
    const days    = parseInt(document.getElementById("bk-days")?.value) || 1;
    const total   = p.dailyRate * workers * days;
    const el = document.getElementById("bk-total-amount");
    if (el) el.textContent = `₹${total.toLocaleString("en-IN")}`;
  }

  confirmBooking() {
    const p = this._bookingProfile;
    if (!p) return;
    const workers  = parseInt(document.getElementById("bk-workers")?.value) || 2;
    const days     = parseInt(document.getElementById("bk-days")?.value) || 1;
    const date     = document.getElementById("bk-date")?.value || "Tomorrow";
    const time     = document.getElementById("bk-time")?.value || "07:00";
    const location = document.getElementById("bk-location")?.value || "Kopargaon Farm";
    const payment  = document.getElementById("bk-payment")?.value || "UPI";
    const total    = p.dailyRate * workers * days;

    this.state.scheduledJobs.unshift({
      id: `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "Individual Labour",
      title: `${p.name} (${workers} Workers)`,
      date: `${date} at ${time}`,
      duration: `${days} Day${days > 1 ? "s" : ""}`,
      status: "CONFIRMED",
      amount: total,
      paymentMethod: `${payment} Paid`,
      location
    });
    this.renderSchedule();
    this.closeModal();

    setTimeout(() => {
      document.getElementById("modal-title").textContent = "🎉 Booking Confirmed!";
      document.getElementById("modal-body").innerHTML = `
        <div style="text-align:center;padding:12px 0;">
          <div style="font-size:72px;margin-bottom:10px;">✅</div>
          <h2 style="color:#14532d;margin-bottom:8px;">${p.name} is Booked!</h2>
          <p style="color:#64748b;margin-bottom:18px;">
            <strong>${workers} workers</strong> from ${p.village} will arrive at <strong>${time}</strong> on <strong>${date}</strong>.
          </p>
          <div style="background:#f0fdf4;border:1px solid #16a34a;border-radius:10px;padding:16px;margin-bottom:18px;text-align:left;font-size:13px;display:flex;flex-direction:column;gap:6px;">
            <div><strong>Total Paid:</strong> ₹${total.toLocaleString("en-IN")}</div>
            <div><strong>Workers Booked:</strong> ${workers} workers</div>
            <div><strong>📞 Direct Contact:</strong> ${p.mobile}</div>
            <div><strong>🛡️ Escrow Protection Active</strong></div>
          </div>
          <div style="display:flex;gap:10px;">
            <button class="btn-primary" style="flex:1;justify-content:center;"
              onclick="window.krishixApp.closeModal(); window.krishixApp.switchTab('tracking');">
              📍 Track Live Arrival
            </button>
            <button class="btn-outline" style="color:#14532d;" onclick="window.krishixApp.closeModal();">Done</button>
          </div>
        </div>
      `;
      this.openModal();
    }, 350);

    this.speak(`Booking confirmed! ${p.name} with ${workers} workers is booked.`);
  }

  /* ══════════════════════════════════════════════════════════
     LEADERBOARD
  ══════════════════════════════════════════════════════════ */
  renderLeaderboard() {
    const sorted = [...LABOUR_PROFILES].sort((a, b) =>
      b.trustScore - a.trustScore || b.rating - a.rating || b.jobsCount - a.jobsCount
    );

    const podium = document.getElementById("leaderboard-podium");
    if (podium) {
      const crowns = ["🥇", "🥈", "🥉"];
      podium.innerHTML = sorted.slice(0, 3).map((p, i) => `
        <div class="podium-card" onclick="window.krishixApp.openDetail('${p.id}')">
          <img class="podium-photo" src="${p.photo}" alt="${p.name}"
               onerror="this.src='./assets/labour_squad.jpg';this.onerror=null;">
          <div class="podium-crown">${crowns[i]}</div>
          <div class="podium-rank">#${i + 1} in Kopargaon</div>
          <div class="podium-name">${p.name}</div>
          <div class="podium-loc">📍 ${p.village.split(",")[0]}</div>
          <div class="podium-score">${p.trustScore}/100</div>
          <div class="podium-slbl">Trust Score</div>
          <div style="font-size:11px;color:#64748b;margin-top:6px;">${p.jobsCount} jobs • ${p.punctuality} punctual</div>
          <button class="btn-green" style="margin-top:14px;padding:7px 18px;font-size:12px;"
            onclick="event.stopPropagation(); window.krishixApp.openBookingModal('${p.id}');">
            Book Now
          </button>
        </div>`).join("");
    }

    const list = document.getElementById("leaderboard-list");
    if (list) {
      list.innerHTML = sorted.slice(3).map((p, i) => {
        const rank = i + 4;
        const numCls = rank === 4 ? "gold" : rank === 5 ? "silver" : rank === 6 ? "bronze" : "";
        return `
        <div class="lb-row" onclick="window.krishixApp.openDetail('${p.id}')">
          <div class="lb-num ${numCls}">${rank}</div>
          <img class="lb-avatar" src="${p.photo}" alt="${p.name}"
               onerror="this.src='./assets/labour_squad.jpg';this.onerror=null;">
          <div class="lb-info">
            <div class="lb-name">${p.name}</div>
            <div class="lb-skill">📍 ${p.village.split(",")[0]} &nbsp;|&nbsp; ${p.skill}</div>
          </div>
          <div class="lb-stats">
            <div class="lb-stat">
              <span class="lb-sv">${p.rating}⭐</span>
              <span class="lb-sl">Rating</span>
            </div>
            <div class="lb-stat">
              <span class="lb-sv">${p.jobsCount}</span>
              <span class="lb-sl">Jobs</span>
            </div>
          </div>
          <div class="lb-bar-wrap">
            <div class="lb-bar-lbl">Trust: ${p.trustScore}/100</div>
            <div class="lb-bar-bg">
              <div class="lb-bar-fill" style="width:${p.trustScore}%"></div>
            </div>
          </div>
          <button class="btn-green" style="font-size:12px;padding:7px 14px;"
            onclick="event.stopPropagation(); window.krishixApp.openBookingModal('${p.id}');">
            Book
          </button>
        </div>`;
      }).join("");
    }
  }

  /* ══════════════════════════════════════════════════════════
     MACHINERY
  ══════════════════════════════════════════════════════════ */
  renderMachinery() {
    const grid = document.getElementById("machinery-grid");
    if (!grid) return;
    grid.innerHTML = MACHINERY_DATA.map(m => `
      <div class="mach-card">
        <div class="mach-img-wrap">
          <img src="${m.image}" alt="${m.name}" loading="lazy">
          <span class="mach-badge-top">${m.hp}</span>
          <span style="position:absolute;bottom:12px;left:12px;background:#16a34a;color:#fff;padding:3px 10px;border-radius:99px;font-size:11px;font-weight:800;">🟢 Ready in 15 Min</span>
          <button class="mach-tts" onclick="window.krishixApp.speak('${m.name} available near ${m.village}. Rate ${m.ratePerHour} rupees per hour.')">🔊</button>
        </div>
        <div class="mach-body">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:3px;">
            <div class="mach-name">${m.name}</div>
            <span style="background:#fffbeb;color:#b45309;font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;border:1px solid #fef3c7;white-space:nowrap;">🛡️ ${m.trustScore}/100</span>
          </div>
          <div class="mach-loc">📍 ${m.village} &nbsp;|&nbsp; ⭐ ${m.rating} (${m.reviewsCount} reviews)</div>
          <div class="mach-specs">${m.specs.map(s => `<span class="mach-spec">${s}</span>`).join("")}</div>
          <div class="mach-footer">
            <div>
              <span class="mach-price">₹${m.ratePerHour}</span>
              <span class="mach-unit"> /hr &nbsp;|&nbsp; ₹${m.ratePerAcre}/acre</span>
            </div>
            <button class="btn-book-mach" onclick="window.krishixApp.openMachineryBooking('${m.id}')">Book Now</button>
          </div>
        </div>
      </div>`).join("");
  }

  openMachineryBooking(machId) {
    const m = MACHINERY_DATA.find(x => x.id === machId);
    if (!m) return;
    document.getElementById("modal-title").textContent = `Book: ${m.name}`;
    document.getElementById("modal-body").innerHTML = `
      <img src="${m.image}" style="width:100%;height:150px;object-fit:cover;border-radius:10px;margin-bottom:14px;" onerror="this.src='./assets/hero_banner.jpg';">
      <div style="font-size:16px;font-weight:800;color:#14532d;margin-bottom:2px;">${m.name}</div>
      <div style="font-size:12px;color:#64748b;margin-bottom:16px;">${m.village} | 🛡️ Trust ${m.trustScore}/100</div>
      <div class="form-row" style="margin-bottom:16px;">
        <div class="form-group">
          <label>📅 Booking Date</label>
          <input type="date" id="mb-date" value="${new Date(Date.now()+86400000).toISOString().split("T")[0]}">
        </div>
        <div class="form-group">
          <label>⏳ Hours Needed</label>
          <input type="number" id="mb-hours" value="4" min="1" max="12">
        </div>
        <div class="form-group fg-full">
          <label>📍 Farm Location</label>
          <input type="text" id="mb-loc" value="Kolpewadi Field #4, Kopargaon">
        </div>
        <div class="form-group fg-full">
          <label>💳 Payment Method</label>
          <select id="mb-pay">
            <option>UPI (GPay / PhonePe)</option>
            <option>KrishiX Wallet</option>
            <option>Cash on Delivery</option>
          </select>
        </div>
      </div>
      <div style="background:#14532d;color:#fff;padding:14px 18px;border-radius:10px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:11px;color:#94a3b8;">Total (4 hrs × ₹${m.ratePerHour})</div>
          <div style="font-size:28px;font-weight:900;color:#4ade80;">₹${m.ratePerHour * 4}</div>
        </div>
      </div>
      <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;"
        onclick="window.krishixApp.confirmMachineryBooking('${m.id}')">✅ Confirm & Book</button>
    `;
    this.openModal();
  }

  confirmMachineryBooking(machId) {
    const m = MACHINERY_DATA.find(x => x.id === machId);
    if (!m) return;
    const hours = parseInt(document.getElementById("mb-hours")?.value) || 4;
    const total = m.ratePerHour * hours;
    this.state.scheduledJobs.unshift({
      id: `JOB-${Math.floor(1000 + Math.random() * 9000)}`, type: "Machinery",
      title: m.name, date: "Tomorrow, 7:00 AM",
      duration: `${hours} Hours`, status: "CONFIRMED",
      amount: total, paymentMethod: "UPI Paid",
      location: "Kolpewadi Field #4, Kopargaon"
    });
    this.renderSchedule();
    this.closeModal();
    alert(`✅ ${m.name} booked! Driver will arrive at your farm.\nTotal: ₹${total}`);
    this.speak(`${m.name} successfully booked. Total cost is ${total} rupees.`);
  }

  /* ── FARM PLANNER ───────────────────────────────────────── */
  renderFarmPlan() {
    const c = document.getElementById("planner-stages");
    if (!c) return;
    const crop  = document.getElementById("planner-crop")?.value  || "Tomato";
    const acres = parseFloat(document.getElementById("planner-acres")?.value || "4");
    const stages = [
      { timing:"Day 1–3",  icon:"🚜", title:"Land Preparation & Deep Tilling",   task:`Deep soil ploughing for ${acres} acres of ${crop}`, resource:"Mahindra Arjun 605 DI Tractor", cost: 700 * acres, action:"machinery", actionId:"M01" },
      { timing:"Day 5–7",  icon:"👩‍🌾", title:"Sowing & Seedling Transplanting",  task:`Planting ${crop} seedlings at correct spacing`,      resource:"Sunita Bai Pawar Women Squad (10 workers)", cost: 420 * 10, action:"labour", actionId:"W02" },
      { timing:"Day 30+",  icon:"🧪", title:"Pesticide & Nutrition Spraying",    task:"Precision spray using calibrated knapsack pumps",    resource:"AgriDron 20L Spray Drone / Vijay Tambe Squad", cost: 350 * acres, action:"machinery", actionId:"M03" },
      { timing:"Day 90+",  icon:"🌾", title:"Harvesting & Market Transport",     task:`Full harvest of ${acres} acres, load into trolley`,  resource:"John Deere 5050D Combine / Babanrao Shinde Squad", cost: 1900 * acres, action:"labour", actionId:"W01" }
    ];
    c.innerHTML = stages.map(s => `
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;box-shadow:var(--sh1);">
        <div>
          <span style="background:#f0fdf4;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;border:1px solid #dcfce7;">${s.timing}</span>
          <h4 style="font-size:16px;margin:6px 0 3px;color:#14532d;">${s.icon} ${s.title}</h4>
          <p style="font-size:12px;color:#64748b;">${s.task}</p>
          <div style="font-size:12px;font-weight:700;color:#0f172a;margin-top:3px;">Recommended: ${s.resource} <span style="color:#16a34a;">(₹${s.cost.toFixed(0)})</span></div>
        </div>
        <button class="btn-green" onclick="window.krishixApp.${s.action === 'labour' ? `openBookingModal('${s.actionId}')` : `openMachineryBooking('${s.actionId}')`}">
          ⚡ Auto-Book
        </button>
      </div>`).join("");
  }

  /* ── SCHEDULED JOBS ─────────────────────────────────────── */
  renderSchedule() {
    const c = document.getElementById("schedule-list");
    if (!c) return;
    if (!this.state.scheduledJobs.length) {
      c.innerHTML = `<div style="text-align:center;padding:40px;color:#64748b;font-size:14px;">No jobs booked yet. Book machinery or labour to see your schedule here.</div>`;
      return;
    }
    c.innerHTML = this.state.scheduledJobs.map(j => `
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px;box-shadow:var(--sh1);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
          <span style="background:#f0fdf4;color:#15803d;font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;">● ${j.status}</span>
          <span style="font-size:22px;font-weight:900;color:#14532d;">₹${j.amount.toLocaleString("en-IN")}</span>
        </div>
        <div style="font-size:17px;font-weight:800;margin-bottom:5px;">${j.title}</div>
        <div style="font-size:12px;color:#64748b;margin-bottom:2px;">📅 ${j.date} &nbsp;|&nbsp; ⏳ ${j.duration}</div>
        <div style="font-size:12px;color:#64748b;margin-bottom:14px;">📍 ${j.location}</div>
        <button class="btn-green" onclick="window.krishixApp.switchTab('tracking')">📍 Track Live</button>
      </div>`).join("");
  }

  /* ── PAYMENTS ───────────────────────────────────────────── */
  renderPayments() {
    const c = document.getElementById("payment-history");
    if (!c) return;
    const history = [
      { title:"Mahindra Arjun 605 DI Tractor", id:"TXN-KPG-8841", date:"26 July 2026", amount:2800 },
      { title:"Sunita Bai Pawar — Onion Squad (10 workers)", id:"TXN-KPG-7910", date:"22 July 2026", amount:4200 },
      { title:"AgriDron 20L Spray Drone", id:"TXN-KPG-6542", date:"18 July 2026", amount:1400 }
    ];
    c.innerHTML = history.map(r => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
        <div>
          <div style="font-weight:700;font-size:14px;">${r.title}</div>
          <div style="font-size:11px;color:#64748b;">${r.id} • ${r.date}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-weight:900;color:#16a34a;font-size:16px;">₹${r.amount.toLocaleString("en-IN")}</div>
          <div style="font-size:10px;color:#15803d;font-weight:700;">✓ Verified</div>
        </div>
      </div>`).join("");
  }

  /* ── MODAL HELPERS ──────────────────────────────────────── */
  openModal()  { document.getElementById("modal-overlay")?.classList.add("open"); }
  closeModal() { document.getElementById("modal-overlay")?.classList.remove("open"); }

  simulateAddMoney() {
    this.state.walletBalance += 1000;
    alert("✅ ₹1,000 added to KrishiX Wallet!");
    this.speak("1000 rupees added to your KrishiX wallet.");
  }
}

/* ── BOOT ──────────────────────────────────────────────────── */
window.krishixApp = new KrishiXApp();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => window.krishixApp.init());
} else {
  window.krishixApp.init();
}
