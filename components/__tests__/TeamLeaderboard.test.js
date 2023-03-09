import { render, screen, cleanup } from '@testing-library/react'
import TeamLeaderboard from '../TeamLeaderboard'
import '@testing-library/jest-dom'

afterEach(cleanup);

test("TeamLeaderboard renders", () => {
    render(<TeamLeaderboard />)

    const teamLeaderboard = screen.getByTestId('TeamLeaderboard-1')

    expect(teamLeaderboard).toBeInTheDocument()
});