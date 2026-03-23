"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Funnel, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomPagination from "@/components/shared/CustomPagination";
import PageHeader from "@/components/shared/PageHeader";

type RiskType = "HIGH" | "MEDIUM" | "LOW";
type StatusType = "Waiting" | "In Progress" | "Done";

type QueueRow = {
  id: number;
  patientName: string;
  age: number;
  submittedTime: string;
  risk: RiskType;
  complaint: string;
  status: StatusType;
};

const baseRows: Omit<QueueRow, "id">[] = [
  {
    patientName: "Sarah Johnson",
    age: 58,
    submittedTime: "12 min ago",
    risk: "HIGH",
    complaint: "Chest pain radiating to left arm",
    status: "Waiting",
  },
  {
    patientName: "Michael Chen",
    age: 42,
    submittedTime: "28 min ago",
    risk: "HIGH",
    complaint: "Severe headache with vision changes",
    status: "Waiting",
  },
  {
    patientName: "Emma Davis",
    age: 34,
    submittedTime: "45 min ago",
    risk: "MEDIUM",
    complaint: "Persistent cough for 2 weeks",
    status: "Waiting",
  },
  {
    patientName: "James Wilson",
    age: 67,
    submittedTime: "1 hr ago",
    risk: "LOW",
    complaint: "Joint pain in knees",
    status: "Waiting",
  },
  {
    patientName: "Lisa Martinez",
    age: 29,
    submittedTime: "1 hr 15 min ago",
    risk: "MEDIUM",
    complaint: "Allergic reaction to medication",
    status: "Waiting",
  },
  {
    patientName: "Robert Taylor",
    age: 51,
    submittedTime: "1 hr 30 min ago",
    risk: "LOW",
    complaint: "Follow-up consultation",
    status: "In Progress",
  },
  {
    patientName: "Amanda Brown",
    age: 38,
    submittedTime: "1 hr 45 min ago",
    risk: "MEDIUM",
    complaint: "Flu-like symptoms",
    status: "Waiting",
  },
  {
    patientName: "David Lee",
    age: 45,
    submittedTime: "2 hrs ago",
    risk: "LOW",
    complaint: "Lower back pain",
    status: "Done",
  },
];

const riskBadgeClass: Record<RiskType, string> = {
  HIGH: "bg-[#FFECEC] text-[#EF4444]",
  MEDIUM: "bg-[#FFF7E5] text-[#F59E0B]",
  LOW: "bg-[#ECFDF3] text-[#16A34A]",
};

const statusBadgeClass: Record<StatusType, string> = {
  Waiting: "bg-[#ECEEF2] text-[#717182]",
  "In Progress": "bg-[#E8F0FF] text-button-color",
  Done: "bg-[#ECFDF3] text-[#16A34A]",
};

const pageSize = 8;

const PatientQueuePage = () => {
  const [query, setQuery] = useState("");
  const [selectedRisk, setSelectedRisk] = useState<"ALL" | RiskType>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<"ALL" | StatusType>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const allRows = useMemo(() => {
    const times = [
      "12 min ago",
      "28 min ago",
      "45 min ago",
      "1 hr ago",
      "1 hr 15 min ago",
      "1 hr 30 min ago",
      "1 hr 45 min ago",
      "2 hrs ago",
      "2 hrs 20 min ago",
      "2 hrs 45 min ago",
      "3 hrs ago",
    ];

    return Array.from({ length: 68 * pageSize }, (_, index) => ({
      ...baseRows[index % baseRows.length],
      patientName: `${baseRows[index % baseRows.length].patientName} ${Math.floor(index / baseRows.length) + 1}`,
      submittedTime: times[index % times.length],
      id: index + 1,
    }));
  }, []);

  const filteredRows = useMemo(() => {
    return allRows.filter((row) => {
      const searchValue = query.toLowerCase();
      const matchesSearch =
        row.patientName.toLowerCase().includes(searchValue) ||
        row.complaint.toLowerCase().includes(searchValue);
      const matchesRisk = selectedRisk === "ALL" || row.risk === selectedRisk;
      const matchesStatus = selectedStatus === "ALL" || row.status === selectedStatus;

      return matchesSearch && matchesRisk && matchesStatus;
    });
  }, [allRows, query, selectedRisk, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedRows = filteredRows.slice((safePage - 1) * pageSize, safePage * pageSize);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <section className="space-y-5">
      <PageHeader title="Patient Queue" description="8 patients waiting"/>

      <div className="rounded-[14px] border border-border-color bg-main p-3 shadow-xs sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-description" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name or complaint..."
              className="h-12 w-full rounded-[10px] border border-border-color bg-[#F8F9FB] pl-10 pr-3 text-sm text-title outline-none placeholder:text-description focus:border-button-color"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-[10px] border border-border-color text-description"
              aria-label="Filter options"
            >
              <Funnel className="size-4" />
            </button>

            <Select
              value={selectedRisk}
              onValueChange={(value: "ALL" | RiskType) => {
                setSelectedRisk(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-12 w-35 rounded-[10px] border-border-color bg-[#F8F9FB]">
                <SelectValue placeholder="All Risks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Risks</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedStatus}
              onValueChange={(value: "ALL" | StatusType) => {
                setSelectedStatus(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-12 w-35 rounded-[10px] border-border-color bg-[#F8F9FB]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="Waiting">Waiting</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[14px] border border-border-color bg-main shadow-xs">
        <Table>
          <TableHeader className="bg-[#F8F9FB]">
            <TableRow className="border-border-color hover:bg-[#F8F9FB]">
              <TableHead className="text-base font-medium text-title">Patient Name</TableHead>
              <TableHead className="text-base font-medium text-title">Age</TableHead>
              <TableHead className="text-base font-medium text-title">Submitted Time</TableHead>
              <TableHead className="text-base font-medium text-title">Risk Level</TableHead>
              <TableHead className="text-base font-medium text-title">Primary Complaint</TableHead>
              <TableHead className="text-base font-medium text-title">Status</TableHead>
              <TableHead className="text-base font-medium text-title">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id} className="border-border-color">
                <TableCell className="text-sm text-title">{row.patientName}</TableCell>
                <TableCell className="text-sm text-title">{row.age}</TableCell>
                <TableCell className="text-sm text-description">{row.submittedTime}</TableCell>
                <TableCell>
                  <span className={`rounded-full px-2.5 py-0.5 text-sm ${riskBadgeClass[row.risk]}`}>
                    {row.risk}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-title">{row.complaint}</TableCell>
                <TableCell>
                  <span className={`rounded-full px-3 py-1 text-sm ${statusBadgeClass[row.status]}`}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/patient-queue/${row.id}`}
                    className="inline-flex rounded-[10px] bg-button-color px-6 py-2.5 text-sm text-white transition hover:opacity-90"
                  >
                    Open
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CustomPagination
        currentPage={safePage}
        totalItems={filteredRows.length}
        pageSize={pageSize}
        onPageChange={goToPage}
        itemLabel="patients"
        className="border-0 px-0 pb-0 pt-2"
      />
    </section>
  );
};

export default PatientQueuePage;
