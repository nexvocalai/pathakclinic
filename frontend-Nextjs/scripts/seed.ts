import { PrismaClient } from '@prisma/client';
import { diseases } from '../lib/diseases-data';
import { blogPosts } from '../lib/blog-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed...');
  
  // Seed Diseases
  for (const disease of diseases) {
    await prisma.disease.upsert({
      where: { slug: disease.slug },
      update: {},
      create: {
        slug: disease.slug,
        name: disease.name,
        category: disease.category,
        symptoms: JSON.stringify(disease.symptoms),
        causes: JSON.stringify(disease.causes),
        homoeopathicApproach: disease.homoeopathicApproach,
        remedies: JSON.stringify(disease.remedies),
        precautions: JSON.stringify(disease.precautions),
        duration: disease.duration,
        image: disease.image,
        successRate: disease.successRate,
        detailedInfo: disease.detailedInfo,
      },
    });
  }
  console.log('Diseases seeded.');

  // Seed Blogs
  for (const post of blogPosts) {
    await prisma.blog.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        date: post.date,
        readTime: post.readTime.toString(),
        image: post.image,
      },
    });
  }
  console.log('Blogs seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
