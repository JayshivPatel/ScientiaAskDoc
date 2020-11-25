interface TextBlock {
  text: string,
  style?: 'bold' 
}

export type Paragraph = TextBlock[]

class WriteParagraph {
  paragraph: TextBlock[] = []

  static begin(): WriteParagraph {
    return new WriteParagraph()
  }

  write(text: string): WriteParagraph {
    this.paragraph.push({ text })
    return this
  }

  bold(text: string): WriteParagraph {
    this.paragraph.push({ text, style: 'bold' })
    return this
  }

  space(): WriteParagraph {
    return this.write(' ')
  }

  end(): Paragraph {
    return this.paragraph
  }
}

export default WriteParagraph