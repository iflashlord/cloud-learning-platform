import { describe, expect, it } from "vitest"

import {
  buildPlaintextExport,
  buildSystemPrompt,
  formatInlineMarkdown,
  renderMarkdownToHtml,
} from "@/app/(main)/review/components/ai-learning-assistant/ai-utils"
import { resolveActionPrompt } from "@/app/(main)/review/components/ai-learning-assistant/ai-actions"

describe("AI Learning Assistant utilities", () => {
  describe("formatInlineMarkdown", () => {
    it("escapes HTML and applies inline formatting", () => {
      const input = `Strong: **bold** and *italic* with [link](https://example.com) & <tags>`
      const output = formatInlineMarkdown(input)

      expect(output).toContain("<strong>bold</strong>")
      expect(output).toContain("<em>italic</em>")
      expect(output).toContain(
        '<a href="https://example.com" target="_blank" rel="noopener noreferrer">link</a>',
      )
      expect(output).not.toContain("<tags>")
      expect(output).toContain("&lt;tags&gt;")
    })
  })

  describe("renderMarkdownToHtml", () => {
    it("renders paragraphs, lists, and code blocks", () => {
      const markdown = [
        "Paragraph text",
        "",
        "- Item one",
        "- Item two",
        "",
        "1. First",
        "2. Second",
        "",
        "```js",
        "const value = 42;",
        "```",
      ].join("\n")

      const html = renderMarkdownToHtml(markdown)

      expect(html).toContain("<p>Paragraph text</p>")
      expect(html).toContain("<ul><li>Item one</li><li>Item two</li></ul>")
      expect(html).toContain("<ol><li>First</li><li>Second</li></ol>")
      expect(html).toContain("<pre><code>")
      expect(html).toContain("const value = 42;")
    })
  })

  describe("buildSystemPrompt", () => {
    const baseLesson = {
      title: "Networking Basics",
      objectives: ["Understand VPCs", "Configure subnets"],
      unit: {
        title: "Week 1",
        course: { title: "AWS Foundations" },
      },
      challenges: Array.from({ length: 10 }, (_, index) => ({
        question: `Question ${index + 1}`,
        correctAnswer: `Answer ${index + 1}`,
      })),
    }

    const completion = { score: 92 }

    it("includes core lesson metadata and summary", () => {
      const summaryText = "Key summary of the lesson."
      const prompt = buildSystemPrompt({
        lessonData: baseLesson,
        completionData: completion,
        summaryText,
      })

      expect(prompt).toContain('Lesson: "Networking Basics"')
      expect(prompt).toContain("Course: AWS Foundations")
      expect(prompt).toContain("Unit: Week 1")
      expect(prompt).toContain("Student Score: 92%")
      expect(prompt).toContain("Lesson summary:\nKey summary of the lesson.")
      expect(prompt.match(/\d+\./g)?.length).toBeLessThanOrEqual(5)
    })

    it("falls back gracefully when data is missing", () => {
      const prompt = buildSystemPrompt({
        lessonData: null,
        completionData: {},
      })

      expect(prompt).toContain('Lesson: "Lesson"')
      expect(prompt).toContain("Course: Course")
      expect(prompt).toContain("Unit: Unit")
      expect(prompt).toContain("Student Score: 0%")
    })
  })

  describe("buildPlaintextExport", () => {
    it("includes prompt, response, and engine details", () => {
      const entry = {
        id: "test-id",
        prompt: "Explain this lesson",
        answer: "Here is the explanation.",
        origin: "explain",
        originLabel: "Explain Concepts",
        engine: "assistant" as const,
        createdAt: "2024-01-01T12:34:00.000Z",
      }

      const exportText = buildPlaintextExport(entry)

      expect(exportText).toContain("Explain this lesson")
      expect(exportText).toContain("Here is the explanation.")
      expect(exportText).toContain("Chrome Gemini Nano")
      expect(exportText).toContain("Generated: ")
    })
  })

  describe("resolveActionPrompt", () => {
    it("returns the default action prompt and label", () => {
      const result = resolveActionPrompt("tips", "")
      expect(result.prompt).toMatch(/study tips/i)
      expect(result.label).toBe("Study Tips")
    })

    it("returns the custom prompt when action is custom", () => {
      const customPrompt = "Summarize the lesson in haiku form."
      const result = resolveActionPrompt("custom", customPrompt)

      expect(result.prompt).toBe(customPrompt)
      expect(result.label).toBe("Custom Question")
    })
  })
})
