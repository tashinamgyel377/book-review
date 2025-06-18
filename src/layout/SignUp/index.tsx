import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { useAuthStore } from "../../store/useAuthStore";
import { registerFormSchema } from "../../lib/utils";
import type { infer as Infer } from "zod";

type SignUpFormData = Infer<ReturnType<typeof registerFormSchema>>;

const SignIn = () => {
  const navigate = useNavigate();
  const { registerUser, loading } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(registerFormSchema()),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    try {
      // Hash the password before sending
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const payload = {
        username: data.username,
        email: data.email,
        passwordHash: hashedPassword,
      };

      await registerUser(payload);
      navigate("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-vector/lions-head-full-color-600nw-1432918391.jpg')",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Sign Up Form */}
      <div className="relative z-10 w-full max-w-md bg-white p-10 sm:p-12 shadow-xl rounded-lg">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2 text-center">
          Create Your Account
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Sign up to start reviewing books
        </p>

        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="username" className="block mb-1 font-medium text-gray-700">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Enter Your username"
              {...form.register("username")}
              disabled={isSubmitting || loading}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {form.formState.errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="mail@example.com"
              {...form.register("email")}
              disabled={isSubmitting || loading}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              {...form.register("password")}
              disabled={isSubmitting || loading}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {form.formState.errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition"
          >
            {isSubmitting || loading ? "Creating…" : "Sign Up"}
          </Button>
        </form>

        <p className="mt-8 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-700 font-medium transition"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
