import { cn } from "@/lib/utils"
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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import api from "@/api/axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import useAuth from "@/context/AuthContext"

export function LoginForm() {
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.SubmitEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', {
        email, password
      })
      console.log(data)
      if (data.status === "success") {
        toast.success("Login Success")
        navigate("/menu");
        console.log("Data inside if: ", data.data.user)
        setUser(data.data.user)
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Login failed"
      )
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="flex flex-col gap-6 md:p-10 px-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
