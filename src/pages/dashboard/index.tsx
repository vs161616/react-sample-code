/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "./dashboard.css";
import {
  Autocomplete,
  Box,
  Button,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InvoiceList from "../../components/invoiceList";
import InvoiceForm from "../../components/invoiceForm";
import { useInvoices } from "../../contexts/InvoiceContext";

/**
 * Dashboard component that displays a list of invoices and allows the user to create, view, and edit invoices.
 * @returns {JSX.Element} The rendered Dashboard component.
 */
function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"create" | "edit" | "view">("create");
  const { setSelectedInvoiceId, invoices, filter, setFilter } = useInvoices();

  /**
   * Toggles the visibility of the drawer.
   * @param {boolean} status - The desired visibility status of the drawer.
   * @returns {Function} A function that sets the drawer's open state.
   */
  const toggleDrawer = (status: boolean) => () => {
    setOpen(status);
  };

  /**
   * Handles the selection of an invoice and sets the mode (view, edit, create).
   * @param {string} invoiceId - The ID of the selected invoice.
   * @param {"view" | "edit" | "create"} operation - The operation mode for the invoice (view, edit, create).
   */
  const handleSelectInvoice = (
    invoiceId: string,
    operation: "view" | "edit" | "create",
  ) => {
    setSelectedInvoiceId(invoiceId);
    toggleDrawer(true)();
    setMode(operation);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={8}>
        <Box className="pageTitle">
          <Box className="title">
            <Typography variant="h4" component="h4">
              Invoices
            </Typography>
            <Typography variant="body2" component="span">
              There are {invoices.length} total invoices
            </Typography>
          </Box>
          <Box className="FilterActions">
            <FormControl fullWidth sx={{ minWidth: "160px" }}>
              <InputLabel id="demo-simple-select-label">
                Filter By Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filter By Status"
                onChange={(e) =>
                  setFilter(
                    e.target.value as "paid" | "pending" | "draft" | "all",
                  )
                }
                sx={{ padding: "8px 16px", height: "40px" }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </Select>
            </FormControl>
            {/* <Autocomplete
              className="custom-select"
              id="choose-filter"
              options={options}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input
                    type="text"
                    {...params.inputProps}
                    placeholder="Select an option"
                  />
                </div>
              )}
            /> */}
            <Button
              sx={{ minWidth: "160px" }}
              variant="contained"
              className="ThemeButton"
              startIcon={<AddIcon />}
              onClick={() => {
                toggleDrawer(true)();
                setMode("create");
              }}
            >
              New Invoice
            </Button>

            <Drawer
              open={open}
              onClose={() => {
                toggleDrawer(false)();
                setSelectedInvoiceId("");
                setMode("create");
              }}
              className="newInvoiceDrawer"
            >
              <InvoiceForm
                setMode={setMode}
                mode={mode}
                onClose={() => {
                  toggleDrawer(false)();
                  setSelectedInvoiceId("");
                  setMode("create");
                }}
              />
            </Drawer>
          </Box>
        </Box>

        <InvoiceList setSelectedInvoice={handleSelectInvoice} />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
