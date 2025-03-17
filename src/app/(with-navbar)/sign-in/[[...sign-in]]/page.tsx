import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[var(--background)] dark">
            <SignIn forceRedirectUrl={'/dashboard'} />
        </div>
    );
}
