<script setup>
import { ref, computed } from 'vue';

// PrimeVue components
import { Button, Fieldset, InputText, Select, Calendar, Message, Checkbox, RadioButton } from '@/lib/primevue';
// ----- Data model -----
const form = ref({
    // Logon / profile
    anglerNumber: '',
    birthDate: null,
    phone: '',
    email: '',
    contactPref: '',
    firstName: '',
    lastName: '',
    address1: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    secretQuestion: '',
    secretAnswer: '',

    // Season
    season: '',

    // Basic licence
    residency: '',
    ageClass: '',
    basicDuration: '',
    basicStartDate: null,

    // Conservation & sturgeon
    surcharges: [],
    sturgeonOpt: '',
    sturgeonStart: null,

    // Classified waters
    cwRequired: '',
    cwResidencyConfirm: '',
    cwWaterbody: '',
    cwClass: '',
    cwRegion: '',
    cwStart: null,
    cwDays: '',

    // Declarations
    ackAccuracy: false,
    ackRules: false
});

// ----- Options -----
const contactOptions = ['Email', 'Phone', 'Mail'];
const residencyOptions = ['BC Resident', 'Non-Resident', 'Non-Resident Alien'];
const ageOptions = [
    { label: 'Youth (under 16)', value: 'youth' },
    { label: 'Adult (16-64)', value: 'adult' },
    { label: 'Senior (65+)', value: 'senior' }
];
const durationOptions = ['Annual', '8-Day', '1-Day'];
const surchargeOptions = [
    { label: 'Steelhead', value: 'steelhead' },
    { label: 'Salmon (non-tidal)', value: 'salmon_non_tidal' },
    { label: 'Kootenay Lake Rainbow Trout', value: 'kootenay_lake_rainbow_trout' },
    { label: 'Shuswap Lake Char', value: 'shuswap_lake_char' },
    { label: 'Shuswap Lake Rainbow Trout', value: 'shuswap_lake_rainbow_trout' }
];
const sturgeonOptions = [
    { label: 'Annual', value: 'annual' },
    { label: '8-Day', value: '8day' },
    { label: '1-Day', value: '1day' }
];
const yesNoOptions = ['Yes', 'No'];
const cwClassOptions = ['I', 'II'];

// ----- Visibility -----
const showBasicStart = computed(() => ['1-Day', '8-Day'].includes(form.value.basicDuration));
const showYouthNote = computed(() => form.value.ageClass === 'youth');
const showSturgeonStart = computed(() => ['1day', '8day'].includes(form.value.sturgeonOpt));
const showCWDetails = computed(() => form.value.cwRequired === 'Yes');

// ----- Actions -----
function onSave() {
    const errors = validate();
    if (errors.length) {
        alert('Please correct the following:\n• ' + errors.join('\n• '));
        return;
    }
    alert('Form captured. Use “Download as JSON” to export a data file.');
}

function onReset() {
    Object.assign(form.value, {
        anglerNumber: '', birthDate: null, phone: '', email: '', contactPref: '',
        firstName: '', lastName: '', address1: '', city: '', region: '',
        postalCode: '', country: '', secretQuestion: '', secretAnswer: '',
        season: '', residency: '', ageClass: '', basicDuration: '', basicStartDate: null,
        surcharges: [], sturgeonOpt: '', sturgeonStart: null,
        cwRequired: '', cwResidencyConfirm: '', cwWaterbody: '', cwClass: '', cwRegion: '',
        cwStart: null, cwDays: '', ackAccuracy: false, ackRules: false
    });
}

// function onDownloadJson() {
//     const payload = toSerializable(form.value);
//     const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
//     const a = document.createElement('a');
//     a.href = URL.createObjectURL(blob);
//     a.download = 'bc-freshwater-elicensing-data.json';
//     a.click();
//     URL.revokeObjectURL(a.href);
// }

