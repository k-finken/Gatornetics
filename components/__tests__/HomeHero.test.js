import { render, screen, cleanup } from '@testing-library/react'
import HomeHero from '../HomeHero'
import '@testing-library/jest-dom'

afterEach(cleanup);

test("HomeHero renders", () => {
    render(<HomeHero />)

    const homeHero = screen.getByTestId('HomeHero-1')

    expect(homeHero).toBeInTheDocument()
});