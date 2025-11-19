'use client'
import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface LoginInfo {
    email: string
    password: string
}

export default function Login() {
    const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [useMagicLink, setUseMagicLink] = useState(false)
    const [magicLinkSent, setMagicLinkSent] = useState(false)
    const [isSendingMagicLink, setIsSendingMagicLink] = useState(false)
    const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(loginInfo)
        loginUsers(loginInfo as LoginInfo)
    }
    const loginUsers = async (loginInfo: LoginInfo) => {
        setIsLoading(true)
        try {
            const response = await authClient.signIn.email({
                email: loginInfo?.email,
                password: loginInfo?.password,
                callbackURL: "/",
            })
            if (response.data?.user) {
                window.location.href = "/"
            } else {
                console.error(response.error)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

   

    const sendMagicLink = async (email: string) => {
        if (!email) {
            alert('Please enter your email address')
            return
        }
        setIsSendingMagicLink(true)
        try {
            const response = await authClient.signIn.magicLink({
                email: email,
                callbackURL: "/",
            })
            if (response.error) {
                console.error(response.error?.message)
                alert('Failed to send magic link: ' + response.error?.message)
            } else {
                setMagicLinkSent(true)
            }   
        } catch (error) {
            console.error(error)
            alert('An error occurred while sending magic link')
        } finally {
            setIsSendingMagicLink(false)
        }
    }

    const handleMagicLinkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (loginInfo?.email) {
            sendMagicLink(loginInfo.email)
        } else {
            alert('Please enter your email address first')
        }
    }

    const handleGoogleLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const response = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            })
            console.log(response)
        } catch (error) {
            console.error(error)
            alert('An error occurred while signing in with Google')
        }
    }

    const handleGitHubLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const response = await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            })
            console.log(response)
        } catch (error) {
            console.error(error)
            alert('An error occurred while signing in with GitHub')
        }
    }
   
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <form
                action=""
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div className="text-center">
                        <Link
                            href="/"
                            aria-label="go home"
                            className="mx-auto block w-fit">
                            <LogoIcon />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Sign In to UniApp</h1>
                        <p className="text-sm">Welcome back! Sign in to continue</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm">
                                Username
                            </Label>
                            <Input
                                type="email"
                                required
                                name="email"
                                id="email"
                                onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value } as LoginInfo)}
                            />
                        </div>

                        {!useMagicLink && (
                            <div className="space-y-0.5">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="pwd"
                                        className="text-sm">
                                        Password
                                    </Label>
                                    <Button
                                        asChild
                                        variant="link"
                                        size="sm">
                                        <Link
                                            href="#"
                                            className="link intent-info variant-ghost text-sm">
                                            Forgot your Password ?
                                        </Link>
                                    </Button>
                                </div>
                                <Input
                                    type="password"
                                    required
                                    name="pwd"
                                    id="pwd"
                                    className="input sz-md variant-mixed"
                                    onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value } as LoginInfo)}
                                />
                            </div>
                        )}

                        {magicLinkSent && (
                            <div className="rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3">
                                <p className="text-sm text-green-800 dark:text-green-200">
                                    Magic link sent! Please check your email and click the link to sign in.
                                </p>
                            </div>
                        )}

                        {useMagicLink ? (
                            <div className="space-y-3">
                                <Button 
                                    className="w-full cursor-pointer" 
                                    onClick={handleMagicLinkClick} 
                                    disabled={isSendingMagicLink || !loginInfo?.email}
                                >
                                    {isSendingMagicLink ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Magic Link'
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="w-full cursor-pointer"
                                    onClick={() => {
                                        setUseMagicLink(false)
                                        setMagicLinkSent(false)
                                    }}
                                >
                                    Use Password Instead
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button className="w-full cursor-pointer" onClick={handleLoginClick} disabled={isLoading}>
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
                                </Button>
                                <div className="text-center">
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="text-sm cursor-pointer"
                                        onClick={() => setUseMagicLink(true)}
                                    >
                                        Or sign in with magic link
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <hr className="border-dashed" />
                        <span className="text-muted-foreground text-xs">Or continue With</span>
                        
                        <hr className="border-dashed" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={handleGoogleLoginClick}
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="0.98em"
                                height="1em"
                                viewBox="0 0 256 262">
                                <path
                                    fill="#4285f4"
                                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                <path
                                    fill="#34a853"
                                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                <path
                                    fill="#fbbc05"
                                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                <path
                                    fill="#eb4335"
                                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                            </svg>
                            <span>Google</span>
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGitHubLoginClick}
                            className="cursor-pointer"
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span>GitHub</span>
                        </Button>
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Don't have an account ?
                        <Button
                            asChild
                            variant="link"
                            className="px-2 cursor-pointer">
                            <Link href="/signup">Create account</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}
