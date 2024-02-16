import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/shared/ui/form.tsx';
import Socials from '@components/signOn/socials/Socials.tsx';
import { loginSchema } from '@/schemas/LoginSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Checkbox } from '@shared/ui/checkbox.tsx';
import React, { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button.tsx';
import { useAuth } from '@/auth/useAuth.ts';
import { Input } from '@/shared/ui/input';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod';

const Login = () => {
  const { onLogin, userData } = useAuth();
  if (userData) {
    window.location.replace('/');
  }
  const [errorMessage, setErrorMessage] = useState<string>('');

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: { identifier: string; password: string }) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/auth/local`, credentials);
    },
    onSuccess: (data) => onLogin(data.data),
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error.message);
      } else {
        setErrorMessage('An error occurred:' + error.message);
      }
    },
  });

  function onSubmit(credentials: z.infer<typeof loginSchema>) {
    loginMutation.mutate(credentials);
  }

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

  const { identifier, password } = form.watch();

  useEffect(() => {
    clearErrorMessage();
  }, [identifier, password]);

  return (
    <div className="m-auto flex w-full flex-col gap-6 rounded-lg bg-white p-8 shadow sm:max-w-lg">
      <span className="text-2xl font-bold tracking-normal">Welcome back</span>
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
            name="identifier"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="h-10 border border-gray-300 bg-gray-50 focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    {...field}
                    className="h-10 border border-gray-300 bg-gray-50 focus-visible:ring-0"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="border-gray-400" aria-label="Remember me" />
              <label
                htmlFor="terms"
                className="mt-0.5 text-sm leading-none text-gray-500 peer-disabled:cursor-not-allowed"
              >
                Remember me
              </label>
            </div>
            <Link to="/forgot" className="text-sm font-medium text-primary">
              Forgot password?
            </Link>
          </div>
          {errorMessage && <span className="w-full text-center text-red-500">{errorMessage}</span>}
          <Button type="submit" className="bg-primary hover:bg-blue-600">
            Sign in
          </Button>
          <span className="text-sm font-light text-gray-500">
            Don’t have an account yet?{' '}
            <Link to="/register" className="text-primary-600 font-medium text-primary hover:underline">
              Sign up here
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default Login;
