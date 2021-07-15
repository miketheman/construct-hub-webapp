import { Grid, GridItem, GridItemProps } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Community } from "./Community";
import { GettingStarted } from "./GettingStarted";
import { NavButton } from "./NavButton";
import { SearchButton } from "./SearchButton";
import { Title } from "./Title";

const HeaderItem: FunctionComponent<GridItemProps> = (props) => (
  <GridItem align="center" justify="center" rowStart={1} {...props} />
);

export const Header: FunctionComponent = () => {
  return (
    <Grid
      alignItems="center"
      as="header"
      bg="white"
      boxShadow="base"
      data-testid="header"
      gap={4}
      gridTemplateColumns={{
        base: "1fr 3fr 1fr",
        md: "2fr 3fr 2fr",
        lg: "1fr 2fr 1fr",
      }}
      gridTemplateRows="1fr"
      maxW="100vw"
      position="sticky"
      px={4}
      py={4}
      top={0}
      w="100%"
      zIndex="sticky"
    >
      {/* Logo / Header */}
      <HeaderItem
        colStart={{ base: 2, md: 1 }}
        justifySelf={{ base: "center", md: "start" }}
      >
        <Title />
      </HeaderItem>

      {/* Search Trigger */}
      <HeaderItem
        colStart={{ base: 3, md: 2 }}
        justifySelf={{ base: "end", md: "stretch" }}
      >
        <SearchButton />
      </HeaderItem>

      {/* Navigation */}
      <HeaderItem
        colStart={{ base: 1, md: 3 }}
        justifySelf={{ base: "start", md: "end" }}
      >
        <Grid
          alignItems="center"
          display={{ base: "none", md: "grid" }}
          gridTemplateColumns="1fr 1fr"
          gridTemplateRows="1fr"
          w="100%"
        >
          <GettingStarted />
          <Community />
        </Grid>
        <NavButton />
      </HeaderItem>
    </Grid>
  );
};
