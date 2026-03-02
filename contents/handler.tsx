import { Storage } from "@plasmohq/storage"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://chatgpt.com/*"]
}

export const getOverlayAnchor = async () => null

const storage = new Storage()
let isEnabled = true // Default to true

// Watch for changes in the 'active' key from the popup
storage.watch({
  active: (c) => {
    isEnabled = c.newValue
    console.log(`Guard Status Changed: ${isEnabled ? "PROTECTED" : "BYPASS"}`)
  }
})

// Get the initial state when the page first loads
storage.get<boolean>("active").then((val) => {
  if (val !== undefined) isEnabled = val
})

document.addEventListener("paste", (event) => {
  if (!isEnabled) return

  const clipboardData = event.clipboardData
  if (!clipboardData) return

  let text = clipboardData.getData("text") || ""
  
const awsAccessKey = /((?:access|key|aws).{0,20})[0-9A-Z]{20}/gi
const awsSecretKey = /((?:secret|key|aws|token|credential).{0,20})[a-zA-Z0-9/+=]{40}/gi

  let isDirty = false

  // --- Check for Access Key ---
if (awsAccessKey.test(text)) {
  text = text.replace(awsAccessKey, (match, label) => {
    // We use the captured label to keep "Access Key ID" intact
    return `${label}[REDACTED ACCESS KEY]`
  })
  isDirty = true
}

// --- Check for Secret Key ---
if (awsSecretKey.test(text)) {
  text = text.replace(awsSecretKey, (match, label) => {
    // This will now keep the full "Secret Access Key" label
    return `${label}[REDACTED SECRET KEY]`
  })
  isDirty = true
}
  // Check for Secret Key
  // This uses a function to keep the label (like "Secret Key:") but swap the string
 // Look for your "if (isDirty)" block at the bottom
if (isDirty) {
  event.preventDefault()
  document.execCommand("insertText", false, text)
  
  // Use the 'storage' variable already created on Line 10
  const recordHistory = async () => {
    const currentHistory = await storage.get<any[]>("history") || []
    const newEntry = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "AWS Credentials",
      site: window.location.hostname
    }
    // Save the new list
    await storage.set("history", [newEntry, ...currentHistory].slice(0, 5))
  }

  recordHistory() // Fire the history saver
  console.log("%c 🛡️ NOVUS: DATA DETOX COMPLETE", "color: white; background: #3b82f6; padding: 5px;")
}
}, true)