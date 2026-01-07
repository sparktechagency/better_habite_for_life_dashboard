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
import { Eye, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import { useResetPasswordMutation } from "@/redux/Apis/authApi/authApi";
import { deleteCookie } from "@/utils/cookies";

export default function ResetPassword() {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate password length
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await resetPassword({
        newPassword,
        confirmPassword,
      }).unwrap();

      // Check if response is successful
      if (response?.success) {
        // Remove resetPassToken from cookie after successful reset
        deleteCookie("resetPassToken");

        // Show success toast
        toast.success(response.message || "Password reset successfully");

        // Navigate to login page
        router.push("/auth/login");
      } else {
        throw new Error(response?.message || "Password reset failed");
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
          Reset Password
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="newPassword"
              className="text-card-foreground font-medium"
            >
              New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4" />
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-card-foreground font-medium"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10 bg-input/60  border-border/50 text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-card-foreground"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={
              isLoading ||
              newPassword !== confirmPassword ||
              newPassword.length < 6
            }
            className="w-full bg-black/70 hover:bg-black text-white hover:text-white  font-medium py-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
