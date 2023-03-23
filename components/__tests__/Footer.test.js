import { render, screen, cleanup } from '@testing-library/react'
import Footer from '../Footer'
import '@testing-library/jest-dom'

afterEach(cleanup);

test("Footer renders", () => {
    render(<Footer />)

    const footer = screen.getByTestId('Footer-1')

    expect(footer).toBeInTheDocument()
});

test("footer contains all text", () => {
    render(<Footer />)

    const footer = screen.getByTestId('Footer-1')

    expect(footer).toHaveTextContent("Gatornetics")
    expect(footer).toHaveTextContent("FAQ")
    expect(footer).toHaveTextContent("© 2022 Gatornetics. All Rights Reserved")
});

test("footer FAQ redirects", () => {
    render(<Footer />)

    const faq = screen.getByText("FAQ")

    expect(faq).toContainHTML("href=\"/faq\"")
});

test("footer Gatornetics correct format", () => {
    render(<Footer />)

    const gatornetics = screen.queryAllByText("Gatornetics").at(0);

    expect(gatornetics).toContainHTML("text-2xl font-bold text-white hover:text-blue-600 cursor-pointer")
})