<template>
  <div class="image-upload">
    <div class="upload-buttons">
      <Button
        @click="triggerFileInput"
        label="Choose from Gallery"
        icon="pi pi-images"
        class="p-button-lg"
      />
      <spacer-break />
      <Button
        @click="triggerCamera"
        label="Take Photo"
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
        <Button
          @click="uploadImage"
          label="Upload"
          icon="pi pi-upload"
          class="p-button-success"
          :loading="uploading"
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
import { defineComponent, ref } from 'vue'
import Button from 'primevue/button'
import Message from 'primevue/message'
import SpacerBreak from '@/components/SpacerBreak.vue'
import { uploadImage as uploadImageXhr } from '@/xhr'

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
  setup(props, { emit }) {
    const fileInput = ref<HTMLInputElement | null>(null)
    const cameraInput = ref<HTMLInputElement | null>(null)
    const preview = ref<string>('')
    const base64Data = ref<string>('')
    const filename = ref<string>('')
    const uploading = ref(false)
    const uploadStatus = ref<{ type: string; message: string } | null>(null)

    const triggerFileInput = () => {
      fileInput.value?.click()
    }

    const triggerCamera = () => {
      cameraInput.value?.click()
    }

    const convertToBase64 = (file: File): Promise<string> => {
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
    }

    const onFileSelected = async (event: Event) => {
      const target = event.target as HTMLInputElement
      const file = target.files?.[0]

      if (!file) return

      try {
        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
          preview.value = e.target?.result as string
        }
        reader.readAsDataURL(file)

        // Convert to base64 for upload
        base64Data.value = await convertToBase64(file)
        filename.value = file.name
        uploadStatus.value = null
      } catch (error) {
        console.error('Error processing image:', error)
        uploadStatus.value = {
          type: 'error',
          message: 'Failed to process image',
        }
      }
    }

    const clearImage = () => {
      preview.value = ''
      base64Data.value = ''
      filename.value = ''
      uploadStatus.value = null
      if (fileInput.value) fileInput.value.value = ''
      if (cameraInput.value) cameraInput.value.value = ''
    }

    const uploadImage = async () => {
      if (!base64Data.value) return

      uploading.value = true
      uploadStatus.value = null

      try {
        const result = await uploadImageXhr({
          base64: base64Data.value,
          filename: filename.value,
          unitId: props.unitId,
          job: props.job,
        })

        if (result.success) {
          uploadStatus.value = {
            type: 'success',
            message: 'Image uploaded successfully!',
          }
          emit('upload-success', result.data)
          // Clear after successful upload
          setTimeout(() => {
            clearImage()
          }, 2000)
        } else {
          uploadStatus.value = {
            type: 'error',
            message: 'Upload failed. Please try again.',
          }
        }
      } catch (error) {
        console.error('Error uploading image:', error)
        uploadStatus.value = {
          type: 'error',
          message: 'Upload failed. Please try again.',
        }
      } finally {
        uploading.value = false
      }
    }

    return {
      fileInput,
      cameraInput,
      preview,
      uploading,
      uploadStatus,
      triggerFileInput,
      triggerCamera,
      onFileSelected,
      clearImage,
      uploadImage,
    }
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