function validate() {
    const e = [];
    if (!form.value.birthDate) e.push('Birth Date is required.');
    if (!form.value.phone) e.push('Phone is required.');
    if (!form.value.firstName) e.push('First Name is required.');
    if (!form.value.lastName) e.push('Last Name is required.');
    if (!form.value.address1) e.push('Address Line 1 is required.');
    if (!form.value.city) e.push('City is required.');
    if (!form.value.region) e.push('Province/State is required.');
    if (!form.value.postalCode) e.push('Postal/ZIP is required.');
    if (!form.value.country) e.push('Country is required.');
    if (!form.value.season) e.push('Please select a licence season.');
    if (!form.value.residency) e.push('Please select a residency category.');
    if (!form.value.ageClass) e.push('Please select an age class.');
    if (form.value.ageClass !== 'youth' && !form.value.basicDuration) {
        e.push('Please select a basic licence duration.');
    }
    if (['1-Day', '8-Day'].includes(form.value.basicDuration) && !form.value.basicStartDate) {
        e.push('Select a start date for 1-day / 8-day basic licence.');
    }
    if (['1day', '8day'].includes(form.value.sturgeonOpt) && !form.value.sturgeonStart) {
        e.push('Select a start date for 1-day / 8-day White Sturgeon licence.');
    }
    if (form.value.cwRequired === 'Yes') {
        if (!form.value.cwWaterbody) e.push('Classified Waters: Waterbody/River is required.');
        if (form.value.cwResidencyConfirm !== 'BC Resident') {
            // Non-resident guidance - dates/days recommended
            if (!form.value.cwStart) e.push('Classified Waters (Non-Resident): Start Date is recommended.');
            if (!form.value.cwDays) e.push('Classified Waters (Non-Resident): Number of Days is recommended.');
        }
    }
    if (!form.value.ackAccuracy) e.push('Please certify the information is accurate.');
    if (!form.value.ackRules) e.push('Please acknowledge review of the regulations.');
    return e;
}

// function toSerializable(src) {
//     const fmt = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d || null);
//     return {
//         ...src,
//         birthDate: fmt(src.birthDate),
//         basicStartDate: fmt(src.basicStartDate),
//         sturgeonStart: fmt(src.sturgeonStart),
//         cwStart: fmt(src.cwStart)
//     };
// }
</script>

