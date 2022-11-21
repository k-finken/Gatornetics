import { prisma, PrismaClient } from '@prisma/client';


export default async function handle(req, res) {
  const prisma = new PrismaClient()
  const players = await prisma.players.findMany()
  res.json(players)
}