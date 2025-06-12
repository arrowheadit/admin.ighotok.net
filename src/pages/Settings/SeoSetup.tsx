import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {List } from "lucide-react";
import { useCreateSeoSetupMutation } from "@/mutations";
import { toast } from "sonner";
import type { createPageSeo } from "@/types/seo";
export function SeoSetup() {
  const location = useLocation();
  const pageData = location.state; 
  // Form validation state
  //const [errors, setErrors] = useState<createPageSeo | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof createPageSeo, string>>>({});
  const { mutateAsync: createSeoSetup } = useCreateSeoSetupMutation();

  const [formData, setFormData] = useState<createPageSeo | null>(null);
  // const [openItem, setOpenItem] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState<{ key: string; loading: boolean }>({ key: "", loading: false });

  useEffect(() => {
    if (pageData) {
      try {
        console.log('pageData in seo setup', pageData);
        if (pageData.seo && typeof pageData.seo === "object") {
          setFormData({
            title: pageData.seo.title ?? "",
            canonical_url: pageData.seo.canonical_url ?? "",
            author: pageData.seo.author ?? "",
            keywords: pageData.seo.keywords ?? "",
            description: pageData.seo.description ?? "",
            image: pageData.seo.image ?? "",
            pageSlug: pageData.slug ?? "",
          });
        } else {
          setFormData({
            title: "",
            canonical_url: "",
            author: "",
            keywords: "",
            description: "",
            image: "",
            pageSlug: "",
          });
        }
      } catch {
        setFormData(null);
      }
    }
  }, [pageData]);

  // const handleValueChange = (value: string | null) => setOpenItem(value);
// Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? {
      ...prev,
      [name]: value,
      title: name === "title" ? value : prev.title ?? "",
      canonical_url: name === "canonical_url" ? value : prev.canonical_url ?? "",
      author: name === "author" ? value : prev.author ?? "",
      keywords: name === "keywords" ? value : prev.keywords ?? "",
      description: name === "description" ? value : prev.description ?? "",
      image: name === "image" ? value : prev.image ?? "",
      pageSlug: prev.pageSlug ?? "",
    } : null);
    // Clear error when field is edited
    if (errors[name as keyof createPageSeo]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  
 // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof createPageSeo, string>> = {};
    if (!formData) {
      toast.error("Form data is not available.");
      return false;
    }
    if (!formData?.title) {
      newErrors.title = "Title   is required";
      return false;
    }
    return true;
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       
      const file = e.target.files && e.target.files[0];
        setFormData(prev => prev ? { ...prev, image: file } : prev);
        // Clear error when field is edited
        if (errors["image" as keyof createPageSeo]) {
          setErrors({
            ...errors,
            ["image" as keyof createPageSeo]: undefined,
          });
        }
      };
const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (validateForm()) {
    console.log("Form data after validation:", formData);

    createSeoSetup(
      {
        title: formData?.title ?? "",
        image: formData?.image ?? "",
        description: formData?.description ?? "",
        canonical_url: formData?.canonical_url ?? "",
        author: formData?.author ?? "",
        keywords: formData?.keywords ?? "",
        pageSlug: pageData.slug,
      },
      {
        onSuccess: (data) => {
          if (data.data?.message) {
            toast.success(data.data?.message);
            setFormData({
              title: "",
              image: "",
              description: "",
              canonical_url: "",
              author: "",
              keywords: "",
              pageSlug: pageData.slug,
            });
          }
        },
        onError: (error) => {
          const err = error as { response?: { status?: number; data?: { errors?: Record<string, string[]> } }; message?: string };
          if (err?.response?.status === 422 && err?.response?.data?.errors) {
            const errors = err.response.data.errors;
            const allMessages = Object.values(errors).flat();
            const firstMessage = allMessages[0];
            if (firstMessage) {
              toast.error(String(firstMessage));
              setErrors(errors);
            }
          } else {
            toast.error("Something went wrong! Please try again later.");
            console.error("Other error:", err.message);
          }
        },
      }
    );
  }
};

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">SEO Settings For {pageData.title} Page</h1> 
        <Button variant="default" asChild>
          <a href="/settings/pages">
            <List />
            Pages
          </a>
        </Button>
      </div>
     <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Title</Label>
            <Input
                name="title"
                placeholder="Title"
                value={formData?.title}
                onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Canonical URL</Label>
            <Input
              name="canonical_url"
              placeholder="canonical_url"
              value={formData?.canonical_url}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Author</Label>
            <Input
              name="author"
              placeholder="Author"
              value={formData?.author}
                            onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Keywords</Label>
            <Input
                name="keywords"
                placeholder="Keywords"
                value={formData?.keywords}
                onChange={handleInputChange}
            />  
          </div>    
                        {/* Image */}
            <div className="space-y-2">
               <Label  htmlFor="image" className="text-sm">Image</Label>
              <Input 
                  className="w-full"
                  type="file"
                  name="image"
                  onChange={handleImageChange}
              />     
              {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
            </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Enter Membership Description"
                            className="min-h-[200px]"
                            value={formData?.description}
                            onChange={handleInputChange}
                          />
                          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>
                </div>
                <div className="text-right mt-4">
                  <Button type="submit" className="w-sm">Submit
                    </Button>
                </div>
                </form>
    </section>
  );
}
