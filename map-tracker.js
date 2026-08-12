// Real-time GPS Tracker Engine for KrishiX - Kopargaon Hub

class KrishiXGPSTracker {
  constructor() {
    this.map = null;
    this.vehicleMarker = null;
    this.farmerMarker = null;
    this.routePolyline = null;
    this.currentStep = 0;
    this.animationInterval = null;
    this.timerInterval = null;
    this.socket = null;
    this.isPaused = false;
    
    // Default Kopargaon Machinery Bookings
    this.activeBookings = [
      {
        id: "KX-KPG-9042",
        resourceName: "Mahindra Arjun 605 DI Tractor",
        registration: "MH 17 CD 5821",
        driverName: "Raosaheb Patil",
        driverPhone: "+91 98220 17482",
        trustScore: 98,
        icon: "🚜",
        speed: "30 km/h",
        locationName: "Kolpewadi Sugarcane Farm Field #4, Kopargaon",
        startLocation: { lat: 19.8904, lng: 74.4789, name: "Kopargaon Agro Yard" },
        farmerLocation: { lat: 19.9050, lng: 74.4920, name: "Kolpewadi Farm Field #4" },
        routePath: [
          [19.8904, 74.4789], [19.8935, 74.4820], [19.8970, 74.4850],
          [19.9005, 74.4880], [19.9030, 74.4905], [19.9050, 74.4920]
        ],
        etaMinutes: 6,
        etaSeconds: 30
      },
      {
        id: "KX-KPG-7712",
        resourceName: "John Deere 5050D Combine Harvester",
        registration: "MH 17 AZ 9921",
        driverName: "Pandurang Chavan",
        driverPhone: "+91 98904 55123",
        trustScore: 99,
        icon: "🌾",
        speed: "22 km/h",
        locationName: "Shingnapur Wheat Farm Field #2, Kopargaon",
        startLocation: { lat: 19.8850, lng: 74.4710, name: "Kopargaon Machinery Hub" },
        farmerLocation: { lat: 19.9120, lng: 74.5010, name: "Shingnapur Wheat Field" },
        routePath: [
          [19.8850, 74.4710], [19.8920, 74.4800], [19.9010, 74.4900],
          [19.9080, 74.4970], [19.9120, 74.5010]
        ],
        etaMinutes: 11,
        etaSeconds: 45
      },
      {
        id: "KX-KPG-3389",
        resourceName: "AgriDron 20L Precision Spray Drone",
        registration: "GODAVARI-DRONE-01",
        driverName: "Vijay Tambe (Certified Pilot)",
        driverPhone: "+91 97654 32109",
        trustScore: 97,
        icon: "🚁",
        speed: "45 km/h",
        locationName: "Takli Grape Orchard Block #3, Kopargaon",
        startLocation: { lat: 19.8980, lng: 74.4650, name: "Godavari Tech Lab" },
        farmerLocation: { lat: 19.8890, lng: 74.4980, name: "Takli Grape Orchard" },
        routePath: [
          [19.8980, 74.4650], [19.8950, 74.4780], [19.8920, 74.4880],
          [19.8890, 74.4980]
        ],
        etaMinutes: 4,
        etaSeconds: 15
      },
      {
        id: "KX-KPG-5510",
        resourceName: "Sugarcane Harvest Labour Squad (15 Workers)",
        registration: "MH 17 BK 4410 (Squad Van)",
        driverName: "Eknath Jadhav (Gang Leader)",
        driverPhone: "+91 98224 88311",
        trustScore: 98,
        icon: "🚐",
        speed: "35 km/h",
        locationName: "Dhamori Sugarcane Field #1, Kopargaon",
        startLocation: { lat: 19.8790, lng: 74.4800, name: "Dhamori Labour Colony" },
        farmerLocation: { lat: 19.9020, lng: 74.4890, name: "Dhamori Sugarcane Field" },
        routePath: [
          [19.8790, 74.4800], [19.8860, 74.4830], [19.8950, 74.4860],
          [19.9020, 74.4890]
        ],
        etaMinutes: 8,
        etaSeconds: 0
      }
    ];

    this.data = this.activeBookings[0];
    this.initSocket();
  }

