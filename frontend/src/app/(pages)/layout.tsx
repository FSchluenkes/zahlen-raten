import Header from "@/components/header/header";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
