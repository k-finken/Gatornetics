import prisma from '../../lib/prisma'

export default async function handle(req, res) {
    const posTeam = req.query.queryPosTeam
    console.log(posTeam)
    const posTeamTokens = posTeam.split(" ")
    const pos = posTeamTokens[0]
    const team = parseInt(posTeamTokens[1])

    const resultPlayers = await prisma.players.findMany({
        where: {
            position:pos, //"RB"
            team_id:team,  //57
        },
    })
    res.json(resultPlayers)
}