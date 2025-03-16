import { LoginForm } from '@/components/login-form';

export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[var(--background)] dark">
            <div className="w-full max-w-sm  p-6 rounded-lg shadow-md">
                <LoginForm />
            </div>
        </div>
    );
}
