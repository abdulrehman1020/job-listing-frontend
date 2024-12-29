export interface Job {
  id: string;
  status: 'pending' | 'resolved';
  imageUrl: string;
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
