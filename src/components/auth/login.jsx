"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/Apis/authApi/authApi";
import useToast from "@/hooks/useToast";

// Cookie utility functions
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export default function Login() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();

      // Check if response is successful
      if (response?.success && response?.data) {
        const { accessToken, refreshToken, user } = response.data;

        // Save tokens to cookies
        if (accessToken) {
          setCookie("accessToken", accessToken, 7); // 7 days expiry
        }
        if (refreshToken) {
          setCookie("refreshToken", refreshToken, 30); // 30 days expiry
        }

        // Save user role to localStorage
        if (user?.role) {
          localStorage.setItem("userRole", user.role);
        }

        // Show success toast
        toast.success(response.message || "Logged in successfully");

        // Navigate based on role (you can adjust this logic)
        if (user?.role === "admin") {
          router.push("/admin/dashboard");
        } else if (user?.role === "bha") {
          router.push("/bha/dashboard");
        } else if (user?.role === "bhaa") {
          router.push("/bhaa/dashboard");
        } else {
          // Default redirect or handle other roles
          router.push("/dashboard");
        }
      } else {
        throw new Error(response?.message || "Login failed");
      }
    } catch (error) {
      // Handle error
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "An error occurred during login. Please try again.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    }
  };

  return (
    <Card className="w-full max-w-md backdrop-blur-md bg-card/80 border-border/50 shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-card-foreground">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-card-foreground font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-input/60  border-border/50 text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-card-foreground font-medium"
            >
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 " />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-input/60  border-border/50 text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-card-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="h-4 w-4 rounded border-border/50 bg-input/60 text-secondary "
              />
              <Label
                htmlFor="remember"
                className="text-sm text-muted-foreground"
              >
                Remember me
              </Label>
            </div>
            <Button
              variant="link"
              className="px-0 text-sm text-gray-500 hover:text-gray-600/80 cursor-pointer"
              onClick={() => router.push("/auth/forgot-password")}
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black/70 hover:bg-black text-white hover:text-white  font-medium py-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
