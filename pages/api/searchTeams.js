import prisma from '../../lib/prisma'

export default async function handle(req, res) {
  const searchString = req.query.queryString
  // searchStringTokens[0] = "(<" + searchStringTokens[0];
  // searchStringTokens[1] = ">" + searchStringTokens[1] + ")";

  // const modifiedSearchString = searchStringTokens.join(" ");
  console.log(searchString)

  const resultPlayers = await prisma.teams.findMany({
    where: {
      school:{
        startsWith: searchString
      },
    },
    take: 5
  })
  res.json(resultPlayers)
}