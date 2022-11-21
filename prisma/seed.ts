import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        id: 371,
        title: 'Driven.t',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        startsAt: '2022-11-17T22:29:28.269Z',
        endsAt: '2022-12-08T22:29:28.270Z',
        createdAt: '2022-11-17T22:29:28.274Z',
        updatedAt: '2022-11-17T22:29:28.275Z'
      },
    });
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
