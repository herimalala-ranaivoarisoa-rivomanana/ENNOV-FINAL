/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Init Prisma Client
const prisma = new PrismaClient();

export const roundsOfhashing = 10;

async function main() {
  const user1Password = await bcrypt.hash(
    'mypassword@ennov.io-test',
    roundsOfhashing,
  );
  const user2Password = await bcrypt.hash(
    'reviewerpassword@ennov.io-test',
    roundsOfhashing,
  );

  // Crete dummy users
  const user1 = await prisma.user.upsert({
    where: { email: 'ranaivoarisoa@gmx.fr' },
    update: {},
    create: {
      email: 'ranaivoarisoa@gmx.fr',
      name: 'Rivomanana',
      password: user1Password,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'reviewer@ennov.io' },
    update: {},
    create: {
      email: 'reviewer@ennov.io',
      name: 'Ennov.io Reviewer',
      password: user2Password,
    },
  });

  // Create dummy products
  const post1 = await prisma.product.upsert({
    where: { name: 'Product1' },
    update: {},
    create: {
      name: 'Product1',
      price: 41,
      description: 'Description1',
    },
  });

  const post2 = await prisma.product.upsert({
    where: { name: 'Product2' },
    update: {},
    create: {
      name: 'Product2',
      price: 42,
      description: 'Description2',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
