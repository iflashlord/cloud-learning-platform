export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

export const formatInlineMarkdown = (value: string) => {
  let result = escapeHtml(value)
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>")
  result = result.replace(/`([^`]+)`/g, "<code>$1</code>")
  result = result.replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  return result
}

export const renderMarkdownToHtml = (markdown: string) => {
  const trimmed = markdown.trim()
  if (!trimmed) return ""

  const blocks = trimmed.split(/\n{2,}/)
  const htmlBlocks = blocks.map((block) => {
    const trimmedBlock = block.trim()

    if (/^```/.test(trimmedBlock) && /```$/.test(trimmedBlock)) {
      const codeContent = trimmedBlock.replace(/^```[\w-]*\n?/, "").replace(/```$/, "")
      return `<pre><code>${escapeHtml(codeContent)}</code></pre>`
    }

    const lines = trimmedBlock.split("\n")
    if (lines.every((line) => /^[-*+]\s+/.test(line.trim()))) {
      const items = lines
        .map((line) => line.replace(/^[-*+]\s+/, ""))
        .map((item) => `<li>${formatInlineMarkdown(item)}</li>`)
        .join("")
      return `<ul>${items}</ul>`
    }

    if (lines.every((line) => /^\d+\.\s+/.test(line.trim()))) {
      const items = lines
        .map((line) => line.replace(/^\d+\.\s+/, ""))
        .map((item) => `<li>${formatInlineMarkdown(item)}</li>`)
        .join("")
      return `<ol>${items}</ol>`
    }

    const paragraph = lines.map((line) => formatInlineMarkdown(line)).join("<br />")
    return `<p>${paragraph}</p>`
  })

  return htmlBlocks.join("")
}
