export const verifyEmailTemplate = ({name , url}) => {
    return `
       <p>Dear${name}</p>
       <p>Thank you for register our E-commerce platfrom . </p>
       <a herf=${url} style="color:white; background:blue; margin-top:10px ">
        verify your Email 
       </a>
    `
}