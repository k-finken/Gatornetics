import { render, screen, cleanup } from '@testing-library/react'
import TeamLeaderboard from '../TeamLeaderboard'
import '@testing-library/jest-dom'

afterEach(cleanup);

test("TeamLeaderboard renders", () => {
    render(<TeamLeaderboard />)

    const teamLeaderboard = screen.getByTestId('TeamLeaderboard-1')

    expect(teamLeaderboard).toBeInTheDocument()
});

test("TeamLeaderboard has 3 rows", () => {
    render(<TeamLeaderboard />)

    const teamLeaderboardRows = screen.getAllByTestId('TeamLeaderboard-row')

    expect(teamLeaderboardRows.length).toBe(3)
})

test("TeamLeaderboard rows have correct formatting", () => {
    render(<TeamLeaderboard />)

    const teamLeaderboardRows = screen.getAllByTestId('TeamLeaderboard-row')

    for(let i = 0; i < teamLeaderboardRows.length; i++) {
        expect(teamLeaderboardRows[i]).toContainHTML("rounded-md bg-gray-700 items-center text-lg font-medium justify-items-center my-2 h-12 text-gray-200 hover:cursor-pointer hover:text-gray-300 hover:bg-gray-600")
    }
})
