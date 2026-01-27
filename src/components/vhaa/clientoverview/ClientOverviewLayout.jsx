"use client";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import ClientTable from "@/components/common/clientTable/ClientTable";
import { useGetClientQuery } from '../../../redux/Apis/bhaa/client/clientApi';
import { useState } from "react";
function ClientOverviewLayout() {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetClientQuery({
    searchTerm: searchText,
    isActive: status !== "All Status" ? status.toLowerCase() === "active" ? true : false : undefined,
    page: currentPage,
    limit: limit,
  });
  const paginationMeta = data?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };
  console.log("client data", data);

  // Transform API data to match table structure
  const transformApiData = (apiData) => {
    if (!apiData?.data || !Array.isArray(apiData.data)) return [];

    return apiData.data.map(item => {
      return {
        id: item._id,
        clientName: item.fullName,
        clientEmail: item.email,
        contactInfo: item.phone,
        address: item.address,
        status: item.isActive ? "Active" : "Inactive",
        joinedOn: formatDate(item.createdAt),
        profile: item.profile,
        chatId: item.chatId || "",
      };
    });
  };
  

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Format contact info
  const formatContactInfo = (contactInfo, address) => {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-500 font-medium">{address || "No address"}</span>
        <span className="text-sm whitespace-nowrap">{contactInfo || "No phone"}</span>
      </div>
    );
  };

  // Get transformed data
  const apiTableData = transformApiData(data);

  // Format the contact info for table display
  const formattedTableData = apiTableData.map((data) => ({
    ...data,
    contactInfo: formatContactInfo(data.contactInfo, data.address),
  }));

  // Handlers to reset page on filter changes
  const handleSearchChange = (value) => {
    setSearchText(value);
    setCurrentPage(1); // Reset to first page on search change
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1); // Reset to first page on status change
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <SmallPageInfo
          title="Client Overview"
          description="Here is an overview of your clients"
        />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading clients...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Client Overview"
        description="Here is an overview of your clients"
      />

      <SearchFilterButton
        showAddButton={false}
        searchText={searchText}
        setSearchText={handleSearchChange}
        selectOptions={["All Status", "Active", "Inactive"]}
        status={status}
        setStatus={handleStatusChange}
        placeholder="Search Client"
      />

      <ClientTable 
        tableData={formattedTableData} 
        paginationMeta={paginationMeta}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ClientOverviewLayout;