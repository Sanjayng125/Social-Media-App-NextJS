import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SastaGram Create Grams",
  description:
    "This is where you can create your Grams(Posts) and connect with other peoples on this social media app",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
