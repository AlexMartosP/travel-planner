import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

export default function InvitationEmail({
  destinationName = "Jane & Jons trip",
  inviterEmail = "jane.doe@gmail.com",
  link = "https://www.google.com/",
}: {
  destinationName: string;
  inviterEmail: string;
  link: string;
}) {
  return (
    <Html>
      <Head>
        <Preview>You have been invited to a trip</Preview>
        <Font
          fontFamily="Inter"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@200,400&display=swap",
            format: "embedded-opentype",
          }}
          fallbackFontFamily="Verdana"
        />
      </Head>
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <Heading as="h2">Travel planner invite</Heading>
            <Text>
              You have been invited to <strong>{destinationName}</strong> by{" "}
              <Link href={`mailto:${{ inviterEmail }}`}>{inviterEmail}</Link>
            </Text>
            <Text>Confirm invitaion by clicking the button below</Text>
            <Button
              href={link}
              className="bg-green-100 text-sm text-green-900 font-medium rounded-md px-10 py-2"
            >
              Join trip
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
