/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/InvoiceListComponent.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./invoiceList.css";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PaidIcon from "@mui/icons-material/Paid";
import { useInvoices } from "../../contexts/InvoiceContext";
import DeleteDialog from "./deleteDialog";
import IllsutrationEmpty from "../../assets/images/illustration-empty.svg";
import { useLoader } from "../../contexts/LoaderContext";
import { IInvoice } from "../../interfaces/utils/invoice";
import transformPayload from "../../utils/transformPayload";

function InvoiceList({
  setSelectedInvoice,
}: {
  setSelectedInvoice: (
    invoiceId: string,
    operation: "view" | "edit" | "create",
  ) => void;
}) {
  const { invoices, deleteInvoice, markAsPaid } = useInvoices();
  const { loading } = useLoader();
  const [open, setOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setItemToDelete("");
  };

  const handleConfirm = async () => {
    await deleteInvoice(itemToDelete);
    handleClose();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMarkAsPaid = async (invoice: IInvoice) => {
    // eslint-disable-next-line no-underscore-dangle
    await markAsPaid(invoice._id);
  };
  return (
    <Box className="invoiceList-wrapper">
      {invoices.map((invoice) => (
        <Box className="invoiceListCard" key={invoice.id}>
          <Typography variant="h6" component="h6" sx={{ width: "90px" }}>
            <span>#</span>
            {invoice.id}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{
              width: "120px",
              textAlign: "left",
            }}
          >
            Due {invoice.paymentDue}
          </Typography>
          <Typography variant="body2" component="p" sx={{ width: "130px" }}>
            {invoice.clientName}
          </Typography>
          <Typography variant="h5" component="h5">
            {invoice.total}
          </Typography>
          <Button
            variant="text"
            className={`status-btn status-${invoice.status.toLowerCase()}`}
          >
            {invoice.status}
          </Button>
          <IconButton
            onClick={() => {
              handleClickOpen();
              // eslint-disable-next-line no-underscore-dangle
              setItemToDelete(invoice._id);
            }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
          {invoice.status === "pending" ? (
            <IconButton
              onClick={() => handleMarkAsPaid(invoice)}
              aria-label="paid"
            >
              <PaidIcon />
            </IconButton>
          ) : (
            <>&nbsp;</>
          )}

          {/* <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openMenu}
            onClose={handleCloseMenu}
            onClick={handleCloseMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => markAsPaid(invoice)}>
              <ListItemIcon>
                <PaidIcon fontSize="small" />
              </ListItemIcon>
              Mark as Paid
            </MenuItem>
          </Menu> */}

          <IconButton
            // eslint-disable-next-line no-underscore-dangle
            onClick={() => setSelectedInvoice(invoice._id, "view")}
            aria-label="arrow-right"
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      ))}
      {!loading && invoices.length === 0 && (
        <Box
          sx={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <img src={IllsutrationEmpty} alt="" />
          <Box sx={{ mt: "20px", textAlign: "center" }}>
            <Typography>There is nothing here</Typography>
            <p>
              Create an invoice by clicking the <br />
              <strong>New Invoice</strong> button and get started
            </p>
          </Box>
        </Box>
      )}
      <DeleteDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </Box>
  );
}

export default InvoiceList;
