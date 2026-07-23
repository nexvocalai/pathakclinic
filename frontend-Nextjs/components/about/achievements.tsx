import Image from "next/image";
import { Trophy, Award, BookOpen, Lightbulb } from "lucide-react";

interface Achievement {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    icon: <Trophy className="h-6 w-6 text-primary" />,
    title: "Best Homoeopathic Doctor Award",
    description: "Recognized for excellence in patient care and treatment outcomes by Homoeopathy Association 2022",
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: "Certified Homoeopath",
    description: "Certified by International Homoeopathic Medical Board with continuous professional development",
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: "Published Research",
    description: "Published multiple research papers on chronic disease management in homoeopathic journals",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    title: "Expert Speaker",
    description: "Regular speaker at national and international homoeopathy conferences and medical seminars",
  },
];

export function Achievements() {
  return (
    <section className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Achievements & Recognition</h2>
        <p className="text-muted-foreground">
          Dr. Pathak's commitment to excellence has earned recognition from the homoeopathic community and patients worldwide.
        </p>
      </div>

      {/* Achievements Image */}
      {/* <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-80">
        <Image
          src="/images/achievements.jpg"
          alt="Dr. Pathak's Achievements and Awards"
          fill
          className="object-cover"
        />x
      </div> */}

      {/* Achievements Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              {achievement.icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              {achievement.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>

      {/* Membership Section */}
      <div className="rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 p-8 border border-primary/20">
        <h3 className="mb-4 text-xl font-bold text-foreground">Professional Memberships</h3>
        <ul className="space-y-2 text-foreground">
          <li className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Member, Central Council for Research in Homoeopathy (CCRH)
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Fellow, National Board of Homoeopathy
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Active Member, Indian Homoeopathic Medical Association
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Life Member, Institute of Advanced Homoeopathy
          </li>
        </ul>
      </div>
    </section>
  );
}
