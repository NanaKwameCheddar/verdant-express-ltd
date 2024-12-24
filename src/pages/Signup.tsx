import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - replace with actual API call when integrated
    toast({
      title: "Signup successful",
      description: "You have successfully signed up",
    });
  };

  return (
    <div>
      <img src="/logo.png" alt="Logo" className="w-32 h-32 rounded-lg mx-auto mb-8" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => {}}>
            Cancel
          </Button>
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  );
}
