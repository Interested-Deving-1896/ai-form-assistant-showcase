  // Helper: show/hide start date for basic licence durations
  const basicDurationEl = document.getElementById('basicDuration');
  const basicStartWrap = document.getElementById('basicStartDateWrap');
  const ageClassEl = document.getElementById('ageClass');
  const youthNote = document.getElementById('youthNote');

  function updateBasicDurationUI() {
    const v = basicDurationEl.value;
    basicStartWrap.classList.toggle('hidden', !(v === '1day' || v === '8day'));
  }
  function updateYouthUI() {
    const v = ageClassEl.value;
    youthNote.classList.toggle('hidden', v !== 'youth');
  }
  basicDurationEl.addEventListener('change', updateBasicDurationUI);
  ageClassEl.addEventListener('change', updateYouthUI);
  updateBasicDurationUI();
  updateYouthUI();

  // Sturgeon start date visibility
  const sturgeonOpt = document.getElementById('sturgeonOpt');
  const sturgeonDateWrap = document.getElementById('sturgeonDateWrap');
  function updateSturgeonUI() {
    const v = sturgeonOpt.value;
    sturgeonDateWrap.classList.toggle('hidden', !(v === '1day' || v === '8day'));
  }
  sturgeonOpt.addEventListener('change', updateSturgeonUI);
  updateSturgeonUI();

  // Classified waters details toggle
  const cwRequired = document.getElementById('cwRequired');
  const cwDetails = document.getElementById('cwDetails');
  function updateCWUI() {
    cwDetails.classList.toggle('hidden', cwRequired.value !== 'yes');
  }
  cwRequired.addEventListener('change', updateCWUI);
  updateCWUI();

  // Basic client-side “save” (prevent submission) and JSON download
  document.getElementById('licenceForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form captured. Use “Download as JSON” to export a data file.');
  });

  document.getElementById('downloadJson').addEventListener('click', () => {
    const form = document.getElementById('licenceForm');
    const fd = new FormData(form);
    const obj = {};
    for (const [k, v] of fd.entries()) {
      if (obj[k]) {
        // handle multi-select/checkbox groups
        if (!Array.isArray(obj[k])) obj[k] = [obj[k]];
        obj[k].push(v);
      } else {
        obj[k] = v;
      }
    }
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'bc-freshwater-elicensing-data.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });