'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useSignIn } from '@clerk/nextjs';
import { useState } from 'react';

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const { signIn, isLoaded } = useSignIn();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handle Google OAuth with improved user creation
    const signInWithGoogle = async () => {
        if (!isLoaded) return;

        setIsLoading(true);
        setError(null);

        try {
            // First check if we can start the OAuth flow
            const result = await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/',
            });

            console.log('Authentication initiated', result);
        } catch (error) {
            console.error('Error signing in with Google:', error);
            setError('Failed to initiate Google sign-in. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn('flex flex-col gap-6 dark', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Continue with Google to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md">
                                {error}
                            </div>
                        )}
                        <Button
                            variant="outline"
                            className="w-full flex items-center gap-2"
                            onClick={signInWithGoogle}
                            disabled={!isLoaded || isLoading}
                        >
                            {isLoading ? 'Connecting...' : 'Login with Google'}
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <span className="text-muted-foreground">
                            Sign in with Google to create one automatically
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
