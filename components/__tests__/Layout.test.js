import { render, screen, cleanup } from '@testing-library/react'
import Layout from '../Layout'
import '@testing-library/jest-dom'

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
})