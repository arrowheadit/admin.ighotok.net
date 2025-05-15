import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticatedOnly, GuestsOnly } from "./middleware";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Categories, CreatePost, Home, Login, Post, Tags, Religions } from "@/pages";
import { useAuth } from "@/context/hooks";
import { useEffect, useState } from "react";

export default function ApplicationRoutes() {
    const { isAuthenticated } = useAuth();
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true);
    },[])

    return (
        mounted && (
            <BrowserRouter>
                <Routes>

                    {/* Guest Routes Group */}
                    <Route element={<GuestsOnly isAuthenticated={isAuthenticated} />}>
                        <Route path="/login" element={<Login />} />
                    </Route>

                    {/* Protected Routes Group */}
                    <Route element={<AuthenticatedOnly isAuthenticated={isAuthenticated} />}>
                        <Route element={<DashboardLayout />}>
                            <Route path="/" element={<Home />} />

                            {/* Blog Routes Group */}
                            <Route path="/blog">
                                <Route path="posts">
                                    <Route index element={<Post />} />
                                    <Route path="create" element={<CreatePost />} />
                                    <Route path=":postId/edit" element={<div>edit</div>} />
                                </Route>
                                <Route path="category" element={<Categories />} />
                                <Route path="tag" element={<Tags />} />
                            </Route>
                            {/* Religion Routes Group */}
                            <Route path="/religion">
                                    <Route path="religions" element={<Religions />} />                             
                            </Route>

                        </Route>
                    </Route>

                </Routes>
            </BrowserRouter>    
        )
    );
}
