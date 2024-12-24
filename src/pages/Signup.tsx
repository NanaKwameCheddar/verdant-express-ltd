import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const [role, setRole] = useState<"driver" | "customer">("customer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    ghanaCard: "GHA-",
    driversLicense: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateGhanaCard = (value: string) => {
    const regex = /^GHA-\d{9}-\d$/;
    return regex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (role === 'driver') {
      if (!validateGhanaCard(formData.ghanaCard)) {
        toast({
          title: "Invalid Ghana Card Number",
          description: "Please enter a valid Ghana Card number (e.g., GHA-123456789-1)",
          variant: "destructive"
        });
        return;
      }
      
      if (!formData.driversLicense) {
        toast({
          title: "Driver's License Required",
          description: "Please enter your driver's license number",
          variant: "destructive"
        });
        return;
      }
    }

    toast({
      title: role === 'driver' ? "Application Submitted" : "Account Created",
      description: role === 'driver' 
        ? "Your application is pending admin approval" 
        : "Account created successfully",
    });
    
    if (role === "customer") {
      navigate("/customer");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center space-y-2">
          <img
            src="/lovable-uploads/423456c0-e86c-4c12-9e6a-212fb9ec9bf2.png"
            alt="Verdant Express LTD"
            className="h-16 mx-auto"
          />
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500">Sign up for a new account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Account Type</label>
            <Select
              value={role}
              onValueChange={(value: "driver" | "customer") => setRole(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <Input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          {role === "driver" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Ghana Card Number</label>
                <Input
                  type="text"
                  value={formData.ghanaCard}
                  onChange={(e) => setFormData({ ...formData, ghanaCard: e.target.value })}
                  placeholder="GHA-123456789-1"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Driver's License Number</label>
                <Input
                  type="text"
                  value={formData.driversLicense}
                  onChange={(e) => setFormData({ ...formData, driversLicense: e.target.value })}
                  required
                />
              </div>
            </>
          )}

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}