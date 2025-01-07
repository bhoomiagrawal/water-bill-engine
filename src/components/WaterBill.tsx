import React from "react";
import { RxCross2 } from "react-icons/rx";

interface WaterBillProps {
  setWaterBillOpen: (value: boolean) => void;
  reponse: any;
  payload: any;
}

const WaterBill: React.FC<WaterBillProps> = ({
  setWaterBillOpen,
  reponse,
  payload,
}) => {
  const d = new Date();

  const formattedDateCurrent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const currentMonthData = new Date(reponse?.detailsByMonth[0]?.reading_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const previousMonthData = new Date(reponse?.detailsByMonth[1]?.reading_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    // <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">

    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm bg-black mt-18     overflow-auto">
      <div className="mt-10 bg-gray-100 relative w-[600px] m-auto flex justify-center items-center min-h-screen ">
        <div className="mx-auto max-w-6xl">
          <div className="w-full max-w-xl p-6 border ">
            <div className="  flex  justify-end">
              {" "}
              <RxCross2
                onClick={() => setWaterBillOpen(false)}
                className=" w-10 h-10"
              />
            </div>

            <div className=" mb-2">
              <p className="text-center font-bold text-[#6666d7]">
                राजस्थान जल प्रदाय एवं सीवरेज निगम, जयपुर
              </p>
              <p className="text-center font-bold text-[#6666d7]">
                (राजस्थान सरकार का उपक्रम)
              </p>
              <p className="text-center font-bold text-[#6666d7]">जिला जयपुर</p>
            </div>
            <div className="border border-[#6666d7] ">
              <div className="mb-2 ">
                <div className="grid grid-cols-2  border-b border-[#6666d7]">
                  <p className=" grid grid-cols-2 mr-4  border-r border-[#6666d7]">
                    <strong className="   text-[#6666d7]"> CI क्रमांक </strong>{" "}
                    140120613584
                  </p>
                  <p className=" grid grid-cols-2 mr-4  ">
                    <strong className="  text-[#6666d7] border-r border-[#6666d7] mr-2">
                      जोन क्रमांक{" "}
                    </strong>{" "}
                    0
                  </p>
                </div>
                <div className="grid grid-cols-2  border-b border-[#6666d7]">
                  <p className="  border-r border-[#6666d7]">
                    <strong className="   text-[#6666d7]">
                      {" "}
                      उपभोक्ता का नाम व पता{" "}
                    </strong>
                  </p>
                  <p className=" font-bold ml-2">
                  MOTWANI ARJUN F-316 VASHALI NAGAR
                  </p>
                </div>

                <div className="border-b border-[#6666d7]  ">
                  <p>
                    <strong className=" text-[#6666d7]">
                      मोबाइल नं./ ई - मेल
                    </strong>
                  </p>
                  <table className="w-full table-auto border-collapse border border-[#6666d7]  ">
                    <tbody>
                      <tr>
                        <td className="border border-[#6666d7]  ">
                          <strong className=" text-[#6666d7]">
                            खाता संख्या
                          </strong>
                        </td>
                        <td className="border border-[#6666d7]  ">
                          S2-9-95b-12
                        </td>
                        <td className="border border-[#6666d7]  ">
                          <strong className=" text-[#6666d7]">
                            उपखण्ड संख्या
                          </strong>
                        </td>
                        <td className="border border-[#6666d7]  ">S2-9</td>
                      </tr>
                      <tr>
                        <td className="border border-[#6666d7]  ">
                          <strong className=" text-[#6666d7]">
                            बिल क्रमांक
                          </strong>
                        </td>
                        <td className="border border-[#6666d7]  ">1244</td>
                        <td className="border border-[#6666d7]  ">
                          <strong className=" text-[#6666d7]">
                            सेवा क्रमांक
                          </strong>
                        </td>
                        <td className="border border-[#6666d7]  ">51234</td>
                      </tr>
                      <tr>
                        <td className="border border-[#6666d7]  ">
                          <strong className=" text-[#6666d7]">
                            मीटर की स्थिति/ मालिक
                          </strong>
                        </td>
                        <td className="border border-[#6666d7]  ">{payload[0]?.currMonth?.meter_status_id?.name}</td>
                        <td className="border border-[#6666d7]  ">
                          <strong className=" text-[#6666d7]">
                            मीटर क्रमांक
                          </strong>
                        </td>
                        <td className="border border-[#6666d7]  ">83041/727</td>
                      </tr>
                      <tr>
                        <td className="border border-[#6666d7]  ">
                          <strong className=" text-[#6666d7]">
                            उपभोक्ता श्रेणी
                          </strong>
                        </td>
                        <td className="border border-[#6666d7]  ">
                          {payload[0]?.category.name}
                        </td>
                        <td className="border border-[#6666d7]  ">
                          <strong className=" text-[#6666d7]">
                            बिलिंग माह
                          </strong>
                        </td>
                        <td className="border border-[#6666d7]  ">{formattedDateCurrent}</td>
                      </tr>
                      <tr>
                        <td className="border border-[#6666d7]  ">
                          <strong className=" text-[#6666d7]">
                            कनेक्शन का व्यास/ परिणाम
                          </strong>
                        </td>
                        <td className="border border-[#6666d7]  ">
                          {payload[0]?.connectionSize.name}(MM)
                        </td>
                        <td className="border border-[#6666d7]  ">
                          <strong className=" text-[#6666d7]">
                            बिल जारी करने की तिथि
                          </strong>
                        </td>
                        <td className="border border-[#6666d7]  ">{new Date().toLocaleDateString('en-GB')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-b border-[#6666d7] ">
                <p>
                  <strong className=" text-[#6666d7]">
                    मासिक जल उपभोग विवरण
                  </strong>
                </p>
                <table className="w-full table-auto border-collapse border border-[#6666d7]  mt-2">
                  <thead>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        बिल माह
                      </th>
                      <th className="border border-[#6666d7]   text-left">
                       {currentMonthData}
                      </th>
                      <th className="border border-[#6666d7]   text-left">
                   {payload[0]?.category.name !=="industrial" &&  payload[0]?.category.name !== "non domestic" ? previousMonthData:""}
                      </th>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        वर्तमान पठन तिथि
                      </th>
                      <td className="border border-[#6666d7]  ">
                      <p>{new Date(reponse.detailsByMonth[0]?.reading_date).toLocaleDateString('en-GB')}</p>

                        {/* {reponse.detailsByMonth[0]?.reading_date} */}
                      </td>
                      <td className="border border-[#6666d7]  ">
                      {payload[0]?.category.name !=="industrial" &&  payload[0]?.category.name !== "non domestic" ? new Date(reponse.detailsByMonth[1]?.reading_date).toLocaleDateString('en-GB'):""}

                      {/* <p>{new Date(reponse.detailsByMonth[1]?.reading_date).toLocaleDateString('en-GB')}</p> */}

                        {/* {reponse.detailsByMonth[1]?.reading_date} */}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        मीटर पठन (लीटर)
                      </th>
                      <td className="border border-[#6666d7]  ">
                        {" "}
                        
                      {payload[0].category.name ==="non domestic" || payload[0].category.name ==="industrial" ? payload[0]?.currMonth?.reading: payload[0]?.prevMonth?.reading}
                      </td>
                      <td className="border border-[#6666d7]  ">
                      {payload[0].category.name ==="domestic"?  payload[0]?.currMonth?.reading:""}
                      {/* {payload[0]?.currMonth?.reading} */}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        गत पठन 
                      </th>
                      <td className="border border-[#6666d7]  ">
                        {payload[0]?.lastRDG}
                      </td>
                      <td className="border border-[#6666d7]  ">
                      {payload[0]?.category.name !=="industrial" &&  payload[0]?.category.name !== "non domestic" ? payload[0]?.lastRDG:""}
                      {/* {payload[0]?.lastRDG} */}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        कुल जल उपभोग (लीटर)
                      </th>
                      
                      <td className="border border-[#6666d7]  ">
                      {payload[0].category.name ==="non domestic" || payload[0].category.name ==="industrial" ? payload[0]?.currMonth?.consumption: payload[0]?.prevMonth?.consumption}

                        
                      </td>
                      <td className="border border-[#6666d7]  ">
                      {/* {payload[0]?.category.name !=="industrial" &&  payload[0]?.category.name !== "non domestic" ? payload[0]?.currMonth?.consumption:""} */}
                      {/* {payload[0]?.currMonth?.consumption} */}
                      {payload[0].category.name ==="domestic"?  payload[0]?.currMonth?.consumption:""}

                      </td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        कुल जल उपभोग राशि(₹)
                      </th>
                      <td className="border border-[#6666d7]  ">
                        {reponse?.detailsByMonth[0]?.waterCharge}
                      </td>
                      <td className="border border-[#6666d7]  ">
                        {reponse?.detailsByMonth[1]?.waterCharge}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        सीवरेज शुल्क(₹)
                      </th>
                      <td className="border border-[#6666d7]  ">
                        {reponse?.detailsByMonth[0]?.sewerageCharge}
                      </td>
                      <td className="border border-[#6666d7]  ">
                        {reponse?.detailsByMonth[1]?.sewerageCharge}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        मीटर सर्विस शुल्क(₹)
                      </th>
                      <td className="border border-[#6666d7]  ">
                        {reponse?.detailsByMonth[0]?.meterServiceCharge}
                      </td>
                      <td className="border border-[#6666d7]  ">
                        {reponse?.detailsByMonth[1]?.meterServiceCharge}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]  text-left text-[#6666d7]">
                        स्थायी शुल्क(₹)
                      </th>
                      <td className="border border-[#6666d7]  ">
                        {reponse?.detailsByMonth[0]?.fixedCharge}
                      </td>
                      <td className="border border-[#6666d7]  ">
                        {reponse?.detailsByMonth[1]?.fixedCharge}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        आधारभूत विकास सरचार्ज(₹)
                      </th>
                      <td className="border border-[#6666d7]  ">
                        {reponse?.detailsByMonth[0]?.idcCharge}
                      </td>
                      <td className="border border-[#6666d7]  ">
                        {reponse?.detailsByMonth[1]?.idcCharge}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        समायोजित उपभोग राशि (₹)
                      </th>
                      <td
                        className="border border-[#6666d7]  "
                        colSpan="2"
                      ></td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        सरकार द्वारा वहन की गई राशि (₹)
                      </th>
                      <td className="border border-[#6666d7] ">
                        {reponse?.detailsByMonth[0]?.rebate_applied}
                      </td>
                      <td className="border border-[#6666d7]  ">
                        {reponse?.detailsByMonth[1]?.rebate_applied}
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        कुल राशि (₹)
                      </th>
                      <td className="border border-[#6666d7]  ">
                        {reponse?.detailsByMonth[0]?.bill}
                      </td>
                      <td className="border border-[#6666d7]  ">
                      {payload[0]?.category.name !=="industrial" &&  payload[0]?.category.name !== "non domestic" ? reponse?.detailsByMonth[0]?.bill:  <td className=" px-4 border-[#6666d7]"></td>}
                      
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        ब्याज/अन्य (₹)
                      </th>
                      <td className="border border-[#6666d7]  ">0</td>
                      <td className="border border-[#6666d7]  "></td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        अप्राप्त राशि (₹)
                      </th>
                      <td className="border border-[#6666d7]  ">0</td>
                      <td className="border border-[#6666d7]  "></td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        नियत तिथि तक कुल देह राशि (₹)
                      </th>
                      <td className="border border-[#6666d7]  ">{reponse?.totalBill}</td>
                      <td className="border border-[#6666d7]  "></td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        विलम्ब भुगतान सरचार्ज (₹)
                      </th>
                      <td className="border border-[#6666d7]  ">{reponse?.lps}</td>
                      <td className="border border-[#6666d7]  "></td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        नियत तिथि पश्चात कुल देह राशि(₹)
                      </th>
                      <td className="border border-[#6666d7]  ">
                        {reponse?.totalBillwithLPS}
                      </td>
                      <td className="border border-[#6666d7]  "></td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                        अंतिम भुगतान तिथि (चैक द्वारा)
                      </th>
                      <td className="border border-[#6666d7]">
                      {new Date(new Date().setDate(new Date().getDate() + 10)).toLocaleDateString('en-GB')}
                        
                      </td>
                      <td className="border border-[#6666d7]  "></td>
                    </tr>
                    <tr>
                      <th className="border border-[#6666d7]  text-left text-[#6666d7]">
                        अंतिम भुगतान तिथि (नकद द्वारा)
                      </th>
                      <td className="border border-[#6666d7]">
                      {new Date(new Date().setDate(new Date().getDate() + 10+7)).toLocaleDateString('en-GB')}

                      </td>

                      <td className="border border-[#6666d7]  "></td>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            <p className=" text-center text-[#6666d7]">
              विगत 6 माह का उपभोग विवरण
            </p>
            <div className="grid grid-cols-6 border border-[#6666d7]">
              <p className="  border-r border-[#6666d7]">माह</p>
              <p className="  border-r border-[#6666d7]"></p>
              <p className="  border-r border-[#6666d7]"></p>
              <p className="  border-r border-[#6666d7]"></p>
              <p className="  border-r border-[#6666d7]"></p>
              <p className="  border-r border-[#6666d7]"></p>
            </div>

            <div className="grid grid-cols-6 border border-[#6666d7]">
              <p className="  border-r border-[#6666d7]">उपभोग</p>
              <p className="  border-r border-[#6666d7]"></p>
              <p className="  border-r border-[#6666d7]"></p>
              <p className="  border-r border-[#6666d7]"></p>
              <p className="  border-r border-[#6666d7]"></p>
              <p className="  border-r border-[#6666d7]"></p>
            </div>

            <div className="mt-4  ">
              <p className=" border-b-2  border-dashed border-indigo-600 font-bold">
                प्रिय उपभोक्ता, अपने पानी के बिल, सब्सिडी एवं अन्य विभागीय
                योजनाओं की समय पर जानकारी के लिए मोबाइल न. पंजीकरण करवायें। अपना
                खाता संख्या/CI न./मोबाइल न. के साथ 9799395111 पर व्हाट्सएप/SMS
                करें या विजिट करें
                <a
                  href="http//jaipurphed.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  http//jaipurphed.in
                </a>
              </p>
            </div>
            <p className=" text-center text-[#6666d7] my-2">
              प्राप्ति पार्श्व (उपभोक्ता)
            </p>

            <div className="grid grid-cols-5 border border-[#6666d7]">
              <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">
                क्रम सं
              </p>
              <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">
                सेवा क्रमांक
              </p>
              <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">
                उपखण्ड संख्या
              </p>
              <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">
                खाता संख्या
              </p>
              <p className="   border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">
                माह
              </p>
            </div>
            <div className="grid grid-cols-5 border border-[#6666d7]">
              <p className="  border-r border-[#6666d7]">1244</p>
              <p className="  border-r border-[#6666d7]">51234</p>
              <p className="  border-r border-[#6666d7]">S2-9              </p>
              <p className="  border-r border-[#6666d7]">	S2-9-95b-12</p>
              <p className="   border-[#6666d7]">{formattedDateCurrent}</p>
            </div>
            <div className="grid grid-cols-3 border border-[#6666d7]">
              <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">
                अंतिम भुगतान तिथि (चैक द्वारा)
              </p>
              <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">
                अंतिम भुगतान तिथि (नगद द्वारा)
              </p>
              <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">
                राशि प्राप्ति की मोहर
              </p>
              {/* <p className="  border-r border-[#6666d7]">नियत तिथि तक कुल देह राशि</p>
          <p className="   border-[#6666d7]">नियत तिथि पश्चात देह राशि</p> */}
            </div>
            <div className="grid grid-cols-3 border border-[#6666d7]">
              <p className="  border-r border-[#6666d7]">   
              {new Date(new Date().setDate(new Date().getDate() + 10)).toLocaleDateString('en-GB')}

                        </p>
              <p className="  border-r border-[#6666d7]">   
              {new Date(new Date().setDate(new Date().getDate() + 10+7)).toLocaleDateString('en-GB')}

                        </p>
              <p className="  border-r border-[#6666d7]"></p>
              {/* <p className="  border-r border-[#6666d7]">नियत तिथि तक कुल देह राशि</p>
          <p className="   border-[#6666d7]">नियत तिथि पश्चात देह राशि</p> */}
            </div>
            <div className="grid grid-cols-3 border border-[#6666d7]">
              <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">
                नियत तिथि तक कुल देह राशि
              </p>
              <p className="  border-r  border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">
                नियत तिथि पश्चात देह राशि
              </p>
              <p className="    border-[#6666d7]"></p>
            </div>
            <div className="grid grid-cols-3 border border-[#6666d7]">
              <p className="  border-r border-[#6666d7]">{reponse?.totalBill}</p>
              <p className="  border-r  border-[#6666d7]">{reponse?.totalBillwithLPS}</p>
              <p className="    border-[#6666d7]"></p>
            </div>
            <div className="grid grid-cols-3 border border-[#6666d7]">
              <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">
                CI क्रमांक
              </p>
              <p className="  border-r  border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">
                कंप्यूटर क्रमांक
              </p>
              <p className="    border-[#6666d7]"></p>
            </div>
            <div className="grid grid-cols-3 border border-[#6666d7]">
              <p className="  border-r border-[#6666d7]"></p>
              <p className="  border-r  border-[#6666d7]">140120613584</p>
              <p className="    border-[#6666d7]"></p>
            </div>
            <div className=" flex justify-between mt-5">
              <p className="text-center text-[#6666d7]">बैंक की मोहर</p>

              <p className="  text-right text-[#6666d7]">प्राधिकृत अधिकारी</p>
            </div>
            <p className="  text-[#6666d7] mt-4">
              {" "}
              <strong className="  text-black-2">नोट :</strong> ई–मित्र /कॉमन
              सर्विस सेंटर (सी. सी.) द्वारा कंप्यूटर से जमा की गई राशि ही मान्य
              है।
            </p>
            <p className="  text-[#6666d7] mt-2">
              ई मित्र पोर्टल ( www.emitra.rajahsthan.gov.in) एवं ई मित्र मोबाइल
              ऐप के माध्यम से ऑनलाइन जमा करवाये जा सकते हैं।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterBill;
