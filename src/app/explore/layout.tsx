import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SastaGram Explore Grams",
  description: "This is where you can explore posts by diffrent users",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
