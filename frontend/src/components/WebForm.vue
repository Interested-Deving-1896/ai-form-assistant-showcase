<script setup>
import { ref } from 'vue';
import { Panel } from '@/lib/primevue';

// ----- Form Data -----
const formData = ref({
  age: '',
  residency: '',
  location: '',
  licence: [],
  conservation: null
});

// Age options
const ageOptions = [
  { label: '16 and under', value: 'under16' },
  { label: 'over 16', value: 'over16' }
];

// Residency and Exemptions options
const residencyOptions = [
  { label: 'Resident', value: 'res' },
  { label: 'Non-Resident', value: 'nonres' },
  { label: 'Non-resident alien', value: 'nonres_alien' },
  { label: 'Annual licence for residents with disabilities', value: 'annual_disability' },
  { label: 'First Nations person', value: 'first_nations' }
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

// Licence required options
const licenceOptions = [
  { label: 'Non-tidal (fresh) waters in B.C.', value: 'freshwater' },
  { label: 'Tidal (salt) waters in B.C.', value: 'tidal' },
  { label: 'Classified Waters', value: 'classified' }
];

// Conservation surcharge options
const conservationOptions = [
  { label: 'Yes', value: true },
  { label: 'No', value: false }
];

const jsonData = {
  name: 'fishing-licence-form',
  schema: {
    age: {
      fieldLabel: 'Age',
      fieldContext: 'What is your age category?',
      options: [
        { key: 'under16', value: '16 and under' },
        { key: 'over16', value: 'over 16' }
      ],
      is_required: true
    },
    residency: {
      fieldLabel: 'Residency and Exemptions',
      fieldContext: 'Select your residency status or exemption category',
      options: [
        { key: 'res', value: 'Resident' },
        { key: 'nonres', value: 'Non-Resident' },
        { key: 'nonres_alien', value: 'Non-resident alien' },
        { key: 'annual_disability', value: 'Annual licence for residents with disabilities' },
        { key: 'first_nations', value: 'First Nations person' }
      ],
      is_required: true
    },
    location: {
      fieldLabel: 'Location',
      fieldContext: 'Select the region where you plan to fish',
      options: [
        { key: 'region1', value: 'Region 1 - Vancouver Island (includes Haida Gwaii: WMU 6-12, 6-13)' },
        { key: 'region2', value: 'Region 2 - Lower Mainland' },
        { key: 'region3', value: 'Region 3 - Thompson' },
        { key: 'region4', value: 'Region 4 - Kootenay' },
        { key: 'region5', value: 'Region 5 - Cariboo' },
        { key: 'region6', value: 'Region 6 - Skeena' },
        { key: 'region7a', value: 'Region 7A - Omineca' },
        { key: 'region7b', value: 'Region 7B - Peace' },
        { key: 'region8', value: 'Region 8 - Okanagan' }
      ],
      is_required: true
    },
    licence: {
      fieldLabel: 'Licence Required',
      fieldContext: 'Select which type of licence you need (you can select multiple)',
      options: [
        { key: 'freshwater', value: 'Non-tidal (fresh) waters in B.C.' },
        { key: 'classified', value: 'Classified Waters' },
        { key: 'tidal', value: 'Tidal (salt) waters in B.C.' }
      ],
      is_required: true
    },
    conservation: {
      fieldLabel: 'Will you need a Conservation surcharge licence?',
      fieldContext: 'A conservation surcharge licence provides additional conservation benefits',
      options: [
        { key: 'true', value: 'Yes' },
        { key: 'false', value: 'No' }
      ],
      is_required: true
    }
  }
};

// ----- Actions -----

const submitForm = () => {
  console.log('Form submitted:', formData.value);
  // Add your form submission logic here
};

const resetForm = () => {
  formData.value = {
    age: null,
    residency: null,
    location: null,
    licence: [],
    conservation: null
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
        <!-- Age Field -->
        <fieldset>
          <legend>Age Group</legend>
          <div
            v-tooltip="{ value: 'Ask the Assistant' }"
            data-id="age"
            class="helpLink"
          />
          <select
            v-model="formData.age"
            data-id="age"
            class="w-full"
          >
            <option value="">please select</option>
            <option
              v-for="option in ageOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </fieldset>

        <!-- Residency and Exemptions Field -->
        <fieldset>
          <legend>Residency and Exemptions</legend>
          <div
            v-tooltip="{ value: 'Ask the Assistant' }"
            data-id="residency"
            class="helpLink"
          />
          <select
            v-model="formData.residency"
            data-id="residency"
            class="w-full"
          >
            <option value="">please select</option>
            <option
              v-for="option in residencyOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </fieldset>

        <!-- Location Field -->
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

        <!-- Licence Required Field -->
        <fieldset>
          <legend>Licence Type</legend>
          <div
            v-tooltip="{ value: 'Ask the Assistant' }"
            data-id="licence"
            class="helpLink"
          />
          <div
            v-for="option in licenceOptions"
            :key="option.value"
            class="checkbox-option"
          >
            <input
              :id="'licence_' + option.value"
              v-model="formData.licence"
              type="checkbox"
              :value="option.value"
              data-id="licence"
            />
            <label
              :for="'licence_' + option.value"
              class="ml-2"
            >
              {{ option.label }}
            </label>
          </div>
        </fieldset>

        <!-- Conservation Surcharge Field -->
        <fieldset>
          <legend>Conservation Surcharge</legend>
          <div
            v-tooltip="{ value: 'Ask the Assistant' }"
            data-id="conservation"
            class="helpLink"
          />
          <small>Will you be fishing for endangered species or in protected areas?</small>

          <div
            v-for="option in conservationOptions"
            :key="option.value"
            class="radio-option mt-2"
          >
            <input
              :id="'conservation_' + option.value"
              v-model="formData.conservation"
              type="radio"
              :value="option.value"
              data-id="conservation"
            />
            <label
              :for="'conservation_' + option.value"
              class="ml-2"
            >
              {{ option.label }}
            </label>
          </div>
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
          A Form Definition (JSON schema) provides more 'context' for each form field and helps to instruct the
          Assistant with AI prompts:
          <pre><code>{{ JSON.stringify(jsonData, null, 2) }}</code></pre>
        </p>
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
}

select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  font-size: 0.95rem;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;
}

select:hover {
  border-color: #3b82f6;
}

select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
