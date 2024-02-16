import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/shared/ui/form.tsx';
import { registerSchema } from '@/schemas/registerSchema.ts';
import Socials from '@components/signOn/socials/Socials.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button.tsx';
import { useAuth } from '@auth/useAuth.ts';
import { Input } from '@/shared/ui/input';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod';

const Register = () => {
  const { userData } = useAuth();
  if (userData) {
    window.location.replace('/');
  }
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: (credentials: { username: string; password: string }) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/auth/local/register`, credentials);
    },
    onSuccess: () => setSuccess(true),
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error.message);
      } else {
        setErrorMessage('An error occurred:' + error.message);
      }
    },
  });

  function onSubmit(credentials: z.infer<typeof registerSchema>) {
    setErrorMessage('');
    registerMutation.mutate(credentials);
  }

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  const { email, username, password } = form.watch();

  useEffect(() => {
    clearErrorMessage();
  }, [email, username, password]);

  if (success) {
    return (
      <div className="m-auto flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-1 text-center ">
          <span className="text-2xl font-semibold">Thank you for your registration!</span>
          <span>Your account is already activated. You can now log in. </span>
        </div>
        <Link to="/login" className="flex justify-center">
          <Button className="w-1/2">Log in</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="m-auto flex w-full flex-col gap-6 rounded-lg bg-white p-8 shadow sm:max-w-lg">
      <span className="text-2xl font-bold tracking-normal">Create your Free Account</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6     ">
          <Socials />
          <div className="flex items-center gap-6">
            <div className="divide h-[1px] w-full bg-gray-400" />
            <span>or</span>
            <div className="divide h-[1px] w-full bg-gray-400" />
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-black">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    className="h-10 border border-gray-300 bg-gray-50 focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage className="h-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-black">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="h-10 border border-gray-300 bg-gray-50 focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage className="h-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-black">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    {...field}
                    className="h-10 border border-gray-300 bg-gray-50 focus-visible:ring-0"
                    type="password"
                  />
                </FormControl>
                <FormMessage className="mt-0 h-0" />
              </FormItem>
            )}
          />
          {errorMessage && <div className="text-center text-sm font-semibold text-red-500">{errorMessage}</div>}
          <Button type="submit" className="bg-primary hover:bg-blue-600">
            Create an account
          </Button>
          <span className="text-sm font-light text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-medium text-primary hover:underline">
              Sign in here
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default Register;
