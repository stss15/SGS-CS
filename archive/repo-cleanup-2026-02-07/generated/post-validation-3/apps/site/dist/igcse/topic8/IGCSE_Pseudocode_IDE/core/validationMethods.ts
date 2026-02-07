import { DescribableItem } from "../App";

export const validationMethods: DescribableItem[] = [
  {
    title: 'Range Check',
    description: `A Range Check ensures that a number or date is within a sensible upper and lower limit. For example, ensuring a user's age for a secondary school application is between 11 and 18.`,
    code: `// This program validates that the entered age is within the required range.
DECLARE Age : INTEGER

OUTPUT "Please enter your age (11-18):"

REPEAT
    INPUT Age
    IF Age < 11 OR Age > 18 THEN
        OUTPUT "Age must be between 11 and 18. Please re-enter."
    ENDIF
UNTIL Age >= 11 AND Age <= 18

OUTPUT "Age accepted: ", Age`
  },
  {
    title: 'Length Check',
    description: `A Length Check ensures that a string contains an appropriate number of characters. This is often used for usernames or passwords to ensure they are not too short or too long. The built-in LENGTH() function is used here.`,
    code: `// This program validates the length of a new username.
DECLARE UserName : STRING

OUTPUT "Please enter a username (3-15 characters):"

REPEAT
    INPUT UserName
    IF LENGTH(UserName) < 3 OR LENGTH(UserName) > 15 THEN
        OUTPUT "Username is too short or too long. Please re-enter."
    ENDIF
UNTIL LENGTH(UserName) >= 3 AND LENGTH(UserName) <= 15

OUTPUT "Username '", UserName, "' has been accepted."`
  },
  {
    title: 'Type Check',
    description: `A Type Check verifies that the data entered is of the correct data type. While the interpreter's INPUT statement handles basic type validation, this example shows a logical way to check if a number is a whole number using the DIV operator, which performs integer division.`,
    code: `// This program validates that the user enters a whole number.
DECLARE NumberOfItems : REAL

OUTPUT "How many items would you like? (must be a whole number)"

REPEAT
    INPUT NumberOfItems
    IF NumberOfItems <> DIV(NumberOfItems, 1) THEN
        OUTPUT "This must be a whole number. Please re-enter."
    ENDIF
UNTIL NumberOfItems = DIV(NumberOfItems, 1)

OUTPUT "You have ordered ", NumberOfItems, " items."`
  },
  {
    title: 'Presence Check',
    description: `A Presence Check confirms that some data has been entered and a required field has not been left blank. This is essential for mandatory information like an email address or a name.`,
    code: `// This program validates that a name has been entered.
DECLARE FullName : STRING

OUTPUT "Please enter your full name:"
REPEAT
    INPUT FullName
    IF FullName = "" THEN
        OUTPUT "Name cannot be empty. Please enter your name."
    ENDIF
UNTIL FullName <> ""

OUTPUT "Thank you, ", FullName, "."`
  },
  {
    title: 'Check Digit',
    description: `A check digit is an extra digit added to a number which is calculated from the other digits. It is used to detect errors in data entry.

When the number is entered, the check digit is recalculated by the computer and compared to the one that was entered. If they do not match, an error is flagged. This method does not prevent all errors but is very effective at catching common mistakes like incorrect digits or transposing adjacent digits.

This method is commonly used in barcodes on products and in ISBNs for books.`,
  },
  {
    title: 'Double Entry Verification',
    description: `This is a verification method where the user is asked to enter important data twice (e.g., a new password or an email address). The system then compares the two entries. If they do not match, it prompts the user to re-enter the data. This significantly reduces the chance of typos in critical information.`,
    code: `// This program uses double entry to verify a new password.
DECLARE Password : STRING
DECLARE PasswordConfirm : STRING

REPEAT
    OUTPUT "Please enter your new password:"
    INPUT Password
    
    OUTPUT "Please confirm your new password:"
    INPUT PasswordConfirm
    
    IF Password <> PasswordConfirm THEN
        OUTPUT "Passwords do not match. Please try again."
    ENDIF
UNTIL Password = PasswordConfirm

OUTPUT "Password has been set successfully."`
  },
  {
    title: 'Visual / Screen Check',
    description: `A simple verification method where the user is asked to review the data they have entered on the screen and confirm that it is correct before submitting it. This is often the final step in an online order or registration form, where a summary of all entered information is displayed with "Confirm" or "Edit" buttons. This gives the user one last chance to catch any mistakes.`,
  }
];