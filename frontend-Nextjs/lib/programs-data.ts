export interface ProgramBenefit {
  icon: string;
  label: string;
}

export interface ProgramConcern {
  icon: string;
  label: string;
}

export interface Program {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  benefits: ProgramBenefit[];
  whoIsItFor: string[];
  approach: string[];
  howWeHelp: { icon: string; label: string }[];
  holisticCare: {
    title: string;
    description: string;
    image: string;
  };
  commonConcerns: ProgramConcern[];
  testimonial: {
    quote: string;
    author: string;
  };
  ctaTitle: string;
  ctaDescription: string;
}

export const programs: Program[] = [
  {
    slug: "healthy-child",
    title: "Healthy Child Program",
    subtitle: "Stronger Immunity. Better Growth. Happy Childhood.",
    description:
      "We support your child's natural growth and development with homoeopathy, good nutrition and healthy habits.",
    heroImage: "/images/child-care.jpg",
    benefits: [
      { icon: "Shield", label: "Boost Immunity" },
      { icon: "TrendingUp", label: "Better Growth" },
      { icon: "Apple", label: "Improved Digestion" },
      { icon: "Brain", label: "Better Concentration" },
      { icon: "Heart", label: "Emotional Well-being" },
    ],
    whoIsItFor: [
      "Children with frequent colds, cough & infections",
      "Poor appetite or slow growth",
      "ADHD, difficulty in concentration",
      "Bed wetting",
      "Allergies, eczema, asthma",
      "Underweight or overweight children",
      "Children with behavioral or emotional concerns",
    ],
    approach: [
      "Detailed Case Understanding",
      "Individualized Homoeopathic Treatment",
      "Nutrition & Diet Guidance",
      "Lifestyle & Routine Planning",
      "Parent Guidance & Support",
      "Regular Follow-Ups & Tracking",
    ],
    howWeHelp: [
      { icon: "Shield", label: "Strengthen Immunity" },
      { icon: "TrendingUp", label: "Support Healthy Growth" },
      { icon: "Apple", label: "Improve Digestion" },
      { icon: "Brain", label: "Enhance Focus & Learning" },
      { icon: "Heart", label: "Emotional Balance & Confidence" },
    ],
    holisticCare: {
      title: "Holistic Care for Your Child",
      description:
        "We believe every child is unique. Our holistic approach helps them grow healthier, happier and stronger naturally — in body, mind and spirit.",
      image: "/images/child-care.jpg",
    },
    commonConcerns: [
      { icon: "Thermometer", label: "Frequent Infections" },
      { icon: "UtensilsCrossed", label: "Poor Appetite" },
      { icon: "TrendingUp", label: "Growth & Development" },
      { icon: "Brain", label: "ADHD & Focus Issues" },
      { icon: "Droplets", label: "Skin Allergies & Eczema" },
      { icon: "BedDouble", label: "Bed Wetting" },
      { icon: "Wind", label: "Asthma" },
    ],
    testimonial: {
      quote:
        '"We saw amazing improvement in our child\'s immunity and confidence. Thank you Dr. Rati Pathak for your constant support."',
      author: "— Parent of 7 year old child",
    },
    ctaTitle: "Give Your Child the Gift of Good Health",
    ctaDescription:
      "Book an appointment today and start their wellness journey.",
  },
  {
    slug: "confident-woman",
    title: "Confident Woman Program",
    subtitle: "Hormonal Balance. Inner Strength. Complete Wellness.",
    description:
      "Comprehensive homoeopathic care for women's health — from PCOS and thyroid to pregnancy support and menopause management.",
    heroImage: "/images/womens-health.jpg",
    benefits: [
      { icon: "Heart", label: "Hormonal Balance" },
      { icon: "Shield", label: "Stronger Immunity" },
      { icon: "Sparkles", label: "Glowing Skin" },
      { icon: "Brain", label: "Mental Clarity" },
      { icon: "Activity", label: "Energy & Vitality" },
    ],
    whoIsItFor: [
      "Women with PCOS or irregular periods",
      "Thyroid imbalances (hypo/hyper)",
      "Pregnancy & postpartum care",
      "Menopausal symptoms",
      "Hormonal acne and hair fall",
      "Chronic UTI and vaginal infections",
      "Emotional well-being and stress",
    ],
    approach: [
      "Detailed Hormonal Assessment",
      "Constitutional Homoeopathic Treatment",
      "Nutrition & Lifestyle Planning",
      "Stress & Emotional Support",
      "Cycle Tracking & Monitoring",
      "Regular Follow-Ups & Guidance",
    ],
    howWeHelp: [
      { icon: "Heart", label: "Balance Hormones" },
      { icon: "Shield", label: "Build Immunity" },
      { icon: "Sparkles", label: "Improve Skin Health" },
      { icon: "Brain", label: "Boost Mental Clarity" },
      { icon: "Activity", label: "Enhance Energy" },
    ],
    holisticCare: {
      title: "Complete Care for Every Woman",
      description:
        "We understand that every woman's body is different. Our personalized approach addresses your unique health concerns naturally and effectively.",
      image: "/images/womens-health.jpg",
    },
    commonConcerns: [
      { icon: "Heart", label: "PCOS" },
      { icon: "Activity", label: "Thyroid" },
      { icon: "Baby", label: "Pregnancy Care" },
      { icon: "Thermometer", label: "Menopause" },
      { icon: "Droplets", label: "Acne & Hair Fall" },
      { icon: "Shield", label: "UTI" },
      { icon: "Brain", label: "Stress & Anxiety" },
    ],
    testimonial: {
      quote:
        '"My PCOS symptoms improved significantly within 3 months. Dr. Pathak\'s approach is truly holistic."',
      author: "— 28-year-old patient",
    },
    ctaTitle: "Embrace Your Health Journey",
    ctaDescription:
      "Book a consultation and start your path to hormonal balance.",
  },
  {
    slug: "peaceful-mind",
    title: "Peaceful Mind Program",
    subtitle: "Calm Mind. Restful Sleep. Emotional Wellness.",
    description:
      "Gentle, natural homoeopathic support for anxiety, stress, insomnia and emotional imbalances without side effects.",
    heroImage: "/images/mental-health.jpg",
    benefits: [
      { icon: "Brain", label: "Mental Clarity" },
      { icon: "Moon", label: "Better Sleep" },
      { icon: "Heart", label: "Emotional Balance" },
      { icon: "Shield", label: "Stress Resilience" },
      { icon: "Sparkles", label: "Inner Peace" },
    ],
    whoIsItFor: [
      "Chronic stress and anxiety",
      "Insomnia and sleep disorders",
      "Depression and mood swings",
      "Panic attacks",
      "OCD and phobias",
      "Exam stress in students",
      "Grief and emotional trauma",
    ],
    approach: [
      "Deep Constitutional Analysis",
      "Individualized Remedy Selection",
      "Mindfulness & Relaxation Guidance",
      "Sleep Hygiene Counseling",
      "Lifestyle & Routine Optimization",
      "Regular Progress Tracking",
    ],
    howWeHelp: [
      { icon: "Brain", label: "Improve Mental Health" },
      { icon: "Moon", label: "Restore Quality Sleep" },
      { icon: "Heart", label: "Emotional Stability" },
      { icon: "Shield", label: "Build Resilience" },
      { icon: "Sparkles", label: "Find Inner Peace" },
    ],
    holisticCare: {
      title: "Your Path to Mental Wellness",
      description:
        "We treat the whole person, not just the symptoms. Our natural approach helps restore balance to your mind, body and emotions.",
      image: "/images/mental-health.jpg",
    },
    commonConcerns: [
      { icon: "Brain", label: "Anxiety" },
      { icon: "Moon", label: "Insomnia" },
      { icon: "Heart", label: "Depression" },
      { icon: "Activity", label: "Panic Attacks" },
      { icon: "Sparkles", label: "OCD" },
      { icon: "BookOpen", label: "Exam Stress" },
      { icon: "Cloud", label: "Grief" },
    ],
    testimonial: {
      quote:
        '"After years of anxiety, homoeopathy finally gave me lasting relief. I feel like myself again."',
      author: "— 35-year-old patient",
    },
    ctaTitle: "Find Your Peace of Mind",
    ctaDescription:
      "Book a consultation and begin your journey to mental wellness.",
  },
  {
    slug: "active-life",
    title: "Active Life Program",
    subtitle: "More Energy. Better Health. Active Lifestyle.",
    description:
      "Holistic homoeopathic solutions for lifestyle disorders, weight management, diabetes support and overall vitality.",
    heroImage: "/images/chronic-diseases.jpg",
    benefits: [
      { icon: "Activity", label: "Increased Energy" },
      { icon: "TrendingUp", label: "Better Metabolism" },
      { icon: "Heart", label: "Heart Health" },
      { icon: "Shield", label: "Stronger Immunity" },
      { icon: "Sparkles", label: "Overall Vitality" },
    ],
    whoIsItFor: [
      "Obesity and weight management",
      "Type 2 diabetes management",
      "High cholesterol & blood pressure",
      "Chronic fatigue and low energy",
      "Joint pain and arthritis",
      "Digestive disorders",
      "Sedentary lifestyle health impacts",
    ],
    approach: [
      "Comprehensive Health Assessment",
      "Constitutional Treatment Plan",
      "Diet & Nutrition Guidance",
      "Exercise & Activity Planning",
      "Metabolic Health Monitoring",
      "Long-term Wellness Support",
    ],
    howWeHelp: [
      { icon: "Activity", label: "Boost Energy Levels" },
      { icon: "TrendingUp", label: "Improve Metabolism" },
      { icon: "Heart", label: "Support Heart Health" },
      { icon: "Shield", label: "Strengthen Immunity" },
      { icon: "Sparkles", label: "Enhance Vitality" },
    ],
    holisticCare: {
      title: "Your Active Life Starts Here",
      description:
        "We help you overcome lifestyle disorders naturally and sustainably, so you can live an active, fulfilling life.",
      image: "/images/chronic-diseases.jpg",
    },
    commonConcerns: [
      { icon: "TrendingUp", label: "Weight Issues" },
      { icon: "Activity", label: "Diabetes" },
      { icon: "Heart", label: "Blood Pressure" },
      { icon: "Thermometer", label: "Cholesterol" },
      { icon: "Shield", label: "Joint Pain" },
      { icon: "Apple", label: "Digestive Issues" },
      { icon: "Brain", label: "Chronic Fatigue" },
    ],
    testimonial: {
      quote:
        '"My energy levels are completely different now. I feel 10 years younger thanks to Dr. Pathak\'s treatment."',
      author: "— 45-year-old patient",
    },
    ctaTitle: "Start Living Your Active Life",
    ctaDescription:
      "Book an appointment and take the first step towards better health.",
  },
  {
    slug: "healthy-ageing",
    title: "Healthy Ageing Program",
    subtitle: "Age Gracefully. Stay Strong. Live Fully.",
    description:
      "Natural homoeopathic support for age-related health concerns — bone health, memory, joint care and overall well-being.",
    heroImage: "/images/chronic-diseases.jpg",
    benefits: [
      { icon: "Shield", label: "Joint Health" },
      { icon: "Brain", label: "Memory Support" },
      { icon: "Heart", label: "Heart Health" },
      { icon: "Activity", label: "Bone Strength" },
      { icon: "Sparkles", label: "Vitality" },
    ],
    whoIsItFor: [
      "Seniors with joint pain or arthritis",
      "Memory concerns and cognitive decline",
      "Osteoporosis and bone health",
      "Prostate health issues",
      "Age-related vision and hearing concerns",
      "Chronic conditions management",
      "General wellness and preventive care",
    ],
    approach: [
      "Comprehensive Geriatric Assessment",
      "Gentle Homoeopathic Treatment",
      "Nutrition for Ageing Bodies",
      "Mobility & Exercise Guidance",
      "Cognitive Health Support",
      "Family & Caregiver Counseling",
    ],
    howWeHelp: [
      { icon: "Shield", label: "Maintain Joint Health" },
      { icon: "Brain", label: "Support Memory" },
      { icon: "Heart", label: "Protect Heart Health" },
      { icon: "Activity", label: "Strengthen Bones" },
      { icon: "Sparkles", label: "Boost Vitality" },
    ],
    holisticCare: {
      title: "Graceful Ageing with Nature",
      description:
        "Ageing doesn't mean slowing down. Our gentle homoeopathic care helps you stay active, sharp and healthy as you age.",
      image: "/images/chronic-diseases.jpg",
    },
    commonConcerns: [
      { icon: "Shield", label: "Arthritis" },
      { icon: "Brain", label: "Memory Loss" },
      { icon: "Activity", label: "Osteoporosis" },
      { icon: "Heart", label: "Heart Issues" },
      { icon: "Eye", label: "Vision Concerns" },
      { icon: "Ear", label: "Hearing Issues" },
      { icon: "Thermometer", label: "Prostate Health" },
    ],
    testimonial: {
      quote:
        '"At 68, I feel healthier and more active than I did at 55. Homoeopathy has been life-changing."',
      author: "— 68-year-old patient",
    },
    ctaTitle: "Age Gracefully with Our Support",
    ctaDescription:
      "Book a consultation and start your healthy ageing journey.",
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function getAllProgramSlugs(): string[] {
  return programs.map((p) => p.slug);
}
