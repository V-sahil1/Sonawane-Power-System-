import { useState, useEffect } from 'react'
import './index.css'

const DEFAULT_BOM = [
  {mat:'Solar Module', spec:'540-550 Watt', make:'Goldi', warranty:'30 Years'},
  {mat:'Inverter', spec:'IEC/BIS/MNRE Approved', make:'V Sole / Solaryaan / PV Blink', warranty:'10 Years'},
  {mat:'Structure', spec:'14 Gauge Hot Dip GI (IS 4759). Purlin 40×60. Rafter 60×80.', make:'Standard', warranty:'Standard'},
  {mat:'AC Cable', spec:'IEC Approved, Copper', make:'Polycab', warranty:'Standard'},
  {mat:'DC Cable 2.5 sq mm', spec:'IEC Approved, Copper', make:'Polycab', warranty:'Standard'},
  {mat:'MCB', spec:'IEC Approved', make:'L&T / C&S / Phoienix', warranty:'Standard'},
  {mat:'ACDB & DCDB', spec:'IEC Approved', make:'L&T', warranty:'Standard'},
  {mat:'PVC Pipe', spec:'IEC Approved', make:'Reputed', warranty:'Standard'},
  {mat:'Copper Earthing Kit (250+ Micron)', spec:'IEC Approved', make:'Reputed', warranty:'Standard'},
  {mat:'J Bolt', spec:'Stainless Steel', make:'Reputed', warranty:'Standard'},
  {mat:'Cable Tie', spec:'IEC Approved', make:'Steel & Plastic', warranty:'Standard'},
];

const LOGO_BASE64 = "data:image/png;base64,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";

