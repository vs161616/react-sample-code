/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import InvoiceList from "./index";
import { useInvoices } from "../../contexts/InvoiceContext"; // Adjust path as needed

jest.mock("../../contexts/InvoiceContext", () => ({
  useInvoices: jest.fn(),
}));

const mockUseInvoices = {
  invoices: [
    {
      id: "1",
      _id: "1", // Assuming _id is used internally
      paymentDue: "2024-06-30",
      clientName: "Client A",
      total: 500,
      status: "Paid",
    },
    {
      id: "2",
      _id: "2",
      paymentDue: "2024-07-15",
      clientName: "Client B",
      total: 700,
      status: "Pending",
    },
  ],
  deleteInvoice: jest.fn(),
};

describe("InvoiceList Component", () => {
  beforeEach(() => {
    (useInvoices as jest.Mock).mockReturnValue(mockUseInvoices);
  });

  const renderInvoiceList = (
    setSelectedInvoice: (
      invoiceId: string,
      operation: "view" | "edit" | "create",
    ) => void,
  ) => {
    return render(<InvoiceList setSelectedInvoice={setSelectedInvoice} />);
  };

  it("renders the list of invoices", () => {
    const mockSetSelectedInvoice = jest.fn();
    renderInvoiceList(mockSetSelectedInvoice);

    expect(screen.getByText(/Due 2024-06-30/i)).toBeInTheDocument();
    expect(screen.getByText(/Client A/i)).toBeInTheDocument();
    expect(screen.getByText(/500/i)).toBeInTheDocument();
    expect(screen.getByText(/Paid/i)).toBeInTheDocument();

    expect(screen.getByText(/Due 2024-07-15/i)).toBeInTheDocument();
    expect(screen.getByText(/Client B/i)).toBeInTheDocument();
    expect(screen.getByText(/700/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });

  it("opens the delete dialog when delete button is clicked", () => {
    const mockSetSelectedInvoice = jest.fn();
    renderInvoiceList(mockSetSelectedInvoice);

    act(() => {
      fireEvent.click(screen.getAllByLabelText(/delete/i)[0]);
    });

    expect(
      screen.getByText(/Are you sure you want to delete this item?/i),
    ).toBeInTheDocument();
  });

  it("calls setSelectedInvoice with correct parameters when invoice is clicked", () => {
    const mockSetSelectedInvoice = jest.fn();
    renderInvoiceList(mockSetSelectedInvoice);

    act(() => {
      fireEvent.click(screen.getAllByLabelText(/arrow-right/i)[0]);
    });

    expect(mockSetSelectedInvoice).toHaveBeenCalledWith("1", "view");
  });

  it("calls deleteInvoice when delete is confirmed", async () => {
    const mockSetSelectedInvoice = jest.fn();
    renderInvoiceList(mockSetSelectedInvoice);

    act(() => {
      fireEvent.click(screen.getAllByLabelText(/delete/i)[0]);
    });
    expect(
      screen.getByText(/Are you sure you want to delete this item?/i),
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
    });

    expect(mockUseInvoices.deleteInvoice).toHaveBeenCalledWith("1");
  });
});
