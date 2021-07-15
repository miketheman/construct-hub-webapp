import { Box, Flex } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import { CopyButton } from "../CopyButton";
import type { RendererProps } from "./types";

export const MultiLineRenderer: FunctionComponent<RendererProps> = ({
  code,
  tokens,
  getLineProps,
  getTokenProps,
}) => (
  <>
    <Flex align="center" bg="blue.500" justify="flex-end" px={2} py={1}>
      <CopyButton _hover={{ bg: "blue.400" }} color="white" value={code} />
    </Flex>
    <Box maxW="100%" overflowX="auto" p={2}>
      {tokens.map((line, i) => (
        <div key={i} {...getLineProps({ line, key: i })}>
          {line.map((token, key) => (
            <span key={key} {...getTokenProps({ token, key })} />
          ))}
        </div>
      ))}
    </Box>
  </>
);