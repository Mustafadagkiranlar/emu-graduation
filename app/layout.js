import "./globals.css";

export const metadata = {
  title: "EMU Parking Lot Checker",
  description: "Availability checker for EMU parking lots",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
