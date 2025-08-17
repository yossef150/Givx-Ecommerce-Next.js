import * as z from 'zod'
import { formatPrice } from '../utils'

const currency = z.string().refine((value)=> /^\d+(\.\d{2})?$/
        .test(formatPrice(Number(value))), 
        'Price must have two decimal places');

export const insertProductSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters'),
    category: z.string().min(3, 'Category must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    images: z.array(z.string()).min(1, 'Product must have at least one image'),
    brand: z.string().max(12, 'Brand must be at most 12 characters'),
    numReviews: z.number(),
    stock: z.number(),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency,
})

export const loginSchema = z.object({
    email: z.email('invalid email'),
    password: z.string().min(6, 'password must be at least 6 characters'),
})

export const signUpSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.email('invalid email'),
    password: z.string().min(6, 'password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'password must be at least 6 characters'),
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
})

export const cartItemSchema = z.object({
    id: z.string().min(1, 'Product id is required'),
    name: z.string().min(1, 'Product name is required'),
    slug: z.string().min(1, 'Product slug is required'),
    qty: z.number().int().nonnegative('Quantity must be a positive number'),
    image: z.string().min(1, 'Product image is required'),
    price: currency
})

export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    sessionCartId: z.string().min(1, 'Session cart id is required'),
    userId: z.string().optional().nullable(),
})
//  id            String   @id @default(uuid()) @db.Uuid
//   userId        String?  @db.Uuid @unique
//   sessionCartId String
//   items         Json[]   @default([]) @db.Json
//   itemsPrice    Decimal  @db.Decimal(12, 2)
//   totalPrice    Decimal  @db.Decimal(12, 2)
//   shippingPrice Decimal  @db.Decimal(12, 2)
//   taxPrice      Decimal  @db.Decimal(12, 2)
//   createdAt     DateTime @default(now()) @db.Timestamp(6)
//   user User? @relation(fields: [userId], references: [id])