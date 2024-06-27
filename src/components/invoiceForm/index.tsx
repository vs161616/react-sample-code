/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  useFormik,
  FormikProvider,
  FieldArray,
  FieldArrayRenderProps,
} from "formik";
import validationSchema from "./validations";
import transformPayload from "../../utils/transformPayload";
import { useInvoices } from "../../contexts/InvoiceContext";
import { LoaderType, useLoader } from "../../contexts/LoaderContext";

function InvoiceForm({
  onClose,
  mode,
  setMode,
}: {
  onClose: () => void;
  setMode: (mode: "create" | "edit" | "view") => void;
  mode: "create" | "edit" | "view";
}) {
  const { createInvoice, selectedInvoice, updateInvoice, saveAsDraft } =
    useInvoices();
  const { loading, loaderType } = useLoader();

  const formik = useFormik({
    initialValues: {
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
      clientName: "",
      clientEmail: "",
      billToStreetAddress: "",
      billToCity: "",
      billToPostCode: "",
      billToCountry: "",
      // invoiceDate: "",
      paymentTerms: "",
      projectDescription: "",
      items: [{ itemName: "", Qty: 0, price: 0, total: 0 }],
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      console.log(values);
      const payload = transformPayload(values);
      if (mode === "edit") {
        await updateInvoice(payload);
      } else {
        await createInvoice(payload);
      }
      setSubmitting(false);
      resetForm();
      onClose();
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    resetForm,
    errors,
    touched,
    setFieldValue,
  } = formik;

  useEffect(() => {
    const updatedItems = values.items.map((item) => ({
      ...item,
      total: item.Qty * item.price || 0,
    }));
    setFieldValue("items", updatedItems, false);
  }, [values.items, setFieldValue]);

  const getItemError = (index: number, field: string): string | null => {
    if (
      errors.items &&
      touched.items &&
      errors.items[index] &&
      touched.items[index] &&
      (errors.items[index] as { [key: string]: string })[field] &&
      (touched.items[index] as { [key: string]: boolean })[field]
    ) {
      return (errors.items[index] as { [key: string]: string })[field];
    }
    return null;
  };
console.log("testing")
  const getTitle = (): string => {
    switch (mode) {
      case "create":
        return "New Invoice";
      case "view":
        return "View Invoice";
      default:
        return "Edit Invoice";
    }
  };

  useEffect(() => {
    if (selectedInvoice === null) {
      resetForm();
    }
    if ((mode === "edit" || mode === "view") && selectedInvoice) {
      setFieldValue(
        "streetAddress",
        selectedInvoice?.senderAddress?.street || "",
      );
      setFieldValue("city", selectedInvoice?.senderAddress?.city || "");
      setFieldValue("postCode", selectedInvoice?.senderAddress?.postCode || "");
      setFieldValue("country", selectedInvoice?.senderAddress?.country || "");
      setFieldValue("clientName", selectedInvoice?.clientName || "");
      setFieldValue("clientEmail", selectedInvoice?.clientEmail || "");
      setFieldValue(
        "billToStreetAddress",
        selectedInvoice?.clientAddress?.street || "",
      );
      setFieldValue("billToCity", selectedInvoice?.clientAddress?.city || "");
      setFieldValue(
        "billToPostCode",
        selectedInvoice?.clientAddress?.postCode || "",
      );
      setFieldValue(
        "billToCountry",
        selectedInvoice?.clientAddress?.country || "",
      );
      setFieldValue("paymentTerms", selectedInvoice?.paymentTerms || "");
      setFieldValue("projectDescription", selectedInvoice?.description || "");
      const updatedItems = selectedInvoice.items.map((item) => ({
        itemName: item.name,
        Qty: item.quantity,
        price: item.price,
      }));
      setFieldValue(
        "items",
        updatedItems.length
          ? updatedItems
          : [
              {
                itemName: "",
                Qty: 0,
                price: 0,
                total: 0,
              },
            ],
      );
    }
  }, [mode, selectedInvoice, setFieldValue, resetForm]);

  const handleSaveAsDraft = async () => {
    const payload = transformPayload(formik.values);
    await saveAsDraft({ ...payload, status: "draft" });
    resetForm();
    onClose();
  };

  return (
    <Box className="new-invoice-wrapper" sx={{ position: "relative" }}>
      <Typography variant="h5" component="h5" sx={{ mb: 3 }}>
        {getTitle()}
      </Typography>

      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <Box className="formBlock">
            <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
              Bill From
            </Typography>
            <Box className="formGroup">
              <label htmlFor="streetAddress">Street Address</label>
              <TextField
                helperText={
                  errors.streetAddress && touched.streetAddress
                    ? errors.streetAddress
                    : ""
                }
                id="streetAddress"
                name="streetAddress"
                variant="outlined"
                value={values.streetAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ readOnly: mode === "view" }}
              />
            </Box>

            <Box className="InputsGroup">
              <Box className="formGroup">
                <label htmlFor="city">City</label>
                <TextField
                  id="city"
                  name="city"
                  variant="outlined"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{ readOnly: mode === "view" }}
                  helperText={errors.city && touched.city ? errors.city : ""}
                />
              </Box>

              <Box className="formGroup">
                <label htmlFor="postCode">Post Code</label>
                <TextField
                  id="postCode"
                  name="postCode"
                  variant="outlined"
                  value={values.postCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{ readOnly: mode === "view" }}
                  helperText={
                    errors.postCode && touched.postCode ? errors.postCode : ""
                  }
                />
              </Box>

              <Box className="formGroup">
                <label htmlFor="country">Country</label>
                <TextField
                  id="country"
                  name="country"
                  variant="outlined"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.country && touched.country ? errors.country : ""
                  }
                  inputProps={{ readOnly: mode === "view" }}
                />
              </Box>
            </Box>
          </Box>

          <Box className="formBlock">
            <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
              Bill To
            </Typography>
            <Box className="formGroup">
              <label htmlFor="clientName">Client's Name</label>
              <TextField
                id="clientName"
                name="clientName"
                variant="outlined"
                value={values.clientName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.clientName && touched.clientName
                    ? errors.clientName
                    : ""
                }
                inputProps={{ readOnly: mode === "view" }}
              />
            </Box>

            <Box className="formGroup">
              <label htmlFor="clientEmail">Client's Email</label>
              <TextField
                id="clientEmail"
                name="clientEmail"
                variant="outlined"
                placeholder="e.g. email@example.com"
                value={values.clientEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.clientEmail && touched.clientEmail
                    ? errors.clientEmail
                    : ""
                }
                inputProps={{ readOnly: mode === "view" }}
              />
            </Box>

            <Box className="formGroup">
              <label htmlFor="billToStreetAddress">Street Address</label>
              <TextField
                id="billToStreetAddress"
                name="billToStreetAddress"
                variant="outlined"
                value={values.billToStreetAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.billToStreetAddress && touched.billToStreetAddress ? (
                    <span>{errors.billToStreetAddress}</span>
                  ) : (
                    <span />
                  )
                }
                inputProps={{ readOnly: mode === "view" }}
              />
            </Box>

            <Box className="InputsGroup">
              <Box className="formGroup">
                <label htmlFor="billToCity">City</label>
                <TextField
                  id="billToCity"
                  name="billToCity"
                  variant="outlined"
                  value={values.billToCity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.billToCity && touched.billToCity
                      ? errors.billToCity
                      : ""
                  }
                  inputProps={{ readOnly: mode === "view" }}
                />
              </Box>

              <Box className="formGroup">
                <label htmlFor="billToPostCode">Post Code</label>
                <TextField
                  id="billToPostCode"
                  name="billToPostCode"
                  variant="outlined"
                  value={values.billToPostCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.billToPostCode && touched.billToPostCode
                      ? errors.billToPostCode
                      : ""
                  }
                  inputProps={{ readOnly: mode === "view" }}
                />
              </Box>

              <Box className="formGroup">
                <label htmlFor="billToCountry">Country</label>
                <TextField
                  id="billToCountry"
                  name="billToCountry"
                  variant="outlined"
                  value={values.billToCountry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.billToCountry && touched.billToCountry
                      ? errors.billToCountry
                      : ""
                  }
                  inputProps={{ readOnly: mode === "view" }}
                />
              </Box>
            </Box>
          </Box>

          <Box className="formBlock">
            <Box className="InputsGroup">
              {/* <Box className="formGroup">
                <label htmlFor="invoiceDate">Invoice Date</label>
                <TextField
                  id="invoiceDate"
                  name="invoiceDate"
                  variant="outlined"
                  value={values.invoiceDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.invoiceDate && touched.invoiceDate ? (
                      <span>{errors.invoiceDate}</span>
                    ) : (
                      <span />
                    )
                  }
                />
              </Box> */}

              <Box className="formGroup">
                <label htmlFor="paymentTerms">Payment Terms</label>
                <TextField
                  id="paymentTerms"
                  name="paymentTerms"
                  variant="outlined"
                  value={values.paymentTerms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.paymentTerms && touched.paymentTerms ? (
                      <span>{errors.paymentTerms}</span>
                    ) : (
                      <span />
                    )
                  }
                  inputProps={{ readOnly: mode === "view" }}
                />
              </Box>
            </Box>

            <Box className="formGroup">
              <label htmlFor="projectDescription">Project Description</label>
              <TextField
                id="projectDescription"
                name="projectDescription"
                variant="outlined"
                placeholder="e.g. Graphic Design Services"
                value={values.projectDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.projectDescription && touched.projectDescription ? (
                    <span>{errors.projectDescription}</span>
                  ) : (
                    <span />
                  )
                }
                inputProps={{ readOnly: mode === "view" }}
              />
            </Box>
          </Box>

          <Box className="formBlock" sx={{ mb: 5 }}>
            <Typography variant="h5" component="h5" sx={{ mb: 2 }}>
              Item List
            </Typography>
            <FieldArray
              name="items"
              render={(arrayHelpers: FieldArrayRenderProps) => (
                <div>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Item Name</TableCell>
                          <TableCell align="right">Qty.</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell align="right">Total</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {values.items.map(
                          (
                            item: {
                              itemName: string;
                              Qty: number;
                              price: number;
                              total: number;
                            },
                            index,
                          ) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <TableRow key={index}>
                              <TableCell>
                                <TextField
                                  id={`items.${index}.itemName`}
                                  name={`items.${index}.itemName`}
                                  variant="outlined"
                                  value={item.itemName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  helperText={getItemError(index, "itemName")}
                                  inputProps={{ readOnly: mode === "view" }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <TextField
                                  id={`items.${index}.Qty`}
                                  name={`items.${index}.Qty`}
                                  variant="outlined"
                                  value={item.Qty}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  helperText={getItemError(index, "Qty")}
                                  inputProps={{ readOnly: mode === "view" }}
                                />
                              </TableCell>
                              <TableCell>
                                <TextField
                                  id={`items.${index}.price`}
                                  name={`items.${index}.price`}
                                  variant="outlined"
                                  value={item.price}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  helperText={getItemError(index, "price")}
                                  inputProps={{ readOnly: mode === "view" }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <TextField
                                  id={`items.${index}.total`}
                                  name={`items.${index}.total`}
                                  variant="outlined"
                                  value={item.total}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  disabled
                                  helperText={getItemError(index, "total")}
                                  inputProps={{ readOnly: mode === "view" }}
                                />
                              </TableCell>
                              {mode !== "view" && (
                                <TableCell>
                                  <Button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </TableCell>
                              )}
                            </TableRow>
                          ),
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {mode !== "view" && (
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() =>
                        arrayHelpers.push({
                          itemName: "",
                          Qty: 0,
                          price: 0,
                          total: 0,
                        })
                      }
                      startIcon={<AddIcon />}
                    >
                      Add Item
                    </Button>
                  )}
                </div>
              )}
            />
          </Box>

          {mode === "create" && (
            <Box className="btns-group">
              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={() => resetForm()}
              >
                Discard
              </Button>
              <Box className="btns-group">
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => handleSaveAsDraft()}
                >
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Save & Send
                </Button>
              </Box>
            </Box>
          )}
          {mode === "view" && (
            <Box className="btns-group">
              <Button
                onClick={() => setMode("edit")}
                variant="contained"
                color="primary"
              >
                Edit
              </Button>
            </Box>
          )}
          {mode === "edit" && (
            <Box className="btns-group">
              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={() => resetForm()}
              >
                Discard
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </Box>
          )}
        </form>
      </FormikProvider>

      {loading && loaderType === LoaderType.HalfWindow && (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            top: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default InvoiceForm;
