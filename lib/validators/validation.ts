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
//   id          String   @id @default(uuid()) @db.Uuid
//   name        String
//   slug        String   @unique(map: "product_slug_idx")
//   category    String
//   description String
//   images      String[]
//   price       Decimal  @db.Decimal(12, 2)
//   brand       String
//   rating Decimal @db.Decimal(3, 2)
//   numReviews Int
//   stock Int
//   isFeatured Boolean @default(false)
//   banner String?
//   createdAt   DateTime @default(now())