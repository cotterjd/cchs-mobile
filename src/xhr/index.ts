import { UnitCode, Bug } from '@/types'

const url = process.env.VUE_APP_BE_URL

export const deleteUnitCode = (id: string) => fetch(`${url}/unitcode/${id}`, {
  method: `DELETE`,
}).then((r) => r.json())

export const listUnitCodes = (job: string) => {
  if (!job) return Promise.resolve([])
  return fetch(`${url}/unitcodes?job=${encodeURIComponent(job)}`)
    .then((r) => r.json())
}

export const getUnit = (unit: string, job: string) => fetch(`${url}/unitcode?unit=${encodeURIComponent(unit)}&job=${encodeURIComponent(job)}`)
  .then((r) => r.json())

export const saveUnitCodes = (unitCode: UnitCode) => fetch(`${url}/unitcode`, {
  method: `POST`,
  body: JSON.stringify(unitCode),
  headers: {
    'Content-Type': `application/json`,
  },
}).then((r) => ({ success: r.status !== 500, unitCode }))

export const submitBug = (bug: Bug) => fetch(`${url}/support_email`, {
  method: `POST`,
  body: JSON.stringify({ bug }),
  headers: {
    'Content-Type': `application/json`,
  },
}).then((r) => ({ success: r.status !== 500, bug }))

export const generateReport = (job: string) => fetch(`${url}/report/${job}`, {
  method: `POST`,
  body: JSON.stringify({ job }),
  headers: {
    'Content-Type': `application/json`,
  },
}).then((r) => ({ success: r.status !== 500 }))

export const uploadImage = (imageData: { base64: string; filename: string; unitId?: string; job?: string }) => fetch(`${url}/upload`, {
  method: `POST`,
  body: JSON.stringify(imageData),
  headers: {
    'Content-Type': `application/json`,
  },
}).then((r) => ({ success: r.status !== 500, data: r.json() }))
