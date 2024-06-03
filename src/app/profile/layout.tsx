import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SastaGram Profile",
  description: "This is where you can access your profile",
};

export default function Layout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {props.modal}
      {props.children}
    </>
  );
}
