
export type TAlert = {
  patient: string;
  age: number;
  risk: string;
  symptom: string;
  note: string;
  time: string;
};

export const alerts: TAlert[] = [
  {
    patient: "Sarah Johnson",
    age: 58,
    risk: "HIGH",
    symptom: "Chest pain",
    note: "Sharp chest pain radiating to left arm",
    time: "12 min ago",
  },
  {
    patient: "Michael Chen",
    age: 42,
    risk: "HIGH",
    symptom: "Severe headache",
    note: "Sudden onset severe headache with vision changes",
    time: "28 min ago",
  },
  {
    patient: "Michael Chen",
    age: 42,
    risk: "HIGH",
    symptom: "Severe headache",
    note: "Sudden onset severe headache with vision changes",
    time: "28 min ago",
  },
  {
    patient: "Michael Chen",
    age: 42,
    risk: "HIGH",
    symptom: "Severe headache",
    note: "Sudden onset severe headache with vision changes",
    time: "28 min ago",
  },
  {
    patient: "Michael Chen",
    age: 42,
    risk: "HIGH",
    symptom: "Severe headache",
    note: "Sudden onset severe headache with vision changes",
    time: "28 min ago",
  },
  {
    patient: "Michael Chen",
    age: 42,
    risk: "HIGH",
    symptom: "Severe headache",
    note: "Sudden onset severe headache with vision changes",
    time: "28 min ago",
  },
];

export type TQueueItem = {
  name: string;
  age: number;
  priority: string;
  priorityClass: string;
  issue: string;
  time: string;
};


export const patients: TQueueItem[] = [
  {
    name: "Emma Davis",
    age: 34,
    priority: "MEDIUM",
    priorityClass: "bg-[#FFF7E5] text-[#F59E0B]",
    issue: "Persistent cough",
    time: "45 min ago",
  },
  {
    name: "James Wilson",
    age: 67,
    priority: "LOW",
    priorityClass: "bg-[#ECFDF3] text-[#16A34A]",
    issue: "Joint pain",
    time: "1 hr ago",
  },
  {
    name: "Lisa Martinez",
    age: 29,
    priority: "MEDIUM",
    priorityClass: "bg-[#FFF7E5] text-[#F59E0B]",
    issue: "Allergic reaction",
    time: "1 hr 15 min ago",
  },
  {
    name: "Lisa Martinez",
    age: 29,
    priority: "MEDIUM",
    priorityClass: "bg-[#FFF7E5] text-[#F59E0B]",
    issue: "Allergic reaction",
    time: "1 hr 15 min ago",
  },
  {
    name: "Lisa Martinez",
    age: 29,
    priority: "MEDIUM",
    priorityClass: "bg-[#FFF7E5] text-[#F59E0B]",
    issue: "Allergic reaction",
    time: "1 hr 15 min ago",
  },
  {
    name: "Lisa Martinez",
    age: 29,
    priority: "MEDIUM",
    priorityClass: "bg-[#FFF7E5] text-[#F59E0B]",
    issue: "Allergic reaction",
    time: "1 hr 15 min ago",
  },
  {
    name: "Lisa Martinez",
    age: 29,
    priority: "MEDIUM",
    priorityClass: "bg-[#FFF7E5] text-[#F59E0B]",
    issue: "Allergic reaction",
    time: "1 hr 15 min ago",
  },
  {
    name: "Lisa Martinez",
    age: 29,
    priority: "MEDIUM",
    priorityClass: "bg-[#FFF7E5] text-[#F59E0B]",
    issue: "Allergic reaction",
    time: "1 hr 15 min ago",
  },
];

