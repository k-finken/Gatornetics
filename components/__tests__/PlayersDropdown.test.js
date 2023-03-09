import { render, screen, cleanup } from '@testing-library/react'
import PlayersDropdown from '../PlayersDropdown'
import '@testing-library/jest-dom'

afterEach(cleanup);

test("PlayersDropdown renders", () => {
    render(<PlayersDropdown />)

    const playersDropdown = screen.getByTestId('PlayersDropdown-1')

    expect(playersDropdown).toBeInTheDocument()
});