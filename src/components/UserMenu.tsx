import { LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import useAuth from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import api from "@/api/axios"

const UserMenu = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null)
            navigate('/')

        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-10 w-10"
                    >
                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                                {user.name.toUpperCase().slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-64 p-2"
                >
                    <div className="flex items-center gap-3 rounded-md p-2">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                {user.name.toUpperCase().slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col overflow-hidden">
                            <span className="font-medium truncate">
                                {user.name}
                            </span>
                            <span className="text-muted-foreground text-sm truncate">
                                {user.email}
                            </span>
                        </div>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserMenu