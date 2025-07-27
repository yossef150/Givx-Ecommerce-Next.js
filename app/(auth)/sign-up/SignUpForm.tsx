'use client'

import React from 'react'
import { useActionState, useState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { signUpUser } from '@/lib/actions/user.actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'


const SignUpButton = ()=>
    {
        const {pending} = useFormStatus();
        return <Button type='submit' className='w-full my-2' variant='default' disabled = {pending}>
            {pending? 'Submitting...': 'Sign Up'}
        </Button>
    }
function SignUpForm() {
    const [mounted, setMounted] = useState(false);
    const [state, formAction] = useActionState(signUpUser, {success: false, message: ''});
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
      <Label htmlFor = 'name'>Name</Label>
      <Input id='name' name='name' type='text' required autoComplete='name'/>
      <Label htmlFor = 'email'>Email</Label>
      <Input id='email' name='email' type='email' required autoComplete='email'/>
      <Label htmlFor='password'>Password</Label>
      <Input id='password' name='password' type='password'/>
      <Label htmlFor='confirmPassword'>Confirm Password</Label>
      <Input id='confirmPassword' name='confirmPassword' type='password'/>
      <SignUpButton/>
      <div>
        {state && !state.success && (<div className='text-center text-sm text-destructive'>{state.message}</div>)}
        </div>
       <div className="text-muted-foreground text-sm text-center">
            Already have an account?{' '}
        <Link href="/sign-in" className="link hover:underline">
            Sign In
        </Link>
        </div>
    </form>
  )
}

export default SignUpForm
