import { z } from 'zod';

// Contact validation schema
export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 digits')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format'),
});

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(4, 'OTP must be 4 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string()
    .min(2, 'Username must be at least 2 characters')
    .max(50, 'Username must be less than 50 characters'),
});

export const otpSchema = z.object({
  email: z.string().email('Invalid email address'),
});
