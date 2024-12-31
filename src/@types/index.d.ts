export interface Job {
  id: string;
  status: JobStatus;
  imageUrl: string;
}

enum JobStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  FAILED = 'failed'
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface JobCardProps {
  job: Job
  onView: () => void
  onRefresh: () => void
}


interface JobModalProps {
  job: Job
  onClose: () => void
  onRefresh: () => void
}
