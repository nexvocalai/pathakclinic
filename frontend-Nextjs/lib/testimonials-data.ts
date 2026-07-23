export interface Testimonial {
  id: string;
  name: string;
  condition: string;
  rating: number;
  text: string;
  image?: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh&backgroundColor=b6e3f4",
    name: "Rajesh Kumar",
    condition: "Chronic Arthritis",
    rating: 5,
    text: "I had suffered from severe arthritis for 15 years, and nothing seemed to work. After 6 months of Dr. Pathak's treatment at the ONGC colony clinic in Noida, I can now walk without pain. Highly recommended!",
    date: "2 months ago"
  },
  {
    id: "2",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=c0aede",
    name: "Priya Sharma",
    condition: "PCOS & Hormonal Issues",
    rating: 5,
    text: "Best homeopathic doctor in Noida! My periods became irregular, and I was losing hope. Dr. Pathak's homoeopathic treatment restored my hormonal balance within 8 months.",
    date: "4 months ago"
  },
  {
    id: "3",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit&backgroundColor=d1d4f9",
    name: "Amit Patel",
    condition: "Severe Migraine",
    rating: 5,
    text: "I suffered from debilitating migraines twice a week for 10 years. Within 3 months of treatment here, the frequency reduced to once a month. The doctor is very patient and listens carefully.",
    date: "6 months ago"
  },
  {
    id: "4",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha&backgroundColor=ffdfbf",
    name: "Neha Singh",
    condition: "Skin Conditions & Acne",
    rating: 5,
    text: "My acne was destroying my self-confidence. After 2.5 months with Dr. Pathak, my skin is completely clear. The clinic is very clean and the staff is very polite.",
    date: "1 year ago"
  },
  {
    id: "5",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vijay&backgroundColor=ffd5dc",
    name: "Vijay Reddy",
    condition: "Diabetes Management",
    rating: 4,
    text: "My blood sugar levels were consistently high despite medications. Dr. Pathak's homoeopathic approach helped me reduce my medication to half within 6 months. Great experience overall.",
    date: "1 year ago"
  }
];
