import React from "react";
import MenuBar from "../UI/Menu/Menu";
import "./Home.css";



const Terms = () => {
 

  return (
    <div>
      <MenuBar />

      <section id="not-found" className="container" style={{ marginTop: "70px" }}>
        <h1 className="ask-me-h2" style={{textAlign: "center"}}>User Agreement and Privacy Policy</h1>

        <p>This User Agreement and Privacy Policy <strong>("Agreement")</strong> is a legal agreement between you  
        <strong>("User")</strong> and Blue Spider Technologies <strong>("Blue Spider")</strong> governing the use of Bubble AI 
        software solution <strong>("Bubble AI")</strong>. By using Bubble AI, you agree to be bound by the terms and conditions set forth in this Agreement.</p>

        <section className="container-inner" style={{textAlign: "left", paddingBottom: "10px"}}>
            <h4 style={{color: "#56A8AC"}}>1. User Agreement</h4>

            <div style={{paddingLeft: "20px", fontSize: ".9rem"}}>
                <p><strong>1.1 License:</strong> Blue Spider grants User a non-exclusive, non-transferable license to use Bubble AI for personal or business purposes.</p>
                <p><strong>1.2 Restrictions:</strong> User shall not modify, reverse engineer, decompile, disassemble, or attempt to derive the source code of Bubble AI. User shall not sublicense, rent, lease, or distribute Bubble AI.</p>
                <p><strong>1.3 Intellectual Property:</strong> User acknowledges that Bubble AI and all related intellectual property rights are owned by Blue Spider. User shall not remove or alter any copyright, trademark, or other proprietary notices.</p>
                <p><strong>1.4 Disclaimer:</strong> Bubble AI is provided "as is" without any warranties, express or implied. Blue Spider shall not be liable for any damages arising from the use of Bubble AI.</p>
                <p><strong>1.5 Termination:</strong> Blue Spider reserves the right to terminate this Agreement and suspend User's access to Bubble AI at any time for any reason.</p>
                
            </div>
        </section>

        <section className="container-inner" style={{textAlign: "left", paddingBottom: "10px", marginTop: "20px"}}>
            <h4 style={{color: "#56A8AC"}}>2. Privacy Policy</h4>

            <div style={{paddingLeft: "20px", fontSize: ".9rem"}}>
                <p><strong>2.1 Collection of Information:</strong> When using Bubble AI, User may provide personal information such as name, email address, and resume details. Blue Spider may collect and store this information to improve the functionality of Bubble AI.</p>
                <p><strong>2.2 Use of Information:</strong> Blue Spider may use User's information to provide personalized responses through the chatbot feature and to generate resumes in PDF format. User's information will not be shared with third parties without consent.</p>
                <p><strong>2.3 Security:</strong> Blue Spider implements industry-standard security measures to protect User's information from unauthorized access, disclosure, alteration, or destruction.</p>
                <p><strong>2.4 Cookies:</strong> Bubble AI may use cookies to enhance User experience. User can disable cookies in their browser settings, but this may affect the functionality of Bubble AI.</p>
                <p><strong>2.5 Data Retention:</strong> Blue Spider will retain User's information as long as necessary to fulfill the purposes outlined in this Agreement, unless required by law to retain it for a longer period.</p>
                <p><strong>2.6 Updates:</strong> Blue Spider may update this Privacy Policy from time to time. User will be notified of any changes, and continued use of Bubble AI constitutes acceptance of the updated Privacy Policy.</p>
                
            </div>
        </section>
      </section>


    </div>
  );
};

export default Terms;

