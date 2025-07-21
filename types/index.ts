import { insertProductSchema } from './../lib/validators/validation';
import * as z from 'zod'


export type Product = z.infer<typeof insertProductSchema> & {
    id: string;
    rating: string;
    createdAt: Date;
}