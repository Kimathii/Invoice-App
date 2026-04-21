import { z } from 'zod'

const addressSchema = z.object({
  street: z.string().min(1, "can't be empty"),
  city: z.string().min(1, "can't be empty"),
  postCode: z.string().min(1, "can't be empty"),
  country: z.string().min(1, "can't be empty"),
})

const itemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "can't be empty"),
  quantity: z.number({ invalid_type_error: 'must be a number' }).min(1, 'min 1'),
  price: z.number({ invalid_type_error: 'must be a number' }).min(0, 'min 0'),
  total: z.number(),
})

export const invoiceSchema = z.object({
  description: z.string().min(1, "can't be empty"),
  paymentTerms: z.number(),
  clientName: z.string().min(1, "can't be empty"),
  clientEmail: z.string().min(1, "can't be empty").email('invalid email'),
  createdAt: z.string().min(1, "can't be empty"),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: z.array(itemSchema).min(1, 'An item must be added'),
})

// Draft schema — much more relaxed
export const draftSchema = z.object({
  description: z.string(),
  paymentTerms: z.number(),
  clientName: z.string(),
  clientEmail: z.string(),
  createdAt: z.string(),
  senderAddress: z.object({
    street: z.string(), city: z.string(), postCode: z.string(), country: z.string(),
  }),
  clientAddress: z.object({
    street: z.string(), city: z.string(), postCode: z.string(), country: z.string(),
  }),
  items: z.array(z.object({
    id: z.string(), name: z.string(), quantity: z.number(), price: z.number(), total: z.number(),
  })),
})

export type InvoiceFormValues = z.infer<typeof invoiceSchema>
