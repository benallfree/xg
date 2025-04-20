/// <reference types="chrome"/>
import van from 'vanjs-core'

const { div, select, option, h1, ul, li, span, button } = van.tags

// Define approval status types
const ApprovalStatus = {
  ASK: 'ask',
  ALWAYS: 'always',
  NEVER: 'never',
} as const

type ApprovalStatusType = (typeof ApprovalStatus)[keyof typeof ApprovalStatus]

type WhitelistItem = {
  url: string
  status: ApprovalStatusType
}

interface StorageData {
  whitelistStatuses: Record<string, ApprovalStatusType>
}

// State management
const whitelist = van.state<WhitelistItem[]>([])
const error = van.state<string | null>(null)
const isLoading = van.state(false)

// Fetch whitelist from server
const fetchWhitelist = async () => {
  error.val = null
  isLoading.val = true

  try {
    const response = await fetch('https://x-games.benallfree.com/whitelist.json')
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`)
    }
    const urls = await response.json()

    // Get existing statuses from chrome.storage
    chrome.storage.sync.get(
      ['whitelistStatuses'],
      (result: { whitelistStatuses?: StorageData['whitelistStatuses'] }) => {
        const statuses = result.whitelistStatuses || {}
        whitelist.val = urls.map((url: string) => ({
          url,
          status: (statuses[url] as ApprovalStatusType) || ApprovalStatus.ASK,
        }))
        isLoading.val = false
      }
    )
  } catch (err) {
    error.val = 'Failed to load whitelist. Please check your connection.'
    isLoading.val = false
    console.error('Failed to fetch whitelist:', err)
  }
}

// Update status in chrome.storage
const updateStatus = (url: string, newStatus: ApprovalStatusType) => {
  chrome.storage.sync.get(['whitelistStatuses'], (result: { whitelistStatuses?: StorageData['whitelistStatuses'] }) => {
    const statuses = result.whitelistStatuses || {}
    statuses[url] = newStatus
    chrome.storage.sync.set({ whitelistStatuses: statuses })

    // Update local state
    whitelist.val = whitelist.val.map((item) => (item.url === url ? { ...item, status: newStatus } : item))
  })
}

// UI Components
const WhitelistItem = (item: WhitelistItem) =>
  li(
    { class: 'whitelist-item' },
    span(item.url),
    select(
      {
        value: item.status,
        onchange: (e) => updateStatus(item.url, (e.target as HTMLSelectElement).value as ApprovalStatusType),
      },
      option({ value: ApprovalStatus.ASK }, 'Ask'),
      option({ value: ApprovalStatus.ALWAYS }, 'Always'),
      option({ value: ApprovalStatus.NEVER }, 'Never')
    )
  )

const ErrorState = () =>
  div(
    { class: 'error-state' },
    div({ class: 'error-message' }, error.val),
    button(
      {
        class: 'refresh-button',
        onclick: () => fetchWhitelist(),
        disabled: isLoading.val,
      },
      isLoading.val ? 'Loading...' : '↻ Refresh'
    )
  )

const App = () =>
  div({ id: 'root', class: 'whitelist-manager' }, h1('Whitelist Manager'), () =>
    error.val ? ErrorState() : ul({ class: 'whitelist' }, ...whitelist.val.map((item) => WhitelistItem(item)))
  )

// Initialize
fetchWhitelist()
van.add(document.body, App())
