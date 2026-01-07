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
import { Mail } from "lucide-react";
import { useForgotPasswordMutation } from "@/redux/Apis/authApi/authApi";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/cookies";

export default function ForgotPassword() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const toast = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword({ email }).unwrap();

      // Check if response is successful
      if (response?.success && response?.data) {
        const { forgetToken } = response.data;

        // Save forgetToken to cookie
        if (forgetToken) {
          setCookie("forgetToken", forgetToken, 1); // 1 day expiry (OTP typically expires quickly)
        }

        // Show success toast
        toast.success(response.message || "An OTP sent to your email!");

        // Navigate to OTP verification page (you can adjust this route)
        router.push("/auth/verify-email");
      } else {
        throw new Error(response?.message || "Failed to send OTP");
      }
    } catch (error) {
      // Handle error
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <Card className="w-full max-w-md backdrop-blur-md bg-card/80 border-border/50 shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-card-foreground">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-card-foreground font-medium">
              Enter your email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email to reset your password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-input/60 border-border/50 text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black/70 hover:bg-black text-white hover:text-white  font-medium py-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
