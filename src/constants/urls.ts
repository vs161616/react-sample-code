const API_BASE_URL = "https://production.rentzeme.com";
const GOOGLE_MAP_URL = "https://www.google.co.in/maps/preview";

const AUTH_API_URLS = {
  login: "/users/identify/",
  REGISTER_AGENT: "/users/agents/",
  REGISTER_RENTER: "/users/renters/",
  EDIT_RENTER: "/users/renters/#RENTER_ID#/",
  EDIT_AGENT: "/users/agents/#AGENT_ID#/",
  CHECK_EMAIL: "/users/email-check/",
};

const PLAID_URLS = {
  GENERATE_TOKEN: "/users/plaidlink/#ID#/",
};

const PROPERTIES_API_URL = {
  PUBLIC_PROPERTIES: "/properties/public/",
  AGENT_PROPERTIES: "/properties/public/listed_by/",
  PROPERTY_DESCRIPTION: "/properties/description/",
  PROPERTY_ID: `/properties/public/#ID#/`,
  MODIFY_PROPERTY_DOCUMENT: `/properties/public/#ID#/documents/modify/`,
  MAP_DATA: "/properties/public/map",
  OPEN_PROPERTY: "/properties/public/#ID#/open/",
  CLOSE_PROPERTY: "/properties/public/#ID#/close/",
  GET_ALL_SAVE_PROPERTY: "/savesrenter/",
  POST_RENTER_SAVE_SYNC: "/savesrenter/sync/",
  DELETE_RENTER_SAVE_SYNC: "/savesrenter/",
};

const APPLICATIONS_API_URL = {
  IDENTIFY_PROPERTY_ASSOCIATE_WITH_RENTER:
    "/applications/public/associated_with_renter/#RENTER_ID#/",
  CREATE_APPLICATION: "/applications/public/",
  IDENTIFY_PROPERTY_ASSOCIATE_WITH_AGENT:
    "/applications/public/for_agent/#AGENT_ID#/for_property/#PROPERTY_ID#/",
  VERIFY_DOCUMENT_RENTER:
    "/applications/public/#APPLICATION_ID#/for_renter/#RENTER_ID#/verify/",
  PUBLIC_PROPERTIES: "/properties/public/",
  AGENT_PROPERTIES: "/properties/public/listed_by/",
  PROPERTY_DESCRIPTION: "/properties/description/",
  ATTACH_DOCUMENTS_TO_APPLICATION:
    "/applications/public/#APPLICATION_ID#/for_renter/#RENTER_ID#/upload_documents/",
  SUBMIT_APPLICATION_RENTER:
    "/applications/public/#APPLICATION_ID#/for_renter/#RENTER_ID#/lock-in",
  APPLICATION_CHECKOUT_VIEW: "/applications/public/#APPLICATION_ID#/pay",
  GET_SINGLE_APPLICATION: "/applications/public/#APPLICATION_ID#/",
  GET_DOCUMENT_SIGN_SIGNING_SESSION:
    "/applications/public/#APPLICATION_ID#/for_renter/#RENTER_ID#/sign/",
  CREATE_SEND_LEASE_SESSION:
    "/applications/public/#APPLICATION_ID#/send-lease/",
  ACCEPT_APPLICATION_BY_AGENT:
    "/applications/public/#APPLICATION_ID#/for_agent/#AGENT_ID#/accept/",
  DENY_APPLICATION_BY_AGENT:
    "/applications/public/#APPLICATION_ID#/for_agent/#AGENT_ID#/deny/",
  CANCEL_APPLICATION_BY_RENTER:
    "/applications/public/#APPLICATION_ID#/for_renter/#RENTER_ID#/cancel/",
  NOTIFY_SIGN_LEASE: "/applications/public/#APPLICATION_ID#/notify_sign_lease/",
  FINIX_PAYMENT_SESSION: "/applications/public/#APPLICATION_ID#/pay/",
  TU_GENERATE_SCREENING_SESSION:
    "/applications/public/transunion/generate/#APPLICATION_ID#",
  TU_SCREENING_ANSWER_SESSION:
    "/applications/public/transunion/answer/#EXAM_ID#",
  ADD_CO_APPLICANT: `/applications/public/#APPLICATION_ID#/add_coapplicants/`,
  DELETE_CO_APPLICANT: `/applications/public/#APPLICATION_ID#/delete_coapplicant/#EMAIL#`,
  ACCEPT_CO_APPLICANT_INVITE:
    "/applications/public/application/#APPLICATION_ID#/invite/accept/",
  REJECT_CO_APPLICANT_INVITE:
    "/applications/public/application/#APPLICATION_ID#/invite/reject/",
};

const ADDRESS_API_URL = {
  ADDRESS_AUTCOMPLETE: "/properties/autocomplete/",
  OFFICE_COMMUTE: "/properties/public/distance_from/", // :property_id
  SEARCH_AUTOCOMPLETE: "properties/autocomplete_location_search/",
};

const AGENT_URLS = {
  GET_PROFILE: "users/agents/#ID#/",
};

const RENTER_URLS = {
  GET_PROFILE: "users/renters/#ID#/",
  UPDATE_PROFILE: "users/renters/#ID#/",
  SAVE_DOCUMENTS: "users/documents/",
  GET_DOCUMENTS: "users/documents/",
};

const CHAT_API_URL = {
  GET_ROOMS: "/messaging/rooms/",
  GET_ROOM_MESSAGES: "/messaging/public/for_room/#ID#",
  CREATE_MESSAGE: "/messaging/public/",
  CREATE_MESSAGE_ROOM: "/messaging/rooms/",
  GET_USER_HAS_UNREAD_MSGS: "/messaging/public/has_unreads",
};

const PASSWORD = {
  PASSWORD_RESET: "/accounts/password_reset/",
  PASSWORD_CONFIRM: "/accounts/password_reset_confirm/",
  PASSWORD_RESET_TOKEN: "/accounts/password_reset_valid_token/",
};

const VERIFY = {
  VERIFY_EMAIL: "/accounts/verify_user_valid_token/",
  VERIFY_USER_CONFIRM: "/accounts/verify_user_confirm/",
  VERIFY_EMAIL_VIEW: "/accounts/verify_user/",
};
export {
  API_BASE_URL,
  GOOGLE_MAP_URL,
  AUTH_API_URLS,
  PROPERTIES_API_URL,
  ADDRESS_API_URL,
  PLAID_URLS,
  AGENT_URLS,
  RENTER_URLS,
  APPLICATIONS_API_URL,
  CHAT_API_URL,
  PASSWORD,
  VERIFY,
};
