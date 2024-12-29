import Image from "next/image"
import { Clock, CheckCircle } from 'lucide-react'
import { Job } from "../@types";
import { Card, CardContent } from "./ui/card";
import { Loader } from "./Loader";

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  const statusColor = job.status === 'pending' ? 'bg-orange-500' : 'bg-green-500'
  const StatusIcon = job.status === 'pending' ? Clock : CheckCircle

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-4 flex flex-col items-center">
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


        <p className="font-semibold mb-2">ID: {job.id}</p>
        <div className={`${statusColor} text-white px-3 py-1 rounded-full flex items-center space-x-1`}>
          <StatusIcon className="w-4 h-4" />
          <span className="text-sm font-medium">
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

