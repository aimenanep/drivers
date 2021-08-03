const host="https://driver.anepcs.dz"
const urls={
    verify_auth:host+"/accounts/api/verify/",
    login:`${host}/api-auth/`,
    sendNotificationToken:`${host}/accounts/api/notifications/token`,
    travelList:`${host}/travels/api/list/`,
    SingleTravel:`${host}/travels/api/`,
    NewTravel:`${host}/travels/api/new`,
    TravelStatus:`${host}/travels/api/status/`,
    GetRegions:`${host}/regions/api/`,
}

export default urls