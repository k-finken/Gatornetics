import { render, screen, cleanup } from '@testing-library/react'
import PlayersDropdown from '../PlayersDropdown'
import '@testing-library/jest-dom'

afterEach(cleanup);

test("PlayersDropdown renders", () => {
    const player1 = {id: 1, firstName: 'Anthony', lastName: 'Richardson'}
    const player2 = {id: 2, firstName: 'Stetson', lastName: 'Bennett'}
    const playerTeam = {player1, player2}
    const title = 'Teamates'
    render(<PlayersDropdown teamArray={playerTeam} title={title} />)

    const playersDropdown = screen.getByTestId('PlayersDropdown-1')

    expect(playersDropdown).toBeInTheDocument()
});