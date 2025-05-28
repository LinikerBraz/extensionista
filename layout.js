import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children }) {
    return (
    <>
    {children}
    <Analytics />
    </>
);
}