<template>
    <h1 class="m-0">Fishing Permit Application</h1>


    <!-- 1) Returning Angler Logon / Angler Profile -->
    <Fieldset legend="Angler Profile & Logon" class="mb-4">
        <!-- Login Credentials -->
        <p class="text-sm text-600 mb-3">Login & Contact Information</p>
        <div class="grid gap-3 mb-4">
            <div class="col-12 lg:col-6">
                <label for="anglerNumber" class="font-bold block mb-2">Angler Number</label>
                <InputText id="anglerNumber" v-model="form.anglerNumber" :maxlength="20" autocomplete="off"
                    class="w-full" />
                <small class="text-500 block mt-1">Used by returning anglers for login.</small>
            </div>
            <div class="col-12 lg:col-6">
                <label for="birthDate" class="font-bold block mb-2">Birth Date</label>
                <Calendar id="birthDate" v-model="form.birthDate" date-format="yy-mm-dd" :manualInput="true"
                    :showIcon="true" class="w-full" />
            </div>
            <div class="col-12 lg:col-6">
                <label for="phone" class="font-bold block mb-2">Phone (incl. area code)</label>
                <InputText id="phone" v-model="form.phone" placeholder="e.g., 250-555-1234" class="w-full" />
            </div>
            <div class="col-12 lg:col-6">
                <label for="email" class="font-bold block mb-2">Email</label>
                <InputText id="email" v-model="form.email" placeholder="you@example.com" class="w-full" />
                <small class="text-500 block mt-1">Recommended for confirmations and retrieving your Angler
                    Number.</small>
            </div>
            <div class="col-12 lg:col-4">
                <label for="contactPref" class="font-bold block mb-2">Preferred Contact</label>
                <Select id="contactPref" v-model="form.contactPref" :options="contactOptions" placeholder="— Select —"
                    class="w-full" />
            </div>
        </div>

        <!-- Personal Information -->
        <p class="text-sm text-600 mb-3 mt-4">Personal Information</p>
        <div class="grid gap-3 mb-4">
            <div class="col-12 md:col-6">
                <label for="firstName" class="font-bold block mb-2">First Name</label>
                <InputText id="firstName" v-model="form.firstName" class="w-full" />
            </div>
            <div class="col-12 md:col-6">
                <label for="lastName" class="font-bold block mb-2">Last Name</label>
                <InputText id="lastName" v-model="form.lastName" class="w-full" />
            </div>
        </div>

        <!-- Address Information -->
        <p class="text-sm text-600 mb-3 mt-4">Address</p>
        <div class="grid gap-3">
            <div class="col-12">
                <label for="address1" class="font-bold block mb-2">Address Line 1</label>
                <InputText id="address1" v-model="form.address1" class="w-full" />
            </div>
            <div class="col-12 md:col-6">
                <label for="city" class="font-bold block mb-2">City</label>
                <InputText id="city" v-model="form.city" class="w-full" />
            </div>
            <div class="col-12 md:col-6">
                <label for="region" class="font-bold block mb-2">Province/State</label>
                <InputText id="region" v-model="form.region" class="w-full" />
            </div>
            <div class="col-12 md:col-6">
                <label for="postalCode" class="font-bold block mb-2">Postal/ZIP</label>
                <InputText id="postalCode" v-model="form.postalCode" class="w-full" />
            </div>
            <div class="col-12 md:col-6">
                <label for="country" class="font-bold block mb-2">Country</label>
                <InputText id="country" v-model="form.country" class="w-full" />
            </div>
        </div>

    </Fieldset>

    <!-- 2) Licence Season -->
    <Fieldset legend="Licence Season" class="mb-3">
        <div class="flex gap-3 align-items-center" role="group" aria-label="Licence season selection">
            <div class="flex align-items-center gap-2">
                <RadioButton inputId="seasonCurrent" name="season" value="current" v-model="form.season" />
                <label for="seasonCurrent">Current season (Apr 1 - Mar 31)</label>
            </div>
            <div class="flex align-items-center gap-2">
                <RadioButton inputId="seasonFollowing" name="season" value="following" v-model="form.season" />
                <label for="seasonFollowing">Following season (Apr 1 - Mar 31)</label>
            </div>
        </div>
        <small class="text-500 block mt-2">
            Select based on planned fishing dates; licensing year runs April 1 to March 31 annually.
        </small>
    </Fieldset>

    <!-- 3) Basic Licence -->
    <Fieldset legend="Basic Licence" class="mb-4">
        <div class="grid gap-3 mb-4">
            <div class="col-12 md:col-6 lg:col-4">
                <label for="residency" class="font-bold block mb-2">Residency Category</label>
                <Select id="residency" v-model="form.residency" :options="residencyOptions" placeholder="— Select —"
                    class="w-full" />
            </div>
            <div class="col-12 md:col-6 lg:col-4">
                <label for="ageClass" class="font-bold block mb-2">Age Class</label>
                <Select id="ageClass" v-model="form.ageClass" :options="ageOptions" optionLabel="label"
                    optionValue="value" placeholder="— Select —" class="w-full" />
            </div>
            <div class="col-12 md:col-6 lg:col-4">
                <label for="basicDuration" class="font-bold block mb-2">Duration</label>
                <Select id="basicDuration" v-model="form.basicDuration" :options="durationOptions"
                    placeholder="— Select —" class="w-full" />
            </div>
        </div>

        <div class="grid gap-3" v-if="showBasicStart">
            <div class="col-12 lg:col-4">
                <label for="basicStartDate" class="font-bold block mb-2">Start Date (1-day / 8-day)</label>
                <Calendar id="basicStartDate" v-model="form.basicStartDate" date-format="yy-mm-dd" :manualInput="true"
                    :showIcon="true" class="w-full" />
            </div>
        </div>

        <Message v-if="showYouthNote" severity="info" :closable="false" class="mt-3">
            Anglers <b>under 16</b> do not require a basic licence to fish non-tidal (fresh) waters in B.C.
            (additional stamps may apply if they want their own quota).
        </Message>

        <small class="text-500 block mt-3">
            A basic licence is required to purchase conservation surcharges and classified waters licences.
        </small>
    </Fieldset>

    <!-- 4) Conservation Surcharges & White Sturgeon -->
    <Fieldset legend="Conservation Surcharges & Sturgeon" class="mb-4">
        <p class="text-sm text-600 mb-3">Select the species/waters requiring conservation surcharges</p>

        <div class="grid gap-3 mb-4">
            <div class="col-12 md:col-6 lg:col-4" v-for="opt in surchargeOptions" :key="opt.value">
                <div class="flex align-items-center gap-2">
                    <Checkbox :inputId="`sur-${opt.value}`" :value="opt.value" v-model="form.surcharges" />
                    <label :for="`sur-${opt.value}`" class="cursor-pointer">{{ opt.label }}</label>
                </div>
            </div>
        </div>

        <div class="border-top pt-4 mt-4">
            <p class="text-sm text-600 mb-3">White Sturgeon Conservation Licence</p>
            <div class="grid gap-3">
                <div class="col-12 lg:col-6">
                    <label for="sturgeonOpt" class="font-bold block mb-2">White Sturgeon Conservation
                        Licence</label>
                    <Select id="sturgeonOpt" v-model="form.sturgeonOpt" :options="sturgeonOptions"
                        placeholder="— Not required —" class="w-full" />
                </div>
                <div class="col-12 lg:col-6" v-if="showSturgeonStart">
                    <label for="sturgeonStart" class="font-bold block mb-2">Start Date (1-day / 8-day)</label>
                    <Calendar id="sturgeonStart" v-model="form.sturgeonStart" date-format="yy-mm-dd" :manualInput="true"
                        :showIcon="true" class="w-full" />
                </div>
            </div>
            <small class="text-500 block mt-3">
                A White Sturgeon Conservation Licence is required to angle for white sturgeon; it can be annual,
                8-day, or 1-day.
            </small>
        </div>
    </Fieldset>

    <!-- 5) Classified Waters -->
    <Fieldset legend="Classified Waters Licence" class="mb-4">
        <small class="text-500 block mb-3">Choose this if you intend to fish on designated classified waters
            (resident vs non-resident rules differ).</small>

        <div class="grid gap-3 mb-4">
            <div class="col-12 md:col-6">
                <label for="cwRequired" class="font-bold block mb-2">Will you fish Classified Waters?</label>
                <Select id="cwRequired" v-model="form.cwRequired" :options="yesNoOptions" placeholder="— Select —"
                    class="w-full" />
            </div>
            <div class="col-12 md:col-6">
                <label for="cwResidencyConfirm" class="font-bold block mb-2">Residency (for CW rules)</label>
                <Select id="cwResidencyConfirm" v-model="form.cwResidencyConfirm" :options="residencyOptions"
                    placeholder="— Select —" class="w-full" />
            </div>
        </div>

        <div v-if="showCWDetails" class="border-top pt-4">
            <p class="text-sm text-600 mb-3">Classified Waters Details</p>
            <div class="grid gap-3">
                <div class="col-12 md:col-6 lg:col-4">
                    <label for="cwWaterbody" class="font-bold block mb-2">Waterbody / River <span
                            class="text-red-500">*</span></label>
                    <InputText id="cwWaterbody" v-model="form.cwWaterbody" class="w-full" />
                </div>
                <div class="col-12 md:col-6 lg:col-4">
                    <label for="cwClass" class="font-bold block mb-2">Class (I / II)</label>
                    <Select id="cwClass" v-model="form.cwClass" :options="cwClassOptions" placeholder="— Select —"
                        class="w-full" />
                </div>
                <div class="col-12 md:col-6 lg:col-4">
                    <label for="cwRegion" class="font-bold block mb-2">Region / Section</label>
                    <InputText id="cwRegion" v-model="form.cwRegion" class="w-full" />
                </div>
                <div class="col-12 md:col-6 lg:col-4">
                    <label for="cwStart" class="font-bold block mb-2">Start Date (Non-Residents per-diem)</label>
                    <Calendar id="cwStart" v-model="form.cwStart" date-format="yy-mm-dd" :manualInput="true"
                        :showIcon="true" class="w-full" />
                </div>
                <div class="col-12 md:col-6 lg:col-4">
                    <label for="cwDays" class="font-bold block mb-2">Number of Days (Non-Residents)</label>
                    <InputText id="cwDays" v-model="form.cwDays" inputmode="numeric" class="w-full" />
                </div>
            </div>
        </div>
    </Fieldset>

    <!-- 6) Declarations -->
    <Fieldset legend="Declarations & Acknowledgements" class="mb-4">
        <div class="flex flex-column gap-3">
            <div class="flex align-items-center gap-2">
                <Checkbox inputId="ackAccuracy" v-model="form.ackAccuracy" :binary="true" />
                <label for="ackAccuracy" class="cursor-pointer">I certify the information provided is accurate and
                    complete.</label>
            </div>
            <div class="flex align-items-center gap-2">
                <Checkbox inputId="ackRules" v-model="form.ackRules" :binary="true" />
                <label for="ackRules" class="cursor-pointer">I have reviewed the Freshwater Fishing Regulations and
                    understand retention, gear, and area rules.</label>
            </div>
        </div>
    </Fieldset>

    <!-- 7) Actions -->
    <div class="flex gap-3 flex-wrap justify-content-start">
        <Button label="Save Form Data" icon="pi pi-check" class="p-button-primary" @click="onSave" />
        <Button label="Reset" icon="pi pi-refresh" class="p-button-secondary p-button-outlined" @click="onReset" />
        <Button label="Download as JSON" icon="pi pi-download" class="p-button-info p-button-outlined"
            @click="onDownloadJson" />
    </div>

</template>
<style scoped>
fieldset {
    padding: 1.5rem;
}
</style>
