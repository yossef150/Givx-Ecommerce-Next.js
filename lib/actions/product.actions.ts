"use server"

import { prisma } from "../prisma"
import { LATEST_COLLECTION_LIMIT } from "../constants";


export async function getLatestCollection(){
    const products = await prisma.product.findMany(
        {
            take: Number(LATEST_COLLECTION_LIMIT),
            orderBy: {createdAt: 'desc'}
        }
    )
    return products;
}

export async function getProductBySlug(slug: string) {
    const product = await prisma.product.findFirst({
        where: {slug}
    })
    return product;
}