import axios from 'axios'

export const createJob = () => axios.post(`${process.env.NEXT_PUBLIC_API_URL}/job`)
export const getJobs = () => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job`).then(response => response.data)
export const getJob = (jobId: string) => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job/${jobId}`).then(response => response.data)