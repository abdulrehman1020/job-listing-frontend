import { PlusCircle } from 'lucide-react'
import { Button } from './ui/button';

interface CreateJobButtonProps {
  onClick: () => void;
}

export function CreateJobButton({ onClick }: CreateJobButtonProps) {
  return (
    <Button onClick={onClick} className="mb-4">
      <PlusCircle className="mr-2 h-4 w-4" /> Create Job
    </Button>
  )
}

