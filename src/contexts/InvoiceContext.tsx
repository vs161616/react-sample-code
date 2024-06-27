/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/function-component-definition */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import axiosInstance from "../utils/axiosConfig";
import { IInvoice } from "../interfaces/utils/invoice";
import { useAuth } from "./AuthContext";
import { OutputObject, filterFalsyValues } from "../utils/transformPayload";
import { showErrorMsg, showSuccessMsg } from "../utils/notifications";
import { LoaderType, useLoader } from "./LoaderContext";

interface InvoiceContextType {
  invoices: IInvoice[];
  fetchInvoices: () => void;
  createInvoice: (invoice: OutputObject) => void;
  selectedInvoice: IInvoice | null;
  setSelectedInvoiceId: React.Dispatch<React.SetStateAction<string>>;
  updateInvoice: (invoice: OutputObject) => void;
  deleteInvoice: (id: string) => void;
  saveAsDraft: (invoice: OutputObject) => void;
  markAsPaid: (invoiceId: string) => void;
  filter: "paid" | "draft" | "pending" | "all";
  setFilter: React.Dispatch<
    React.SetStateAction<"paid" | "draft" | "pending" | "all">
  >;
}

export const InvoiceContext = createContext<InvoiceContextType | undefined>(
  undefined,
);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<IInvoice[]>([]);
  const { isAuthenticated, handleUnathorised } = useAuth();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>("");
  const [selectedInvoice, setSelectedInvoice] = useState<IInvoice | null>(null);
  const [filter, setFilter] = useState<"paid" | "draft" | "pending" | "all">(
    "all",
  );
  const { setLoaderType, setLoading } = useLoader();

  const fetchInvoiceById = async () => {
    try {
      setLoaderType(LoaderType.FullWindow);
      setLoading(true);
      const response = await axiosInstance.get(
        `/api/invoice/${selectedInvoiceId}`,
      );
      setSelectedInvoice(response.data);
      setLoading(false);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        handleUnathorised();
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedInvoiceId) {
      fetchInvoiceById();
    } else {
      setSelectedInvoice(null);
    }
  }, [selectedInvoiceId]);

  const fetchInvoices = async () => {
    try {
      setLoaderType(LoaderType.FullWindow);
      setLoading(true);
      const response = await axiosInstance.get("/api/invoices");
      setInvoices(response.data);
      setLoading(false);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        handleUnathorised();
      } else {
        showErrorMsg(error.response.data.error || "Something went wrong");
      }
      setLoading(false);
    }
  };

  const createInvoice = async (invoice: OutputObject) => {
    try {
      setLoaderType(LoaderType.HalfWindow);
      setLoading(true);
      const response = await axiosInstance.post("/api/invoice", invoice);
      setInvoices((prevInvoices) => [...prevInvoices, response.data]);
      setLoading(false);
      showSuccessMsg("Invoice created successfully");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        handleUnathorised();
      } else {
        showErrorMsg(error.response.data.error || "Something went wrong");
      }
      setLoading(false);
    }
  };

  const updateInvoice = async (invoice: OutputObject) => {
    try {
      setLoaderType(LoaderType.HalfWindow);
      setLoading(true);
      const response = await axiosInstance.post(
        `/api/invoice/${selectedInvoiceId}`,
        invoice,
      );
      setInvoices((prevInvoices) =>
        prevInvoices.map((inv) =>
          // eslint-disable-next-line no-underscore-dangle
          inv._id === selectedInvoice?._id ? response.data : inv,
        ),
      );
      setLoading(false);
      showSuccessMsg("Invoice updated successfully");
    } catch (error: any) {
      console.log(error, "error");
      if (error.response && error.response.status === 401) {
        handleUnathorised();
      } else {
        showErrorMsg(
          error.response.data.error.message || "Something went wrong",
        );
      }
      setLoading(false);
    }
  };

  const deleteInvoice = async (id: string) => {
    try {
      setLoaderType(LoaderType.FullWindow);
      setLoading(true);
      await axiosInstance.delete(`/api/invoice/${id}`);
      setInvoices((prevInvoices) =>
        // eslint-disable-next-line no-underscore-dangle
        prevInvoices.filter((inv) => inv._id !== id),
      );
      showSuccessMsg("Invoice deleted successfully");
      setLoading(false);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        handleUnathorised();
      } else {
        showErrorMsg(error.response.data.error || "Something went wrong");
      }
      setLoading(false);
    }
  };

  const saveAsDraft = async (invoice: Partial<OutputObject>) => {
    try {
      setLoaderType(LoaderType.HalfWindow);
      setLoading(true);
      const response = await axiosInstance.post(
        "/api/invoice/saveAsDraft",
        filterFalsyValues(invoice),
      );
      setInvoices((prevInvoices) => [...prevInvoices, response.data]);
      setLoading(false);
      showSuccessMsg("Invoice created successfully");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        handleUnathorised();
      } else {
        showErrorMsg(error.response.data.error || "Something went wrong");
      }
      setLoading(false);
    }
  };

  const markAsPaid = async (id: string) => {
    try {
      setLoaderType(LoaderType.FullWindow);
      setLoading(true);
      await axiosInstance.put(`/api/invoice/markAsPaid/${id}`);
      setInvoices((prevInvoices) =>
        prevInvoices.map((inv) =>
          // eslint-disable-next-line no-underscore-dangle
          inv._id === id ? { ...inv, status: "paid" } : inv,
        ),
      );
      setLoading(false);
      showSuccessMsg("Invoice marked as paid");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        handleUnathorised();
      } else {
        showErrorMsg(error.response.data.error || "Something went wrong");
      }
      setLoading(false);
    }
  };

  // Filter invoices based on the selected status
  useEffect(() => {
    if (filter === "all") {
      setFilteredInvoices(invoices);
    } else {
      setFilteredInvoices(
        invoices.filter((invoice) => invoice.status === filter),
      );
    }
  }, [invoices, filter]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchInvoices();
    }
  }, [isAuthenticated]);

  const invoiceContextValue = useMemo(
    () => ({
      invoices: filteredInvoices,
      fetchInvoices,
      createInvoice,
      selectedInvoice,
      setSelectedInvoiceId,
      updateInvoice,
      deleteInvoice,
      saveAsDraft,
      filter,
      setFilter,
      markAsPaid,
    }),
    [
      filteredInvoices,
      fetchInvoices,
      createInvoice,
      selectedInvoice,
      setSelectedInvoiceId,
      updateInvoice,
      deleteInvoice,
      saveAsDraft,
      filter,
      setFilter,
      markAsPaid,
    ],
  );

  return (
    <InvoiceContext.Provider value={invoiceContextValue}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoices = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error("useInvoices must be used within an InvoiceProvider");
  }
  return context;
};
