import { useState,useEffect } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import type { createMemberships,updateMemberships } from "@/types/memberships";
import { useCreateMembershipMutation,useUpdateMembershipMutation } from "@/mutations";
import { toast } from "sonner";
type Props = {
  selectedMemberData?: updateMemberships;
}
export function InsertMembershipForm({ selectedMemberData }:Props) { 
  const isEditMode = !!selectedMemberData;  
  const [formData, setFormData] = useState<createMemberships>({
  name: "",
  image: "",
  description: "",
  price: 0,
  proposals: 0,
  profile_views_limit: 0,
  days: 0,
  is_published: false,
  is_recommended: false,
});
  useEffect(() => {
    if (isEditMode) {     
      setFormData(
      {
        name: selectedMemberData?.name??"",
        image: selectedMemberData?.image??"",
        description: selectedMemberData?.description??"",
        price: selectedMemberData?.price??0,
        proposals: selectedMemberData?.proposals??0,
        profile_views_limit: selectedMemberData?.profile_views_limit??0,
        days: selectedMemberData?.days??0,
        is_published: selectedMemberData?.is_published?true:false,
        is_recommended: selectedMemberData?.is_recommended?true:false,
      }
      )
    }
  }, [selectedMemberData,isEditMode]);

  // Form validation state
  const [errors, setErrors] = useState<Partial<Record<keyof createMemberships, string>>>({});
const { mutateAsync: createMembership } = useCreateMembershipMutation()
const { mutateAsync: updateMembership } = useUpdateMembershipMutation()
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when field is edited
    if (errors[name as keyof createMemberships]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  // Handle switch changes
  const handleSwitchChange = (name: keyof createMemberships, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof createMemberships, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.price) {
      newErrors.price = "Price is required";
    }
    
    if (!formData.proposals || formData.proposals <= 0) {
      newErrors.proposals = "Proposal is required";
    }
    
    if (!formData.days) {
      newErrors.days = "Days is required";
    }
    
    if (!formData.description) {
      newErrors.description = "Description is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();   
    if (validateForm()) {
      toast.promise(
        isEditMode ?
        updateMembership(
          { 
            ...formData, 
            id: selectedMemberData?.id??0, 
            slug: selectedMemberData?.slug??"" 
          }, 
          {          
            onSuccess: (data) => {
              if (data.data?.message) {
                toast.success(data.data?.message);
              }
            },
            onError: (error) => {
              console.error("Error creating Membership:", error);
            },
          }
        ):        
        createMembership({ ...formData }, {          
          onSuccess: (data) => {
            if (data.data?.message) {
              toast.success(data.data?.message);
              setFormData({
              name: "",
              image: "",
              description: "",
              price: 0,
              proposals: 0,
              profile_views_limit: 0,
              days: 0,
              is_published: false,
              is_recommended: false,
            });
            }
          },
          onError: (error) => {
            console.error("Error creating Membership:", error);
          },
        }),
      {
        loading: isEditMode?"Updating Membership...":"Creating Membership...",
        success: isEditMode?"Membership updated successfully!":"Membership created successfully!",
        error: isEditMode?"Error updating Membership.":"Error creating Membership.",
      }
    );
      
    }
  };
 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     
    const file = e.target.files && e.target.files[0];
      setFormData({
        ...formData,
        image: file || "",
      });
      // Clear error when field is edited
      if (errors["image" as keyof createMemberships]) {
        setErrors({
          ...errors,
          ["image" as keyof createMemberships]: undefined,
        });
      }
    };
  
  return (
    <Card className="p-6">
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter membership name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter Membership Description"
                className="min-h-[200px]"
                value={formData.description}
                onChange={handleInputChange}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
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
          </div>

          <div className="col-span-12 md:col-span-4 space-y-6">
            {/* Price Section */}
            <div className="space-y-2 ">
             <Label  htmlFor="price" className="text-sm">Price</Label>
              <Input 
                  className="w-full"
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={Number(formData.price)}
                  onChange={handleInputChange}
              />        
              {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
            </div>
            {/* Proposal Section */}
            <div className="space-y-2 ">
             <Label  htmlFor="proposals" className="text-sm">Proposal</Label>
              <Input 
                 className="w-full"
                  type="number"
                  name="proposals"
                  placeholder="Enter Proposals"
                  value={Number(formData.proposals)}
                  onChange={handleInputChange}                 
              />     
              {errors.proposals && <p className="text-sm text-red-500">{errors.proposals}</p>}
            </div>
            {/* Days Section */}
            <div className="space-y-2 ">
             <Label  htmlFor="days" className="text-sm">Days</Label>
              <Input 
                  className="w-full"
                  type="number"
                  name="days"
                  placeholder="Enter Days"
                  value={Number(formData.days)}
                  onChange={handleInputChange}
              />     
              {errors.days && <p className="text-sm text-red-500">{errors.days}</p>}
            </div>
            {/* Profile Views limit */}
            <div className="space-y-2 ">
             <Label  htmlFor="profile_views_limit" className="text-sm">Profile Views Limit</Label>
              <Input 
                  className="w-full"
                  type="number"
                  name="profile_views_limit"
                  placeholder="Enter Profile Views Limit"
                  value={Number(formData.profile_views_limit)}
                  onChange={handleInputChange}
              />     
              {errors.profile_views_limit && <p className="text-sm text-red-500">{errors.profile_views_limit}</p>}
            </div>
            {/* Published Switch */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <Label className="text-base">Published</Label>
              <Switch
                checked={formData.is_published}
                onCheckedChange={(checked) => handleSwitchChange("is_published", checked)}
                className="cursor-pointer"
              />
            </div>

            {/* Featured Switch */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <Label className="text-base">Recommended</Label>
              <Switch
                checked={formData.is_recommended}
                onCheckedChange={(checked) => handleSwitchChange("is_recommended", checked)}
                className="cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              {isEditMode ? (<span>Update Membership</span>):(<span>Create Membership</span>)}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
