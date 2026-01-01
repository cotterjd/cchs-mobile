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
import { uploadImage } from '@/xhr'

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
      base64Data: '' as string,
      filename: '' as string,
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

    convertToBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
            const base64String = reader.result.split(',')[1]
            resolve(base64String)
          } else {
            reject(new Error('Failed to convert file to base64'))
          }
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    },

    async onFileSelected(event: Event) {
      const target = event.target as HTMLInputElement
      const file = target.files?.[0]

      if (!file) return

      try {
        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
          this.preview = e.target?.result as string
        }
        reader.readAsDataURL(file)

        // Convert to base64 for upload
        this.base64Data = await this.convertToBase64(file)
        console.log(`base64dat`, this.base64Data)
        this.filename = file.name
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
      this.base64Data = ''
      this.filename = ''
      this.uploadStatus = null
      const fileInput = this.$refs.fileInput as HTMLInputElement
      const cameraInput = this.$refs.cameraInput as HTMLInputElement
      if (fileInput) fileInput.value = ''
      if (cameraInput) cameraInput.value = ''
    },

    // TODO: move this logic to the Add Codes button or something
    async onSaveImage() {
      if (!this.base64Data) return

      this.uploading = true
      this.uploadStatus = null

      try {
        const result = await uploadImage({
          base64: this.base64Data,
          filename: this.filename,
          unitId: this.unitId,
          job: this.job,
        })

        if (result.success) {
          this.uploadStatus = {
            type: 'success',
            message: 'Image uploaded successfully!',
          }
          this.$emit('upload-success', result.data)
          // Clear after successful upload
          setTimeout(() => {
            this.clearImage()
          }, 2000)
        } else {
          this.uploadStatus = {
            type: 'error',
            message: 'Upload failed. Please try again.',
          }
        }
      } catch (error) {
        console.error('Error uploading image:', error)
        this.uploadStatus = {
          type: 'error',
          message: 'Upload failed. Please try again.',
        }
      } finally {
        this.uploading = false
      }
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
