const express = require('express');
const router  = express.Router();
const https   = require('https');

/* ── Pre-configured Knowledge Base for Kopargaon Crops ─── */
const CROP_DISEASES = {
  sugarcane: [
    {
      disease: "Sugarcane Red Rot (लाल सड रोग)",
      cause: "Fungal (Colletotrichum falcatum)",
      symptoms: "Third/fourth leaf shows yellowing, internal cane flesh turns reddish with white cross patches.",
      treatment: "Soil drenching with Carbendazim (0.1%), remove affected clumps, use certified disease-free sets.",
      recommendedSquad: "Vijay Tambe (Certified Chemical Spraying Specialist - Takli)",
      recommendedMachine: "AgriDron 20L Precision Spray Drone (Godavari Tech Drones)"
    },
    {
      disease: "Sugarcane Woolly Aphid (पांढरी माशी)",
      cause: "Insect Pest (Ceratovacuna lanigera)",
      symptoms: "White cottony powder under leaves, honeydew excretion causing black sooty mold.",
      treatment: "Spray Chlorpyrifos 20 EC @ 2ml/L or Malathion 50 EC @ 2ml/L.",
      recommendedSquad: "Dhamori Chemical & Drone Spraying Squad",
      recommendedMachine: "AgriDron 20L Precision Spray Drone"
    }
  ],
  onion: [
    {
      disease: "Onion Purple Blotch (जांभळा करपा)",
      cause: "Fungal (Alternaria porri)",
      symptoms: "Small water-soaked sunken lesions on leaves expanding into purple spots.",
      treatment: "Spray Mancozeb 75% WP @ 2.5g/L or Tebuconazole + Trifloxystrobin @ 0.7g/L.",
      recommendedSquad: "Vijay Tambe (Spraying Specialist)",
      recommendedMachine: "AgriDron 20L Precision Spray Drone"
    },
    {
      disease: "Onion Thrips (फुलकिडे)",
      cause: "Pest (Thrips tabaci)",
      symptoms: "Silvery white streaks on leaves, leaf tips curling and drying up.",
      treatment: "Spray Fipronil 5 SC @ 1.5ml/L or Thiamethoxam 25 WG @ 0.3g/L.",
      recommendedSquad: "Dhamori Chemical & Drone Spraying Squad",
      recommendedMachine: "AgriDron 20L Precision Spray Drone"
    }
  ],
  pomegranate: [
    {
      disease: "Pomegranate Bacterial Oily Spot (तेलकट डाग / तेल्या)",
      cause: "Bacterium (Xanthomonas axonopodis pv. punicae)",
      symptoms: "Water-soaked dark brown oily spots on leaves and fruit surface with cracks.",
      treatment: "Spray Streptocycline @ 0.5g/L + Copper Oxychloride @ 2.5g/L, prune infected twigs.",
      recommendedSquad: "Pandurang Chavan (Grape & Pomegranate Pruning Expert)",
      recommendedMachine: "AgriDron 20L Precision Spray Drone"
    }
  ],
  grape: [
    {
      disease: "Grape Downy Mildew (तांबेरा / तांबेड्या / केवडा)",
      cause: "Fungal (Plasmopara viticola)",
      symptoms: "Yellowish oily spots on upper leaf surface, white cottony fungal growth underneath.",
      treatment: "Spray Metalaxyl + Mancozeb @ 2g/L or Dimethomorph @ 1g/L.",
      recommendedSquad: "Vijay Tambe (Spraying & Pruning Lead)",
      recommendedMachine: "AgriDron 20L Precision Spray Drone"
    }
  ]
};

// Call Gemini AI API dynamically
function callGeminiAI(crop, symptoms) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return reject(new Error("No API key configured"));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
    const prompt = `You are KrishiX AI Doctor for farmers in Kopargaon, Maharashtra.
Analyze the following crop and symptoms and respond ONLY with a valid JSON object (no markdown codeblock wrapping):
Crop: ${crop}
Symptoms: ${symptoms || 'General pest and disease inspection'}

JSON format required:
{
  "disease": "Disease Name in English & Marathi",
  "cause": "Fungal / Bacterial / Pest / Deficiency",
  "severity": "Low / Moderate / High",
  "symptoms": "Detailed symptoms",
  "treatment": "Exact chemical dosage & organic treatment recommendation",
  "recommendedSquad": "Vijay Tambe (Certified Chemical Spraying Specialist - Takli)",
  "recommendedMachine": "AgriDron 20L Precision Spray Drone"
}`;

    const postData = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    });

    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 8000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const rawText = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const cleanedText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const jsonResult = JSON.parse(cleanedText);
          resolve(jsonResult);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error("Timeout")); });
    req.write(postData);
    req.end();
  });
}

/* ── POST /api/ai/diagnose-crop ───────────────────────────
   Analyzes crop disease photo or symptoms using Gemini AI live  */
router.post('/diagnose-crop', async (req, res) => {
  const { crop, symptoms, imageUrl } = req.body;

  try {
    const aiResult = await callGeminiAI(crop || 'Sugarcane', symptoms);
    return res.json({
      success: true,
      liveAI: true,
      diagnosis: {
        crop: crop || 'Sugarcane (ऊस)',
        disease: aiResult.disease || "Crop Disease Detected",
        cause: aiResult.cause || "Fungal / Pest",
        severity: aiResult.severity || "Moderate",
        symptoms: aiResult.symptoms || symptoms || "Leaves yellowing with spotted lesions",
        treatment: aiResult.treatment || "Spray recommended fungicide / insecticide.",
        recommendedSquad: aiResult.recommendedSquad || "Vijay Tambe (Spraying Specialist)",
        recommendedMachine: aiResult.recommendedMachine || "AgriDron 20L Precision Spray Drone",
        analyzedAt: new Date().toISOString()
      }
    });
  } catch (err) {
    console.log("⚠️ Live Gemini AI fallback to local knowledge base:", err.message);
    const cropKey = (crop || 'sugarcane').toLowerCase().trim();
    let matches = CROP_DISEASES[cropKey] || CROP_DISEASES['sugarcane'];
    let selected = matches[0];
    if (symptoms) {
      const q = symptoms.toLowerCase();
      const found = matches.find(d => 
        d.disease.toLowerCase().includes(q) ||
        d.symptoms.toLowerCase().includes(q)
      );
      if (found) selected = found;
    }

    res.json({
      success: true,
      liveAI: false,
      diagnosis: {
        crop: crop || 'Sugarcane (ऊस)',
        disease: selected.disease,
        cause: selected.cause,
        severity: 'Moderate to High',
        symptoms: selected.symptoms,
        treatment: selected.treatment,
        recommendedSquad: selected.recommendedSquad,
        recommendedMachine: selected.recommendedMachine,
        analyzedAt: new Date().toISOString()
      }
    });
  }
});

module.exports = router;
