import { Eye, EyeOff, Users } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import type { LoginFormValues } from "@/schema"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/hooks"

export function Login() {
  const { login, isLoading } = useAuth()
  const [formState, setFormState] = useState<LoginFormValues>({
    credential: "",
    password: "",
    rememberMe: false
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login(formState)
    console.log("Form submitted with values:", formState)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Image */}
      <div className="hidden md:block relative">
        <img
          src="https://picsum.photos/2000/3000.webp"
          alt="Luxury hotel lobby"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-10">
          <div className="flex items-center gap-2 text-white">
            <Users className="h-8 w-8" />
            <span className="text-2xl font-semibold">Ighotok Admin</span>
          </div>
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">Ighotok Admin Portal</h2>
            <p className="text-white/90">
              Manage user profiles, verify memberships, and oversee matches efficiently. Monitor success stories and
              maintain platform integrity for lasting connections.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16 bg-white">
        <div className="md:hidden flex items-center gap-2 mb-8">
          <Users className="h-8 w-8" />
          <span className="text-xl font-semibold">Ighotok Admin</span>
        </div>

        <div className="max-w-md mx-auto w-full">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold">Welcome back </h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="credential">Email or Phone number</Label>
              <Input
                id="credential"
                name="credential"
                type="text"
                placeholder="Enter email or phone number"
                required
                autoComplete="email"
                value={formState.credential}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  value={formState.password}
                  onChange={handleInputChange}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                name="rememberMe"
                checked={formState.rememberMe}
                onCheckedChange={(checked) =>
                  setFormState({
                    ...formState,
                    rememberMe: checked === true
                  })
                }
              />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                Remember me
              </Label>
            </div>
            <Button type="submit" className="cursor-pointer w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-center text-sm text-muted-foreground">
              By signing in, you agree to our{" "}
              <a href="#" className="hover:underline underline-offset-4">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="hover:underline underline-offset-4">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
