import { usePathname } from "next/navigation";

const useRoleCheckfromPathname = () => {
  const pathname = usePathname();
  const isAdmin = !pathname.includes("bha") && !pathname.includes("bhaa");
  const isBha = pathname.includes("bha");
  const isBhaa = pathname.includes("bhaa");
  return { isAdmin, isBha, isBhaa };
};
export default useRoleCheckfromPathname;
