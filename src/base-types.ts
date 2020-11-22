/**
 * @minimum 0
 * @TJS-type integer
 */
export type Timestamp = number;

/**
 * @minimum 1
 * @TJS-type integer
 */
export type CountPerPage = number;

/**
 * @minimum 0
 * @TJS-type integer
 */
export type Id = number;


//----------
//  User
//----------
export type UserId = Id;

/**
 * @pattern ^[\w\d]{4,20}$
 * @TJS-type string
 */
export type UserName = string;

/**
 * @pattern ^[\w\d-_]{5,64}$
 * @TJS-type string
 */
export type UserPassword = string;


//----------
//  Note
//----------
export type NoteId = Id;

/**
 * @minLength 1
 * @maxLength 1000
 * @TJS-type string
 */
export type NoteText = string;


//----------
//  SharedItem
//----------
export type SharedItemId = Id;

export type SharedItemType = 'note';

/**
 * @minLength 15
 * @maxLength 15
 * @TJS-type string
 */
export type SharedItemHash = string;
