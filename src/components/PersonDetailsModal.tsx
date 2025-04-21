import { Button, Stack, Text } from "@mantine/core";
import { WantedPerson } from "../types/wantedPerson";
import { useMediaQuery } from "@mantine/hooks";

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
  const isMobile = useMediaQuery("(max-width: 900px)");

  if (!person) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(10px)",
        display: opened ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#08112e",
          padding: "30px",
          borderRadius: "24px",
          width: isMobile ? "90vw" : "50vw",
          maxHeight: "80vh",
          maxWidth: "1200px",
          overflow: "auto",
        }}
      >
        <Stack style={{ width: "100%", textAlign: "center" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button color="red" onClick={onClose}>
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

          <Stack mt="md" style={{ width: "100%" }} align="center">
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
          </Stack>

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
      </div>
    </div>
  );
};

export default PersonDetailsModal;
