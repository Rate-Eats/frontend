import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/shared/ui/form.tsx';
import { registerSchema } from '@components/signOn/register/registerSchema.ts';
import Socials from '@components/signOn/socials/Socials.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/shared/ui/button.tsx';
import { useAuth } from '@/auth/useAuth.ts';
import { Input } from '@/shared/ui/input';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { z } from 'zod';
import React from 'react';

const Register = () => {
  const { onLogin } = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: { identifier: string; password: string }) => {
      return axios.post('https://1c21-37-128-40-211.ngrok-free.app/api/auth/local', credentials);
    },
    onSuccess: (data) => onLogin(data.data),
    onError: (error) => console.log('error'),
  });

  function onSubmit(credentials: z.infer<typeof registerSchema>) {
    loginMutation.mutate(credentials);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 rounded-lg bg-white p-8 shadow sm:max-w-lg"
      >
        <Socials />
        <div className="flex items-center gap-4">
          <div className="divide h-[1px] w-full bg-gray-400" />
          <span>or</span>
          <div className="divide h-[1px] w-full bg-gray-400" />
        </div>
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  className="border border-gray-300 bg-gray-50 focus-visible:ring-0"
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
            <FormItem className="space-y-0.5">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  {...field}
                  className="border border-gray-300 bg-gray-50 focus-visible:ring-0"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
          Sign in
        </Button>
        <span className="text-sm font-light text-gray-500">
          Don’t have an account yet?{' '}
          <Link to="/login" className="text-primary-600 font-medium hover:underline">
            Sign up
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default Register;
