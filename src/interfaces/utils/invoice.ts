/**
 * Interface for the item subdocument.
 * Includes the properties of the subdocument.
 *
 * @property {string} name - The name of the item.
 * @property {number} quantity - The quantity of the item.
 * @property {number} price - The price of the item.
 * @property {number} total - The total cost of the item (quantity * price).
 */
interface IItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

/**
 * Interface for the address subdocument.
 * Includes the properties of the subdocument.
 */
interface IAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

/**
 * Interface for the Invoice document.
 * Includes the properties of the document, along with a method to calculate the total.
 */
export interface IInvoice {
  _id: string;
  id: string;
  createdAt: Date;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "paid" | "pending" | "draft";
  senderAddress: IAddress;
  clientAddress: IAddress;
  items: IItem[];
  total: number;
}
