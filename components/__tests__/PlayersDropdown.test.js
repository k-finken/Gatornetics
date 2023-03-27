import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import PlayersDropdown from '../PlayersDropdown'
import '@testing-library/jest-dom'

afterEach(cleanup);

const playerTeam = [
    {id: 1, firstName: 'Cole', lastName: 'Johnson'},
    {id: 2, firstName: 'Kyle', lastName: 'Finken'},
    {id: 3, firstName: 'Mason', lastName: 'Green'},
    {id: 4, firstName: 'Emmanuel', lastName: 'Garit'},
    {id: 5, firstName: 'Christian', lastName: 'Martinez'},
];

test("PlayersDropdown renders", () => {
    render(<PlayersDropdown teamArray={playerTeam} title="Teamates" />);

    const playersDropdown = screen.getByTestId('PlayersDropdown-1')

    expect(playersDropdown).toBeInTheDocument()
});

test("PlayersDropdown shows placeholder text", () => {
    render(<PlayersDropdown teamArray={playerTeam} title="Teamates" />);
    
    const input = screen.getByPlaceholderText('Teamates');
    
    expect(input).toBeInTheDocument();
});

test("PlayersDropdown searches team member", () => {
    render(<PlayersDropdown teamArray={playerTeam} title="Teamates" />);

    const input = screen.getByPlaceholderText('Teamates');
    fireEvent.change(input, { target: { value: 'cole' } });
    const playerNames = screen.getAllByText(/Cole Johnson/);

    expect(playerNames.length).toBe(1);
});

test("Display Player Not Found when search not valid", () => {
    render(<PlayersDropdown teamArray={playerTeam} title="Teamates" />);

    const input = screen.getByPlaceholderText('Teamates');
    fireEvent.change(input, { target: { value: 'Blanchard' } });
    const notFound = screen.getByText('Player not found.');

    expect(notFound).toBeInTheDocument();
})