import { render, screen, cleanup } from '@testing-library/react'
import Navbar from '../Navbar'
import '@testing-library/jest-dom'

afterEach(cleanup);

test("Navbar renders", () => {
    render(<Navbar />)

    const navbar = screen.getByTestId('Navbar-1')

    expect(navbar).toBeInTheDocument()
});