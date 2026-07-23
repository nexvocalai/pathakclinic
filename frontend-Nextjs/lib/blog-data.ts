export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Homoeopathy: How It Works",
    slug: "understanding-homoeopathy",
    excerpt:
      "Discover the fundamental principles of homoeopathy and how it treats the root cause of diseases rather than just symptoms.",
    content: `Homoeopathy is a holistic system of medicine that has been practiced for over 200 years. It is based on the principle of "like cures like" - the idea that a substance that causes symptoms in a healthy person can cure similar symptoms in a sick person.

Dr. Samuel Hahnemann founded homoeopathy after discovering that cinchona bark (which causes malaria-like symptoms) could also cure malaria. This led him to develop the fundamental laws of homoeopathy.

Key principles include:
- The Law of Similars: Like cures like
- The Law of Potentization: Dilution and succussion increase potency
- Individualization: Each person needs a unique remedy based on their constitution

Homoeopathic remedies are highly diluted substances derived from plants, minerals, and animal sources. These dilutions are potentized through a specific process of serial dilution and vigorous shaking.

The beauty of homoeopathy lies in its ability to stimulate the body's own healing mechanisms, making it a truly holistic approach to health.`,
    author: "Dr. Pathak",
    date: "2025-05-08",
    category: "General",
    readTime: 5,
    image: "/images/blog-header.jpg",
  },
  {
    id: "2",
    title: "Natural Remedies for Chronic Skin Conditions",
    slug: "natural-remedies-skin",
    excerpt:
      "Explore how homoeopathic treatment can effectively address eczema, psoriasis, and other chronic skin disorders without steroids.",
    content: `Chronic skin conditions like eczema and psoriasis affect millions worldwide. Unlike conventional treatments that suppress symptoms with steroids, homoeopathy addresses the underlying causes.

Eczema, or dermatitis, often stems from internal imbalances. Homoeopathic remedies work by:
- Reducing inflammation from within
- Balancing the immune system
- Addressing emotional stress that triggers flare-ups
- Restoring the skin's natural healing ability

Common homoeopathic remedies for skin conditions include:
- Sulphur: For itchy, burning skin
- Graphites: For thick, fissured skin
- Hepar Sulphuris: For sensitive, suppurative conditions
- Natrum Muriaticum: For dry, lichen-like conditions

Case studies show that 80% of patients with chronic dermatitis experience significant improvement within 3-6 months of homoeopathic treatment.

The holistic approach considers diet, stress levels, and emotional factors, making recovery more complete and lasting.`,
    author: "Dr. Pathak",
    date: "2025-05-01",
    category: "Skin Health",
    readTime: 7,
    image: "/images/skin-health.jpg",
  },
  {
    id: "3",
    title: "Managing Asthma Naturally: A Holistic Approach",
    slug: "managing-asthma-naturally",
    excerpt:
      "Learn how homoeopathy can reduce asthma frequency and severity while building long-term respiratory health.",
    content: `Asthma affects over 300 million people globally. While allopathic inhalers provide quick relief, homoeopathy addresses the root cause - whether it's allergic sensitivity, emotional stress, or constitutional weakness.

Homoeopathic treatment for asthma focuses on:
- Reducing respiratory sensitivity
- Strengthening the immune system
- Addressing triggers (allergies, emotions, weather)
- Building constitutional strength

Individualized remedies consider:
- Trigger factors (cold, stress, allergens)
- Type of cough (dry, loose, spasmodic)
- Associated symptoms (anxiety, fatigue, digestive issues)
- Constitutional type

Success rates are encouraging, with many patients able to reduce inhaler dependency significantly after 6-12 months of treatment.

Lifestyle modifications including dietary changes, stress management, and environmental modifications support the remedies for faster results.`,
    author: "Dr. Pathak",
    date: "2025-04-24",
    category: "Respiratory Health",
    readTime: 6,
    image: "/images/allergy-asthma.jpg",
  },
  {
    id: "4",
    title: "Women's Health: PCOS and Homoeopathic Solutions",
    slug: "womens-health-pcos",
    excerpt:
      "Understanding PCOS and how homoeopathy offers natural solutions for hormonal balance and fertility.",
    content: `Polycystic Ovary Syndrome (PCOS) affects 1 in 10 women of reproductive age. It causes irregular periods, fertility issues, and metabolic problems. Conventional treatment focuses on symptom management, but homoeopathy addresses the underlying hormonal imbalance.

Homoeopathic approach to PCOS:
- Restores hormonal balance naturally
- Regulates menstrual cycle
- Improves fertility
- Reduces cyst formation
- Manages weight effectively
- Addresses emotional components (anxiety, mood swings)

Treatment is highly individualized based on:
- Menstrual pattern and intensity
- Fertility concerns
- Metabolic issues
- Emotional symptoms
- Overall constitution

Combined with lifestyle changes (diet, exercise, stress management), homoeopathic treatment shows remarkable results in 6-9 months.

Many women have conceived naturally after homoeopathic treatment, avoiding expensive fertility procedures.`,
    author: "Dr. Pathak",
    date: "2025-04-17",
    category: "Women's Health",
    readTime: 7,
    image: "/images/womens-health.jpg",
  },
  {
    id: "5",
    title: "Boosting Immunity in Children Naturally",
    slug: "boosting-immunity-children",
    excerpt:
      "Safe and gentle homoeopathic methods to strengthen children's immunity and reduce recurrent infections.",
    content: `Recurrent infections in children are a common concern for parents. Rather than repeated antibiotics that damage beneficial gut bacteria, homoeopathy strengthens immunity naturally.

Why children get recurrent infections:
- Weak constitutional immunity
- Improper nutrition
- Environmental stress
- Emotional factors

Homoeopathic benefits for child health:
- Strengthens immune system from within
- Reduces infection frequency
- Shortens infection duration
- Supports healthy growth and development
- No side effects or dependency
- Safe even for newborns

Common remedies for immunity in children:
- Calcarea Phosphorica: For weak, pale children
- Baryta Carbonica: For enlarged glands and weak immunity
- Medorrhinum: For constitutional weakness
- Sulphur: For recurrent infections with strong vitality

Prevention is always better than cure. Regular homoeopathic care during childhood builds strong immunity for life.`,
    author: "Dr. Pathak",
    date: "2025-04-10",
    category: "Child Care",
    readTime: 6,
    image: "/images/child-care.jpg",
  },
  {
    id: "6",
    title: "Conquering Anxiety and Stress Through Homoeopathy",
    slug: "conquering-anxiety-stress",
    excerpt:
      "Discover how homoeopathic remedies can naturally calm anxiety and stress without the side effects of conventional medications.",
    content: `Modern life brings unprecedented stress and anxiety. While conventional medicine offers tranquilizers that can be addictive, homoeopathy offers safe, non-habit forming alternatives.

Understanding anxiety from homoeopathic perspective:
- Anxiety is often a symptom of constitutional imbalance
- Triggers vary: work stress, relationships, health concerns, perfectionism
- Each person's anxiety manifests uniquely

Homoeopathic remedies address:
- Root cause of anxiety
- Physical symptoms (palpitations, trembling, sleep issues)
- Emotional patterns (worry, fear, overwhelm)
- Mental clarity and focus

Popular remedies:
- Aconite: For sudden, acute anxiety and fear
- Argentum Nitricum: For anticipatory anxiety
- Phosphoricum Acidum: For exhaustion from overwork
- Gelsemium: For anxiety with paralysis

Treatment success requires:
- Accurate symptom assessment
- Constitutional matching
- Lifestyle support (exercise, meditation, healthy diet)

Patients report feeling calmer, clearer, and more resilient within weeks of starting homoeopathic treatment.`,
    author: "Dr. Pathak",
    date: "2025-04-03",
    category: "Mental Health",
    readTime: 8,
    image: "/images/mental-health.jpg",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(blogPosts.map((post) => post.category)));
}
