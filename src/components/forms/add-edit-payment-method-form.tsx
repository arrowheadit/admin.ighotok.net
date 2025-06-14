import { useState,useEffect } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import type { createPaymentMethod,updatePaymentMethod } from "@/types/payment-method";
import { useCreatePaymentMethodMutation,useUpdatePaymentMethodMutation } from "@/mutations";
import { toast } from "sonner";
type Props = {
  selectedPaymentMethod?: updatePaymentMethod;
}
 import { snackCaseToUpperCase } from "@/utils/index";
export function AddEditPaymentMethodForm({ selectedPaymentMethod }:Props) { 
  const isEditMode = !!selectedPaymentMethod;  
  const [formData, setFormData] = useState<createPaymentMethod>({
  name: "",
  image: "",
  slug: "",
  pay_instructions: "",
  min: 0,
  max: 0,
  percent_charge: 0,
  fixed_charge: 0,
  status: "active",
  meta: {},
  type: "manual",
  class_name: "",
});
  useEffect(() => {
    if (isEditMode) { 
      console.log("selectedPaymentMethod", selectedPaymentMethod);
      setFormData(
      {
        name: selectedPaymentMethod?.name ?? "",
        image: selectedPaymentMethod?.image ?? "",
        slug: selectedPaymentMethod?.slug ?? "",
        pay_instructions: selectedPaymentMethod?.pay_instructions ?? "",
        min: selectedPaymentMethod?.min ?? 0,
        max: selectedPaymentMethod?.max ?? 0,
        percent_charge: selectedPaymentMethod?.percent_charge ?? 0,
        fixed_charge: selectedPaymentMethod?.fixed_charge ?? 0,
        meta: selectedPaymentMethod?.meta ?? {},
        status: selectedPaymentMethod?.status ? "active" : "inactive",
        type: selectedPaymentMethod?.type ?? "manual",
        class_name: selectedPaymentMethod?.class_name ?? "",
      }
      )
    }
  }, [selectedPaymentMethod,isEditMode]);

  // Form validation state
  const [errors, setErrors] = useState<Partial<Record<keyof createPaymentMethod, string>>>({});
const { mutateAsync: createPaymentMethod } = useCreatePaymentMethodMutation()
const { mutateAsync: updatePaymentMethod } = useUpdatePaymentMethodMutation()
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when field is edited
    if (errors[name as keyof createPaymentMethod]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  const handleInputMetaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        [name]: value,
      },
    }));
  };
  const handleSwitchChange = (name: keyof createPaymentMethod, checked: string) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof createPaymentMethod, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.min) {
      newErrors.min = "Minimum Amount is required";
    }
    
    if (!formData.max || formData.max <= 0) {
      newErrors.max = "Maximum Amount is required";
    }
    if (!formData.fixed_charge || formData.fixed_charge <= 0) {
      newErrors.fixed_charge = "Fixed Charge is required";
    }
    if (!formData.percent_charge || formData.percent_charge <= 0) {
      newErrors.percent_charge = "Percent Charge is required";
    }
    
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();   
    if (validateForm()) {
      toast.promise(
        isEditMode ?
        updatePaymentMethod(
          { 
            ...formData, 
            id: selectedPaymentMethod?.id??0, 
            slug: selectedPaymentMethod?.slug??"" 
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
        createPaymentMethod({ ...formData }, {          
          onSuccess: (data) => {
            if (data.data?.message) {
              toast.success(data.data?.message);
              setFormData({
              name: "",
              image: "",
              slug: "",
              pay_instructions: "",
              min: 0,
              max: 0,
              percent_charge: 0,
              fixed_charge: 0,
              status: "active",
              meta: {},
              type: "manual",
              class_name: "",
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
      if (errors["image" as keyof createPaymentMethod]) {
        setErrors({
          ...errors,
          ["image" as keyof createPaymentMethod]: undefined,
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
                placeholder="Enter Payment Method Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Pay Instructions Field */}
            {/* <div className="space-y-2">
              <Label htmlFor="description">Pay Instructions</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Pay Instructions"
                className="min-h-[200px]"
                value={formData.pay_instructions ?? ""}
                onChange={handleInputChange}
              />
              {errors.pay_instructions && <p className="text-sm text-red-500">{errors.pay_instructions}</p>}
            </div> */}

           

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
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <Label className="text-base">Status</Label>
              <Switch
                checked={formData.status === "active"}
                onCheckedChange={(checked) => handleSwitchChange("status", checked ? "active" : "inactive")}
                        className="cursor-pointer"
              />
            </div>
          </div>
{/* Status Switch */}
              
          <div className="col-span-12 md:col-span-4 space-y-6">
            {/* Min Section */}
            <div className="space-y-2 ">
             <Label  htmlFor="min" className="text-sm">Min</Label>
              <Input 
                  className="w-full"
                  type="number"
                  name="min"
                  placeholder="Enter Minimum Amount"
                  value={Number(formData.min)}
                  onChange={handleInputChange}
              />        
              {errors.min && <p className="text-sm text-red-500">{errors.min}</p>}
            </div>
            {/* Max Section */}
            <div className="space-y-2 ">
             <Label  htmlFor="max" className="text-sm">Max</Label>
              <Input 
                  className="w-full"
                  type="number"
                  name="max"
                  placeholder="Enter Maximum Amount"
                  value={Number(formData.max)}
                  onChange={handleInputChange}
              />        
              {errors.max && <p className="text-sm text-red-500">{errors.max}</p>}
            </div>
            {/* Fixed Charge Section */}
            <div className="space-y-2 ">
             <Label  htmlFor="fixed_charge" className="text-sm">Fixed Charge</Label>
              <Input 
                  className="w-full"
                  type="number"
                  name="fixed_charge"
                  placeholder="Enter Fixed Charge"
                  value={Number(formData.fixed_charge)}
                  onChange={handleInputChange}
              />        
              {errors.fixed_charge && <p className="text-sm text-red-500">{errors.fixed_charge}</p>}
            </div>
             {/* Percent Charge Section */}
            <div className="space-y-2 ">
             <Label  htmlFor="percent_charge" className="text-sm">Percent Charge</Label>
              <Input 
                  className="w-full"
                  type="number"
                  name="percent_charge"
                  placeholder="Enter Percent Charge"
                  value={Number(formData.percent_charge)}
                  onChange={handleInputChange}
              />        
              {errors.percent_charge && <p className="text-sm text-red-500">{errors.percent_charge}</p>}
            </div>
            

          </div>
          {formData?.meta && (
              <div className="col-span-12 sm:col-span-12 border p-2">
                <h5>Meta Information</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {formData?.meta && typeof formData?.meta === "object" && (Object.entries(formData.meta).map((meta,index) => (
                    meta[0] === "is_sandbox" ?
                      <div className="flex flex-col items-center" key={index}>
                        <Label htmlFor="name" className="block mb-2 font-medium">{snackCaseToUpperCase(meta[0])}</Label>
                        <Switch
                          className="cursor-pointer"
                          checked={meta[1] === true}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              meta: {
                                ...prev.meta,
                                is_sandbox: checked,
                              },
                            }))
                          }
                        />
                      </div> 
                    :
                    <div key={index} className="flex flex-col items-center">
                      <Label htmlFor={meta[0]} className="text-sm mb-2">{snackCaseToUpperCase(meta[0])}</Label>
                      <Input
                        id={meta[0]}
                        className="w-full"
                        type="text"
                        name={meta[0]}
                        placeholder={`Enter ${meta[0]} Information`}
                        value={String(meta[1])}
                        onChange={handleInputMetaChange}
                      />
                    </div>
                  )))}
              </div>
            </div>
          )} 
        </div>
        {/* Submit Button */}
        <Button type="submit" className="w-full">
          {isEditMode ? (<span>Update Payment Method</span>):(<span>Create Payment Method</span>)}
        </Button>
    </form>
  </Card>
);
}
