import { ArrowBackIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Flex, useDisclosure, useToken } from "@chakra-ui/react";
import type { Assembly } from "jsii-reflect";
import { useCallback, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useQueryParams } from "../../hooks/useQueryParams";
import { SearchPopover } from "./SearchPopover";

export interface ChooseSubmoduleProps {
  assembly?: Assembly;
}

export function ChooseSubmodule({ assembly }: ChooseSubmoduleProps) {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const query = useQueryParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [borderColor, textColor] = useToken("colors", ["gray.100", "gray.800"]);
  const btnHeight = useToken("space", "16");

  const currentSubmodule = query.get("submodule");
  const submoduleText = currentSubmodule ?? "Submodules";

  const [filter, setFilter] = useState("");

  const onGoBack = () => {
    const lang = query.get("lang");
    push(`${pathname}${lang ? `?lang=${lang}` : ""}`);
  };

  const getUrl = useCallback(
    (submoduleName: string) => {
      const params = new URLSearchParams(query.toString());
      params.set("submodule", submoduleName);
      return `${pathname}?${params}`;
    },
    [pathname, query]
  );

  const submodules = useMemo(() => {
    let results = assembly?.submodules ?? [];

    if (filter) {
      results = results.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    return results.map(({ name }) => ({
      name,
      to: getUrl(name),
    }));
  }, [assembly?.submodules, filter, getUrl]);

  if (!assembly?.submodules.length) return null;

  return (
    <Flex>
      {currentSubmodule && (
        <Button
          borderRadius="none"
          borderRight={`1px solid ${borderColor}`}
          color={textColor}
          data-testid="choose-submodule-go-back"
          h={btnHeight}
          onClick={onGoBack}
          variant="ghost"
        >
          <ArrowBackIcon aria-label="Back to construct root" />
        </Button>
      )}
      <SearchPopover
        inputValue={filter}
        isOpen={isOpen}
        onClose={onClose}
        onInputChange={setFilter}
        submodules={submodules}
        trigger={
          <Button
            borderRadius="none"
            color={textColor}
            data-testid="choose-submodule-search-trigger"
            disabled={!assembly?.submodules.length}
            flexGrow={1}
            h={btnHeight}
            onClick={onOpen}
            rightIcon={<ChevronDownIcon />}
            variant="ghost"
          >
            {submoduleText}
          </Button>
        }
      />
    </Flex>
  );
}
