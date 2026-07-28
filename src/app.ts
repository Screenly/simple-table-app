import {
  getSettingWithDefault,
  setupTheme,
  signalReady,
} from '@screenly/edge-apps'
import Papa from 'papaparse'

const ROW_DIVIDER_CLASSES =
  'bg-[linear-gradient(rgba(255,255,255,0.15),rgba(255,255,255,0.15))] [background-size:calc(100%-4rem)_1px] bg-bottom bg-no-repeat'

const CELL_PADDING_CLASSES =
  'whitespace-nowrap portrait:px-5 [@media_(max-width:1280px)_and_(orientation:landscape)]:px-6'

export function parseCSV(csv: string): string[][] {
  const result = Papa.parse<string[]>(csv.trim(), {
    skipEmptyLines: true,
  })

  if (result.errors && result.errors.length > 0) {
    const firstError = result.errors[0]
    const location =
      typeof firstError.row === 'number' ? ` on row ${firstError.row}` : ''
    throw new Error(`Failed to parse CSV${location}: ${firstError.message}`)
  }

  return result.data
}

export function renderTable(csv: string): void {
  const thead = document.getElementById('table-head')
  const tbody = document.getElementById('table-body')
  if (!thead || !tbody) return

  thead.innerHTML = ''
  tbody.innerHTML = ''

  const rows = parseCSV(csv)
  if (rows.length === 0) return

  const [headers, ...dataRows] = rows

  const headerRow = document.createElement('tr')
  headerRow.className = ROW_DIVIDER_CLASSES
  headers.forEach((header) => {
    const th = document.createElement('th')
    th.className = `px-8 py-5 text-left text-xs font-semibold tracking-[0.08em] uppercase text-[#9d9d9f] ${CELL_PADDING_CLASSES} portrait:py-4 portrait:text-[0.7rem] [@media_(max-width:1280px)_and_(orientation:landscape)]:py-4`
    th.textContent = header
    headerRow.appendChild(th)
  })
  thead.appendChild(headerRow)

  dataRows.forEach((row) => {
    const tr = document.createElement('tr')
    tr.className = `${ROW_DIVIDER_CLASSES} last:bg-none`
    row.forEach((cell) => {
      const td = document.createElement('td')
      td.className = `px-8 py-[1.125rem] text-lg font-normal text-[#dadadb] ${CELL_PADDING_CLASSES} portrait:py-[0.875rem] portrait:text-base [@media_(max-width:1280px)_and_(orientation:landscape)]:py-[0.875rem] [@media_(max-width:1280px)_and_(orientation:landscape)]:text-base`
      td.textContent = cell
      tr.appendChild(td)
    })
    tbody.appendChild(tr)
  })
}

export default function init(): void {
  setupTheme()

  const csvContent = getSettingWithDefault<string>(
    'content',
    'Name,Age\nJohn,25\nJane,30',
  )
  const title = getSettingWithDefault<string>('title', '')

  const titleEl = document.getElementById('table-title')
  if (titleEl && title) {
    titleEl.textContent = title
    titleEl.hidden = false
  }

  renderTable(csvContent)

  signalReady()
}
