"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button"

export default function SignoutButton() {
	const handleSignOut = async () => {
		const response = await authClient.signOut()
		if (response.data?.success) {
			window.location.href = '/login'
		} else {
			console.error(response.error)
		}
	}
	return (
		<Button className="cursor-pointer" onClick={handleSignOut}>Sign Out</Button>
	)
}