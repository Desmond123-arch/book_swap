import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import {ClimbingBoxLoader} from 'react-spinners'
export default function Layout() {
    return (
        <>
            <Navbar/>
            <main>
                <Suspense fallback={
                    <div className="center">
                        <ClimbingBoxLoader />
                    </div>
                }>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}