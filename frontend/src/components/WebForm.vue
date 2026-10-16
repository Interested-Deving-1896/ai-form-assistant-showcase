<script setup>
import { ref, computed } from 'vue';
// import { Message } from '@/lib/primevue';

// ----- Form Data -----
const formData = ref({
  angler_age_range: '',
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

// age range options
const angler_age_range_options = [
  { label: 'Under 16', value: 'child' },
  { label: '16 and over', value: 'adult' }
];

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

const submitForm = () => {
  // console.log('Form submitted:', formData.value);
  // Add your form submission logic here
};

const resetForm = () => {
  formData.value = {
    angler_age_range: '',
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
  <div class="form-container">
    <!-- <h2 class="mt-0">Sample Permit Application</h2> -->

    <!-- <Message
      severity="info"
      class="hidden"
    >
      This is not a tidal (saltwater) licence. Freshwater fishing licences do not include fishing in British Columbia's
      coastal tidal waters. Tidal (saltwater) fishing regulations and licences are under the jurisdiction of the
      Canadian federal government. For more information and licence purchase visit the
      <a
        href="https://recfish-pechesportive.dfo-mpo.gc.ca/nrls-sndpp/index-eng.cfm"
        target="_blank"
      >
        Department of Fisheries and Oceans
      </a>
      website.
    </Message> -->

    <!-- Field ids and data-ids match the form definition; the AI Form Assist client uses them to fill in values -->
    <form
      name="fishing-licence-form"
      class="bc-form rounded border border-[var(--bc-border)] bg-white p-4 sm:p-6"
      @submit.prevent="submitForm"
    >
      <section class="form-section">
        <h3>Angler Information</h3>
        <div
          v-tooltip="{ value: 'Ask the Assistant' }"
          data-id="angler_age_range_help"
          class="helpLink"
        />

        <div class="form-field">
          <label for="angler_age_range">Age</label>
          <select
            id="angler_age_range"
            v-model="formData.angler_age_range"
            data-id="angler_age_range"
            class="w-full"
          >
            <option value="">please select</option>
            <option
              v-for="option in angler_age_range_options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <fieldset class="form-group">
          <legend>Residency Status</legend>
          <div
            v-tooltip="{ value: 'Ask the Assistant' }"
            data-id="residency_help"
            class="helpLink"
          />
          <div class="form-options">
            <div
              v-for="option in residencyOptions"
              :key="option.value"
              class="radio-option"
            >
              <input
                :id="'residency_' + option.value"
                v-model="formData.residency"
                type="radio"
                name="residency"
                :value="option.value"
                :data-id="'residency_' + option.value"
              />
              <label
                :for="'residency_' + option.value"
                class="ml-2"
              >
                {{ option.label }}
              </label>
            </div>
          </div>
        </fieldset>

        <div class="form-field">
          <label for="wid">Fish and Wildlife ID (WID)</label>
          <input
            id="wid"
            v-model="formData.wid"
            type="text"
            data-id="wid"
            class="w-full"
            aria-describedby="wid-description"
          />
          <small id="wid-description">Leave blank if you need to register for a new WID.</small>
        </div>
      </section>

      <section class="form-section">
        <h3>Fishing Licence Type</h3>
        <div
          v-tooltip="{ value: 'Ask the Assistant' }"
          data-id="licenceDuration_help"
          class="helpLink"
        />

        <div class="form-field">
          <label for="licenceDuration">Duration</label>
          <select
            id="licenceDuration"
            v-model="formData.licenceDuration"
            data-id="licenceDuration"
            class="w-full"
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
        </div>

        <div class="form-options form-field">
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
        </div>

        <div
          v-if="formData.disabilityReduction"
          class="form-field"
        >
          <label for="coeNumber">Certificate of Eligibility Number</label>
          <input
            id="coeNumber"
            v-model="formData.coeNumber"
            type="text"
            data-id="coeNumber"
            class="w-full"
          />
        </div>
      </section>

      <section class="form-section">
        <h3 id="location-heading">Fishing Region</h3>
        <div
          v-tooltip="{ value: 'Ask the Assistant' }"
          data-id="location_help"
          class="helpLink"
        />

        <div class="form-field">
          <select
            id="location"
            v-model="formData.location"
            data-id="location"
            class="w-full"
            aria-labelledby="location-heading"
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
        </div>
      </section>

      <section class="form-section">
        <h3>Classified Waters Licence</h3>
        <div
          v-tooltip="{ value: 'Ask the Assistant' }"
          data-id="classifiedWaters_help"
          class="helpLink"
        />

        <div class="form-options form-field">
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
        </div>

        <div
          v-if="formData.classifiedWaters"
          class="form-field"
        >
          <label for="classifiedWaterName">Water Name / Region</label>
          <input
            id="classifiedWaterName"
            v-model="formData.classifiedWaterName"
            type="text"
            data-id="classifiedWaterName"
            class="w-full"
            aria-describedby="classifiedWaterName-description"
          />
          <small id="classifiedWaterName-description">E.g. Dean River, Skagit River, Kootenay region rivers.</small>
        </div>
      </section>

      <section class="form-section">
        <h3 id="surcharge-heading">Conservation Surcharge Stamps</h3>
        <div
          v-tooltip="{ value: 'Ask the Assistant' }"
          data-id="surcharge_help"
          class="helpLink"
        />

        <fieldset
          class="form-group"
          aria-labelledby="surcharge-heading"
        >
          <div class="form-options">
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
                :data-id="'surcharge_' + option.value"
              />
              <label
                :for="'surcharge_' + option.value"
                class="ml-2"
              >
                {{ option.label }}
              </label>
            </div>
          </div>
        </fieldset>
      </section>

      <section class="form-section">
        <h3 id="estimatedCost-heading">Estimated Licence Cost</h3>
        <div class="form-field cost-field">
          <span aria-hidden="true">$</span>
          <input
            id="estimatedCost"
            :value="calculatedPrice"
            type="text"
            data-id="estimatedCost"
            class="w-full"
            aria-labelledby="estimatedCost-heading"
            readonly
          />
        </div>
      </section>

      <div class="form-actions">
        <button
          type="submit"
          class="btn btn-primary"
        >
          Submit
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="resetForm"
        >
          Reset
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
// Read-only total with a dollar sign inside the field
.cost-field {
  position: relative;
  max-width: 12rem;

  span {
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
    color: var(--bc-text-secondary);
    pointer-events: none;
  }

  input {
    padding-left: 1.75rem;
  }
}
</style>
