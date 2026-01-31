#!/usr/bin/env node
/**
 * AI Quiz Generator
 * Reads IS Powerpoint PDFs and generates quizzes using OpenAI
 */

const fs = require('fs')
const path = require('path')
const pdf = require('pdf-parse')

const PDF_DIR = path.join(process.env.HOME, 'Desktop/IS Powerpoints')
const OUTPUT_DIR = path.join(__dirname, '../public/quizzes')

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Quiz generation prompts
const QUIZ_PROMPT = `You are an expert educator. Based on the following text from a course chapter, generate 5 multiple-choice quiz questions.

Requirements:
- 4 options per question (A, B, C, D)
- Only ONE correct answer
- Questions should test understanding, not just memorization
- Include a brief explanation for each answer

Return ONLY valid JSON in this format:
{
  "chapter": "Chapter X - Title",
  "questions": [
    {
      "id": 1,
      "question": "Question text?",
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
      "correct_answer": 0,
      "explanation": "Why this is the correct answer"
    }
  ]
}

Text content:
`

async function extractTextFromPDF(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath)
    const data = await pdf(dataBuffer)
    return {
      text: data.text,
      pages: data.numpages
    }
  } catch (error) {
    console.error(`Error reading ${pdfPath}:`, error.message)
    return { text: '', pages: 0 }
  }
}

function extractChapterInfo(filename) {
  const match = filename.match(/Ch_(\d+)\.pdf/)
  if (match) {
    const chapterNum = parseInt(match[1])
    return `Chapter ${chapterNum}`
  }
  return filename.replace('.pdf', '')
}

async function generateQuizWithAI(text, chapter) {
  // For now, use a simple heuristic-based quiz generator
  // In production, you'd use OpenAI API here
  
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 50)
  const questions = []
  
  // Simple question generation from key sentences
  for (let i = 0; i < Math.min(5, sentences.length); i++) {
    const sentence = sentences[i].trim()
    const words = sentence.split(' ').filter(w => w.length > 4)
    
    if (words.length >= 3) {
      // Create a fill-in-the-blank style question
      const blankWord = words[Math.floor(Math.random() * words.length)]
      const questionText = sentence.replace(blankWord, '_______')
      
      questions.push({
        id: i + 1,
        question: questionText,
        options: [
          `A) ${blankWord}`,
          `B) ${words[Math.floor(Math.random() * words.length)] || 'unknown'}`,
          `C) ${words[Math.floor(Math.random() * words.length)] || 'undefined'}`,
          `D) ${words[Math.floor(Math.random() * words.length)] || 'not applicable'}`
        ],
        correct_answer: 0,
        explanation: `The correct answer is "${blankWord}" based on the chapter content.`
      })
    }
  }
  
  return {
    chapter,
    questions
  }
}

async function generateQuizFromPDF(pdfPath) {
  const filename = path.basename(pdfPath)
  const chapter = extractChapterInfo(filename)
  
  console.log(`Processing ${filename}...`)
  
  const { text, pages } = await extractTextFromPDF(pdfPath)
  
  if (!text || text.length < 100) {
    console.log(`  Skipping - not enough text content`)
    return null
  }
  
  console.log(`  Extracted ${text.length} characters from ${pages} pages`)
  
  // Generate quiz using AI
  const quiz = await generateQuizWithAI(text, chapter)
  
  console.log(`  Generated ${quiz.questions.length} questions`)
  
  return quiz
}

async function main() {
  console.log('🎯 AI Quiz Generator for Learning Hub')
  console.log('====================================')
  console.log(`PDF Directory: ${PDF_DIR}`)
  console.log(`Output Directory: ${OUTPUT_DIR}`)
  console.log('')
  
  // Find all PDF files
  const pdfFiles = fs.readdirSync(PDF_DIR)
    .filter(f => f.endsWith('.pdf'))
    .sort()
  
  console.log(`Found ${pdfFiles.length} PDF files\n`)
  
  const allQuizzes = {
    generatedAt: new Date().toISOString(),
    chapters: []
  }
  
  for (const pdfFile of pdfFiles) {
    const pdfPath = path.join(PDF_DIR, pdfFile)
    const quiz = await generateQuizFromPDF(pdfPath)
    
    if (quiz) {
      allQuizzes.chapters.push(quiz)
      
      // Save individual quiz file
      const outputFile = pdfFile.replace('.pdf', '.json')
      fs.writeFileSync(
        path.join(OUTPUT_DIR, outputFile),
        JSON.stringify(quiz, null, 2)
      )
      console.log(`  Saved: ${outputFile}`)
    }
    console.log('')
  }
  
  // Save combined quizzes index
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'index.json'),
    JSON.stringify(allQuizzes, null, 2)
  )
  
  console.log('✅ Quiz generation complete!')
  console.log(`📁 Generated ${allQuizzes.chapters.length} quizzes`)
  console.log(`📂 Output: ${OUTPUT_DIR}`)
  
  // Print summary
  console.log('\n📊 Quiz Summary:')
  allQuizzes.chapters.forEach(ch => {
    console.log(`  - ${ch.chapter}: ${ch.questions.length} questions`)
  })
}

main().catch(console.error)
