import prisma from '../../lib/prisma'

export default async function handle(req, res) {
  const searchString = req.query.queryString
  const searchStringTokens = searchString.split(" ")
  // searchStringTokens[0] = "(<" + searchStringTokens[0];
  // searchStringTokens[1] = ">" + searchStringTokens[1] + ")";

  // const modifiedSearchString = searchStringTokens.join(" ");

  const resultPlayers = await prisma.players.findMany({
    where: {
      lastName:{
        search: searchStringTokens[1]
      },
      firstName: {
        search: searchStringTokens[0]
      },
    },
    take: 10
  })
  res.json(resultPlayers)
}
