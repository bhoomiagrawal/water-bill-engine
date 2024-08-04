// components/FirstUI.js

import { useState } from 'react';
import ReadExcel from './ReadExcel';

export default function FirstUI() {
  const [usage, setUsage] = useState('');
  const [bill, setBill] = useState(null);

  const handleCalculate = () => {
    const ratePerUnit = 1.5; // Define the rate per unit of water
    const calculatedBill = usage * ratePerUnit;
    setBill(calculatedBill);
  };

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          alt=""
          src="/water-1560478_1280.png"
          style={{opacity: '0.6'}}
          // src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className=" absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        {/* <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl -mt-20">Work with us</h2> */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white -mt-20">Water billing system</h2>
      <ReadExcel />

          {/* <p className="mt-6 text-lg leading-8 text-gray-300">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
            fugiat veniam occaecat fugiat aliqua.
          </p> */}
        </div>
        {/* <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div> */}
      </div>

      </div>
      <div>
      <footer style={{textAlig:'center',padding:'10px',
        backgroundColor:'#f0f8ff',
        color:'#007acc'}}>
        <p>&copy; {new Date().getFullYear()} Water Billing Co.</p>
      </footer>
      </div>

    {/* <div style={styles.formContainer}>
      <h2>Calculate Your Water Bill</h2>
      <div style={styles.inputContainer}>
        <label htmlFor="usage">Enter Water Usage (in cubic meters): </label>
        <input
          type="number"
          id="usage"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleCalculate} style={styles.button}>Calculate Bill</button>

      {bill !== null && (
        <div style={styles.result}>
          <h3>Your Estimated Bill:</h3>
          <p>${bill.toFixed(2)}</p>
        </div>
      )}
    </div> */}
    </>
  );
}

const styles = {
  formContainer: {
    backgroundColor: '#f0f8ff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007acc',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  result: {
    marginTop: '20px',
    fontSize: '18px',
  },
};