/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

import {
  ActionGroup,
  Button,
  Form,
  FormGroup,
  PageSection,
  Split,
  SplitItem,
  Switch,
  TextInput
} from '@patternfly/react-core';

import { Banner } from '@app/components';
import { useAddWebPropery } from '@app/services/webProperty';
import { pageLinks } from '@app/links';

import { addNewWebPropertySchema, FormData } from './AddWebProperty.utils';

export const AddWebPropertyPage = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting }
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(addNewWebPropertySchema)
  });
  const createWebPropertyMutation = useAddWebPropery();
  const { data: session } = useSession();
  const router = useRouter();

  const propertyTitle = watch('propertyTitle');
  const isItProduction = watch('deploymentConnectionType');
  const propertyID = propertyTitle?.toLowerCase().replaceAll(' ', '-') || '';

  const onFormSubmit = async (data: FormData) => {
    try {
      await createWebPropertyMutation.mutateAsync({
        ...data,
        deploymentConnectionType: data.deploymentConnectionType ? 'prod' : 'preprod',
        propertyName: propertyID,
        createdBy: session?.user.email || '',
        type: 'operator'
      });
      toast.success('Web Property Created');
      router.push(pageLinks.webPropertyDetailPage.replace('[propertyName]', propertyID));
    } catch (error) {
      toast.error('Failed to create property');
    }
  };

  return (
    <>
      <Banner title="Add New Web Property" backRef={pageLinks.webPropertyListPage} />
      <PageSection isCenterAligned isWidthLimited className="pf-u-px-3xl">
        <Form onSubmit={handleSubmit(onFormSubmit)} style={{ maxWidth: '720px' }}>
          <Controller
            control={control}
            name="propertyTitle"
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <FormGroup
                label="Title"
                isRequired
                fieldId="property-title"
                validated={error ? 'error' : 'default'}
                helperTextInvalid={error?.message}
                helperText="Title shouldn't contain any special-character"
              >
                <TextInput
                  isRequired
                  placeholder="Enter Title"
                  type="text"
                  id="property-title"
                  {...field}
                />
              </FormGroup>
            )}
          />
          <FormGroup label="Identifier" fieldId="property-identifier">
            <TextInput
              isReadOnly
              type="text"
              id="property-id"
              placeholder="Autogenerated from property title"
              value={propertyID}
            />
          </FormGroup>
          <Controller
            control={control}
            defaultValue=""
            name="url"
            render={({ field, fieldState: { error } }) => (
              <FormGroup
                label="Hostname"
                isRequired
                fieldId="property-host"
                validated={error ? 'error' : 'default'}
                helperTextInvalid={error?.message}
                helperText="Hostname should be a valid url (eg: one.redhat.com)"
              >
                <TextInput
                  isRequired
                  placeholder="Enter URL of property"
                  type="text"
                  id="property-host"
                  {...field}
                />
              </FormGroup>
            )}
          />
          <Split hasGutter>
            <SplitItem isFilled>
              <Controller
                control={control}
                name="env"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <FormGroup
                    label="Environment Name"
                    isRequired
                    fieldId="property-env"
                    validated={error ? 'error' : 'default'}
                    helperTextInvalid={error?.message}
                    helperText="Environment Name shouldn't contain any space, numbers, special-character "
                  >
                    <TextInput
                      isRequired
                      placeholder="Default Environment Name"
                      type="text"
                      id="property-env"
                      {...field}
                    />
                  </FormGroup>
                )}
              />
            </SplitItem>
            <SplitItem>
              <Controller
                control={control}
                name="deploymentConnectionType"
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <FormGroup label="Environment Type" fieldId="property-env-type">
                    <Switch
                      id="property-deployconnection"
                      label={isItProduction ? 'production' : 'pre-production'}
                      isChecked={value}
                      onChange={onChange}
                    />
                  </FormGroup>
                )}
              />
            </SplitItem>
          </Split>
          <ActionGroup>
            <Button
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Create
            </Button>
            <Link href={pageLinks.webPropertyListPage}>
              <a>
                <Button variant="link">Cancel</Button>
              </a>
            </Link>
          </ActionGroup>
        </Form>
      </PageSection>
    </>
  );
};
