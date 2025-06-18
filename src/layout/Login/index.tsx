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
import { loginFormSchema } from "../../lib/utils";
import type { infer as Infer } from "zod";

type LoginFormData = Infer<ReturnType<typeof loginFormSchema>>;

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, loading } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema()),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      // Assuming your loginUser expects 'name' instead of 'email'
      // Adjust this as per your actual backend or store expectation
      
      // Hash the password before sending
      const passwordHash = await bcrypt.hash(data.password, 10);

      const payload = {
        name: data.email || "",  // map email to 'name' if required
        passwordHash,
      };

      await loginUser(payload);
      navigate(`/`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/woman-hand-typing-keyboard-with-login-password-screen-display-cyber-security-concept-data-protection-secured-internet-access_1296497-5418.jpg?ga=GA1.1.717862488.1748903570&semt=ais_hybrid&w=740')",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white p-10 sm:p-12 shadow-xl rounded-lg">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2 text-center">Log In</h1>
        <p className="text-center text-gray-500 mb-8">
          Enter your credentials to access your account.
        </p>

        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>
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
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition"
          >
            {isSubmitting || loading ? "Logging in…" : "Log In"}
          </Button>
        </form>

        <p className="mt-8 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-indigo-600 hover:text-indigo-700 font-medium transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
