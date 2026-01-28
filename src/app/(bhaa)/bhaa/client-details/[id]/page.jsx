"use client"
import BhaaClientDetailsLayout from "@/components/vhaa/clientdetails/BhaaClientDetailsLayout";
import { useParams } from 'next/navigation';
function page() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="p-4">
      <BhaaClientDetailsLayout id={id} />
    </div>
  );
}

export default page;
