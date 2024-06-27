import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  city: Yup.string().required("City is required"),
  postCode: Yup.string().required("Post Code is required"),
  country: Yup.string().required("Country is required"),
  clientName: Yup.string().required("Client's Name is required"),
  clientEmail: Yup.string()
    .email("Invalid email")
    .required("Client's Email is required"),
  billToStreetAddress: Yup.string().required("Street Address is required"),
  billToCity: Yup.string().required("City is required"),
  billToPostCode: Yup.string().required("Post Code is required"),
  billToCountry: Yup.string().required("Country is required"),
  // invoiceDate: Yup.string().required("Invoice Date is required"),
  paymentTerms: Yup.number()
    .typeError("Payment Terms must be a number")
    .required("Payment Terms is required")
    .positive("Payment Terms must be greater than zero")
    .integer("Payment Terms must be an integer"),
  projectDescription: Yup.string().required("Project Description is required"),
  items: Yup.array().of(
    Yup.object().shape({
      itemName: Yup.string().required("Item Name is required"),
      Qty: Yup.number()
        .typeError("Qty must be a number")
        .required("Qty is required")
        .positive("Qty must be greater than zero")
        .integer("Qty must be an integer"),
      price: Yup.number()
        .typeError("Qty must be a number")
        .required("Qty is required")
        .positive("Qty must be greater than zero")
        .integer("Qty must be an integer"),
      total: Yup.number().required("Total is required"),
    }),
  ),
});

export default validationSchema;
