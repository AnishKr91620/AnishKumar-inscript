import type { DataRow } from './columns';

const MOCK_DATA: DataRow[] = [
  { serial: 1, job_request: 'Launch social media campaign for product XYZ', submitted: '15-11-2024', status: 'In-Process', submitter: 'Aisha Patel', url: 'www.aishapatel.com', assigned: 'Sophie Choudhury', priority: 'Medium', due_date: '20-11-2024', est_val: '6,200,000', blank: '' },
  { serial: 2, job_request: 'Update press kit for company redesign', submitted: '28-10-2024', status: 'Need to start', submitter: 'Irfan Khan', url: 'www.irfankhanportfolio.com', assigned: 'Tejas Pandey', priority: 'High', due_date: '30-10-2024', est_val: '3,500,000', blank: '' },
  { serial: 3, job_request: 'Finalize user testing feedback for app update', submitted: '05-12-2024', status: 'In-Process', submitter: 'Mark Johnson', url: 'www.markjohnsondesigns.com', assigned: 'Rachel Lee', priority: 'Medium', due_date: '10-12-2024', est_val: '4,750,000', blank: '' },
  { serial: 4, job_request: 'Design new features for the website', submitted: '10-01-2025', status: 'Complete', submitter: 'Emily Green', url: 'www.emilygreenart.com', assigned: 'Tom Wright', priority: 'Low', due_date: '15-01-2025', est_val: '5,900,000', blank: '' },
  { serial: 5, job_request: 'Prepare financial report for Q4', submitted: '25-01-2025', status: 'Blocked', submitter: 'Jessica Brown', url: 'www.jessicabrowncreative.com', assigned: 'Kevin Smith', priority: 'Low', due_date: '30-01-2025', est_val: '2,800,000', blank: '' },
  
]

export default MOCK_DATA; 