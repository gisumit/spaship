import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  ClipboardCopy,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  Popover,
  TextInput,
} from "@patternfly/react-core";
import { Caption, TableComposable, Tbody, Td, Tr } from "@patternfly/react-table";
import { post } from "../../utils/api.utils";
import { getHost } from "../../utils/config.utils";
import { AnyProps } from "../models/props";

const ApiKeyBox = styled.div({
  top: "40px",
  width: "1041px;",
  height: "55px;",
  border: "1px solid #D2D2D2;",
  borderRadius: "8px;",
  opacity: "1;",
});

const ClipboardBox = styled.div({
  width: "500px",
  height: "40px",
});

const ApiKey = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [env, setEnv] = useState("");
  const [apiKey, setApiKey] = useState("");

  async function handleModalToggle() {
    setModalOpen(!isModalOpen);
  }

  async function onClickMethod() {
    setModalOpen(!isModalOpen);

    if (isModalOpen == true) {
      try {
        const host = getHost();
        const url = `${host}/applications/validate`;
        const payload = {};
        const response = await post<AnyProps>(url, payload);
        setApiKey(response.token);
      } catch (e) {}
    }
  }

  const handleNameInputChange = (value: string) => {
    setEnv(value);
  };

  useEffect(() => {}, [isModalOpen]);

  return (
    <>
      <TableComposable variant={"compact"} borders={false}>
        <Caption>
          <b>Do you want to create an API Key !</b>
        </Caption>
        <Tbody>
          <ApiKeyBox>
            <Tr>
              <Td>
                <Button
                  style={{
                    background: "#000000 0% 0% no-repeat padding-box;",
                    opacity: 1,
                    borderRadius: "3px;",
                  }}
                  onClick={handleModalToggle}
                >
                  Create API Key
                </Button>
                <Modal
                  variant={ModalVariant.small}
                  title="Name API Key"
                  isOpen={isModalOpen}
                  onClose={handleModalToggle}
                  actions={[
                    <Button
                      key="create"
                      style={{
                        background: "#000000",
                        opacity: 1,
                        borderRadius: "3px;",
                      }}
                      onClick={onClickMethod}
                    >
                      Generate API Key
                    </Button>,
                  ]}
                >
                  <Form id="modal-with-form-form">
                    <FormGroup
                      label="Enter environment name"
                      labelIcon={
                        <Popover bodyContent={null}>
                          <button
                            type="button"
                            aria-label="More info for name field"
                            onClick={(e) => e.preventDefault()}
                            aria-describedby="modal-with-form-form-name"
                            className="pf-c-form__group-label-help"
                          ></button>
                        </Popover>
                      }
                      isRequired
                      fieldId="modal-with-form-form-name"
                    >
                      <TextInput
                        isRequired
                        type="email"
                        id="modal-with-form-form-name"
                        name="modal-with-form-form-name"
                        value={env}
                        onChange={handleNameInputChange}
                      />
                    </FormGroup>
                  </Form>
                </Modal>
              </Td>
              <Td>
                <ClipboardBox>
                  <ClipboardCopy hoverTip="Copy" clickTip="Copied">
                    {apiKey}
                  </ClipboardCopy>
                </ClipboardBox>
              </Td>
            </Tr>
          </ApiKeyBox>
        </Tbody>
      </TableComposable>
    </>
  );
};

export default ApiKey;
