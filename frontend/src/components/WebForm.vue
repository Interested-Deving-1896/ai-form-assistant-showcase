<script setup>
import { ref, computed } from 'vue';
import { Panel } from '@/lib/primevue';
import formDefinition from '@/assets/aifa/formDefinition.json';
import promptTemplate from '@/assets/aifa/promptTemplate.txt?raw';

// ----- Form Data -----
const formData = ref({
  dob: '',
  wid: '',
  residency: '',
  licenceDuration: '',
  seniorRate: false,
  disabilityReduction: false,
  coeNumber: '',
  location: '',
  classifiedWaters: false,
  classifiedWaterName: '',
  surcharge: []
});

// Residency options
const residencyOptions = [
  { label: 'BC Resident', value: 'resident' },
  { label: 'Non-Resident (Canadian)', value: 'non-resident' },
  { label: 'Non-Resident Alien (non-Canadian)', value: 'alien' }
];

// Licence duration options
const licenceDurationOptions = [
  { label: 'One-Day', value: 'one-day' },
  { label: 'Eight-Day', value: 'eight-day' },
  { label: 'Annual (Apr 1 - Mar 31)', value: 'annual' }
];

// Location options (9 regions)
const locationOptions = [
  { label: 'Region 1 - Vancouver Island (includes Haida Gwaii: WMU 6-12, 6-13)', value: 'region1' },
  { label: 'Region 2 - Lower Mainland', value: 'region2' },
  { label: 'Region 3 - Thompson', value: 'region3' },
  { label: 'Region 4 - Kootenay', value: 'region4' },
  { label: 'Region 5 - Cariboo', value: 'region5' },
  { label: 'Region 6 - Skeena', value: 'region6' },
  { label: 'Region 7A - Omineca', value: 'region7a' },
  { label: 'Region 7B - Peace', value: 'region7b' },
  { label: 'Region 8 - Okanagan', value: 'region8' }
];

// Conservation surcharge options
const surchargeOptions = [
  { label: 'Steelhead', value: 'steelhead' },
  { label: 'Non-Tidal Salmon', value: 'salmon' },
  { label: 'Kootenay/Shuswap Rainbow Trout or Char', value: 'rainbow-char' },
  { label: 'White Sturgeon Conservation Licence', value: 'sturgeon' }
];

// ----- Calculated Price -----
const calculatedPrice = computed(() => {
  return (0.0).toFixed(2);
});

/*
// Classified Waters Licence fees
// const classifiedWatersFees = {
//   resident: 17.15,
//   'non-resident': 45.72,
//   alien: 45.72
// };

// // Conservation Surcharge stamp fees (resident / non-resident rates)
// const surchargeFees = {
//   steelhead: { resident: 28.57, nonResident: 68.57 },
//   salmon: { resident: 17.14, nonResident: 34.29 },
//   'rainbow-char': { resident: 11.43, nonResident: 22.86 },
//   sturgeon: { resident: 28.57, nonResident: 68.58 }
// };

// // Base licence fees by residency and duration
// const licenceFees = {
//   resident: { 'one-day': 11.43, 'eight-day': 22.86, annual: 41.15 },
//   'non-resident': { 'one-day': 22.86, 'eight-day': 41.15, annual: 62.87 },
//   alien: { 'one-day': 22.86, 'eight-day': 57.14, annual: 91.44 }
// };

// const calculatedPrice = computed(() => {
//   const { residency, licenceDuration, seniorRate, disabilityReduction, classifiedWaters, surcharge } = formData.value;

//   if (!residency || !licenceDuration) {
//     return null;
//   }

//   let total = licenceFees[residency][licenceDuration];

//   if (residency === 'resident' && licenceDuration === 'annual') {
//     if (disabilityReduction) {
//       total = 1.14;
//     } else if (seniorRate) {
//       total = 5.71;
//     }
//   }

//   if (classifiedWaters) {
//     total += classifiedWatersFees[residency];
//   }

//   const surchargeRate = residency === 'resident' ? 'resident' : 'nonResident';
//   surcharge.forEach((stamp) => {
//     total += surchargeFees[stamp][surchargeRate];
//   });

//   return total.toFixed(2);
// });
*/
// ----- Actions -----

const submitForm = () => {
  console.log('Form submitted:', formData.value);
  // Add your form submission logic here
};

