import { Center, Divider, Flex, Grid, Spinner } from "@chakra-ui/react";
import type { Assembly } from "@jsii/spec";
import { FunctionComponent } from "react";
import type { Metadata } from "../../../../api/package/metadata";
import { Card } from "../../../../components/Card";
import type { UseRequestResponse } from "../../../../hooks/useRequest";
import { LanguageSelection } from "../LanguageSelection";
import { OperatorArea } from "../OperatorArea";
import { PackageHeader } from "../PackageHeader";

interface PackageDetailsProps {
  assembly: UseRequestResponse<Assembly>;
  metadata: UseRequestResponse<Metadata>;
  // Likely will be needed for version dropdown
  version: string;
}

/**
 * Renders the header section of a package. This includes
 * the Getting Started, Operator Area, and Publisher Area sections
 */
export const PackageDetails: FunctionComponent<PackageDetailsProps> = ({
  assembly,
  metadata,
}) => {
  const isLoading = assembly.loading || metadata.loading;

  if (isLoading || !assembly.data || !metadata.data) {
    return (
      <Center minH="200px">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Flex as={Card} direction="column">
      <Grid
        gap={4}
        templateColumns={{ base: "1fr", md: "3fr auto 2fr" }}
        templateRows="auto"
      >
        <PackageHeader
          description={assembly.data.description}
          tags={assembly.data.keywords ?? []}
          title={assembly.data.name}
        />
        <Divider
          display={{ base: "none", md: "initial" }}
          orientation="vertical"
        />
        <Divider
          display={{ base: "initial", md: "none" }}
          orientation="horizontal"
        />
        <OperatorArea assembly={assembly.data} metadata={metadata.data} />
      </Grid>
      <Flex justify={{ base: "center", md: "start" }} px={2} py={4}>
        <LanguageSelection assembly={assembly.data} />
      </Flex>
    </Flex>
  );
};
