import React from 'react';
import Grid from '@react-css/grid';

export default function TeamLeaderboard() {

    const data = [
        {
            talentScore: 1016.79,
            name: "Alabama",
            image: "https://a.espncdn.com/i/teamlogos/ncaa/500/333.png",
            conference: "SEC"
        },
        {
            talentScore: 989.76,
            name: "Georgia",
            image: "https://a.espncdn.com/i/teamlogos/ncaa/500/61.png",
            conference: "SEC"
        },
        {
            talentScore: 983.14,
            name: "Ohio State",
            image: "https://a.espncdn.com/i/teamlogos/ncaa/500/194.png",
            conference: "Big Ten"
        }
    ]

    return (
        <section className="grid lg:grid-cols-5 lg:grid-rows-4">
            <div className="lg:row-span-1">
                <div className="lg:col-span-1">
                    <label>Rank</label>
                </div>
                <div className="lg:col-span-1">
                    <label>Team Name</label>
                </div>
                <div className="lg:col-span-1">
                    <label></label>
                </div>
                <div className="ladder-nav--results-col">
                    <label>P2</label>
                </div>
                <div className="ladder-nav--results-col">
                    <label>GP</label>
                </div>
                <div className="ladder-nav--results-col">
                    <label>PTS</label>
                </div>
            </div>
            <div className="lg:col-span-1">
                <ul>
                    { data.map((team) => (
                        <div className="lg:row-span-1" key={team}>
                            <div className="results-col">
                                <span className="results-rank"><span className="positions">1</span></span>
                            </div>
                            <div className="results-col">
                                <span className="results-team">Nihilum</span>
                            </div>
                            <div className="results-col">
                                <span className="results-p1">Hydramist</span>
                            </div>
                            <div className="results-col">
                                <span className="results-p2">Reckful</span>
                            </div>
                            <div className="results-col">
                                <span className="results-gp">7</span>
                            </div>
                            <div className="results-col">
                                <span className="results-pts">512</span>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </section>
    )
}