"use client";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import React, { useState } from "react";
import ClientManagementTable from "./ClientManagementTable";
import { useGetUserManagementDataQuery } from "@/redux/Apis/admin/usermanagementApi/usermanagementApi";

function ClientManagementLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");

  const { data: userManagementData, isLoading: isUserManagementLoading } =
    useGetUserManagementDataQuery({ page: currentPage, limit, search, status });

  const userInfoData =
    userManagementData?.data && userManagementData?.data.length > 0
      ? userManagementData?.data.map((item) => ({
          id: item._id,
          fullName: item.fullName,
          email: item.email,
          role: item.role,
          status: item.isActive,
          joinedOn: item.createdAt,
          profilePicture: item.profile,
        }))
      : [];

  const paginationMeta = userManagementData?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2 items-start justify-between">
        <SmallPageInfo
          title="User Management"
          description="Here is an overview of your user management"
        />
      </div>
      <SearchFilterButton
        showAddButton={false}
        selectOptions={["All Status", "Active", "Inactive"]}
        placeholder="Search User By Name or Email"
        searchText={search}
        setSearchText={handleSearchChange}
        status={status}
        setStatus={handleStatusChange}
      />
      <ClientManagementTable
        userInfoData={userInfoData}
        isLoading={isUserManagementLoading}
        paginationMeta={paginationMeta}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default ClientManagementLayout;
