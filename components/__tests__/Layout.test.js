import { render, screen, cleanup } from '@testing-library/react'
import Layout from '../Layout'
import '@testing-library/jest-dom'
import NavBar from '../Navbar';

afterEach(cleanup);

test("Layout renders", () => {
    render(<Layout />)

    const layout = screen.getByTestId('Layout-1')

    expect(layout).toBeInTheDocument()
});

test("Layout has correct formatting", () => {
    render(<Layout />)

    const layout = screen.getByTestId('Layout-1')

    expect(layout).toContainHTML("bg-gradient-to-b from-gray-900 to-gray-600")
});

test("Layout contains header and footer components", () => {
    render(<Layout />)

    const navbar = screen.getByTestId('Navbar-1')
    const footer = screen.getByTestId('Footer-1')

    expect(navbar).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
});