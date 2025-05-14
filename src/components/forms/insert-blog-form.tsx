import { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export interface CreatePostFormValues {
  title: string;
  description: string;
  category_id: number;
  tags: Array<number>;
  banner: string;
  banner_image_alt: string;
  list_image: string;
  list_image_alt: string;
  is_published: boolean;
  is_featured: boolean;
}

export function InsertBlogForm() {
  // Sample categories and tags data (replace with actual data from your API)
  const categories = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Business" },
    { id: 3, name: "Lifestyle" },
  ];

  const availableTags = [
    { id: 1, name: "React" },
    { id: 2, name: "JavaScript" },
    { id: 3, name: "Web Development" },
    { id: 4, name: "UI/UX" },
  ];

  // Form state
  const [formData, setFormData] = useState<CreatePostFormValues>({
    title: "",
    description: "",
    category_id: 0,
    tags: [],
    banner: "",
    banner_image_alt: "",
    list_image: "",
    list_image_alt: "",
    is_published: false,
    is_featured: false,
  });

  // Form validation state
  const [errors, setErrors] = useState<Partial<Record<keyof CreatePostFormValues, string>>>({});

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when field is edited
    if (errors[name as keyof CreatePostFormValues]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (name: keyof CreatePostFormValues, value: string) => {
    setFormData({
      ...formData,
      [name]: parseInt(value),
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Handle checkbox changes for tags
  const handleTagChange = (tagId: number, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagId],
      });
    } else {
      setFormData({
        ...formData,
        tags: formData.tags.filter((id) => id !== tagId),
      });
    }
  };

  // Handle switch changes
  const handleSwitchChange = (name: keyof CreatePostFormValues, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreatePostFormValues, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (!formData.category_id || formData.category_id <= 0) {
      newErrors.category_id = "Please select a category";
    }
    
    if (!formData.banner.trim()) {
      newErrors.banner = "Banner image URL is required";
    }
    
    if (!formData.list_image.trim()) {
      newErrors.list_image = "List image URL is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Form data:", formData);
      // Here you would typically send the data to your API
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={handleInputChange}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter blog description"
                className="min-h-[200px]"
                value={formData.description}
                onChange={handleInputChange}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>

            {/* Banner Image */}
            <div className="space-y-2">
              <Label htmlFor="banner">Banner Image URL</Label>
              <Input
                id="banner"
                name="banner"
                placeholder="Enter banner image URL"
                value={formData.banner}
                onChange={handleInputChange}
              />
              {errors.banner && <p className="text-sm text-red-500">{errors.banner}</p>}
            </div>

            {/* Banner Image Alt Text */}
            <div className="space-y-2">
              <Label htmlFor="banner_image_alt">Banner Image Alt Text</Label>
              <Input
                id="banner_image_alt"
                name="banner_image_alt"
                placeholder="Enter alt text for banner image"
                value={formData.banner_image_alt}
                onChange={handleInputChange}
              />
            </div>

            {/* List Image */}
            <div className="space-y-2">
              <Label htmlFor="list_image">List Image URL</Label>
              <Input
                id="list_image"
                name="list_image"
                placeholder="Enter list image URL"
                value={formData.list_image}
                onChange={handleInputChange}
              />
              {errors.list_image && <p className="text-sm text-red-500">{errors.list_image}</p>}
            </div>

            {/* List Image Alt Text */}
            <div className="space-y-2">
              <Label htmlFor="list_image_alt">List Image Alt Text</Label>
              <Input
                id="list_image_alt"
                name="list_image_alt"
                placeholder="Enter alt text for list image"
                value={formData.list_image_alt}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 space-y-6">
            {/* Category Selection */}
            <div className="space-y-2">
              <Label htmlFor="category_id">Category</Label>
              <Select
                value={formData.category_id ? formData.category_id.toString() : ""}
                onValueChange={(value) => handleSelectChange("category_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
            </div>

            {/* Tags Selection */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="relative">
                <Select
                  onValueChange={(value) => {
                    const tagId = parseInt(value);
                    if (!formData.tags.includes(tagId)) {
                      handleTagChange(tagId, true);
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select tags" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTags
                      .filter(tag => !formData.tags.includes(tag.id))
                      .map((tag) => (
                        <SelectItem key={tag.id} value={tag.id.toString()}>
                          {tag.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.length > 0 ? (
                    formData.tags.map((tagId) => {
                      const tag = availableTags.find(t => t.id === tagId);
                      return tag ? (
                        <div key={tag.id} className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-md">
                          <span>{tag.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 pl-1"
                            onClick={() => handleTagChange(tag.id, false)}
                          >
                            <span className="sr-only">Remove</span>
                            <span aria-hidden="true">×</span>
                          </Button>
                        </div>
                      ) : null;
                    })
                  ) : (
                    <p className="text-sm text-muted-foreground">No tags selected</p>
                  )}
                </div>
              </div>
            </div>

            {/* Published Switch */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Published</Label>
                <p className="text-sm text-muted-foreground">
                  Make this post visible to readers
                </p>
              </div>
              <Switch
                checked={formData.is_published}
                onCheckedChange={(checked) => handleSwitchChange("is_published", checked)}
                className="cursor-pointer"
              />
            </div>

            {/* Featured Switch */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Featured</Label>
                <p className="text-sm text-muted-foreground">
                  Show this post in featured section
                </p>
              </div>
              <Switch
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleSwitchChange("is_featured", checked)}
                className="cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Create Post
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
