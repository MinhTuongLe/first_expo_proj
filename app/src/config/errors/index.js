/**
* @Description: ./src/config/errors
* @CreatedAt: 19/02/2020
* @Author: ZiniSoft
*/
const Errors = {

  USER_ERR_NOT_FOUND: { code: 'USER_ERR_NOT_FOUND', message: 'userErrNotFound' },
  USER_ERR_PASSWORD_WRONG: { code: 'USER_ERR_PASSWORD_WRONG', message: 'userErrPasswordWrong' },
  AUTH_ERR_ACCOUNT_NOTREADY: { code: 'AUTH_ERR_ACCOUNT_NOTREADY', message: 'authErrAccountNotReady' },
  AUTH_ERR_PARENT_NOTREADY: { code: 'AUTH_ERR_PARENT_NOTREADY', message: 'authErrParentNotReady' },
  USER_ERR_USER_INPUT_REQUIRED: { code: 'USER_ERR_USER_INPUT_REQUIRED', message: 'userErrUserInputRequired' },
  USER_ERR_STUDENT_NOT_FOUND: { code: 'USER_ERR_STUDENT_NOT_FOUND', message: 'userErrStudentNotFound' },
  CHANGE_PASS_ERR_CURRENT_PASS_WRONG: { code: 'CHANGE_PASS_ERR_CURRENT_PASS_WRONG', message: 'changePassErrCurrentPassWrong' },
  STUDENT_ERR_ID_REQUIRED: { code: 'STUDENT_ERR_ID_REQUIRED', message: 'studentErrIdRequired' },
  STUDENT_ERR_FIRSTNAME_REQUIRED: { code: 'STUDENT_ERR_FIRSTNAME_REQUIRED', message: 'studentErrFirstNameRequired' },
  STUDENT_ERR_LASTNAME_REQUIRED: { code: 'STUDENT_ERR_LASTNAME_REQUIRED', message: 'studentErrLastNameRequired' },
  STUDENT_ERR_BIRTHDAY_REQUIRED: { code: 'STUDENT_ERR_BIRTHDAY_REQUIRED', message: 'studentErrBirthdayRequired' },
  STUDENT_ERR_GENDER_REQUIRED: { code: 'STUDENT_ERR_GENDER_REQUIRED', message: 'studentErrGenderRequired' },
  STUDENT_ERR_NOT_FOUND: { code: 'STUDENT_ERR_NOT_FOUND', message: 'studentErrNotFound' },
  STUDENT_ID_REQUIRED: { code: 'STUDENT_ID_REQUIRED', message: 'studentIdRequired' },
  PARENT_ERR_EMAIL_PARENT_EXISTED: { code: 'PARENT_ERR_EMAIL_PARENT_EXISTED', message: 'parentErrEmailParentExisted' },
  PARENT_ERR_PHONE_PARENT_EXISTED: { code: 'PARENT_ERR_PHONE_PARENT_EXISTED', message: 'parentErrPhoneParentExisted' },
  ATTENDENT_NOT_FOUND: { code: 'ATTENDENT_NOT_FOUND', message: 'attendanceNotFound' },
  ATTENDENT_ID_REQUIRED: { code: 'ATTENDENT_ID_REQUIRED', message: 'attendanceIdRequired' },
  ATTENDENT_TIME_REQUIRED: { code: 'ATTENDENT_TIME_REQUIRED', message: 'attendanceTimeRequired' },
  ATTENDENT_NOTE_REQUIRED: { code: 'ATTENDENT_NOTE_REQUIRED', message: 'txtInputErrNotFill' },
  ATTENDENT_ERR_CLASSID_REQUIRED: { code: 'ATTENDENT_ERR_CLASSID_REQUIRED', message: 'attendanceClassIdRequired' },
  ATTENDENT_DATE_REQUIRED: { code: 'ATTENDENT_DATE_REQUIRED', message: 'attendanceDateRequired' },
  ATTENDENT_DATE_INVALID: { code: 'ATTENDENT_DATE_INVALID', message: 'attendanceDateInvalid' },
  ATTENDENT_ERR_DATEUSE_REQUIRED: { code: 'ATTENDENT_ERR_DATEUSE_REQUIRED', message: 'ATTENDENT_ERR_DATEUSE_REQUIRED' },
  NO_DATA_ATTENDENT: { code: 'NO_DATA_ATTENDENT', message: 'noDataAttendance' },
  PICKUP_ID_REQUIRED: { code: 'PICKUP_ID_REQUIRED', message: 'pickupIdRequired' },
  PICKUP_TIME_REQUIRED: { code: 'PICKUP_TIME_REQUIRED', message: 'pickupTimeRequired' },
  PARENT_ID_REQUIRED: { code: 'PARENT_ID_REQUIRED', message: 'parentIdRequired' },
  PICKUP_NOT_ALLOWED: { code: 'PICKUP_NOT_ALLOWED', message: 'pickUpNotAllowed' },
  SETTINGS_STUDENT_MOVING_PROCESS_NOT_ACTIVE: { code: 'SETTINGS_STUDENT_MOVING_PROCESS_NOT_ACTIVE', message: 'moving_process_inactive' }
}

export default Errors;