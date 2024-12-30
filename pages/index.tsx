'use client'

import { Job } from '@/src/@types'
import { CreateJobButton } from '@/src/components/CreateJobButton'
import { JobList } from '@/src/components/JobList'
import { JobModal } from '@/src/components/JobModal'
import { Loader } from '@/src/components/Loader'
import { Alert, AlertDescription } from '@/src/components/ui/alert'
import { createJob, getJobs } from '@/src/lib/api'
import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001');

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchJobs = await getJobs();
      setJobs(fetchJobs);
    } catch (err) {
      setError("Failed to fetch jobs. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();

    // Listen for jobResolved events
    socket.on('jobResolved', (data: { jobId; status; imageUrl }) => {
      console.log("🚀 ~ jobResolved event received:", data);

      // Update the job in the list
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === data.jobId
            ? { ...job, status: data.status, imageUrl: data.imageUrl }
            : job
        )
      );

      toast.success(`Job ${data.jobId} resolved!`);
    });

  }, [fetchJobs]);

  const handleCreateJob = async () => {
    try {
      const response = await createJob();
      console.log("🚀 ~ handleCreateJob ~ response:", response);

      if (response.status === 200) {
        toast.success("Job created successfully!");
        await fetchJobs();
      } else {
        toast.error("Failed to create job. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("🚀 ~ handleCreateJob ~ error:", error);
    }
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedJob(null)
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <CreateJobButton onClick={handleCreateJob} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <JobList jobs={jobs} onJobClick={handleJobClick} />
      )}
      <JobModal job={selectedJob} isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  )
}

