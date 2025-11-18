	"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button"

export default function SignoutButton() {

	const handleSignOut = async () => {
		const response = await authClient.signOut()
		if (response.error) {
			console.error(response.error)
		} else {
			console.log(response.data)
		}
	}
	return (
		<Button onClick={handleSignOut}>Sign Out</Button>
	)
}