import React from "react";
import { Typography } from "@material-ui/core";

function TnC() {
  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
  };

  const cellStyle = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#f2f2f2",
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <br />
      <br />
      <br />
      <br />
      <div className="w-4/5">
        <div className="heading font-semibold text-2xl my-4">
          Terms and Conditions
        </div>
        <div className="content flex flex-col gap-3 ">
          <div>
            KissanSeva Private Limited (hereinafter referred to as “KPL” or “We”
            or “Us” or “Our” or ”Company”) welcome you at KissanSeva.com to rent
            out your idle land and equipment.
          </div>

          <div>
            This Terms of Use is published in accordance with the provisions of
            Rule 3 (1) of the Information Technology (Intermediaries guidelines)
            Rules, 2011 that require publishing the rules and regulations,
            privacy policy and Terms of Use for access or usage of Website
            (defined below).
          </div>

          <div>
            The domain name www.KissanSeva.com is owned by KPL Private Limited,
            a company incorporated under the Companies Act, 1956 with its
            registered office at ground floor VESIT, Mumbai.
          </div>

          <div>
            <ol className="flex flex-col gap-2">
              <li>
                <div className="font-semibold pl-4">1. Term of lease</div>{" "}
                <div className="pl-5">
                  The term of this Agreement shall commence on [Commencement
                  Date] and continue for a period of [Term Duration]
                  months/years, unless terminated earlier as provided herein.
                </div>
              </li>
              <li>
                <div className="font-semibold pl-4">2. Rental Payments</div>{" "}
                <div className="pl-5">
                  The Tenant agrees to pay the Landlord a monthly/annual rent of
                  [Amount] for the use of the rented land. Rent payments shall
                  be due on the [Day of the Month] of each month/year.
                </div>
              </li>
              <li>
                <div className="font-semibold pl-4">3. Use of Land</div>{" "}
                <div className="pl-5">
                  The Tenant shall use the rented land solely for [Intended
                  Use], and shall not engage in any activities that may cause
                  damage to the land or violate any laws or regulations.
                </div>
              </li>
              <li>
                <div className="font-semibold pl-4">4. Use of Equipments</div>{" "}
                <div className="pl-5">
                  The lessee is responsible for damage caused and liable to pay
                  penalty equivalent to the damage percentage according to
                  damage matrix.
                  <table style={tableStyle}>
                    <tr>
                      <th style={cellStyle}>Damage Percentage</th>
                      <th style={cellStyle}>Nature of Damage Covered</th>
                    </tr>
                    <tr>
                      <td style={cellStyle}>Up to 5%</td>
                      <td style={cellStyle}>
                        Loss of spare parts, minor dents
                      </td>
                    </tr>
                    <tr>
                      <td style={cellStyle}>Up to 25%</td>
                      <td style={cellStyle}>
                        Loss of valuable attachments, major dents
                      </td>
                    </tr>
                    <tr>
                      <td style={cellStyle}>Up to 50%</td>
                      <td style={cellStyle}>Affecting functionalities</td>
                    </tr>
                    <tr>
                      <td style={cellStyle}>Up to 75%</td>
                      <td style={cellStyle}>Affecting major functionalities</td>
                    </tr>
                    <tr>
                      <td style={cellStyle}>Up to 100%</td>
                      <td style={cellStyle}>Non-functional</td>
                    </tr>
                  </table>
                </div>
              </li>
              <li>
                <div className="font-semibold pl-4">5. Damage Calculation</div>{" "}
                <div className="pl-5">
                  Damage percentage will be judged by KissanSeva coordinator
                  with appropriate functionality checks.
                </div>
              </li>
              <li>
                <div className="font-semibold pl-4">
                  6. Maintenance and Repairs
                </div>{" "}
                <div className="pl-5">
                  The Tenant shall be responsible for maintaining the rented
                  land in good condition throughout the term of this Agreement.
                  This includes regular upkeep, repairs, and necessary
                  maintenance tasks.
                </div>
              </li>
              <li>
                <div className="font-semibold pl-4">7. Government Law</div>{" "}
                <div className="pl-5">
                  THESE WEBSITE TERMS OF USE IS AN ELECTRONIC RECORD IN THE FORM
                  OF AN ELECTRONIC CONTRACT FORMED UNDER INFORMATION TECHNOLOGY
                  ACT, 2000 AND RULES MADE THEREUNDER AND THE AMENDED PROVISIONS
                  PERTAINING TO ELECTRONIC DOCUMENTS / RECORDS IN VARIOUS
                  STATUTES AS AMENDED BY THE INFORMATION TECHNOLOGY ACT, 2000.
                  THESE TERMS OF USE DOES NOT REQUIRE ANY PHYSICAL, ELECTRONIC
                  OR DIGITAL SIGNATURE. <br />
                  This Agreement or the documents incorporated herein by
                  reference shall be governed and construed in accordance with
                  the laws of India. Subject to Clause 20 (Arbitration) above,
                  all disputes arising under this Agreement between You and
                  ATFEM shall be subject to the exclusive jurisdiction of courts
                  at Pune, Maharashtra, India.
                </div>
              </li>
            </ol>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default TnC;
