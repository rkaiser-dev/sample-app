import { Convention, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const writeSample = async () => {
  console.log('Calling writeSample()');
  await prisma.convention.create({
    data: {
      titleLong: 'Test Convention',
      titleShort: 'Test',
      cycleStart: new Date('2024-01-01'),
      cycleEnd: new Date('2024-12-31'),
      cycleYear: 2024,
      startDate: new Date('2024-07-01'),
      endDate: new Date('2024-07-04'),
    },
  });
};

export const readSample = async (): Promise<Convention[]> => {
  const result = await prisma.convention.findMany();
  return result;
};
