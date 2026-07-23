export interface Disease {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  symptoms: string[];
  causes: string[];
  homoeopathicApproach: string;
  remedies: string[];
  duration: string;
  image: string;
  successRate: string;
  detailedInfo: string;
  precautions: string[];
}

export const diseases: Disease[] = [
  {
    id: "1",
    slug: "arthritis",
    name: "Arthritis",
    category: "Joint & Bone Disorders",
    description: "Inflammation of joints causing pain, stiffness, and reduced mobility.",
    symptoms: [
      "Joint pain and stiffness",
      "Swelling and redness",
      "Reduced range of motion",
      "Morning stiffness",
      "Fatigue",
    ],
    causes: [
      "Age-related wear and tear",
      "Autoimmune response",
      "Previous injuries",
      "Genetic factors",
    ],
    homoeopathicApproach:
      "Homoeopathy treats arthritis by addressing the underlying constitutional imbalance rather than just suppressing symptoms. The treatment stimulates the body's natural healing mechanisms and reduces inflammation without side effects.",
    remedies: ["Rhus Tox", "Bryonia", "Calcarea Carbonica", "Lycopodium"],
    precautions: [
      "Avoid heavy lifting and strenuous activities initially",
      "Maintain proper posture during daily activities",
      "Keep joints warm and avoid cold exposure",
      "Stay hydrated and maintain balanced diet",
      "Perform gentle stretching exercises regularly",
      "Apply hot packs for pain relief",
    ],
    duration: "3-6 months for noticeable improvement",
    image: "/images/disease-arthritis.jpg",
    successRate: "75-85%",
    detailedInfo:
      "Arthritis affects millions worldwide and Homoeopathy offers a safe, non-invasive alternative. Our treatment protocol combines constitutional prescribing with acute remedy selection based on the individual's symptom picture. Regular follow-ups ensure optimal results.",
  },
  {
    id: "2",
    slug: "diabetes",
    name: "Type 2 Diabetes",
    category: "Metabolic Disorders",
    description: "A chronic metabolic disorder affecting blood sugar regulation.",
    symptoms: [
      "Increased thirst",
      "Frequent urination",
      "Fatigue",
      "Blurred vision",
      "Slow healing of wounds",
    ],
    causes: [
      "Insulin resistance",
      "Sedentary lifestyle",
      "Poor diet",
      "Obesity",
      "Genetic predisposition",
    ],
    homoeopathicApproach:
      "Homoeopathy aims to restore the body's metabolic balance and improve pancreatic function. Treatment is personalized based on individual constitution and associated symptoms.",
    remedies: ["Phosphoric Acid", "Uranium Nitricum", "Syzygium Jambolanum"],
    precautions: [
      "Monitor blood sugar levels regularly",
      "Follow a low glycemic index diet",
      "Avoid sugary and refined carbohydrates",
      "Engage in regular physical activity",
      "Maintain healthy body weight",
      "Manage stress through meditation and yoga",
    ],
    duration: "6-12 months for blood sugar stabilization",
    image: "/images/disease-diabetes.jpg",
    successRate: "70-80%",
    detailedInfo:
      "Homoeopathic treatment for diabetes focuses on improving insulin sensitivity and preventing complications. Combined with lifestyle modifications and proper diet, remarkable results can be achieved.",
  },
  {
    id: "3",
    slug: "thyroid-disorder",
    name: "Thyroid Disorders (Hypo & Hyper)",
    category: "Endocrine Disorders",
    description: "Imbalance in thyroid hormone production affecting metabolism.",
    symptoms: [
      "Fatigue and weakness",
      "Weight changes",
      "Temperature sensitivity",
      "Hair loss",
      "Mood swings",
    ],
    causes: [
      "Autoimmune conditions",
      "Iodine deficiency",
      "Stress",
      "Nutritional deficiencies",
    ],
    homoeopathicApproach:
      "Homoeopathy addresses the root cause of thyroid dysfunction, whether autoimmune or nutritional. Treatment helps restore hormonal balance naturally.",
    remedies: ["Thyroidinum", "Baryta Carbonica", "Graphites"],
    precautions: [
      "Maintain consistent medication and supplement timing",
      "Avoid excess iodine and kelp supplements",
      "Regular thyroid level monitoring",
      "Manage stress with relaxation techniques",
      "Eat balanced meals with adequate protein",
      "Avoid excessive consumption of goitrogenic foods",
    ],
    duration: "3-6 months for hormone balance",
    image: "/images/disease-thyroid.jpg",
    successRate: "72-82%",
    detailedInfo:
      "Thyroid disorders respond well to constitutional Homoeopathic treatment. Regular monitoring of TSH levels helps track improvement as medications can be gradually reduced.",
  },
  {
    id: "4",
    slug: "migraine",
    name: "Migraine & Headaches",
    category: "Neurological Disorders",
    description: "Severe, recurring headaches often accompanied by nausea and sensitivity.",
    symptoms: [
      "Throbbing head pain",
      "Nausea and vomiting",
      "Light sensitivity",
      "Sound sensitivity",
      "Visual disturbances",
    ],
    causes: [
      "Stress and tension",
      "Hormonal changes",
      "Food triggers",
      "Lack of sleep",
      "Bright lights",
    ],
    homoeopathicApproach:
      "Homoeopathy identifies and treats the constitutional predisposition to migraines. Once the underlying cause is addressed, the frequency and intensity reduce significantly.",
    remedies: ["Belladonna", "Iris Versicolor", "Sanguinaria", "Natrum Mur"],
    precautions: [
      "Identify and avoid personal migraine triggers",
      "Maintain regular sleep schedule",
      "Stay well hydrated throughout the day",
      "Manage stress through relaxation techniques",
      "Avoid skipping meals and eat on regular schedule",
      "Reduce screen time and eye strain",
    ],
    duration: "2-4 months for significant relief",
    image: "/images/disease-migraine.jpg",
    successRate: "80-90%",
    detailedInfo:
      "Migraine relief through Homoeopathy is achievable without the side effects of conventional painkillers. Many patients report complete freedom from migraines after appropriate constitutional treatment.",
  },
  {
    id: "5",
    slug: "acne",
    name: "Acne & Pimples",
    category: "Skin Disorders",
    description: "Chronic skin condition characterized by pimples and inflammation.",
    symptoms: [
      "Pimples and blackheads",
      "Oily skin",
      "Redness and inflammation",
      "Scarring",
      "Itching or pain",
    ],
    causes: [
      "Hormonal imbalance",
      "Poor hygiene",
      "Dietary factors",
      "Stress",
      "Genetic factors",
    ],
    homoeopathicApproach:
      "Homoeopathy treats acne from within by correcting internal imbalances. This ensures long-lasting results without the harsh side effects of topical treatments.",
    remedies: ["Sulfur", "Hepar Sulph", "Silicea", "Calcarea Sulph"],
    precautions: [
      "Keep face clean and avoid touching acne",
      "Use gentle, oil-free skincare products",
      "Avoid greasy and heavy foods",
      "Drink plenty of water daily",
      "Get adequate sleep for skin repair",
      "Reduce exposure to harsh chemicals and pollution",
    ],
    duration: "2-3 months for clear skin",
    image: "/images/disease-acne.jpg",
    successRate: "85-92%",
    detailedInfo:
      "Acne responds remarkably well to Homoeopathic treatment. The approach targets the root cause whether it is hormonal, dietary, or constitutional.",
  },
  {
    id: "6",
    slug: "anxiety-disorder",
    name: "Anxiety & Panic Disorder",
    category: "Mental Health",
    description: "Persistent worry and fear affecting daily life and well-being.",
    symptoms: [
      "Excessive worry",
      "Panic attacks",
      "Heart palpitations",
      "Shortness of breath",
      "Sleep disturbances",
    ],
    causes: [
      "Stress and trauma",
      "Chemical imbalance",
      "Genetic predisposition",
      "Lifestyle factors",
    ],
    homoeopathicApproach:
      "Homoeopathy calms the mind and restores emotional equilibrium naturally. Treatment is safe and non-addictive, unlike conventional anxiolytics.",
    remedies: ["Aconite", "Argentum Nitricum", "Gelsemium", "Phosphorus"],
    precautions: [
      "Practice deep breathing and meditation regularly",
      "Limit caffeine and stimulating substances",
      "Maintain regular exercise routine",
      "Establish consistent sleep patterns",
      "Avoid stressful situations when possible",
      "Seek support from family and friends",
    ],
    duration: "1-3 months for emotional stability",
    image: "/images/disease-migraine.jpg",
    successRate: "78-88%",
    detailedInfo:
      "Anxiety disorders are effectively managed through constitutional Homoeopathic treatment that strengthens the nervous system and promotes mental clarity.",
  },
  {
    id: "7",
    slug: "eczema",
    name: "Eczema & Dermatitis",
    category: "Skin Disorders",
    description: "Inflammatory skin condition causing itching, redness, and dryness.",
    symptoms: [
      "Intense itching",
      "Red, inflamed skin",
      "Dry patches",
      "Cracking skin",
      "Blistering",
    ],
    causes: [
      "Allergic reactions",
      "Stress",
      "Dry skin",
      "Genetic factors",
      "Environmental triggers",
    ],
    homoeopathicApproach:
      "Homoeopathy eliminates the root cause of eczema by strengthening immunity. Treatment addresses both skin symptoms and underlying constitutional weakness.",
    remedies: ["Graphites", "Sulfur", "Mezereum", "Rhus Tox"],
    precautions: [
      "Avoid hot water and use lukewarm baths",
      "Moisturize skin immediately after bathing",
      "Avoid harsh soaps and detergents",
      "Identify and eliminate trigger foods",
      "Reduce exposure to irritants and allergens",
      "Keep stress levels under control",
    ],
    duration: "3-4 months for skin healing",
    image: "/images/disease-acne.jpg",
    successRate: "82-90%",
    detailedInfo:
      "Eczema treatment through Homoeopathy avoids steroids and focuses on natural healing. Skin becomes healthy from within as immunity strengthens.",
  },
  {
    id: "8",
    slug: "asthma",
    name: "Asthma & Respiratory Issues",
    category: "Respiratory Disorders",
    description: "Chronic respiratory condition characterized by airway narrowing.",
    symptoms: [
      "Shortness of breath",
      "Wheezing",
      "Chest tightness",
      "Coughing",
      "Night-time symptoms",
    ],
    causes: [
      "Allergies",
      "Air pollution",
      "Respiratory infections",
      "Genetic predisposition",
      "Cold air exposure",
    ],
    homoeopathicApproach:
      "Homoeopathy strengthens lungs and improves respiratory capacity. Treatment reduces frequency and severity of asthma attacks naturally.",
    remedies: ["Arsenicum Album", "Ipecacuanha", "Antimonium Tart", "Blatta Orientalis"],
    precautions: [
      "Avoid known allergens and irritants",
      "Keep air clean with proper ventilation",
      "Maintain regular breathing exercises",
      "Avoid sudden temperature changes",
      "Keep rescue medications accessible",
      "Monitor air quality and use air purifiers",
    ],
    duration: "3-6 months for significant relief",
    image: "/images/disease-thyroid.jpg",
    successRate: "75-85%",
    detailedInfo:
      "Asthma management through Homoeopathy leads to reduced dependency on inhalers and steroid medications. Respiratory health improves as immune function normalizes.",
  },
  {
    id: "9",
    slug: "pcos",
    name: "PCOS (Polycystic Ovary Syndrome)",
    category: "Women's Health",
    description: "Hormonal disorder affecting women's reproductive and metabolic health.",
    symptoms: [
      "Irregular periods",
      "Weight gain",
      "Acne",
      "Hair loss",
      "Infertility",
    ],
    causes: [
      "Hormonal imbalance",
      "Insulin resistance",
      "Inflammation",
      "Genetic factors",
    ],
    homoeopathicApproach:
      "Homoeopathy restores hormonal balance and improves ovarian function. Treatment is holistic, addressing both metabolic and reproductive aspects.",
    remedies: ["Pulsatilla", "Sepia", "Lachesis", "Calcarea Carbonica"],
    precautions: [
      "Maintain balanced diet with low glycemic foods",
      "Exercise regularly for weight management",
      "Track menstrual cycle patterns",
      "Reduce insulin resistance through diet",
      "Manage stress with yoga and meditation",
      "Get adequate sleep for hormonal balance",
    ],
    duration: "4-8 months for hormone regulation",
    image: "/images/disease-diabetes.jpg",
    successRate: "70-80%",
    detailedInfo:
      "PCOS treatment through Homoeopathy shows promising results with improved cycle regularity, weight management, and fertility outcomes.",
  },
  {
    id: "10",
    slug: "insomnia",
    name: "Insomnia & Sleep Disorders",
    category: "Sleep Disorders",
    description: "Difficulty in falling or maintaining sleep affecting quality of life.",
    symptoms: [
      "Difficulty falling asleep",
      "Frequent awakening",
      "Early morning waking",
      "Daytime fatigue",
      "Irritability",
    ],
    causes: [
      "Stress and anxiety",
      "Poor sleep habits",
      "Caffeine and stimulants",
      "Pain and discomfort",
      "Screen time",
    ],
    homoeopathicApproach:
      "Homoeopathy calms the mind and restores natural sleep rhythm. Treatment is safe and creates no dependency unlike conventional sleeping pills.",
    remedies: ["Nux Vomica", "Coffea Cruda", "Passiflora", "Valerian"],
    precautions: [
      "Maintain consistent sleep schedule",
      "Avoid caffeine and stimulants after noon",
      "Create dark, cool bedroom environment",
      "Limit screen time before bedtime",
      "Practice relaxation techniques before sleep",
      "Avoid heavy meals close to bedtime",
    ],
    duration: "2-4 weeks for better sleep",
    image: "/images/disease-migraine.jpg",
    successRate: "80-90%",
    detailedInfo:
      "Sleep improvement through Homoeopathy is rapid and lasting. Patients experience natural, refreshing sleep without medication side effects.",
  },
];

export function getDiseaseBySlug(slug: string): Disease | undefined {
  return diseases.find((disease) => disease.slug === slug);
}

export function getDiseasesByCategory(category: string): Disease[] {
  return diseases.filter((disease) => disease.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(diseases.map((disease) => disease.category)));
}

export function searchDiseases(query: string): Disease[] {
  const lowerQuery = query.toLowerCase();
  return diseases.filter(
    (disease) =>
      disease.name.toLowerCase().includes(lowerQuery) ||
      disease.description.toLowerCase().includes(lowerQuery) ||
      disease.symptoms.some((symptom) =>
        symptom.toLowerCase().includes(lowerQuery)
      )
  );
}
