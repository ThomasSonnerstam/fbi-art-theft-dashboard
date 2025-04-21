import { useState } from "react";
import { Button, Stack, Table, Text } from "@mantine/core";
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

  const openPersonModal = (person: WantedPerson) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  console.log("data", data);

  const tableRows = data?.items?.map((person) => (
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !data.items) return <div>No data available</div>;

  const totalPages = Math.ceil((data.total || 0) / pageSize);

  return (
    <Stack>
      <Stack justify="space-between" mt="md">
        <Text size="sm">
          Showing {data.items.length} of {data.total} results
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
              Actions
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
