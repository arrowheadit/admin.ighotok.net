import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticatedOnly, GuestsOnly } from "./middleware";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
<<<<<<< HEAD
import { Categories, CreatePost, Home, Login, Post, Tags, Religions,Castes,Educations,EducationSubjects,Profession,Faqs,Area, Upazila, District,Division,Page,EditPageSection, Testimonials, OurTeams } from "@/pages";
=======
import { Categories, CreatePost, Home, Login, Post, Tags, Religions,Castes,Educations,EducationSubjects,Profession,Faqs,Area, Upazila, District,Division,Page } from "@/pages";
>>>>>>> 8a3fd8b7b18b81dc57cd0b6b6d0cd47bc0580d98
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
                                 <Route path="castes" element={<Castes />} />    
                            </Route>
                            {/* Education Routes Group */}
                            <Route path="/education">
                                <Route path="educations" element={<Educations />} /> 
                                <Route path="education-subjects" element={<EducationSubjects />} />
                            </Route>
                            {/* Geo Locations Routes Group */}
                            <Route path="/geo-locations">
                                <Route path="area" element={<Area />} />     
                                <Route path="upazila" element={<Upazila />} /> 
                                <Route path="district" element={<District />} /> 
                                 <Route path="division" element={<Division />} /> 
                            </Route>
                            <Route path="profession" element={<Profession />} /> 
                            <Route path="faqs" element={<Faqs />} />
<<<<<<< HEAD
                            <Route path="testimonials" element={<Testimonials />} />
                            <Route path="our-teams" element={<OurTeams />} />
                            {/* Geo Locations Routes Group */}
                            <Route path="/settings">
                                <Route path="pages" element={<Page />} /> 
                                <Route path="pages/edit-page-section/:slug" element={<EditPageSection />} />
=======
                            {/* Geo Locations Routes Group */}
                            <Route path="/settings">
                                <Route path="pages" element={<Page />} />     
                                
>>>>>>> 8a3fd8b7b18b81dc57cd0b6b6d0cd47bc0580d98
                            </Route>
                        </Route>
                    </Route>

                </Routes>
            </BrowserRouter>    
        )
    );
}
