<template>
  <div v-if="!storageUser">
    <input-text
      v-model="inputUser"
      type="text"
      class="full p-inputtext-lg"
      placeholder="User name"
    />
    <Button
      @click="onSaveUser"
      label="Save User Name"
      class="full p-button-lg"
    />
    <spacer-break />
  </div>
  <div v-if="!storageJob">
    <input-text
      v-model="inputJob"
      type="text"
      class="full p-inputtext-lg"
      placeholder="Property name"
    />
    <Button
      @click="onSaveJob"
      label="Start New Property"
      class="full p-button-lg"
    />
    <spacer-break />
  </div>

  <input-text
    v-model="unitName"
    type="text"
    class="full p-inputtext-lg"
    placeholder="Unit"
  />
  <spacer-break />
  <div v-for="code in greenCodes" :key="code">
    <Button
      @click="onAddCode(code)"
      :label="code"
      class="full p-button-lg"
      :class="chosenCodes.includes(code) ? 'p-button-secondary' : ''"
    />
  <spacer-break />
  </div>
  <Button
    @click="onAddCodes"
    label="Add Codes"
    class="full p-button-lg p-button-success"
  />
  <spacer-break />
  <div v-for="code in yellowCodes" :key="code">
    <Button
      @click="onAddCode(code)"
      :label="code"
      class="full p-button-lg"
      :class="chosenCodes.includes(code) ? 'p-button-secondary' : 'p-button-warning'"
    />
    <spacer-break />
  </div>
  <div v-for="code in redCodes" :key="code">
    <Button
      @click="onAddCode(code)"
      :label="code"
      class="full p-button-lg"
      :class="chosenCodes.includes(code) ? 'p-button-secondary' : 'p-button-danger'"
    />
    <spacer-break />
  </div>

  <spacer-break />
  <h3>Add Photos</h3>
  <image-upload
    :unitId="unitName"
    :job="storageJob"
    @upload-success="onImageUploaded"
  />
  <spacer-break />

  <Button
    @click="onEndJob"
    label="End Job"
    class="full p-button-lg p-button-help"
  />
  <div class="units-header">
    <h2>Completed Units</h2>
    <span>
      Offline Mode
      <checkbox class="offline-checkbox" v-model="offlineMode" :binary="true" />
    </span>
  </div>
  <saved-codes-list
    :codes="visibleCodes"
    :onSyncCode="onSyncCode"
    :syncing="syncing"
    :onDeleteCode="onDeleteCode"
  />
  <p>
    {{version}}&nbsp; &nbsp; &nbsp;
    <i @click="displayBugForm = true" @keyup="displayBugForm = true" class="pi pi-prime"></i>
  </p>

  <!-- Dialogs -->
  <Dialog header="Other description" v-model:visible="displayOtherDesc">
    <input-text
      type="text"
      v-model="otherDesc"
      class="full p-inputtest-lg"
    />
    <spacer-break />
    <Button
      @click="displayOtherDesc = false"
      label="Save"
      class="full p-button-lg"
    />
  </Dialog>
  <Dialog header="Report Bug" v-model:visible="displayBugForm">
    <p>
      If you are experiencing a bug with the app, please include the following information:
      actions taken, expected result, actual result, and any other relevant information.
    </p>
    <text-area
      type="text"
      v-model="bugDesc"
      class="full p-inputtest-lg modal-height"
      placeholder="Describe the bug"
    />
    <spacer-break />
    <Button
      @click="onSubmitBug"
      label="Submit"
      class="full p-button-lg"
    />
  </Dialog>
    <BlockUI :blocked="loading" :full-screen="true" />
    <div v-show="loading" class="center">
      <ProgressSpinner />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import InputText from 'primevue/inputtext'
import TextArea from 'primevue/textarea'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import ProgressSpinner from 'primevue/progressspinner'
import BlockUI from 'primevue/blockui'
import Checkbox from 'primevue/checkbox'
import {
  listUnitCodes,
  saveUnitCodes,
  deleteUnitCode,
  submitBug,
  generateReport,
  getUnit,
} from '@/xhr'
import { UnitCode, Bug } from '@/types'
// import * as R from 'ramda'
import SpacerBreak from '@/components/SpacerBreak.vue'
import SavedCodesList from '@/components/SavedCodesList.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import { unserviced, servicedWithIssues, servicedNoIssues } from '@/static/codes'
import 'primeicons/primeicons.css'

const logObj = (label: string, data: any) => console.log(JSON.parse(JSON.stringify(data)))

