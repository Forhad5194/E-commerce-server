const forgotPasswordEmailTemplate = ({name, otp }) => {
       return `
       <div>
          <p>Dear sir ${name}</p>
          <p>
                you'r request your password reset.  Please enter your otp code .</p>

                 <div style="background: yellow; font-size:40px;text-align:center;padding:20px; font-welght:800; border-radius: 20px;">
                    ${otp}
                </div>

                <p>This otp is validate for  one houre. </p>

                <br/>
                <br/>
                <p>Thank you </p>
       </div>
       
       
       `
}

export default forgotPasswordEmailTemplate;