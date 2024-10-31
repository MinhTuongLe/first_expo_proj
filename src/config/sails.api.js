/**
 * @Description: API
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */

const Api = {
  notification: {
    list: '/notification',
    notRead: '/notification/notRead',
    read: '/notification/read',
  },
  album: {
    list: '/class-',
    detail: '/album',
  },
  media: {
    add: '/media/add/',
  },
  news: {
    list: '/post',
    get: '/post/',
  },
  schedule: {
    get: '/schedule',
  },
  menu: {
    get: '/menu',
  },
  login: {
    entrance: '/entrance/login',
  },
  logout: {
    entrance: '/entrance/logout',
  },
  verifyToken: {
    get: '/auth/verifyToken',
  },
  checkExpiredToken: {
    entrance: '/entrance/checkExpiredToken',
  },
  setting: {
    get: '/setting/',
  },
  changeInfo: {
    info: '/user/edit',
    password: '/changepassword',
    avatar: '/user/upload',
  },
  changeInfoParent: {
    info: '/parent/edit',
    avatar: '/parent/upload',
  },
  updateStudent: {
    heightWeight: '/student/updateWHHistory',
    healthHistory: '/student/updateHealthHistory',
  },
  student: {
    info: '/student/getStudent',
    getListStudentByClassId: '/class-',
    edit: '/student/edit',
    avatar: '/student/upload',
  },
  class: {
    get: '/class',
  },
  message: {
    listGroup: '/message/listGroup',
    listGroupOfClass: '/message/listGroupsOfClass',
    listGroupOfParent: '/message/listGroupsOfParent',
    listGroupOfTeacher: '/message/listGroupsOfTeacher',
    getMessage: '/message-',
    storeMessageData: '/message/storeMessageData',
    fileSendMessage: '/message/fileSendMessage',
  },
  user: {
    getListTeacherByClassId: '/class-',
  },
  parent: {
    getParentsFromClass: '/class-',
  },
  fee_invoice: {
    listByStudent: '/feeInvoice/list',
    get: '/feeInvoice',
    paymentWithPaypal: '/feeInvoice/stripe',
    updateStatus: '/payment/transfer',
  },
  attendant: {
    findOrCreate: '/attendent/findOrCreate',
    checkIn: '/attendent/checkIn',
    pushNotification: '/attendance/pushNotification',
    get: '/attendent',
    edit: '/attendent',
    history: '/attendent/history',
    historyGet: '/attendent/historyGet',
    statistics: '/attendance/statistics',
    trackingStudent: '/attendent/tracking',
    checkExisted: '/attendent/checkPickUpExisted',
  },
  attendance: {
    findOrCreate: '/attendance/findOrCreate',
    checkIn: '/attendance/checkIn',
    checkOut: '/attendance/checkOut',
    // pushNotification: '/attendent/pushNotification',
    get: '/attendance',
    edit: '/attendance',
    classDiary: '/attendance/classDiary',
    classDiaryGet: '/attendance/studentDiary',
    // statistics: '/attendent/statistics',
    // trackingStudent: '/attendent/tracking',
    checkExisted: '/attendance/checkPickUpExisted',
  },
  dayOff: {
    postDayOff: '/dayOff',
  },
  payment: {
    add: '/payment/add',
  },
  driver: {
    pickUp: '/driver/pickUp',
    dropOff: '/driver/dropOff',
  },
  feedback: {
    list: '/feedback',
    detail: '/feedback',
    add: '/feedback/addFeedback',
    edit: '/feedback/editFeedback',
  },
  account: {
    delete: '/entrance/delete',
  },
};

export default Api;
