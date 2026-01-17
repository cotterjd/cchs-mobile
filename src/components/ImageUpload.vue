<template>
  <div class="image-upload">
    <div class="upload-buttons">
      <Button
        @click="triggerCamera"
        label="Add Photo"
        icon="pi pi-camera"
        class="p-button-lg"
      />
    </div>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      style="display: none"
      @change="onFileSelected"
    />

    <input
      ref="cameraInput"
      type="file"
      accept="image/*"
      capture="environment"
      style="display: none"
      @change="onFileSelected"
    />

    <div v-if="preview" class="preview-container">
      <spacer-break />
      <img :src="preview" alt="Preview" class="image-preview" />
      <spacer-break />
      <div class="preview-actions">
        <Button
          @click="clearImage"
          label="Clear"
          icon="pi pi-times"
          class="p-button-secondary"
        />
      </div>
    </div>

    <!--<div v-if="uploadStatus" class="upload-status">
      <Message :severity="uploadStatus.type" :closable="false">
        {{ uploadStatus.message }}
      </Message>
    </div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from 'primevue/button'
import Message from 'primevue/message'
import SpacerBreak from '@/components/SpacerBreak.vue'

export default defineComponent({
  name: 'ImageUpload',
  components: {
    Button,
    Message,
    SpacerBreak,
  },
  props: {
    unitId: {
      type: String,
      default: '',
    },
    job: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      preview: '' as string,
      selectedFile: null as File | null,
      uploading: false,
      uploadStatus: null as { type: string; message: string } | null,
    }
  },
  methods: {
    triggerFileInput() {
      const fileInput = this.$refs.fileInput as HTMLInputElement
      fileInput?.click()
    },

    triggerCamera() {
      const cameraInput = this.$refs.cameraInput as HTMLInputElement
      cameraInput?.click()
    },

    async onFileSelected(event: Event) {
      const target = event.target as HTMLInputElement
      const file = target.files?.[0]
      console.log(`FILE`, file)

      if (!file) return

      try {
        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
          this.preview = e.target?.result as string
        }
        reader.readAsDataURL(file)

        // Store the file and emit to parent
        this.selectedFile = file
        this.$emit('image-selected', file)
        this.uploadStatus = null
      } catch (error) {
        console.error('Error processing image:', error)
        this.uploadStatus = {
          type: 'error',
          message: 'Failed to process image',
        }
      }
    },

    clearImage() {
      this.preview = ''
      this.selectedFile = null
      this.uploadStatus = null
      const fileInput = this.$refs.fileInput as HTMLInputElement
      const cameraInput = this.$refs.cameraInput as HTMLInputElement
      if (fileInput) fileInput.value = ''
      this.$emit('image-cleared')
    },
  },
})
</script>

<style scoped>
.image-upload {
  width: 100%;
}

.upload-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview-container {
  margin-top: 1rem;
}

.image-preview {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.preview-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.preview-actions button {
  flex: 1;
}

.upload-status {
  margin-top: 1rem;
}
</style>
