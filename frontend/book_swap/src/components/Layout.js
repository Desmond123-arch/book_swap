import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
export default function Layout() {
    const isLoggedIn = true;
    return (
        <>
            <Navbar isLoggedIn={isLoggedIn}/>
            <main>
                <Suspense fallback={
                    <div>Loading...</div>
                }>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}