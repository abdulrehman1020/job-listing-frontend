import { Job } from "@/types/job"
import { JobCard } from "./JobCard"

interface JobListProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
}

export function JobList({ jobs, onJobClick }: JobListProps) {
  if (jobs.length === 0) {
    return <p className="text-center text-gray-500">No jobs found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} />
      ))}
    </div>
  )
}

