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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  useVerifyEmailMutation,
  useResendOtpMutation,
} from "@/redux/Apis/authApi/authApi";
import useToast from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "@/utils/cookies";

export default function VerifyEmail() {
  const router = useRouter();
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const toast = useToast();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await verifyEmail({ otp }).unwrap();

      // Check if response is successful
      if (response?.success && response?.data) {
        const { forgetOtpMatchToken } = response.data;

        // Remove forgetToken from cookie after successful verification
        deleteCookie("forgetToken");

        // Save forgetOtpMatchToken as resetPassToken in cookie
        if (forgetOtpMatchToken) {
          setCookie("resetPassToken", forgetOtpMatchToken, 1); // 1 day expiry
        }

        // Show success toast
        toast.success(response.message || "Email verified successfully");

        // Navigate to reset password page
        router.push("/auth/reset-password");
      } else {
        throw new Error(response?.message || "OTP verification failed");
      }
    } catch (error) {
      // Handle error
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Invalid OTP. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await resendOtp().unwrap();

      // Check if response is successful
      if (response?.success && response?.data) {
        const { forgetToken } = response.data;

        // Replace old forgetToken with new one
        if (forgetToken) {
          setCookie("forgetToken", forgetToken, 1); // 1 day expiry
        }

        // Show success toast
        toast.success(response.message || "OTP resent successfully");
      } else {
        throw new Error(response?.message || "Failed to resend OTP");
      }
    } catch (error) {
      // Handle error
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to resend OTP. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <Card className="w-full max-w-md backdrop-blur-md bg-card/80 border-border/50 shadow-2xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-card-foreground">
          Verify Email
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter the 6-digit code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 flex flex-col items-center justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Didn't receive the code?{" "}
            <span
              className="text-black font-bold cursor-pointer hover:underline"
              onClick={handleResendOtp}
            >
              {isResending ? "Resending..." : "Resend"}
            </span>
          </p>
          <Button
            type="submit"
            disabled={isVerifying || otp.length !== 6}
            className="w-full bg-black/70 hover:bg-black text-white hover:text-white  font-medium py-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? "Verifying..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
