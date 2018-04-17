/**
 * Class to implement the required validations for the project.
 */

class Validation {

    /**
     * Function that validates that a member id is valid
     * @param memberId the member id to validate
     * @returns True, if the member id is valid. Else, false.
     */
    static isAValidMemberId(memberId){
    
        var memberIdStr = String(memberId).toLowerCase();
        var memberIdStrSize = memberIdStr.length;
        var memberIdFirstChar = memberIdStr.charAt(0);
    
        //All student or professor ids have 9 characters and start with 'A' or 'L'
        return memberIdStrSize == 9 && (memberIdFirstChar == 'a' || memberIdFirstChar == 'l');
    }

    /**
     * Function that validates that a given department_major value
     * exists in the corresponding enum.
     * 
     * @param department_major the value to validate
     * @returns True, if the value exists in the enum. Else, false.
     */
    static isAValidDepartment_Major(department_major){

        //TODO: implement this function to validate against the department_major enum
        return true;
    }
}