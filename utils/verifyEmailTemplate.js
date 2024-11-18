export const verifyEmailTemplate = ({name , url}) => {
    return `
       <p>Dear${name}</p>
       <p>Thank you for register our E-commerce platfrom . </p>
       <a href=${url} style="color:black; background:orange; margin-top:50px;  padding:150px ;>
        verify your Email 
       </a>
    `
}