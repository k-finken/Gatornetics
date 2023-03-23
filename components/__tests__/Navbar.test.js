import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import Navbar from '../Navbar'
import '@testing-library/jest-dom'

afterEach(cleanup);

test("Navbar renders", () => {
    render(<Navbar />)

    const navbar = screen.getByTestId('Navbar-1')

    expect(navbar).toBeInTheDocument()
});

test("Renders search input", () => {
    render(<Navbar />);

    const searchInput = screen.getByRole('textbox', { name: 'Search' });

    expect(searchInput).toBeInTheDocument();
});

test("Renders Gatornetics title", () => {
    render(<Navbar />);

    const title = screen.getByText('Gatornetics');

    expect(title).toBeInTheDocument();
});