const resetForm = () => {
  formData.value = {
    dob: '',
    wid: '',
    licenceDuration: '',
    seniorRate: false,
    disabilityReduction: false,
    coeNumber: '',
    residency: '',
    location: '',
    classifiedWaters: false,
    classifiedWaterName: '',
    surcharge: []
  };
};
</script>
<template>
  <div class="grid">
    <div class="col col-6 form-container">
      <h1 class="m-0">Start Fishing!</h1>
      <p>The following webform will help you apply for a fresh water fishing licence in British Columbia.</p>
      <form
        name="fishing-licence-form"
        @submit.prevent="submitForm"
      >
        <!-- Applicant Information -->
        <fieldset>
          <legend>Applicant Information</legend>
          <div
            v-tooltip="{ value: 'Ask the Assistant' }"
            data-id="dob"
            class="helpLink"
          />

          <label for="dob">Date of Birth</label>
          <input
            id="dob"
            v-model="formData.dob"
            type="date"
            data-id="dob"
            class="w-full mb-4"
            required
          />
          <!-- Residency Status -->

          <div class="form-group mb-4">
            <label for="residency">Residency Status</label>
            <div
              v-tooltip="{ value: 'Ask the Assistant' }"
              data-id="residency"
              class="helpLink"
            />
            <div
              v-for="option in residencyOptions"
              :key="option.value"
              class="radio-option"
            >
              <input
                :id="'residency_' + option.value"
                v-model="formData.residency"
                type="radio"
                :value="option.value"
                data-id="residency"
              />
              <label
                :for="'residency_' + option.value"
                class="ml-2"
              >
                {{ option.label }}
              </label>
            </div>
          </div>

          <label for="wid">Fish and Wildlife ID (WID)</label>
          <small>Leave blank if you need to register for a new WID.</small>
          <input
            id="wid"
            v-model="formData.wid"
            type="text"
            data-id="wid"
            class="w-full"
          />
        </fieldset>

        <!-- Licence Type -->
        <fieldset>
          <legend>Licence Type</legend>
          <div
            v-tooltip="{ value: 'Ask the Assistant' }"
            data-id="licenceDuration"
            class="helpLink"
          />
          <label for="licenceDuration">Duration</label>
          <select
            id="licenceDuration"
            v-model="formData.licenceDuration"
            data-id="licenceDuration"
            class="w-full mb-2"
          >
            <option value="">please select</option>
            <option
              v-for="option in licenceDurationOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>

          <div class="checkbox-option">
            <input
              id="seniorRate"
              v-model="formData.seniorRate"
              type="checkbox"
              data-id="seniorRate"
            />
            <label
              for="seniorRate"
              class="ml-2"
            >
              I am 65 or older (resident annual rate)
            </label>
          </div>

          <div class="checkbox-option">
            <input
              id="disabilityReduction"
              v-model="formData.disabilityReduction"
              type="checkbox"
              data-id="disabilityReduction"
            />
            <label
              for="disabilityReduction"
              class="ml-2"
            >
              I hold a Certificate of Eligibility for the fee reduction program (severe and permanent disability)
            </label>
          </div>

          <template v-if="formData.disabilityReduction">
            <label for="coeNumber">Certificate of Eligibility Number</label>
            <input
              id="coeNumber"
              v-model="formData.coeNumber"
              type="text"
              data-id="coeNumber"
              class="w-full"
            />
          </template>
        </fieldset>

        <!-- Fishing Region -->
        <fieldset>
          <legend>Fishing Region</legend>
          <div
            v-tooltip="{ value: 'Ask the Assistant' }"
            data-id="location"
            class="helpLink"
          />
          <select
            v-model="formData.location"
            data-id="location"
            class="w-full"
          >
            <option value="">please select</option>
            <option
              v-for="option in locationOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </fieldset>

        <!-- Classified Waters Licence -->
        <fieldset>
          <legend>Classified Waters Licence (optional)</legend>
          <div
            v-tooltip="{ value: 'Ask the Assistant' }"
            data-id="classifiedWaters"
            class="helpLink"
          />
          <div class="checkbox-option">
            <input
              id="classifiedWaters"
              v-model="formData.classifiedWaters"
              type="checkbox"
              data-id="classifiedWaters"
            />
            <label
              for="classifiedWaters"
              class="ml-2"
            >
              Add a Classified Waters Licence
            </label>
          </div>

          <template v-if="formData.classifiedWaters">
            <label for="classifiedWaterName">Water Name / Region</label>
            <small>E.g. Dean River, Skagit River, Kootenay region rivers.</small>
            <input
              id="classifiedWaterName"
              v-model="formData.classifiedWaterName"
              type="text"
              data-id="classifiedWaterName"
              class="w-full"
            />
          </template>
        </fieldset>

        <!-- Conservation Surcharge Stamps -->
        <fieldset>
          <legend>Conservation Surcharge Stamps (optional)</legend>
          <div
            v-tooltip="{ value: 'Ask the Assistant' }"
            data-id="surcharge"
            class="helpLink"
          />
          <div
            v-for="option in surchargeOptions"
            :key="option.value"
            class="checkbox-option"
          >
            <input
              :id="'surcharge_' + option.value"
              v-model="formData.surcharge"
              type="checkbox"
              :value="option.value"
              data-id="surcharge"
            />
            <label
              :for="'surcharge_' + option.value"
              class="ml-2"
            >
              {{ option.label }}
            </label>
          </div>
        </fieldset>

        <!-- Estimated Cost -->
        <fieldset>
          <legend>Estimated Licence Cost</legend>
          <input
            id="estimatedCost"
            :value="calculatedPrice"
            type="text"
            data-id="estimatedCost"
            class="w-full"
            readonly
          />
        </fieldset>

        <!-- Form Actions -->
        <div class="form-actions">
          <button
            class="btn btn-primary"
            @click="submitForm"
          >
            ✓ Submit
          </button>
          <button
            class="btn btn-secondary"
            @click="resetForm"
          >
            ✕ Reset
          </button>
        </div>
      </form>
    </div>

    <div class="col col-5 col-offset-1 notes-container">
      <Panel
        header="Data Sources"
        toggleable
      >
        <p class="m-0">The Assistant is trained on text from the following data sources:</p>
        <ul>
          <li>
            Webpages:
            <ul>
              <li>
                <a
                  target="_blank"
                  href="https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/fishing/recreational-freshwater-fishing-licence"
                >
                  Recreational Freshwater Fishing Licence
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/fishing/recreational-freshwater-fishing-licence/classified-waters-licences"
                >
                  Classified Waters Licences
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/fishing/recreational-freshwater-fishing-licence/conservation-surcharges"
                >
                  Conservation Surcharges
                </a>
              </li>
            </ul>
          </li>
          <li>
            Documents:
            <ul>
              <li>
                <a
                  target="_blank"
                  href="https://www2.gov.bc.ca/assets/gov/sports-recreation-arts-and-culture/recreation/fishing-hunting/fishing/freshwater-fishing-regulations-summary.pdf"
                >
                  Freshwater Fishing Regulations Summary (PDF)
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </Panel>

      <Panel
        header="Form Definition"
        toggleable
        class="mt-5"
      >
        <p class="m-0">
          A Form Definition (JSON schema) tells the AI Form Assistant about the webform and data structure. It is used
          to instruct the Assistant with AI prompts and provides more 'context' for each form field.
        </p>
        <pre><code>{{ JSON.stringify(formDefinition, null, 2) }}</code></pre>
      </Panel>

      <Panel
        header="Prompt Template"
        toggleable
        class="mt-5"
      >
        <p class="m-0">
          A Prompt Template is a text file that contains the instructions and guidelines for how the AI Form Assistant
          should generate responses. It often includes placeholders for dynamic content, such as form data or user
          input, and is used to ensure that the Assistant's responses are relevant, accurate, and consistent with the
          desired tone.
        </p>
        <pre><code>{{ promptTemplate }}</code></pre>
      </Panel>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
}

