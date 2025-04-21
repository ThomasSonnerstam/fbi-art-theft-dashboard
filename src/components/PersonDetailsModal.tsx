import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { WantedPerson } from "../types/wantedPerson";

interface PersonDetailsModalProps {
  person: WantedPerson | null;
  opened: boolean;
  onClose: () => void;
}

const PersonDetailsModal = ({
  person,
  opened,
  onClose,
}: PersonDetailsModalProps) => {
  if (!person) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={false}
      size="lg"
      centered
      withCloseButton={false}
      withinPortal={true}
      styles={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        content: {
          position: "fixed",
          top: "20%",
          left: "25%",
          width: "50vw",
          maxWidth: "50vw",
          maxHeight: "80vh",
          overflow: "auto",
          backgroundColor: "#101112",
          padding: "30px",
          borderRadius: "24px",
        },
      }}
    >
      <Stack style={{ width: "100%", textAlign: "center" }}>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant="subtle" color="gray" onClick={onClose}>
            Close
          </Button>
        </div>

        <Text fw={700} size="lg" style={{ textAlign: "center" }}>
          {person.title}
        </Text>
        {person.images && person.images.length > 0 && (
          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <img
              src={person.images[0].large}
              alt={person.title}
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        <Text fw={600} mt="md" style={{ textAlign: "center" }}>
          Description:
        </Text>
        <Text style={{ textAlign: "center" }}>
          {person.description || "No description available"}
        </Text>

        {person.reward_text && (
          <>
            <Text fw={600} mt="md" style={{ textAlign: "center" }}>
              Reward:
            </Text>
            <Text style={{ textAlign: "center" }}>{person.reward_text}</Text>
          </>
        )}

        <Group mt="md" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <Text fw={600}>Sex:</Text>
            <Text>{person.sex || "Unknown"}</Text>
          </div>

          <div style={{ textAlign: "center" }}>
            <Text fw={600}>Nationality:</Text>
            <Text>{person.nationality || "Unknown"}</Text>
          </div>

          {person.age_range && (
            <div style={{ textAlign: "center" }}>
              <Text fw={600}>Age Range:</Text>
              <Text>{person.age_range}</Text>
            </div>
          )}
        </Group>

        {person.field_offices && person.field_offices.length > 0 && (
          <>
            <Text fw={600} mt="md" style={{ textAlign: "center" }}>
              Field Offices:
            </Text>
            <Text style={{ textAlign: "center" }}>
              {person.field_offices.join(", ")}
            </Text>
          </>
        )}
      </Stack>
    </Modal>
  );
};

export default PersonDetailsModal;
