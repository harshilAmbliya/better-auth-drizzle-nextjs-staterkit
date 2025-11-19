"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function SignoutButton() {

	const router = useRouter()

	const handleSignOut = async () => {
		const response = await authClient.signOut()
		if (response.data?.success) {
			window.location.href = '/login'
		} else {
			console.error(response.error)
		}
	}
	return (
		<Button onClick={handleSignOut}>Sign Out</Button>
	)
}