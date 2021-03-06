import React from 'react';
import {
    ClipboardCopy,
    TextContent,
    Text,
    TextVariants,
    TextListItem,
    TextList,
    TextListVariants,
    TextListItemVariants
} from '@patternfly/react-core';
import { HCCM_DOCS_PREFIX } from '../../../utilities/stringConstants';
import useFormApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-form-api';
import { FormattedMessage } from 'react-intl';

const CREATE_AZURE_STORAGE = `${HCCM_DOCS_PREFIX}/html/getting_started_with_cost_management/assembly_adding_sources_cost#creating_an_azure_storage_account`;
const AZURE_CREDS_URL = `${HCCM_DOCS_PREFIX}/html/getting_started_with_cost_management/assembly_adding_sources_cost#configuring_an_azure_service_principal`;
const RECURRING_TASK_URL = `${HCCM_DOCS_PREFIX}/html/getting_started_with_cost_management/assembly_adding_sources_cost#configuring_an_azure_daily_export_schedule`;

export const ConfigureResourceGroupAndStorageAccount = () => (
    <TextContent>
        <Text component={TextVariants.p}>
            <FormattedMessage
                id="wizard.RedHatRecommendsCreatingADedicatedResourceGroupAndStorageAccountInAzureToCollectCostDataAndMetricsForCostManagementLink"
                // eslint-disable-next-line max-len
                defaultMessage="Red Hat recommends creating a dedicated resource group and storage account in Azure to collect cost data and metrics for cost management. {link}"
                values={{ link: <Text
                    rel="noopener noreferrer"
                    target="_blank"
                    component={TextVariants.a}
                    href={CREATE_AZURE_STORAGE}>
                    <FormattedMessage id="wizard.LearnMore" defaultMessage="Learn more" />
                </Text>
                }}
            />
        </Text>
        <Text component={TextVariants.p}>
            <FormattedMessage
                id="wizard.AfterConfiguringAResourceGroupAndStorageAccountInTheAzurePortalEnterTheFollowing"
                defaultMessage="After configuring a resource group and storage account in the Azure portal, enter the following:"
            />
        </Text>
    </TextContent>
);

export const SubscriptionID = () => {
    return (
        <TextContent>
            <Text component={TextVariants.p}>
                <FormattedMessage
                    id="wizard.RunTheFollowingCommandInCloudShellToObtainYourSubscriptionIdAndEnterItBelow"
                    defaultMessage="Run the following command in Cloud Shell to obtain your Subscription ID and enter it below:"
                />
            </Text>
            <ClipboardCopy>{`az account show --query "{ subscription_id: id }"`}</ClipboardCopy>
        </TextContent>
    );
};

export const ConfigureRolesDescription = () => (
    <TextContent>
        <Text component={TextVariants.p}>
            <FormattedMessage
                id="wizard.RedHatRecommendsConfiguringDedicatedCredentialsToGrantCostManagementReadOnlyAccessToAzureCostDataLink"
                defaultMessage="Red Hat recommends configuring dedicated credentials to grant Cost Management read-only access to Azure cost data.  {link}"
                values={{ link: <Text rel="noopener noreferrer" target="_blank" component={TextVariants.a} href={AZURE_CREDS_URL}>
                    <FormattedMessage id="wizard.LearnMore" defaultMessage="Learn more" />
                </Text>
                }}
            />
        </Text>
        <Text component={TextVariants.p}>
            <FormattedMessage
                id="wizard.RunTheFollowingCommandInCloudShellToCreateACostManagementStorageAccountContributorRoleFromTheOutputEnterTheValuesInTheFieldsBelow"
                // eslint-disable-next-line max-len
                defaultMessage="Run the following command in Cloud Shell to create a Cost Management Storage Account Contributor role. From the output enter the values in the fields below:"
            />
        </Text>
        <ClipboardCopy>{
            `az ad sp create-for-rbac -n "CostManagement" --role "Storage Account Contributor" --query '{"tenant": tenant, "client_id": appId, "secret": password}'`
        }</ClipboardCopy>
    </TextContent>
);

export const ReaderRoleDescription = () => {
    const form = useFormApi();
    const { values: { credentials } } = form.getState();
    return (
        <TextContent>
            <Text component={TextVariants.p}>
                <FormattedMessage
                    id="wizard.RunTheFollowingCommandInCloudShellToCreateACostManagementReaderRole"
                    defaultMessage="Run the following command in Cloud Shell to create a Cost Management Reader role:"
                />
            </Text>
            <ClipboardCopy>{
                `az role assignment create --role "Cost Management Reader" --assignee http://CostManagement --subscription ${credentials.subscription_id}`
            }</ClipboardCopy>
        </TextContent>
    );};

export const ExportSchedule = () => (
    <TextContent>
        <Text component={TextVariants.p}>
            <FormattedMessage
                id="wizard.CreateARecurringTaskToExportCostDataToYourAzureStorageAccountWhereCostManagementWillRetrieveTheDataLink"
                defaultMessage="Create a recurring task to export cost data to your Azure storage account, where cost management will retrieve the data.  {link}"
                values={{ link: <Text
                    rel="noopener noreferrer"
                    target="_blank"
                    component={TextVariants.a}
                    href={RECURRING_TASK_URL}>
                    <FormattedMessage id="wizard.LearnMore" defaultMessage="Learn more" />
                </Text> }}
            />
        </Text>
        <TextContent className='list-align-left'>
            <TextList component={TextListVariants.ol}>
                <TextListItem component={TextListItemVariants.li}>
                    <FormattedMessage id="wizard.FromTheAzurePortalAddANewExport" defaultMessage="From the Azure portal, add a new export." />
                </TextListItem>
                <TextListItem component={TextListItemVariants.li}>
                    <FormattedMessage
                        id="wizard.ProvideANameForTheContainerAndDirectoryPathAndSpecifyTheBelowSettingsToCreateTheDailyExportLeaveAllOtherOptionsAsTheDefault"
                        // eslint-disable-next-line max-len
                        defaultMessage="Provide a name for the container and directory path, and specify the below settings to create the daily export. Leave all other options as the default."
                    />
                </TextListItem>
            </TextList>
        </TextContent>
        <TextList className='export-table' component={TextListVariants.dl}>
            <TextListItem component={TextListItemVariants.dt}>
                <Text component={TextVariants.b}><FormattedMessage id="wizard.ExportType" defaultMessage="Export type" /></Text>
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
                <FormattedMessage id="wizard.DailyExportForBillingPeriodToDateCosts" defaultMessage="Daily export for billing-period-to-date costs" />
            </TextListItem>
            <TextListItem component={TextListItemVariants.dt}>
                <Text component={TextVariants.b}><FormattedMessage id="wizard.StorageAccountName" defaultMessage="Storage account name" /></Text>
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
                <FormattedMessage id="wizard.StorageAccountNameCreatedEarlier" defaultMessage="Storage account name created earlier" />
            </TextListItem>
        </TextList>
    </TextContent>
);
