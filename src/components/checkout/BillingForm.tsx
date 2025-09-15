"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BillingAddress, CheckoutFormData } from "@/types/cart";
import { AlertCircle, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";

const billingSchema = z.object({
  billingAddress: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    country: z.string().min(1, "Country is required"),
    state: z.string().optional(),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    address: z.string().min(1, "Address is required"),
    phone: z.string().optional(),
  }),
  paymentMethod: z.object({
    type: z.enum(['card', 'upi', 'paypal']),
    last4: z.string().optional(),
    brand: z.string().optional(),
    upiId: z.string().optional(),
    paypalEmail: z.string().optional(),
  }),
  couponCode: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
  subscribeToNewsletter: z.boolean().default(false),
});

interface BillingFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isLoading?: boolean;
}

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'IN', label: 'India' },
  { value: 'JP', label: 'Japan' },
  { value: 'BR', label: 'Brazil' },
  { value: 'MX', label: 'Mexico' },
];

export function BillingForm({ onSubmit, isLoading = false }: BillingFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      billingAddress: {
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        state: '',
        city: '',
        postalCode: '',
        address: '',
        phone: '',
      },
      paymentMethod: {
        type: 'card',
      },
      agreeToTerms: false,
      subscribeToNewsletter: false,
    },
    mode: 'onChange'
  });

  const paymentMethod = watch('paymentMethod.type');
  const agreeToTerms = watch('agreeToTerms');

  const handleFormSubmit = (data: CheckoutFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Billing Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Billing Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              {...register('billingAddress.firstName')}
              className={cn(errors.billingAddress?.firstName && "border-red-500")}
            />
            {errors.billingAddress?.firstName && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                <span>{errors.billingAddress.firstName.message}</span>
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              {...register('billingAddress.lastName')}
              className={cn(errors.billingAddress?.lastName && "border-red-500")}
            />
            {errors.billingAddress?.lastName && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                <span>{errors.billingAddress.lastName.message}</span>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register('billingAddress.email')}
            className={cn(errors.billingAddress?.email && "border-red-500")}
          />
          {errors.billingAddress?.email && (
            <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.billingAddress.email.message}</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="country">Country *</Label>
            <Select
              value={watch('billingAddress.country')}
              onValueChange={(value) => setValue('billingAddress.country', value)}
            >
              <SelectTrigger className={cn(errors.billingAddress?.country && "border-red-500")}>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.billingAddress?.country && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                <span>{errors.billingAddress.country.message}</span>
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              {...register('billingAddress.state')}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              {...register('billingAddress.city')}
              className={cn(errors.billingAddress?.city && "border-red-500")}
            />
            {errors.billingAddress?.city && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                <span>{errors.billingAddress.city.message}</span>
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="postalCode">Postal Code *</Label>
            <Input
              id="postalCode"
              {...register('billingAddress.postalCode')}
              className={cn(errors.billingAddress?.postalCode && "border-red-500")}
            />
            {errors.billingAddress?.postalCode && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                <span>{errors.billingAddress.postalCode.message}</span>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            {...register('billingAddress.address')}
            className={cn(errors.billingAddress?.address && "border-red-500")}
          />
          {errors.billingAddress?.address && (
            <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.billingAddress.address.message}</span>
            </div>
          )}
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            {...register('billingAddress.phone')}
          />
        </div>
      </div>
      
      {/* Payment Method */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="card"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setValue('paymentMethod.type', e.target.value as 'card')}
              className="h-4 w-4 text-brand-600"
            />
            <Label htmlFor="card" className="flex items-center gap-2">
              <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                VISA
              </div>
              Credit/Debit Card
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="upi"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={(e) => setValue('paymentMethod.type', e.target.value as 'upi')}
              className="h-4 w-4 text-brand-600"
            />
            <Label htmlFor="upi" className="flex items-center gap-2">
              <div className="w-8 h-5 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">
                UPI
              </div>
              UPI Payment
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="paypal"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setValue('paymentMethod.type', e.target.value as 'paypal')}
              className="h-4 w-4 text-brand-600"
            />
            <Label htmlFor="paypal" className="flex items-center gap-2">
              <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                PP
              </div>
              PayPal
            </Label>
          </div>
        </div>
      </div>
      
      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setValue('agreeToTerms', checked as boolean)}
            className={cn(errors.agreeToTerms && "border-red-500")}
          />
          <div className="text-sm">
            <Label htmlFor="agreeToTerms" className="text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-brand-600 hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-brand-600 hover:underline">
                Privacy Policy
              </a>
            </Label>
            {errors.agreeToTerms && (
              <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                <span>{errors.agreeToTerms.message}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox
            id="subscribeToNewsletter"
            checked={watch('subscribeToNewsletter')}
            onCheckedChange={(checked) => setValue('subscribeToNewsletter', checked as boolean)}
          />
          <Label htmlFor="subscribeToNewsletter" className="text-sm text-gray-700">
            Subscribe to our newsletter for course updates and special offers
          </Label>
        </div>
      </div>
      
      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!isValid || isLoading}
        variant="premium"
        size="lg"
        className="w-full font-bold rounded-xl shadow-lg hover:shadow-purple-500/40 transition-all duration-200 hover:scale-105 active:scale-95 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4" />
              Place Order
            </>
          )}
        </span>
      </Button>
    </form>
  );
}
