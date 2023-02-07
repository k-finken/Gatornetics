import React from 'react';
import Grid from '@react-css/grid';

export default function TeamLeaderboard() {

    const data = [
        {
            rank: 1,
            talentScore: 1016.79,
            name: "Alabama",
            image: "https://a.espncdn.com/i/teamlogos/ncaa/500/333.png",
            conference: "SEC"
        },
        {
            rank: 2,
            talentScore: 989.76,
            name: "Georgia",
            image: "https://a.espncdn.com/i/teamlogos/ncaa/500/61.png",
            conference: "SEC"
        },
        {
            rank: 3,
            talentScore: 983.14,
            name: "Ohio State",
            image: "https://a.espncdn.com/i/teamlogos/ncaa/500/194.png",
            conference: "Big Ten"
        }
    ]

    return (
        <table id="rankings" class="leaderboard-results" width="100%">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>Talent Score</th>
                    <th>Conference</th>
                </tr>
            </thead>
            <tbody className='flex border align-items-center'>
                <ul>
                    {
                        data.map((team) => (
                            <tr as="li" key={team}>
                                <td>{team.rank}</td>
                                <td>{team.name}</td>
                                <td>{team.talentScore}</td>
                                <td>{team.conference}</td>
                            </tr>
                    )) }
                </ul>
            </tbody>
        </table>
    )
}