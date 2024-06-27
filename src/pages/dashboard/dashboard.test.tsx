import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { useInvoices } from '../../contexts/InvoiceContext'; // Ensure correct import
import Dashboard from './index';

jest.mock('../../contexts/InvoiceContext', () => ({
  useInvoices: jest.fn(), // Mock the useInvoices hook
}));

const mockUseInvoices = {
  invoices: [
    { id: '1', name: 'Invoice 1', status: 'paid', total: 100, date: '2022-01-01' },
    { id: '2', name: 'Invoice 2', status: 'pending', total: 200, date: '2022-01-02' },
  ],
  fetchInvoices: jest.fn(),
  createInvoice: jest.fn(),
  setSelectedInvoiceId: jest.fn(),
  updateInvoice: jest.fn(),
  deleteInvoice: jest.fn(),
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.resetModules(); // Reset modules to clear any cached module mocks
    (useInvoices as jest.Mock).mockReturnValue(mockUseInvoices); // Mock useInvoices with defined values
  });

  const renderDashboard = () => {
    return render(
      <MemoryRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('renders the dashboard with the correct title and initial state', () => {
    renderDashboard();

    expect(screen.getByText(/There are 2 total invoices/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Select an option/i)).toBeInTheDocument();
    expect(screen.getByText(/New Invoice/i)).toBeInTheDocument();
  });

  it('opens the drawer when "New Invoice" button is clicked', () => {
    renderDashboard();

    fireEvent.click(screen.getByText(/New Invoice/i));

    expect(screen.getByText(/Create Invoice/i)).toBeInTheDocument(); // Assuming "Create Invoice" text appears in the drawer
  });

  it('closes the drawer when the drawer close action is triggered', () => {
    renderDashboard();

    fireEvent.click(screen.getByText(/New Invoice/i));

    expect(screen.getByText(/Create Invoice/i)).toBeInTheDocument(); // Assuming "Create Invoice" text appears in the drawer

    // Replace with the actual close button identifier
    const closeButton = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeButton);

    expect(screen.queryByText(/Create Invoice/i)).not.toBeInTheDocument();
  });

  it('shows the correct number of invoices', () => {
    renderDashboard();

    expect(screen.getByText(/There are 2 total invoices/i)).toBeInTheDocument();
  });

  it('handles invoice selection and opens the drawer in view mode', () => {
    renderDashboard();

    fireEvent.click(screen.getByText(/Invoice 1/i)); // Assuming each invoice name is clickable

    expect(screen.getByText(/View Invoice/i)).toBeInTheDocument(); // Assuming "View Invoice" text appears in the drawer
  });
});
