import dynamic from "next/dynamic";

const AIMoneyMentor = dynamic(() => import("@/components/AIMoneyMentor"), { ssr: false });

export default function Page() {
  return <AIMoneyMentor />;
}
