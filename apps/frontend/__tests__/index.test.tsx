import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '@/app/(pages)/(landing)/page'

describe('Landing Page', () => {
    it('renders a heading', () => {
        render(<Page />)
        const landing = screen.getByRole('heading', { level: 1 })
        expect(landing).toBeInTheDocument()
    })
})