"use client";

import React, { useMemo, useState } from "react";
import BackButton from "@/components/common/backButton/backButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

const ViewAllSession = () => {
  const router = useRouter();

  const allSessions = useMemo(
    () => [
      ...Array.from({ length: 18 }).map((_, i) => ({
        id: i + 1,
        name: "Abir Dehrun",
        reason: "Maintainace Support",
        time: "10:01 AM",
        date: "2025-05-12",
      })),
    ],
    []
  );

  const pageSize = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allSessions.length / pageSize);
  const pagedSessions = allSessions.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleView = (id) => {
    router.push(`/bha/clients/details/${id}`);
  };

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="space-y-4">
      <BackButton showText={true} text="View All Session" />

      <div className="space-y-3">
        {pagedSessions.map((session) => (
          <Card key={session.id} className="border border-gray-200">
            <CardContent className="p-4 flex items-center justify-between gap-4 bg-white">
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold text-gray-900">
                  {session.name}
                </p>
                <p className="text-sm text-gray-600">{session.reason}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {session.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {session.date}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => handleView(session.id)}
                className="bg-blue-100 text-blue-600 hover:bg-blue-200 border border-blue-200"
              >
                View
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={page === 1}
            className="text-gray-700"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={page === totalPages}
            className="text-gray-700"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewAllSession;