interface CreateResponse {
  success: boolean
  unitCode: UnitCode
}
export interface Data {
  bugDesc: string
  displayBugForm: boolean
  greenCodes: string[]
  yellowCodes: string[]
  redCodes: string[]
  inputUser: string
  inputJob: string
  storageUser: string
  storageJob: string
  savedCodes: UnitCode[]
  visibleCodes: UnitCode[]
  unitName: string
  chosenCodes: string[]
  otherDesc: string
  displayOtherDesc: boolean
  syncing: string
  loading: boolean
  saving: string
  offlineMode: boolean
}
export default defineComponent({
  name: `HomeView`,
  components: {
    InputText,
    Button,
    Dialog,
    ProgressSpinner,
    BlockUI,
    SpacerBreak,
    Checkbox,
    TextArea,
    SavedCodesList,
    ImageUpload,
  },
  data: (): Data => ({
    bugDesc: ``,
    displayBugForm: false,
    greenCodes: [],
    yellowCodes: [],
    redCodes: [],
    inputUser: ``,
    inputJob: ``,
    storageUser: ``,
    storageJob: ``,
    savedCodes: [],
    visibleCodes: [],
    unitName: ``,
    chosenCodes: [],
    otherDesc: ``,
    displayOtherDesc: false,
    syncing: ``,
    loading: false,
    saving: ``,
    offlineMode: false,
  }),
  computed: {
    ...mapState({
      version: (state: any) => state.version,
    }),
  },
  async mounted() {
    this.greenCodes = servicedNoIssues
    this.yellowCodes = servicedWithIssues
    this.redCodes = unserviced
    this.storageUser = localStorage.getItem(`user`) || ``
    this.storageJob = localStorage.getItem(`job`) || ``
  },
  watch: {
    async storageJob() {
      this.loading = true
      this.getSavedCodes()
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
          this.visibleCodes = this.getStorageCodes()
        })
    },
  },
  methods: {
    onSaveUser() {
      localStorage.setItem(`user`, this.inputUser)
      this.storageUser = localStorage.getItem(`user`) || ``
    },
    onSaveJob() {
      localStorage.setItem(`job`, this.inputJob)
      this.storageJob = localStorage.getItem(`job`) || ``
    },
    onEndJob() {
      if (this.offlineMode) {
        alert(`Cannot end job in Offline Mode`)
      } else {
        this.syncUnsavedUnits()
      }
    },
    onAddCode(code: string) {
      // Only support other desc for one code.
      if (code.toLowerCase().includes(`other`) && !this.chosenCodes.includes(code)) {
        this.displayOtherDesc = true
      }
      this.chosenCodes = this.chosenCodes.includes(code)
        ? this.chosenCodes.filter((x: string) => x !== code)
        : [...this.chosenCodes, code]
    },
    async onAddCodes() {
      if (!this.storageUser) return alert(`Please add your user.`)
      if (!this.storageJob) return alert(`Please add a job.`)
      if (!this.unitName) return alert(`Please add unit.`)
      const codesToSave = this.chosenCodes.map((code: string) => {
        if (code.toLowerCase().includes(`other`)) return `${code} ${this.otherDesc}`
        return code
      })
      const existingCode = await getUnit(this.unitName, this.storageJob)
      if (existingCode) {
        const yes = window.confirm(`Unit code already exists. Are you sure you want to replace it?`)
        if (yes) {
          // TODO: make this not have duplicated popups
          this.onDeleteCode(existingCode)
          this.saveCodes(codesToSave)
        }
      } else {
        this.saveCodes(codesToSave)
      }
    },
    onDeleteCode(savedCode: UnitCode) {
      if (this.offlineMode) return alert(`Cannot delete in Offline Mode.`)

      // IDEA: this takes a long time to fail when offline.
      // Maybe don't block UI and handle differently
      this.loading = true
      const yes = window.confirm(`Are you sure you want to delete unit code ${savedCode.unit} ${savedCode.codes}?`)
      if (yes) {
        if (this.offlineMode) {
          this.removeUnitCode(savedCode)
        } else {
          deleteUnitCode(savedCode.id as string)
            .then(this.removeUnitCode)
            .catch(r => alert(`Unable to delete unit code. Make sure you have a connection and try again when you have a connection or call customer support at 405 919 4600`))
            .finally(() => this.loading = false)
        }
      } else {
        this.loading = false
      }
    },
    onSyncCode(code: UnitCode) {
      if (this.offlineMode) return alert(`Cannot sync in offline mode.`)
      this.syncing = code.unit
      saveUnitCodes(code)
        .then((_: void | CreateResponse) => this.syncing = ``)
        .then(this.getSavedCodes)
        .catch((err) => {
          alert(`Error syncing unit. You may still not have a connection. Please try again when you have a service or wifi or contact support at 405 919 4600`)
          this.syncing = ``
        })
    },
    onSubmitBug() {
      if (!this.bugDesc) return alert(`Please add a description.`)
      if (this.offlineMode) {
        alert(`Cannot submit bug in offline mode.`)
      } else {
        const bug: Bug = {
          user: this.storageUser,
          job: this.storageJob,
          desc: this.bugDesc,
          version: this.version,
          data: {
            greenCodes: this.greenCodes,
            yellowCodes: this.yellowCodes,
            redCodes: this.redCodes,
            inputUser: this.inputUser,
            inputJob: this.inputJob,
            savedCodes: this.savedCodes,
            visibleCodes: this.visibleCodes,
            unitName: this.unitName,
            chosenCodes: this.chosenCodes,
            otherDesc: this.otherDesc,
            displayOtherDesc: this.displayOtherDesc,
            syncing: this.syncing,
            loading: this.loading,
            saving: this.saving,
            offlineMode: this.offlineMode,
          },
        }
        submitBug(bug)
          .then(() => {
            alert(`Bug submitted successfully.`)
            this.bugDesc = ``
            this.displayBugForm = false
          })
          .catch(() => {
            alert(`Error submitting bug. Please try again or contact support at 405 919 4600`)
          })
      }
    },
    saveCodes(codes: string[]) {
      const codeToSave = {
        user: this.storageUser,
        unit: this.unitName,
        codes: codes.join(`, `),
        property: this.storageJob,
      }
      this.addCodeToUI(codeToSave)
      if (!this.offlineMode) {
        this.saving = this.unitName
        saveUnitCodes(codeToSave)
          .then(this.getSavedCodes)
          .then(this.resetValues)
          .catch(this.resetValues) // let it fail silently, the codes can be synced later
      } else {
        // It's in offline mode, it's already added to UI, so just reset values
        this.resetValues()
      }
    },
    addCodeToUI(unitCode: UnitCode) {
      const unsavedItems = this.getStorageCodes()
      localStorage.setItem(this.storageJob, JSON.stringify([unitCode, ...unsavedItems]))
      this.visibleCodes = [unitCode, ...this.visibleCodes]
    },
    async getSavedCodes() {
      const savedCodes = this.offlineMode ? [] : await listUnitCodes(this.storageJob)
      const unsavedCodes = this.getStorageCodes()

      // filter out unsaved codes that have saved counterparts
      const updatedUnsavedCodes = unsavedCodes
        .filter(uc => !savedCodes.find(sc => sc.unit === uc.unit))
      localStorage.setItem(this.storageJob, JSON.stringify(updatedUnsavedCodes))
      const allCodes = [...savedCodes, ...updatedUnsavedCodes].sort(this.sortByCreatedAt)
      // R.pipe(
      //   (codes: UnitCode[]) => codes.sort(this.sortByCreatedAt),
      //   (codes: UnitCode[]) => R.groupBy(R.prop(`unit`), codes),
      //   (codeObj: Record<string, UnitCode[]>) => Object.keys(codeObj).map((key: string) => {
      //     const dups = codeObj[key]
      //     return dups.find((x: UnitCode) => x.id) || R.head(dups) as UnitCode
      //   }),
      //   (codes: UnitCode[]) => R.uniqBy(R.prop(`unit`), codes),
      // )([...unsavedCodes, ...savedCodes])
      this.savedCodes = savedCodes
      this.visibleCodes = allCodes
    },
    removeUnitCode(code: UnitCode) {
      this.visibleCodes = this.visibleCodes.filter((x: UnitCode) => x.id !== code.id)
      this.syncing = ``
    },
    sortByCreatedAt(a: UnitCode, b: UnitCode) {
      if (!a.createdAt || !b.createdAt) return 0
      const aDate = (new Date(a.createdAt)).getTime()
      const bDate = (new Date(b.createdAt)).getTime()
      if (aDate - bDate > 1) return -1
      if (aDate - bDate < 1) return 1
      return 0
    },
    isUnsaved(code: UnitCode) {
      const unsavedCodes = this.getStorageCodes()
      return unsavedCodes.some((x: UnitCode) => x.unit === code.unit)
    },
    getStorageCodes() {
      return JSON.parse(localStorage.getItem(this.storageJob) || `[]`)
    },
    syncUnsavedUnits() {
      this.loading = true
      const unsavedCodes = this.getStorageCodes()
      const job: string = this.storageJob
      Promise.all(unsavedCodes.map(saveUnitCodes))
        .then(() => {
          localStorage.setItem(`job`, ``)
          this.inputJob = ``
          this.storageJob = ``
        })
        .then(this.getSavedCodes)
        // .then(_ => generateReport(job)) generated reports aren't correct/used
        .catch((err) => alert(`Error ending job. Please try again or contact support at 405 919 4600`))
    },
    resetValues() {
      this.unitName = ``
      this.chosenCodes = []
      this.syncing = ``
      this.saving = ``
      this.loading = false
    },
    onImageUploaded(data: any) {
      alert(`Image upload not supported yet.`)
      // You can add additional logic here, such as:
      // - Refresh the list of images
      // - Show a success notification
      // - Store the image reference with the unit code
    },
  },
})
</script>
<style>
  .full {
    width: 100%;
  }
  .modal-height {
    height: 65vh;
  }
  .trash-icon {
    display: flex;
    justify-content: end;
    font-size: 25px !important;
    color: red;
  }
  .small-btn {
    background: transparent;
    border: none;
  }
  .center {
    position: fixed;
    top: calc(50vh - 50px);
    left: calc(50vw - 50px);
  }
  .spin {
    animation: refresh-btn-spin infinite 2s linear;
  }
  .units-header {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
  }
  .offline-checkbox {
    margin-top: 20px;
  }
  @keyframes refresh-btn-spin {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
</style>