  addBooking(bookingObj) {
    if (!bookingObj || !bookingObj.resourceName) return;
    
    // Determine vehicle icon
    let icon = "🚜";
    const name = bookingObj.resourceName.toLowerCase();
    if (name.includes("drone") || name.includes("spray")) icon = "🚁";
    else if (name.includes("harvester") || name.includes("combine") || name.includes("wheat") || name.includes("cutter")) icon = "🌾";
    else if (name.includes("squad") || name.includes("labour") || name.includes("team") || name.includes("gang")) icon = "🚐";
    else if (name.includes("rotavator") || name.includes("tiller") || name.includes("plough")) icon = "⚙️";

    const newBooking = {
      id: bookingObj.id || `KX-KPG-${Math.floor(1000 + Math.random() * 9000)}`,
      resourceName: bookingObj.resourceName,
      registration: bookingObj.registration || "MH 17 CD 5821",
      driverName: bookingObj.driverName || "Raosaheb Patil",
      driverPhone: bookingObj.driverPhone || "+91 98220 17482",
      trustScore: bookingObj.trustScore || 98,
      icon,
      speed: "32 km/h",
      locationName: bookingObj.locationName || "Kolpewadi Farm Field #4, Kopargaon",
      startLocation: { lat: 19.8904, lng: 74.4789, name: "Kopargaon Agro Yard" },
      farmerLocation: { lat: 19.9050, lng: 74.4920, name: bookingObj.locationName || "Kopargaon Farm Field" },
      routePath: [
        [19.8904, 74.4789], [19.8935, 74.4820], [19.8970, 74.4850],
        [19.9005, 74.4880], [19.9030, 74.4905], [19.9050, 74.4920]
      ],
      etaMinutes: 7,
      etaSeconds: 30
    };

    this.activeBookings.unshift(newBooking);
    this.updateTrackingTarget(newBooking.id);
  }

  updateTrackingTarget(bookingId) {
    const b = this.activeBookings.find(x => x.id === bookingId) || this.activeBookings[0];
    this.data = b;

    // Update UI elements
    const hdrTitle = document.getElementById("tracking-hdr-title");
    if (hdrTitle) hdrTitle.textContent = `📍 Real-Time Live Dispatch GPS Map (${b.resourceName})`;

    const hdrSub = document.getElementById("tracking-hdr-sub");
    if (hdrSub) hdrSub.textContent = `Booking #${b.id} • ${b.resourceName} (${b.registration})`;

    const dname = document.getElementById("tracking-driver-name");
    if (dname) dname.textContent = b.driverName;

    const dphone = document.getElementById("tracking-driver-phone");
    if (dphone) dphone.innerHTML = `📞 ${b.driverPhone}`;

    const dtrust = document.getElementById("tracking-driver-trust");
    if (dtrust) dtrust.textContent = `🛡️ Trust Score ${b.trustScore}/100 • ${b.registration}`;

    const distSub = document.getElementById("live-distance-km");
    if (distSub) distSub.textContent = `1.8 km remaining • Moving at ${b.speed} in Kopargaon`;

    const destStep = document.getElementById("tracking-dest-step");
    if (destStep) destStep.textContent = `Booked for ${b.locationName}`;

    // Re-initialize Leaflet Map
    this.initMap();
  }

  initSocket() {
    if (typeof io !== 'undefined') {
      try {
        this.socket = io('http://localhost:3001');
        this.socket.on('connect', () => {
          console.log('📡 [Socket.io] Real-time GPS Tracker Connected to Backend WebSockets!');
        });
        this.socket.on('location-updated', (data) => {
          if (data && data.lat && data.lng && this.vehicleMarker) {
            this.vehicleMarker.setLatLng([data.lat, data.lng]);
            if (this.map) this.map.panTo([data.lat, data.lng], { animate: true });
          }
        });
      } catch (e) {
        console.log('Socket.io init offline fallback');
      }
    }
  }