const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export default function App() {
  const [tab, setTab] = useState('form');
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    addr: '',
    city: ''
  });
  const [errors, setErrors] = useState({
    phone: '',
    email: ''
  });
  const [system, setSystem] = useState({
    qNum: 'QT-001',
    date: new Date().toISOString().slice(0, 10),
    kw: 3.30,
    type: 'On-grid',
    price: 207000,
    subsidy: 78000,
    factor: 120
  });
  const [bom, setBom] = useState(DEFAULT_BOM);
  const [terms, setTerms] = useState(`1. All prices are inclusive of installation & commissioning.
2. Subsidy amount is subject to government approval.
3. Work will commence after advance payment.
4. Any civil/structural work will be charged extra if required.
5. Payment: 50% advance, 40% before delivery, 10% after installation.`);
  const [notes, setNotes] = useState(`• Solar Module: 30 years performance warranty
• Inverter: 10 years warranty
• Structure & Cables: Standard warranty
• Subsidy assistance provided by SPS
• Installation & commissioning included`);

  const dailyGen = (system.kw * 4).toFixed(1);
  const monthlyGen = Math.round(system.kw * system.factor);
  const netAmount = system.price - system.subsidy;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    // Basic validation for 10-digit Indian numbers or international format
    const re = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    return re.test(phone.replace(/\s/g, ''));
  };

  const handleCustomerChange = (e) => {
    const { id, value } = e.target;
    setCustomer(prev => ({ ...prev, [id]: value }));
    
    // Immediate validation
    if (id === 'email') {
      setErrors(prev => ({ ...prev, email: value && !validateEmail(value) ? 'Invalid email format' : '' }));
    }
    if (id === 'phone') {
      setErrors(prev => ({ ...prev, phone: value && !validatePhone(value) ? 'Invalid phone number' : '' }));
    }
  };

  const handleSystemChange = (e) => {
    const { id, value } = e.target;
    setSystem(prev => ({ ...prev, [id]: id === 'type' || id === 'qNum' || id === 'date' ? value : parseFloat(value) || 0 }));
  };

  const updateBom = (index, field, value) => {
    const newBom = [...bom];
    newBom[index][field] = value;
    setBom(newBom);
  };

  const addBomRow = () => {
    setBom([...bom, { mat: '', spec: '', make: '', warranty: 'Standard' }]);
  };

  const deleteBomRow = (index) => {
    setBom(bom.filter((_, i) => i !== index));
  };

  const printQ = () => {
    // Set document title for filename (e.g., "SPS_Quotation_John_Doe")
    const originalTitle = document.title;
    const cleanName = (customer.name || 'Customer').trim().replace(/\s+/g, '_');
    document.title = `SPS_Quotation_${cleanName}`;

    // If we're on form tab, switch to preview first
    if (tab === 'form') {
      setTab('preview');
      // Wait for re-render then print
      setTimeout(() => {
        window.print();
        document.title = originalTitle;
      }, 100);
    } else {
      window.print();
      document.title = originalTitle;
    }
  };

  const renderForm = () => (
    <div id="form-tab" className="no-print">
      <div className="card">
        <div className="card-title">👤 Customer Details</div>
        <div className="g3">
          <div className="field">
            <label>Customer Name *</label>
            <input id="name" value={customer.name} onChange={handleCustomerChange} placeholder="e.g. Ramesh Patel" />
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input id="phone" className={errors.phone ? 'error' : ''} value={customer.phone} onChange={handleCustomerChange} placeholder="+91 98765 43210" />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
          <div className="field">
            <label>Email Address</label>
            <input id="email" className={errors.email ? 'error' : ''} value={customer.email} onChange={handleCustomerChange} placeholder="customer@email.com" />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>
        <div className="g2" style={{ marginTop: '12px' }}>
          <div className="field"><label>Installation Address</label><input id="addr" value={customer.addr} onChange={handleCustomerChange} placeholder="House No, Street, Area" /></div>
          <div className="field"><label>City / District</label><input id="city" value={customer.city} onChange={handleCustomerChange} placeholder="e.g. Surat, Gujarat" /></div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">⚡ System Specifications & Pricing</div>
        <div className="g4">
          <div className="field"><label>Quotation Number</label><input id="qNum" value={system.qNum} onChange={handleSystemChange} /></div>
          <div className="field"><label>Date</label><input id="date" type="date" value={system.date} onChange={handleSystemChange} /></div>
          <div className="field"><label>System Capacity (kWp)</label><input id="kw" type="number" value={system.kw} step="0.1" onChange={handleSystemChange} /></div>
          <div className="field"><label>System Type</label>
            <select id="type" value={system.type} onChange={handleSystemChange}>
              <option>On-grid</option><option>Off-grid</option><option>Hybrid</option>
            </select>
          </div>
        </div>

        <div className="g3" style={{ marginTop: '12px' }}>
          <div className="field"><label>Total System Price (₹)</label><input id="price" type="number" value={system.price} onChange={handleSystemChange} /></div>
          <div className="field"><label>Government Subsidy (₹)</label><input id="subsidy" type="number" value={system.subsidy} onChange={handleSystemChange} /></div>
          <div className="field"><label>Unit Generation Factor</label><input id="factor" type="number" value={system.factor} onChange={handleSystemChange} /></div>
        </div>
        <div className="totals-box">
          <div className="trow"><span>Total System Price</span><span>{fmt(system.price)}</span></div>
          <div className="trow subsidy"><span>(-) Government Subsidy</span><span>{fmt(system.subsidy)}</span></div>
          <div className="trow grand"><span>Net Amount After Subsidy</span><span>{fmt(netAmount)}</span></div>
          <div className="trow gen"><span>⚡ Daily Generation</span><span>{dailyGen} units/day</span></div>
          <div className="trow gen"><span>⚡ Monthly Generation</span><span>{monthlyGen} units/month</span></div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">📦 Bill of Materials</div>
        <div style={{ overflowX: 'auto' }}>
          <table className="bom-table">
            <thead>
              <tr>
                <th style={{ width: '4%' }}>#</th>
                <th style={{ width: '20%' }}>Material Name</th>
                <th style={{ width: '30%' }}>Specifications</th>
                <th style={{ width: '22%' }}>Make / Brand</th>
                <th style={{ width: '14%' }}>Warranty</th>
                <th style={{ width: '6%' }}></th>
              </tr>
            </thead>
            <tbody>
              {bom.map((r, i) => (
                <tr key={i}>
                  <td style={{ textAlign: 'center', fontSize: '11px', color: '#888' }}>{i + 1}</td>
                  <td><input value={r.mat} onChange={(e) => updateBom(i, 'mat', e.target.value)} placeholder="Material name" /></td>
                  <td><input value={r.spec} onChange={(e) => updateBom(i, 'spec', e.target.value)} placeholder="Specifications" /></td>
                  <td><input value={r.make} onChange={(e) => updateBom(i, 'make', e.target.value)} placeholder="Brand / Make" /></td>
                  <td>
                    <select value={r.warranty} onChange={(e) => updateBom(i, 'warranty', e.target.value)}>
                      {['Standard', '30 Years', '25 Years', '10 Years', '5 Years', '1 Year'].map(w => <option key={w}>{w}</option>)}
                    </select>
                  </td>
                  <td><button className="btn-del" onClick={() => deleteBomRow(i)}>×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="add-row" onClick={addBomRow}>+ Add Material Row</button>
      </div>

      <div className="card">
        <div className="card-title">📋 Terms, Warranty & Notes</div>
        <div className="g2">
          <div className="field"><label>Terms & Conditions</label>
            <textarea value={terms} onChange={(e) => setTerms(e.target.value)} />
          </div>
          <div className="field"><label>Warranty & Remarks</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-blue" onClick={() => setTab('preview')}>👁️ Preview Quotation</button>
        <button className="btn btn-orange" onClick={printQ}>🖨️ Print / Save as PDF</button>
      </div>
    </div>
  );

  const renderPreview = () => {
    const fdate = new Date(system.date + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    
    return (
      <div id="preview-tab">
        <div className="actions no-print" style={{ marginBottom: '14px', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <button className="btn" onClick={() => setTab('form')}>← Back to Edit</button>
          <button className="btn btn-orange" onClick={printQ}>🖨️ Print / Save as PDF</button>
          <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '7px', padding: '7px 13px', fontSize: '12px', color: '#856404' }}>
            💡 <strong>Tip:</strong> In the print dialog → <strong>More settings</strong> → set <strong>Headers and footers = OFF</strong> &amp; <strong>Background graphics = ON</strong>
          </div>
        </div>
        
        <div className="paper">
          <div className="ph">
            <div className="ph-left">
              <img src={LOGO_BASE64} style={{ width: '62px', height: '62px', borderRadius: '50%', objectFit: 'cover', background: '#fff', border: '3px solid #f0a500', flexShrink: 0 }} alt="SPS Logo" />
              <div>
                <div className="ph-company">Sonawane Power System<small>Solar Energy Solutions</small><small style={{ display: 'block', fontSize: '9px', fontWeight: 400, opacity: .9, letterSpacing: '.5px', color: '#fcd34d', marginTop: '2px' }}>✔ Authorised Licensed Electrical Contractor</small></div>
                <div className="ph-phone">✉ prakashsonawane112@gmail.com</div>
                <div style={{ fontSize: '10px', opacity: .8, marginTop: '3px' }}>📍 Hated BK, Taluka Chopda, Dist. Jalgaon, Maharashtra | 📞 8780836181</div>
                <div style={{ fontSize: '10px', opacity: .8, marginTop: '2px' }}>📍 Jay Laxmi Sales Agency, 272 Ambika Park-2, Dindoli, Surat, Gujarat | 📞 9824063616</div>
              </div>
            </div>
            <div className="ph-right">
              <div className="ph-quot-title">QUOTATION</div>
              <div className="ph-quot-sub">No: {system.qNum} &nbsp;|&nbsp; Date: {fdate}</div>
              <div className="ph-tagline">"Solar energy – Today's resource for a brighter tomorrow!"</div>
            </div>
          </div>

          <div style={{ background: '#f0a500', color: '#1a3a6b', textAlign: 'center', padding: '5px 16px', fontSize: '11px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>
            ✔ Authorised Licensed Electrical Contractor &nbsp;|&nbsp; Solar Rooftop System Installer
          </div>
          
          <div className="pb">
            <div className="pmeta">
              <div className="pmeta-block"><p>Customer Name</p><strong>{customer.name || '—'}</strong></div>
              <div className="pmeta-block"><p>Phone Number</p><strong>{customer.phone || '—'}</strong></div>
              <div className="pmeta-block"><p>Email Address</p><strong>{customer.email || '—'}</strong></div>
              <div className="pmeta-block"><p>City / District</p><strong>{customer.city || '—'}</strong></div>
              <div className="pmeta-block" style={{ gridColumn: 'span 2' }}><p>Installation Address</p><strong>{customer.addr || '—'}</strong></div>
            </div>

            <div className="pintro">
              Dear Sir/Madam,<br />
              We are pleased to submit our quotation for a <strong>{system.type} {system.kw} kWp Solar Rooftop Power System</strong> for your Residential / Commercial premises. As per our discussion, we will supply, install and commission a complete Green Energy System.
            </div>

            <div className="pprices">
              <div className="pbox total">
                <div className="plabel">Total System Price</div>
                <div className="pamount">{fmt(system.price)}</div>
              </div>
              <div className="pbox subsidy">
                <div className="plabel">Government Subsidy</div>
                <div className="pamount">{fmt(system.subsidy)}</div>
              </div>
              <div className="pbox net">
                <div className="plabel">Net Amount After Subsidy</div>
                <div className="pamount">{fmt(netAmount)}</div>
              </div>
            </div>

            <div className="psection-head">— Bill of Materials —</div>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table className="p-bom">
                <thead>
                  <tr>
                    <th style={{ width: '4%', textAlign: 'center' }}>Sr.</th>
                    <th style={{ width: '20%' }}>Material Name</th>
                    <th style={{ width: '32%' }}>Specifications</th>
                    <th style={{ width: '26%' }}>Make / Brand</th>
                    <th style={{ width: '18%', textAlign: 'center' }}>Warranty</th>
                  </tr>
                </thead>
                <tbody>
                  {bom.map((r, i) => (
                    <tr key={i}>
                      <td style={{ textAlign: 'center', fontWeight: 600 }}>{i + 1}</td>
                      <td><strong>{r.mat}</strong></td>
                      <td>{r.spec}</td>
                      <td>{r.make}</td>
                      <td style={{ textAlign: 'center' }}>{r.warranty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pgen">
              ⚡ Average {system.kw} kW System Generation: <strong>{dailyGen} Units/Day</strong> &nbsp;|&nbsp; {system.kw} × {system.factor} = <strong>{monthlyGen} Units/Month</strong>
            </div>

            {notes && (
              <>
                <div className="pterms-title">Warranty & Remarks</div>
                <div className="pterms">{notes}</div>
              </>
            )}
            {terms && (
              <>
                <div className="pterms-title">Terms & Conditions</div>
                <div className="pterms">{terms}</div>
              </>
            )}
          </div>

          <div className="stamp-area">Authorised Signatory: ___________________________</div>

          <div className="pfooter">
            <div>
              <div style={{ fontWeight: 700, fontSize: '13px' }}>Sonawane Power System</div>
              <div style={{ opacity: .85, fontSize: '11px', marginTop: '2px' }}>Authorised Licensed Electrical Contractor</div>
              <div style={{ opacity: .65, fontSize: '10px', marginTop: '1px' }}>& Solar Installer</div>
            </div>
            <div className="pfooter-center">✦ THANK YOU ✦</div>
            <div className="pfooter-right">
              <div className="name">Prakash Sonawane</div>
              <div className="phone">+91 8780836181</div><div className="phone">prakashsonawane112@gmail.com</div>
            </div>
          </div>
        </div>

        <div className="actions no-print" style={{ marginTop: '14px' }}>
          <button className="btn" onClick={() => setTab('form')}>← Back to Edit</button>
          <button className="btn btn-orange" onClick={printQ}>🖨️ Print / Save as PDF</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="topbar no-print">
        <img src={LOGO_BASE64} style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', background: '#fff', flexShrink: 0 }} alt="SPS Logo" />
        <div>
          <h1>SPS Solar Quotation Generator</h1>
          <p>Sonawane Power System &nbsp;|&nbsp; prakashsonawane112@gmail.com &nbsp;|&nbsp; +91 8780836181 / 9824063616</p>
        </div>
        <div className="topbar-right">Version 1.1<br />React.js Version</div>
      </div>

      <div className="container">
        <div className="tabs no-print">
          <button className={`tab ${tab === 'form' ? 'active' : ''}`} onClick={() => setTab('form')}>✏️ Edit Details</button>
          <button className={`tab ${tab === 'preview' ? 'active' : ''}`} onClick={() => setTab('preview')}>👁️ Preview Quotation</button>
        </div>

        {tab === 'form' ? renderForm() : renderPreview()}
      </div>
    </div>
  );
}

