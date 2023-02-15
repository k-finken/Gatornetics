import prisma from '../../lib/prisma'

export default async function handle(res) {

  const resultTeams = prisma.teams.findMany({
    orderBy: [
        {
            talentScore: 'asc',
        }
    ],
    take: 3,
  })

  res.json(resultTeams)
  
}