  initMap(containerId = "leaflet-map") {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (typeof L === "undefined") {
      console.error("Leaflet.js is not loaded.");
      return;
    }

    if (this.map) {
      try { this.map.remove(); } catch (e) {}
      this.map = null;
    }

    const start = this.data.startLocation || { lat: 19.8904, lng: 74.4789, name: "Kopargaon Agro Yard" };
    const farmer = this.data.farmerLocation || { lat: 19.9050, lng: 74.4920, name: "Kolpewadi Farm Field #4" };
    const route = this.data.routePath || [
      [19.8904, 74.4789], [19.8935, 74.4820], [19.8970, 74.4850],
      [19.9005, 74.4880], [19.9030, 74.4905], [19.9050, 74.4920]
    ];
    const iconChar = this.data.icon || "🚜";

    // Center Map on Kopargaon, Maharashtra (19.897, 74.485)
    this.map = L.map(containerId, {
      zoomControl: true,
      attributionControl: false
    }).setView([19.897, 74.485], 14);

    // OpenStreetMap Tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    // Custom Vehicle Icon with dynamic vehicle symbol (🚜 / 🚁 / 🌾 / 🚐)
    const vehicleIcon = L.divIcon({
      className: 'custom-vehicle-marker',
      html: `
        <div style="
          background: #16a34a; 
          color: white; 
          width: 52px; 
          height: 52px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 26px; 
          box-shadow: 0 0 24px rgba(22,163,74,0.9);
          border: 3px solid white;
          animation: pulse 1.5s infinite;">
          ${iconChar}
        </div>`,
      iconSize: [52, 52],
      iconAnchor: [26, 26]
    });

    // Custom Farmer Destination Icon
    const farmerIcon = L.divIcon({
      className: 'custom-farmer-marker',
      html: `
        <div style="
          background: #14532d; 
          color: #f59e0b; 
          width: 50px; 
          height: 50px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 26px; 
          box-shadow: 0 6px 18px rgba(0,0,0,0.3);
          border: 3px solid white;">
          🌾
        </div>`,
      iconSize: [50, 50],
      iconAnchor: [25, 25]
    });

    // Add Farmer Destination Marker (Kolpewadi Kopargaon)
    this.farmerMarker = L.marker([farmer.lat, farmer.lng], { icon: farmerIcon })
      .addTo(this.map)
      .bindPopup(`<b>${this.data.locationName || farmer.name}</b><br>Target Kopargaon Field`)
      .openPopup();

    // Add Vehicle Start Marker
    const firstPos = route[0];
    const driverName = this.data.driverName || "Raosaheb Patil";
    const vehicleName = this.data.resourceName || "Mahindra Arjun 605 DI Tractor";

    this.vehicleMarker = L.marker(firstPos, { icon: vehicleIcon })
      .addTo(this.map)
      .bindPopup(`<b>${vehicleName} (${this.data.registration})</b><br>Driver: ${driverName}`);

    // Draw Route Polyline along Kopargaon Road
    this.routePolyline = L.polyline(route, {
      color: '#16a34a',
      weight: 6,
      opacity: 0.85,
      dashArray: '10, 10'
    }).addTo(this.map);

    try {
      this.map.fitBounds(this.routePolyline.getBounds(), { padding: [50, 50] });
    } catch (e) {}

    setTimeout(() => {
      if (this.map) this.map.invalidateSize();
    }, 200);

    this.startSimulation();
  }

  startSimulation() {
    this.clearIntervals();
    this.currentStep = 0;
    const path = (this.data && this.data.routePath) ? this.data.routePath : [
      [19.8904, 74.4789], [19.8935, 74.4820], [19.8970, 74.4850],
      [19.9005, 74.4880], [19.9030, 74.4905], [19.9050, 74.4920]
    ];
    const totalSteps = path.length;

    let remainingSeconds = ((this.data.etaMinutes || 6) * 60) + (this.data.etaSeconds || 30);

    this.timerInterval = setInterval(() => {
      if (this.isPaused) return;

      if (remainingSeconds > 0) {
        remainingSeconds--;
        const mins = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
        const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        
        const etaEl = document.getElementById('live-eta-timer');
        if (etaEl) etaEl.innerText = formattedTime;

        const distEl = document.getElementById('live-distance-km');
        if (distEl) {
          const currentDist = (remainingSeconds / (6 * 60 + 30) * 1.8).toFixed(1);
          distEl.innerText = `${currentDist} km remaining • Moving at ${this.data.speed || '30 km/h'} in Kopargaon`;
        }
      } else {
        const etaEl = document.getElementById('live-eta-timer');
        if (etaEl) etaEl.innerText = "ARRIVED!";
        
        if (window.krishixApp) {
          const lang = window.krishixApp.state.language;
          let msg = lang === 'hi' ? `आपकी ${this.data.resourceName} कोपरगांव खेत पर पहुंच गई है!` : (lang === 'mr' ? `आपले ${this.data.resourceName} कोपरगाव शेतात पोहोचले आहे!` : `Your ${this.data.resourceName} has arrived at your Kopargaon farm gate!`);
          window.krishixApp.speak(msg);
        }
        this.clearIntervals();
      }
    }, 1000);

    this.animationInterval = setInterval(() => {
      if (this.isPaused) return;

      if (this.currentStep < totalSteps - 1) {
        this.currentStep++;
        const nextCoord = path[this.currentStep];
        if (this.vehicleMarker) this.vehicleMarker.setLatLng(nextCoord);
        if (this.map) this.map.panTo(nextCoord, { animate: true, duration: 1 });
      } else {
        this.currentStep = 0; // Loop continuous vehicle route simulation
      }
    }, 3000);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    return this.isPaused;
  }

  clearIntervals() {
    if (this.animationInterval) clearInterval(this.animationInterval);
    if (this.timerInterval) clearInterval(this.timerInterval);
  }
}

window.krishixTracker = new KrishiXGPSTracker();
