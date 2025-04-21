import { useState } from "react";
import {
  Button,
  Group,
  Input,
  Select,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { Pagination } from "@mui/material";
import { useWantedPersons } from "../queries/useFbiData";
import { WantedPerson } from "../types/wantedPerson";
import PersonDetailsModal from "../components/PersonDetailsModal";

const MostWantedList = () => {
  const [pageSize] = useState(20);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useWantedPersons(page, pageSize);
  const [selectedPerson, setSelectedPerson] = useState<WantedPerson | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("title");

  const openPersonModal = (person: WantedPerson) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  console.log("data", data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !data.items) return <div>No data available</div>;

  const filteredData = data.items.filter((person) => {
    if (!searchTerm) return true;

    const fieldValue = person[searchField as keyof WantedPerson];
    if (!fieldValue) return false;

    if (Array.isArray(fieldValue)) {
      return fieldValue.some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return String(fieldValue).toLowerCase().includes(searchTerm.toLowerCase());
  });

  const tableRows = filteredData.map((person) => (
    <Table.Tr key={person.id}>
      <Table.Td>{person.title || "N/A"}</Table.Td>
      <Table.Td>{person.description || "N/A"}</Table.Td>
      <Table.Td>{person.nationality || "N/A"}</Table.Td>
      <Table.Td>{person.sex || "N/A"}</Table.Td>
      <Table.Td>
        <Button
          size="xs"
          onClick={() => openPersonModal(person)}
          variant="filled"
        >
          View
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  const totalPages = Math.ceil((data.total || 0) / pageSize);

  return (
    <Stack>
      <Group>
        <Select
          label="Search by"
          value={searchField}
          onChange={(value) => setSearchField(value || "title")}
          data={[
            { value: "title", label: "Name" },
            { value: "nationality", label: "Nationality" },
            { value: "description", label: "Description" },
          ]}
          style={{ width: "200px" }}
        />
        <Input
          placeholder={`Search by ${searchField}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "200px", alignSelf: "flex-end" }}
        />
      </Group>

      <Stack justify="space-between" mt="md">
        <Text size="sm">
          Showing {filteredData.length} of {data.total} results
        </Text>
        <Pagination
          size="large"
          color="secondary"
          count={totalPages || 1}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              color: "white",
            },
          }}
        />
      </Stack>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th align="left" style={{ padding: "12px 0", width: "25%" }}>
              Name
            </Table.Th>
            <Table.Th align="left" style={{ padding: "12px 0", width: "50%" }}>
              Description
            </Table.Th>
            <Table.Th align="left" style={{ padding: "12px 0", width: "15%" }}>
              Nationality
            </Table.Th>
            <Table.Th align="left" style={{ padding: "12px 0", width: "10%" }}>
              Sex
            </Table.Th>
            <Table.Th align="left" style={{ padding: "12px 0", width: "10%" }}>
              Details
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{tableRows}</Table.Tbody>
      </Table>

      <PersonDetailsModal
        person={selectedPerson}
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Stack>
  );
};

export default MostWantedList;
