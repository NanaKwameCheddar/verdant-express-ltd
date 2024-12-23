import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function RatingForm() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - replace with actual API call when integrated
    toast({
      title: "Rating Submitted",
      description: "Thank you for your feedback!",
    });
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Rate your {type === 'driver' ? 'Driver' : 'Experience'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Feedback (Optional)</label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your experience..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="w-full">
              Cancel
            </Button>
            <Button type="submit" className="w-full">Submit Rating</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RatingForm;