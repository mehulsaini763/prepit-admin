'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

import Image from 'next/image';
import PlaceholderImage from '@/app/favicon.ico';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { auth } from '@/configs/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().toLowerCase().email(),
  password: z.string().min(1),
});

const LoginPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        description: 'LoggedIn Successfully.',
      });
      router.push('/dashboard');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Invalid Credentials!',
        description: 'Please check your email and password.',
      });
    }
  };
  return (
    <main className="w-full h-screen flex flex-col justify-center lg:grid  lg:grid-cols-2 ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={loading} className="w-full" type="submit">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please Wait
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-sm italic text-red-500">
            <p className="font-bold">[NOTE] : Test User can use the following credentials</p>
            <p>[email]: test@admin.com</p>
            <p>[password]: pass1234</p>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block bg-[#18A8D8] px-24">
        <Image src={PlaceholderImage.src} alt="Image" width="500" height="500" className="h-full w-full object-contain" />
      </div>
    </main>
  );
};

export default LoginPage;