fieldset {
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  background-color: #fafafa;
}

fieldset legend {
  padding: 0.2rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

fieldset label {
  display: block;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
}

.helpLink {
  position: relative;
  display: block;
  float: right;
  top: -1rem;
  cursor: pointer;
  width: 2rem;
  height: 1rem;
  background: url('/public/aifas-client-scripts/spark_blue.svg') no-repeat center center;
  background-size: contain;
}

select option:first-child {
  color: #ccc;
}

.radio-option,
.checkbox-option {
  display: flex;
  align-items: center;
  padding: 0.2rem 0;
}

.radio-option input[type='radio'],
.checkbox-option input[type='checkbox'] {
  cursor: pointer;
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
}

.radio-option label,
.checkbox-option label {
  cursor: pointer;
  font-size: 0.95rem;
  color: #333;
  font-weight: normal;
  margin: 0;
}

select,
input[type='text'],
input[type='date'],
input[type='email'],
input[type='tel'] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  font-size: 0.95rem;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

select:hover,
input[type='text']:hover,
input[type='date']:hover,
input[type='email']:hover,
input[type='tel']:hover {
  border-color: #3b82f6;
}

select:focus,
input[type='text']:focus,
input[type='date']:focus,
input[type='email']:focus,
input[type='tel']:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

input[type='text']:read-only {
  background-color: #f4f4f4;
  cursor: default;
  /* font-weight: 600; */
}

.ml-2 {
  margin-left: 0.5rem;
}

.w-full {
  width: 100%;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
}

.btn {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #333;
}

.btn-secondary:hover {
  background-color: #d1d5db;
}

small {
  display: block;
  color: #666;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

pre {
  background-color: #f4f4f4;
  max-width: 450px;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto; /* Adds scrollbar if content is too wide */
}
</style>
