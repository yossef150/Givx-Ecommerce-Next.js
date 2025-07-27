'use server'
import { signIn, signOut } from "@/auth"
import { loginSchema, signUpSchema } from "../validators/validation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { prisma } from "../prisma";
import { hashSync } from "bcrypt-ts";
export async function loginUser(prevState: unknown, formData: FormData)
{

    const user = loginSchema.parse({
        email: formData.get('email'),
        password: formData.get('password')
    })
    try {
        await signIn('credentials', user)
        return {success: true, message: 'Signed in successfully'};

    } catch (error) {
         if (isRedirectError(error)) {
            throw error; }
        return {success: false, message: 'Invalid email or password'};
    }
}
export async function signUpUser(prevState: unknown, formData: FormData)
{

    const user = signUpSchema.parse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })
    const hashedPassword = hashSync(user.password);
    try {
        await prisma.user.create(
            {
                data: {
                    name: user.name,
                    email: user.email,
                    password: hashedPassword,
                }
            }
        )
        await signIn('credentials', {
            email: user.email,
            password: user.password
        })
        return {success: true, message: 'Account created successfully'};

    } catch (error) {
         if (isRedirectError(error)) {
            throw error; }
        return {success: false, message: 'Failed to create account'};
    }
}

export async function logOutUser()
{
        await signOut();    
}