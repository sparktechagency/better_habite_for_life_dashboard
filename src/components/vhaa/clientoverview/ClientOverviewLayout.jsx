"use client";
import SearchFilterButton from "@/components/common/SearchFilterButton";
import SmallPageInfo from "@/components/common/SmallPageInfo";
import ClientTable from "@/components/common/clientTable/ClientTable";
import { useGetClientQuery } from '../../../redux/Apis/bhaa/client/clientApi';

function ClientOverviewLayout() {
  const { data, isLoading } = useGetClientQuery();
  console.log("client data", data);

  // Transform API data to match table structure
  const transformApiData = (apiData) => {
    if (!apiData?.data) return [];

    return apiData.data.map(item => {
      const user = item.user;
      const tasks = item.tasks ;
      return {
        id: user._id,
        clientName: user.fullName,
        clientEmail: user.email,
        contactInfo: user.phone,
        address: user.address,
        status: user.isActive ? "Active" : "Inactive",
        joinedOn: formatDate(user.createdAt),
        profile: user.profile,
        chatId: tasks.map(task => task.chatId).toString(),
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
        selectOptions={["All Status", "Active", "Inactive"]}
        placeholder="Search Client"
      />

      <ClientTable tableData={formattedTableData} />
    </div>
  );
}

export default ClientOverviewLayout;