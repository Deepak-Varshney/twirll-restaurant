import api from "@/api/axios"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import useAuth from "@/context/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function SignUpPage() {

  const { setUser } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.SubmitEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/signup', {
        email, password, name
      })
      if (data.status === "success") {
        toast.success("Signup Success")
        navigate("/menu");
        setUser(data.data.user)
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Signup failed"
      )
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="flex flex-col gap-6 md:p-20 px-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                  placeholder="John Doe" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => { setEmail(e.target.value) }}
                  value={email}
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" min={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
