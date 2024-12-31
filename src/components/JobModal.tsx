import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import { Clock, CheckCircle } from 'lucide-react'
import { Job } from "../@types";
import { Button } from "./ui/button";
import { Loader } from "./Loader";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onRefresh: (jobId: string) => Promise<Job | null>;
}

export function JobModal({ job, isOpen, onClose, onRefresh }: JobModalProps) {
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setCurrentJob(job);
  }, [job]);

  const handleRefresh = async () => {
    if (!currentJob) return;
    setIsRefreshing(true);

    try {
      const updatedJob = await onRefresh(currentJob.id);
      if (updatedJob) {
        setCurrentJob(updatedJob);
        toast.success("Job data refreshed successfully!");
      } else {
        toast.error("Failed to refresh job data. Please try again.");
      }
    } catch (error) {
      console.error("🚀 ~ handleRefresh ~ error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!currentJob) return null;

  const StatusIcon = currentJob.status === 'pending' ? Clock : CheckCircle;
  const statusColor = currentJob.status === 'pending' ? 'bg-orange-500' : 'bg-green-500';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
          <DialogDescription>ID: {currentJob.id}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative w-full h-32 mb-2">
            {currentJob.imageUrl ? (
              <img
                src={currentJob.imageUrl}
                alt={`Job ${currentJob.id} image`}
                className="w-full h-full object-cover"
              />
            ) : (
              <Loader />
            )}
          </div>

          <div className={`${statusColor} text-white px-3 py-1 rounded-full flex items-center space-x-1 w-fit`}>
            <StatusIcon className="w-4 h-4" />
            <span className="text-sm font-medium">
              {currentJob.status.charAt(0).toUpperCase() + currentJob.status.slice(1)}
            </span>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
