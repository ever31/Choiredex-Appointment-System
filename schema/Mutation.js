const graphql = require("graphql");
const addAppointmentMutation = require("./mutations/addAppointmentMutation");
const confirmAppointmentMutation = require("./mutations/confirmAppointmentMutation");
const addPersonalEventMutation = require("./mutations/addPersonalEventMutation");
const addClientMutation = require("./mutations/addClientMutation");
const deleteClientMutation = require("./mutations/deleteClientMutation");
const addEmployeeMutation = require("./mutations/addEmployeeMutation");
const deleteEmployeeMutation = require("./mutations/deleteEmployeeMutation");
const updateConsentFormMutation = require("./mutations/updateConsentFormMutation");
const updateMyRoutineMutation = require("./mutations/updateMyRoutineMutation");
const updateClientsInvalidateTokensMutation = require("./mutations/updateClientInvalidateTokensMutation");
const updateEmployeeInvalidateTokensMutation = require("./mutations/updateEmployeeInvalidateTokensMutation");
const updateEmployeeMutation = require("./mutations/updateEmployeeMutation");
const deleteAppointmentMutation = require("./mutations/deleteAppointmentMutation");
const deletePersonalEventMutation = require("./mutations/deletePersonalEventMutation");
const deleteMyRoutineItemMutation = require("./mutations/deleteMyRoutineItemMutation");
const updateAdminPasswordMutation = require("./mutations/updateAdminPasswordMutation");
const updateClientProfilePictureMutation = require("./mutations/updateClientProfilePictureMutation");
const updateAdminProfilePictureMutation = require("./mutations/updateAdminProfilePictureMutation");
const updatePersonalEventMutation = require("./mutations/updatePersonalEventMutation");
const updateClientInformationMutation = require("./mutations/updateClientInformationMutation");
const updateClientSquareIDMutation = require("./mutations/updateClientSquareIDMutation");
const updateUnsavedSquareCardIDsMutation = require("./mutations/updateUnsavedSquareCardIDsMutation");
const removeOneUnsavedSquareCardIDsMutation = require("./mutations/removeOneUnsavedSquareCardIDsMutation");
const registerClientMutation = require("./mutations/registerClientMutation");
const resetNotificationsMutation = require("./mutations/resetNotificationsMutation");
const addServiceMutation = require("./mutations/addServiceMutation");
const updateServiceMutation = require("./mutations/updateServiceMutation");
const deleteServiceMutation = require("./mutations/deleteServiceMutation");
const addStoreMutation = require("./mutations/addStoreMutation");
const updateStoreMutation = require("./mutations/updateStoreMutation");
const deleteStoreMutation = require("./mutations/deleteStoreMutation");

const { GraphQLObjectType } = graphql;

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAppointment: addAppointmentMutation,
    confirmAppointment: confirmAppointmentMutation,
    addPersonalEvent: addPersonalEventMutation,
    addClient: addClientMutation,
    deleteClient: deleteClientMutation,
    addEmployee: addEmployeeMutation,
    deleteEmployee: deleteEmployeeMutation,
    updateConsentForm: updateConsentFormMutation,
    updateMyRoutine: updateMyRoutineMutation,
    updateClientInvalidateTokens: updateClientsInvalidateTokensMutation,
    updateEmployeeInvalidateTokens: updateEmployeeInvalidateTokensMutation,
    updateEmployee: updateEmployeeMutation,
    deleteAppointment: deleteAppointmentMutation,
    deletePersonalEvent: deletePersonalEventMutation,
    deleteMyRoutineItem: deleteMyRoutineItemMutation,
    updateAdminPassword: updateAdminPasswordMutation,
    updateClientProfilePicture: updateClientProfilePictureMutation,
    updateAdminProfilePicture: updateAdminProfilePictureMutation,
    updatePersonalEvent: updatePersonalEventMutation,
    updateClientInformation: updateClientInformationMutation,
    updateClientSquareID: updateClientSquareIDMutation,
    updateUnsavedSquareCardIDs: updateUnsavedSquareCardIDsMutation,
    removeOneUnsavedSquareCardIDs: removeOneUnsavedSquareCardIDsMutation,
    registerClient: registerClientMutation,
    resetNotifications: resetNotificationsMutation,
    addService: addServiceMutation,
    updateService: updateServiceMutation,
    deleteService: deleteServiceMutation,
    addStore: addStoreMutation,
    updateStore: updateStoreMutation,
    deleteStore: deleteStoreMutation,

  },
});

module.exports = Mutation;
