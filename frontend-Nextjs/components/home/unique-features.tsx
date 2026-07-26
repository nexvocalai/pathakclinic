import {
  ClipboardCheck,
  FolderOpen,
  Users,
  Activity,
  FileText,
  TrendingUp,
  Heart,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: ClipboardCheck,
    title: "Interactive Health Assessment",
    description: "Know your health score in 2 minutes",
  },
  {
    icon: FolderOpen,
    title: "Digital Case Taking",
    description: "Save time & share information easily",
  },
  {
    icon: Users,
    title: "Family Health Dashboard",
    description: "Manage your entire family in one place",
  },
  {
    icon: Activity,
    title: "Health Trackers",
    description: "Track sleep, steps, water & more",
  },
  {
    icon: FileText,
    title: "Personalized Wellness Report",
    description: "Get your health plan in one comprehensive PDF",
  },
  {
    icon: TrendingUp,
    title: "Child Growth Tracker",
    description: "Monitor growth & milestones",
  },
  {
    icon: Heart,
    title: "Women Wellness Tracker",
    description: "Track cycles, symptoms & better well-being",
  },
  {
    icon: Bot,
    title: "AI Health Assistant",
    description: "Instant access to health guidance",
  },
];

export function UniqueFeatures() {
  return (
    <section className="py-16 md:py-20 bg-[var(--color-cream)]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
            Unique Features That Set Us Apart
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col items-center rounded-xl bg-white p-5 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-navy)]/8 transition-all group-hover:bg-[var(--color-navy)]/15 group-hover:scale-110">
                <feature.icon className="h-5 w-5 text-[var(--color-navy)]" />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-[var(--color-navy)]">
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
