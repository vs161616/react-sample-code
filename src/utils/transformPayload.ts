interface InputItem {
  itemName: string;
  Qty: number;
  price: number;
  total: number;
}

interface InputObject {
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
  clientName: string;
  clientEmail: string;
  billToStreetAddress: string;
  billToCity: string;
  billToPostCode: string;
  billToCountry: string;
  paymentTerms: string;
  projectDescription: string;
  items: InputItem[];
}

interface OutputItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OutputObject {
  paymentTerms: number;
  description: string;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: OutputItem[];
}

const transformPayload = (input: InputObject): OutputObject => {
  const output: OutputObject = {
    paymentTerms: parseInt(input.paymentTerms, 10),
    description: input.projectDescription,
    clientName: input.clientName,
    clientEmail: input.clientEmail,
    status: "pending",
    senderAddress: {
      street: input.streetAddress,
      city: input.city,
      postCode: input.postCode,
      country: input.country,
    },
    clientAddress: {
      street: input.billToStreetAddress,
      city: input.billToCity,
      postCode: input.billToPostCode,
      country: input.billToCountry,
    },
    items: input.items.map((item) => ({
      name: item.itemName,
      quantity: item.Qty,
      price: item.price,
      total: item.total,
    })),
  };

  return output;
};

type AnyObject = { [key: string]: any };

export function filterFalsyValues<T extends AnyObject>(obj: T): Partial<T> {
  const filteredObject: Partial<T> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (Array.isArray(value)) {
      const filteredArray = value
        .map((item) => filterFalsyValues(item))
        .filter((item) => Object.keys(item).length > 0);
      if (filteredArray.length > 0) {
        filteredObject[key as keyof T] = filteredArray as any;
      }
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      const filteredNestedObject = filterFalsyValues(value);
      if (Object.keys(filteredNestedObject).length > 0) {
        filteredObject[key as keyof T] = filteredNestedObject as any;
      }
    } else if (value) {
      filteredObject[key as keyof T] = value;
    }
  });

  return filteredObject;
}

export default transformPayload;
