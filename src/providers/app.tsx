import { Button, Spinner } from "@/components/ui";
import React, { ReactNode } from "react"
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { BrowserRouter as Router } from 'react-router-dom';

type Props = {
    children: ReactNode
}

const ErrorFallback = () => {
    return (
        <div
            className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
            role="alert"
        >
            <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
            <Button.Root className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
                Recarregar
            </Button.Root>
        </div>
    );
};

export const AppProvider = ({ children }: Props) => {
    return (
        <React.Suspense
            fallback={
                <div className="flex items-center justify-center w-screen h-screen">
                    <Spinner size="xl" />
                </div>
            }
        >
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <HelmetProvider>
                    <Router>
                        {children}
                    </Router>
                </HelmetProvider>
            </ErrorBoundary>

        </React.Suspense>
    )
}