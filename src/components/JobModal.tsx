import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import Image from "next/image"
import { Clock, CheckCircle } from 'lucide-react'
import { Job } from "../@types";
import { Button } from "./ui/button";
import { Loader } from "./Loader";

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobModal({ job, isOpen, onClose }: JobModalProps) {
  if (!job) return null;

  const StatusIcon = job.status === 'pending' ? Clock : CheckCircle
  const statusColor = job.status === 'pending' ? 'bg-orange-500' : 'bg-green-500'

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
          <DialogDescription>ID: {job.id}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative w-full h-32 mb-2">
            {job.imageUrl ? (
              <img
                src={job.imageUrl}
                alt={`Job ${job.id} image`}
                className="w-full h-full object-cover"
              />
            ) : (
              <Loader />
            )}
          </div>

          <div className={`${statusColor} text-white px-3 py-1 rounded-full flex items-center space-x-1 w-fit`}>
            <StatusIcon className="w-4 h-4" />
            <span className="text-sm font-medium">
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </div>
          {/* <p>{job.description}</p> */}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

