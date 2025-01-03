import React from "react";

const WaterBill = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-2xl p-6 border   rounded-lg shadow-lg bg-white font-sans">
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
                SH A RASHID S/O A BASHIR C-4 SHAHID INDRA JYOTI NA GAR
              </p>
            </div>

            <div className="border-b border-[#6666d7]  ">
              <p>
                <strong className=" text-[#6666d7]">मोबाइल नं./ ई - मेल</strong>
              </p>
              <table className="w-full table-auto border-collapse border border-[#6666d7]  ">
                <tbody>
                  <tr>
                    <td className="border border-[#6666d7]  ">
                      <strong className=" text-[#6666d7]">खाता संख्या</strong>
                    </td>
                    <td className="border border-[#6666d7]  ">09D-06-002</td>
                    <td className="border border-[#6666d7]  ">
                      <strong className=" text-[#6666d7]">उपखण्ड संख्या</strong>
                    </td>
                    <td className="border border-[#6666d7]  ">N1-05</td>
                  </tr>
                  <tr>
                    <td className="border border-[#6666d7]  ">
                      <strong className=" text-[#6666d7]">बिल क्रमांक</strong>
                    </td>
                    <td className="border border-[#6666d7]  ">1244</td>
                    <td className="border border-[#6666d7]  ">
                      <strong className=" text-[#6666d7]">सेवा क्रमांक</strong>
                    </td>
                    <td className="border border-[#6666d7]  ">51234</td>
                  </tr>
                  <tr>
                    <td className="border border-[#6666d7]  ">
                      <strong className=" text-[#6666d7]">
                        मीटर की स्थिति/ मालिक
                      </strong>
                    </td>
                    <td className="border border-[#6666d7]  ">MD/GOV</td>
                    <td className="border border-[#6666d7]  ">
                      <strong className=" text-[#6666d7]">मीटर क्रमांक</strong>
                    </td>
                    <td className="border border-[#6666d7]  ">83041/727</td>
                  </tr>
                  <tr>
                    <td className="border border-[#6666d7]  ">
                      <strong className=" text-[#6666d7]">
                        उपभोक्ता श्रेणी
                      </strong>
                    </td>
                    <td className="border border-[#6666d7]  ">Domestic</td>
                    <td className="border border-[#6666d7]  ">
                      <strong className=" text-[#6666d7]">बिलिंग माह</strong>
                    </td>
                    <td className="border border-[#6666d7]  ">JUL 24</td>
                  </tr>
                  <tr>
                    <td className="border border-[#6666d7]  ">
                      <strong className=" text-[#6666d7]">
                        कनेक्शन का व्यास/ परिणाम
                      </strong>
                    </td>
                    <td className="border border-[#6666d7]  ">1/2</td>
                    <td className="border border-[#6666d7]  ">
                      <strong className=" text-[#6666d7]">
                        बिल जारी करने की तिथि
                      </strong>
                    </td>
                    <td className="border border-[#6666d7]  ">15/07/24</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-b border-[#6666d7] ">
            <p>
              <strong className=" text-[#6666d7]">मासिक जल उपभोग विवरण</strong>
            </p>
            <table className="w-full table-auto border-collapse border border-[#6666d7]  mt-2">
              <thead>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    बिल माह
                  </th>
                  <th className="border border-[#6666d7]   text-left">
                    JAN 24
                  </th>
                  <th className="border border-[#6666d7]   text-left">
                    FEB 24
                  </th>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    वर्तमान पठन तिथि
                  </th>
                  <td className="border border-[#6666d7]  ">28/01/2023</td>
                  <td className="border border-[#6666d7]  ">28/02/24</td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    मीटर पठन
                  </th>
                  <td className="border border-[#6666d7]  ">214000MD</td>
                  <td className="border border-[#6666d7]  ">214000MD</td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    गत पठन
                  </th>
                  <td className="border border-[#6666d7]  ">214000</td>
                  <td className="border border-[#6666d7]  ">214000MD</td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    कुल जल उपभोग
                  </th>
                  <td className="border border-[#6666d7]  ">20880</td>
                  <td className="border border-[#6666d7]  ">20880</td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    कुल जल उपभोग राशि(₹)
                  </th>
                  <td className="border border-[#6666d7]  ">55.00</td>
                  <td className="border border-[#6666d7]  ">55.00</td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    सीवरेज शुल्क(₹)
                  </th>
                  <td className="border border-[#6666d7]  ">18.15</td>
                  <td className="border border-[#6666d7]  ">18.15</td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    मीटर सर्विस शुल्क(₹)
                  </th>
                  <td className="border border-[#6666d7]  ">22.00</td>
                  <td className="border border-[#6666d7]  ">22.00</td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]  text-left text-[#6666d7]">
                    स्थायी शुल्क(₹)
                  </th>
                  <td className="border border-[#6666d7]  ">27.50</td>
                  <td className="border border-[#6666d7]  ">27.50</td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    आधारभूत विकास सरचार्ज(₹)
                  </th>
                  <td className="border border-[#6666d7]  ">30.66</td>
                  <td className="border border-[#6666d7]  ">30.66</td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    समायोजित उपभोग राशि (₹)
                  </th>
                  <td className="border border-[#6666d7]  " colSpan="2"></td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    सरकार द्वारा वहन की गई राशि (₹)
                  </th>
                  <td className="border border-[#6666d7]  " colSpan="2"></td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    कुल राशि (₹)
                  </th>
                  <td className="border border-[#6666d7]  ">153.31</td>
                  <td className="border border-[#6666d7]  ">153.31</td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    ब्याज/अन्य (₹)
                  </th>
                  <td className="border border-[#6666d7]  ">207.38</td>
                  <td className="border border-[#6666d7]  "></td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    अप्राप्त राशि (₹)
                  </th>
                  <td className="border border-[#6666d7]  ">7460.00</td>
                  <td className="border border-[#6666d7]  "></td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    नियत तिथि तक कुल देह राशि (₹)
                  </th>
                  <td className="border border-[#6666d7]  ">7974</td>
                  <td className="border border-[#6666d7]  "></td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    विलम्ब भुगतान सरचार्ज (₹)
                  </th>
                  <td className="border border-[#6666d7]  ">51</td>
                  <td className="border border-[#6666d7]  "></td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    नियत तिथि पश्चात कुल देह राशि(₹)
                  </th>
                  <td className="border border-[#6666d7]  ">8025</td>
                  <td className="border border-[#6666d7]  "></td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]   text-left text-[#6666d7]">
                    अंतिम भुगतान तिथि (चैक द्वारा)
                  </th>
                  <td className="border border-[#6666d7]  ">02/08/2024</td>
                  <td className="border border-[#6666d7]  "></td>
                </tr>
                <tr>
                  <th className="border border-[#6666d7]  text-left text-[#6666d7]">
                    अंतिम भुगतान तिथि (नकद द्वारा)
                  </th>
                  <td className="border border-[#6666d7]  ">05/08/2024</td>
                  <td className="border border-[#6666d7]  "></td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <p className=" text-center text-[#6666d7]">विगत 6 माह का उपभोग विवरण</p>
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
            प्रिय उपभोक्ता, अपने पानी के बिल, सब्सिडी एवं अन्य विभागीय योजनाओं
            की समय पर जानकारी के लिए मोबाइल न. पंजीकरण करवायें। अपना खाता
            संख्या/CI न./मोबाइल न. के साथ 9799395111 पर व्हाट्सएप/SMS करें या
            विजिट करें
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
          <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">क्रम सं</p>
          <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">सेवा क्रमांक</p>
          <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">उपखण्ड संख्या</p>
          <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">खाता संख्या</p>
          <p className="   border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">माह</p>
        </div>
        <div className="grid grid-cols-5 border border-[#6666d7]">
          <p className="  border-r border-[#6666d7]">1244</p>
          <p className="  border-r border-[#6666d7]">51234</p>
          <p className="  border-r border-[#6666d7]">N1-05</p>
          <p className="  border-r border-[#6666d7]">09D-06-002</p>
          <p className="   border-[#6666d7]">JUL 24</p>
        </div>
        <div className="grid grid-cols-3 border border-[#6666d7]"> 
          <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">अंतिम भुगतान तिथि (चैक द्वारा)</p>
          <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">अंतिम भुगतान तिथि (नगद द्वारा)</p>
          <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">राशि प्राप्ति की मोहर</p>
          {/* <p className="  border-r border-[#6666d7]">नियत तिथि तक कुल देह राशि</p>
          <p className="   border-[#6666d7]">नियत तिथि पश्चात देह राशि</p> */}
        </div>
        <div className="grid grid-cols-3 border border-[#6666d7]">
          <p className="  border-r border-[#6666d7]">02/08/2024</p>
          <p className="  border-r border-[#6666d7]">05/08/2024</p>
          <p className="  border-r border-[#6666d7]"></p>
          {/* <p className="  border-r border-[#6666d7]">नियत तिथि तक कुल देह राशि</p>
          <p className="   border-[#6666d7]">नियत तिथि पश्चात देह राशि</p> */}
        </div>
        <div className="grid grid-cols-3 border border-[#6666d7]">
          <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">नियत तिथि तक कुल देह राशि</p>
          <p className="  border-r  border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">नियत तिथि पश्चात देह राशि</p>
          <p className="    border-[#6666d7]"></p>

        </div>
        <div className="grid grid-cols-3 border border-[#6666d7]">
          <p className="  border-r border-[#6666d7]">7974</p>
          <p className="  border-r  border-[#6666d7]">8025</p>
          <p className="    border-[#6666d7]"></p>

        </div>
        <div className="grid grid-cols-3 border border-[#6666d7]">
          <p className="  border-r border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">CI क्रमांक</p>
          <p className="  border-r  border-[#6666d7] text-[#6666d7] bg-[#cacaee]  font-bold">कंप्यूटर क्रमांक</p>
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
        <p className="  text-[#6666d7] mt-4"> <strong className="  text-black-2">नोट :</strong> ई–मित्र /कॉमन सर्विस सेंटर (सी. सी.) द्वारा कंप्यूटर से जमा की गई राशि ही मान्य है।</p>
        <p  className="  text-[#6666d7] mt-2">ई मित्र पोर्टल ( www.emitra.rajahsthan.gov.in) एवं ई मित्र मोबाइल ऐप के माध्यम से ऑनलाइन जमा करवाये जा सकते हैं।</p>
      </div>
    </div>
  );
};

export default WaterBill;
