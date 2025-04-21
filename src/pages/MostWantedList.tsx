import { useState } from "react";
import { Container, Group, Table, Text } from "@mantine/core";
import { Pagination } from "@mui/material";
import { useWantedPersons } from "../queries/useFbiData";

const MostWantedList = () => {
  const [pageSize] = useState(20);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useWantedPersons(page, pageSize);

  console.log("data", data);
  console.log("name", data?.items[5].title);

  const tableRows = data?.items?.map((person) => (
    <Table.Tr key={person.id}>
      <Table.Td>{person.title}</Table.Td>
      <Table.Td>{person.description}</Table.Td>
      <Table.Td>{person.nationality}</Table.Td>
      <Table.Td>{person.sex}</Table.Td>
    </Table.Tr>
  ));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !data.items) return <div>No data available</div>;

  const totalPages = Math.ceil((data.total || 0) / pageSize);

  return (
    <Container>
      <Group justify="space-between" mt="md">
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
              color: "white", // Text color for all pagination items
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              color: "white", // Text color for selected page (optional, already white by default)
            },
          }}
        />
      </Group>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th align="left">Name</Table.Th>
            <Table.Th align="left">Description</Table.Th>
            <Table.Th align="left">Nationality</Table.Th>
            <Table.Th align="left">Sex</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{tableRows}</Table.Tbody>
      </Table>
    </Container>
  );
};

export default MostWantedList;
