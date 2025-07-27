'use client'

import React from 'react'
import { useActionState, useState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { loginUser } from '@/lib/actions/user.actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'


const SignInButton = ()=>
    {
        const {pending} = useFormStatus();
        return <Button type='submit' className='w-full my-2' variant='default' disabled = {pending}>
            {pending? 'Signing In...': 'Sign In'}
        </Button>
    }
function SignInForm() {
    const [mounted, setMounted] = useState(false);
    const [state, formAction] = useActionState(loginUser, {success: false, message: ''});
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    // console.log(callbackUrl);
    useEffect(()=>{
        setMounted(true);
    }, [])
    if(!mounted)
        return null;
  return (
    <form action={formAction} className='space-y-2'>
    <Input type='hidden' name='callbackUrl' value={callbackUrl || ''} />
      <Label htmlFor = 'email'>Email</Label>
      <Input id='email' name='email' type='email' required autoComplete='email'/>
      <Label htmlFor='password'>Password</Label>
      <Input id='password' name='password' type='password'/>
      <SignInButton/>
      <div>
        {state && !state.success && (<div className='text-center text-sm text-destructive'>{state.message}</div>)}
        </div>
       <div className="text-muted-foreground text-sm text-center">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="link hover:underline">
            Sign Up
        </Link>
        </div>

    </form>
  )
}

export default SignInForm
