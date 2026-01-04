import React from "react";
import { Button } from "@/components/ui/button";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

function BackButton({ showText = true, text = "Back" }) {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="bg-transparent border-none shadow-none hover:bg-transparent px-0"
      onClick={() => router.back()}
    >
      <FiArrowLeft size={20} />
      {showText && <span className="text-lg font-semibold ml-2">{text}</span>}
    </Button>
  );
}

export default BackButton;
